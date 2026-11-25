import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminField, isLoggedIn } from './access'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: { useAsTitle: 'email', group: 'Settings', defaultColumns: ['email', 'name', 'role'] },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
    tokenExpiration: 60 * 60 * 8,
    cookies: { sameSite: 'Lax', secure: process.env.NODE_ENV === 'production' },
  },
  access: {
    // The first user is created through the admin's own "create first user" screen.
    create: isAdmin,
    read: isLoggedIn,
    update: ({ req, id }) => (req.user as { role?: string } | null)?.role === 'admin' || req.user?.id === id,
    delete: isAdmin,
  },
  fields: [
    { name: 'name', type: 'text' },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'admin',
      options: [
        { label: 'Admin (everything, including users)', value: 'admin' },
        { label: 'Editor (content and enquiries)', value: 'editor' },
      ],
      access: { update: isAdminField },
    },
  ],
}
