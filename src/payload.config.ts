import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Enquiries } from './collections/Enquiries'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { globals } from './globals'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const dbUrl = process.env.DATABASE_URL || 'file:./nandita.db'
const usePostgres = dbUrl.startsWith('postgres')

if (process.env.NODE_ENV === 'production' && !process.env.PAYLOAD_SECRET) {
  // Fail loudly rather than run the admin with an empty signing secret.
  console.error('PAYLOAD_SECRET is not set. Admin sign-in will not work until it is configured.')
}

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || undefined,
  admin: {
    user: Users.slug,
    meta: { titleSuffix: ' · Nandita Speaks admin', robots: 'noindex, nofollow' },
    importMap: { baseDir: path.resolve(dirname) },
  },
  collections: [Enquiries, Posts, Categories, Media, Users],
  globals,
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'local-development-only-secret',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: usePostgres
    ? postgresAdapter({ pool: { connectionString: dbUrl }, prodMigrations: migrations })
    : sqliteAdapter({ client: { url: dbUrl } }),
  sharp,
  graphQL: { disable: true },
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
})
