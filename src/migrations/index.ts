import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

// Generated Postgres migrations are listed here by `npm run payload migrate:create`.
// See docs/DEPLOYMENT.md.
export const migrations: { name: string; up: (args: MigrateUpArgs) => Promise<void>; down: (args: MigrateDownArgs) => Promise<void> }[] = []
