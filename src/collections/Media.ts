import type { CollectionConfig } from 'payload'
import { anyone, isLoggedIn } from './access'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: { group: 'Content', description: 'Only real photographs of Nandita and supplied artwork. No stock or AI-generated portraits.' },
  access: { read: anyone, create: isLoggedIn, update: isLoggedIn, delete: isLoggedIn },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: { description: 'Describe what the photo actually shows, e.g. "Nandita Thakur singing".' },
    },
    { name: 'credit', type: 'text', admin: { description: 'Photographer credit, if required.' } },
  ],
  upload: {
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
    imageSizes: [
      { name: 'thumb', width: 480 },
      { name: 'card', width: 960 },
      { name: 'large', width: 1600 },
      { name: 'xl', width: 2400 },
    ],
    adminThumbnail: 'thumb',
    focalPoint: true,
  },
}
