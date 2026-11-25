import type { MetadataRoute } from 'next'
import { absoluteUrl, isIndexable } from '@/lib/site'

/** Production allows crawling except private areas; previews and staging block everything. */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) return { rules: [{ userAgent: '*', disallow: '/' }] }
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api/', '/blog-preview/', '/design-preview/'] }],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: absoluteUrl('/'),
  }
}
