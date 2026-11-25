import { SITE } from '@/content/defaults'
import { getPosts } from '@/lib/cms'
import { absoluteUrl } from '@/lib/site'

export const revalidate = 3600

const x = (s: string) => s.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]!)

export async function GET() {
  const { docs } = await getPosts({ limit: 50 })
  const items = docs
    .map(
      (p) => `    <item>
      <title>${x(p.title)}</title>
      <link>${absoluteUrl(`/blog/${p.slug}/`)}</link>
      <guid isPermaLink="true">${absoluteUrl(`/blog/${p.slug}/`)}</guid>
      <pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>
      ${p.category ? `<category>${x(p.category.title)}</category>` : ''}
      <description>${x(p.excerpt)}</description>
      <author>noreply@nanditaspeaks.in (${SITE.person})</author>
    </item>`,
    )
    .join('\n')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${x(`${SITE.person} | Blog`)}</title>
    <link>${absoluteUrl('/blog/')}</link>
    <atom:link href="${absoluteUrl('/blog/rss.xml')}" rel="self" type="application/rss+xml" />
    <description>Writing by Nandita Thakur on self-belief, identity, independence and starting again.</description>
    <language>en-IN</language>
${items}
  </channel>
</rss>`
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}
