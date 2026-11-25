# Deployment and launch checklist

The app is Next.js 16 + Payload CMS 3 in one project. Locally it uses a SQLite file; on Vercel it uses Postgres (Neon). Nothing here has been deployed yet: it needs the client's accounts (see `docs/CLIENT-INPUTS.md`, items 36–41).

## Local development

```bash
nvm use 22            # Payload needs Node 22+
npm install
cp .env.example .env.local   # set PAYLOAD_SECRET; leave DATABASE_URL empty for SQLite
npm run dev           # http://localhost:3000 and http://localhost:3000/admin
npm run seed          # creates the five blog categories from the Brief
```

The first visit to `/admin` asks for the first admin account. Design notes and pending-copy markers show in development; set `SITE_PREVIEW_NOTES=0` to see the public view.

## First deployment (staging, then production)

1. **Database.** Create a Neon Postgres project (region close to India, e.g. Singapore). Copy the pooled connection string into `DATABASE_URL`.
2. **Migrations.** With `DATABASE_URL` pointing at Neon, run once and commit the result:
   ```bash
   npm run payload migrate:create initial
   ```
   This writes `src/migrations/`. The app runs pending migrations automatically when it starts in production (`prodMigrations`).
3. **Vercel project.** Import the GitHub repository, framework Next.js, Node 22. Set the environment variables from `.env.example` for Preview and Production:
   - `DATABASE_URL`, `PAYLOAD_SECRET` (different per environment), `NEXT_PUBLIC_SITE_URL`
   - `BLOB_READ_WRITE_TOKEN` (create a Vercel Blob store and connect it)
   - `RESEND_API_KEY`, `EMAIL_FROM`, `ENQUIRY_NOTIFY_TO`
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`
   - `NEXT_PUBLIC_GA_ID`, `CRON_SECRET`
4. **Email.** In Resend, add `nanditaspeaks.in`, publish the SPF/DKIM DNS records, wait for verification, then set `EMAIL_FROM`.
5. **Spam protection.** Create a Cloudflare Turnstile widget (mode: invisible / managed) for the domain and the Vercel preview domain.
6. **Admin.** Open `/admin` on the deployment and create the first admin user. Add editors under Settings › Users.
7. **Content.** Run `npm run seed` against the database, upload Nandita's photographs under Pages › Photographs, fill Settings › Contact and social, Pages › Silent Screams, and publish the first posts.
8. **Preview deployments** show design notes and are `noindex` automatically (`VERCEL_ENV=preview`). Production hides notes and is indexable.

## Production launch (only after written approval)

- [ ] Client sign-off on the staging URL
- [ ] All [CONFIRM]/[ADD] items resolved or their sections left hidden (they hide automatically while empty)
- [ ] `ENQUIRY_NOTIFY_TO` receives a real test enquiry; the visitor confirmation arrives; the enquiry shows in the dashboard
- [ ] Domain `nanditaspeaks.in` added in Vercel; DNS switched; HTTPS active
- [ ] Old URLs redirect (`/about` → `/about/` etc. are automatic; `/book` → `/silent-screams/` is configured)
- [ ] Google Search Console verified; `https://nanditaspeaks.in/sitemap.xml` submitted
- [ ] GA4 DebugView shows `page_view`, `invite_nandita_click`, `form_start`, `generate_lead`; `generate_lead` marked as a key event
- [ ] Rich Results Test passes for Home (Person, WebSite), About (ProfilePage), Speaking (Service), a post (Article)
- [ ] Neon backups/point-in-time restore confirmed and one restore tested
- [ ] Rollback plan: Vercel "Instant Rollback" to the previous production deployment; the old Vite site stays on the `main` branch history

## Scheduled jobs

`vercel.json` runs `/api/cron/retry-emails` daily at 03:00 UTC. It resends enquiry emails that failed (up to five attempts). It needs `CRON_SECRET`.
