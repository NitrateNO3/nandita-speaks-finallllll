import type { Field } from 'payload'

/**
 * Builds Payload fields from a defaults object, so every approved sentence is editable in the admin
 * with the Page Copy prefilled. Strings become text or textarea, string arrays become repeatable rows,
 * object arrays become repeatable groups, booleans become checkboxes, nested objects become groups.
 */
const label = (key: string) =>
  key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (c) => c.toUpperCase())
    .replace(/\bFaqs\b/, 'FAQs')
    .replace(/\bSeo\b/, 'Search and social')
    .replace(/\bUrl\b/, 'URL')

const HINTS: Record<string, string> = {
  talksApproved: 'Tick only after Nandita has approved the talk titles. Until then the section is hidden from visitors.',
  bioApproved: 'Tick only after Nandita has approved the bio wording. Until then the bio is hidden from visitors.',
  womenEventTypesConfirmed: 'Tick once Nandita has confirmed the list of event types in the first paragraph.',
}

export function fieldsFromDefaults(defaults: Record<string, unknown>): Field[] {
  return Object.entries(defaults).map(([name, value]): Field => {
    const base = { name, label: label(name) }
    const description = HINTS[name] || (typeof value === 'string' && value.includes('*') ? 'Use *text* for italics and [label](/path/) for a link.' : undefined)
    if (typeof value === 'boolean') return { ...base, type: 'checkbox', defaultValue: value, admin: { description } }
    if (typeof value === 'string') {
      return value.length > 90 || value === ''
        ? { ...base, type: 'textarea', defaultValue: value || undefined, admin: { description } }
        : { ...base, type: 'text', defaultValue: value, admin: { description } }
    }
    if (Array.isArray(value)) {
      if (value.length === 0 || typeof value[0] === 'string') {
        return {
          ...base,
          type: 'array',
          defaultValue: (value as string[]).map((text) => ({ text })),
          fields: [{ name: 'text', type: 'textarea', required: true }],
        }
      }
      const shape = value[0] as Record<string, unknown>
      return { ...base, type: 'array', defaultValue: (value as Record<string, unknown>[]).map(toRows), fields: fieldsFromDefaults(shape).map(stripDefault) }
    }
    if (value && typeof value === 'object') {
      return { ...base, type: 'group', fields: fieldsFromDefaults(value as Record<string, unknown>) }
    }
    return { ...base, type: 'text' }
  })
}

/** Nested string arrays are stored as [{ text }] rows. */
const toRows = (obj: Record<string, unknown>): Record<string, unknown> =>
  Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, Array.isArray(v) && (v.length === 0 || typeof v[0] === 'string') ? (v as string[]).map((text) => ({ text })) : v]),
  )

const stripDefault = (f: Field): Field => {
  const c = { ...(f as Record<string, unknown>) }
  delete c.defaultValue
  return c as Field
}

/** Merge a saved global over the defaults, turning [{text}] rows back into string arrays. */
export function mergeDefaults<T extends Record<string, unknown>>(defaults: T, saved: Record<string, unknown> | null | undefined): T {
  if (!saved) return defaults
  const out: Record<string, unknown> = { ...defaults }
  for (const [k, d] of Object.entries(defaults)) {
    const v = saved[k]
    if (v === undefined || v === null) continue
    if (Array.isArray(d)) {
      if (!Array.isArray(v)) continue
      out[k] = d.length === 0 || typeof d[0] === 'string' ? v.map((r: { text?: string }) => r?.text ?? '').filter(Boolean) : v
    } else if (d && typeof d === 'object') {
      out[k] = mergeDefaults(d as Record<string, unknown>, v as Record<string, unknown>)
    } else if (typeof d === 'string') {
      out[k] = typeof v === 'string' ? v : d
    } else {
      out[k] = v
    }
  }
  return out as T
}
