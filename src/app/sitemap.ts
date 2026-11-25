import type { MetadataRoute } from 'next'
import { getLegal, getPosts } from '@/lib/cms'
import { absoluteUrl } from '@/lib/site'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ docs }, legal] = await Promise.all([getPosts({ limit: 1000 }), getLegal()])
  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), changeFrequency: 'monthly', priority: 1 },
    { url: absoluteUrl('/speaking/'), changeFrequency: 'monthly', priority: 0.9 },
    { url: absoluteUrl('/about/'), changeFrequency: 'monthly', priority: 0.8 },
    { url: absoluteUrl('/contact/'), changeFrequency: 'yearly', priority: 0.8 },
    { url: absoluteUrl('/silent-screams/'), changeFrequency: 'yearly', priority: 0.6 },
  ]
  if (docs.length) pages.push({ url: absoluteUrl('/blog/'), changeFrequency: 'weekly', priority: 0.6 })
  if (legal.privacy) pages.push({ url: absoluteUrl('/privacy-policy/'), changeFrequency: 'yearly', priority: 0.2 })
  for (const p of docs) pages.push({ url: absoluteUrl(`/blog/${p.slug}/`), lastModified: p.publishedAt, changeFrequency: 'yearly', priority: 0.5 })
  return pages
}
