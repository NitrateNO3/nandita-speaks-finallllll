import type { Access, FieldAccess, Where } from 'payload'

/** Any signed-in admin user (admin or editor role). */
export const isLoggedIn: Access = ({ req }) => Boolean(req.user)

/** Admin role only (user management). */
export const isAdmin: Access = ({ req }) => (req.user as { role?: string } | null)?.role === 'admin'
export const isAdminField: FieldAccess = ({ req }) =>
  (req.user as { role?: string } | null)?.role === 'admin'

/** Public can read published documents; signed-in users can read drafts too. */
export const publishedOrLoggedIn: Access = ({ req }) => {
  if (req.user) return true
  const where: Where = {
    and: [{ _status: { equals: 'published' } }, { publishedAt: { less_than_equal: new Date().toISOString() } }],
  }
  return where
}

export const anyone: Access = () => true
export const nobody: Access = () => false
