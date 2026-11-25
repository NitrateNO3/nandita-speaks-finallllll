import type { Field } from 'payload'

/** Editable search and social fields, used by posts and page globals. */
export const seoGroup: Field = {
  name: 'seo',
  label: 'Search and social sharing',
  type: 'group',
  admin: { description: 'Leave empty to use the defaults from the Page Copy.' },
  fields: [
    { name: 'title', type: 'text', label: 'Title tag', maxLength: 70 },
    { name: 'description', type: 'textarea', label: 'Meta description', maxLength: 170 },
    { name: 'image', type: 'upload', relationTo: 'media', label: 'Share image (1200 × 630)' },
  ],
}
