import type { Field } from 'payload'

export const slugify = (v: string) =>
  v
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)

/** Unique, URL-safe slug filled from another field when left empty. */
export const slugField = (from: string): Field => ({
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  admin: { position: 'sidebar', description: 'The web address. Leave empty to create it from the title.' },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        const src = typeof value === 'string' && value.trim() ? value : (data?.[from] as string | undefined)
        return src ? slugify(src) : value
      },
    ],
  },
})
