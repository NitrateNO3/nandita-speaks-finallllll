import { SITE } from '@/content/defaults'

/**
 * Design notes and pending-copy markers render only in the private preview:
 * local development and Vercel preview deployments. Production never shows them.
 * Override with SITE_PREVIEW_NOTES=1 or 0.
 */
export const showPreviewNotes = (() => {
  if (process.env.SITE_PREVIEW_NOTES === '1') return true
  if (process.env.SITE_PREVIEW_NOTES === '0') return false
  if (process.env.VERCEL_ENV) return process.env.VERCEL_ENV !== 'production'
  return process.env.NODE_ENV !== 'production'
})()

/** Only the production deployment on the real domain is indexable. */
export const isIndexable = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === 'production' : process.env.SITE_INDEXABLE === '1'

export const absoluteUrl = (path = '/') => {
  if (/^https?:\/\//.test(path)) return path.replace(/(\.[a-z0-9]{2,5})\/$/i, '$1')
  return `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`
}

export function pageMetadata({ title, description, path, image }: { title: string; description: string; path: string; image?: string | null }) {
  const url = absoluteUrl(path)
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: SITE.name, type: 'website' as const, locale: 'en_IN', ...(image ? { images: [{ url: absoluteUrl(image) }] } : {}) },
    twitter: { card: 'summary_large_image' as const, title, description, ...(image ? { images: [absoluteUrl(image)] } : {}) },
  }
}

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' })
