import type { CollectionConfig } from 'payload'
import { isLoggedIn, publishedOrLoggedIn } from './access'
import { revalidate } from './revalidate'
import { seoGroup } from './seoFields'
import { slugField } from './slug'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    group: 'Blog',
    defaultColumns: ['title', 'category', 'publishedAt', '_status'],
    description: 'Write, preview, schedule and publish posts. A post appears on the site once it is published and its publish date has passed.',
    preview: (doc) => (doc?.slug ? `/blog-preview/${doc.slug}/` : null),
  },
  access: { read: publishedOrLoggedIn, create: isLoggedIn, update: isLoggedIn, delete: isLoggedIn },
  versions: { drafts: { autosave: { interval: 2000 } }, maxPerDoc: 30 },
  defaultSort: '-publishedAt',
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField('title'),
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' }, description: 'Set a future date to schedule the post.' },
      index: true,
    },
    { name: 'category', type: 'relationship', relationTo: 'categories', required: true, admin: { position: 'sidebar' } },
    { name: 'featuredImage', type: 'upload', relationTo: 'media', required: true },
    { name: 'excerpt', type: 'textarea', required: true, maxLength: 240, admin: { description: 'Shown on cards (about two lines).' } },
    { name: 'content', type: 'richText', required: true },
    seoGroup,
  ],
  hooks: {
    afterChange: [
      async ({ doc, previousDoc }) => {
        await revalidate(['/', '/blog/', `/blog/${doc.slug}/`, ...(previousDoc?.slug ? [`/blog/${previousDoc.slug}/`] : []), '/sitemap.xml', '/blog/rss.xml'])
        return doc
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        await revalidate(['/', '/blog/', `/blog/${doc.slug}/`])
        return doc
      },
    ],
  },
}
