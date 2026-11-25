# Architecture recommendation

Status: **proposal for approval.** No stack change has been made. Build starts only after the design is approved (PRD phase 3 gate).

## 1. Audit of the current repository (branch `main`, commit d3a9e75)

| Area | What exists | Problem against the PRD |
|---|---|---|
| Framework | Vite 6 + React 18 single-page app, React Router 6 | Every route is rendered in the browser. Crawlers and social previews receive an empty `<div id="root">` first. |
| SEO | `useSeo` hook sets title, meta, canonical and JSON-LD in `useEffect` | Tags appear only after JavaScript runs. Link previews (WhatsApp, LinkedIn) will show the default title for every page. |
| Routing | `vercel.json` rewrites every path to `index.html`; `path="*"` renders Home | No real 404: unknown URLs return 200 with the Home page (soft 404). No trailing-slash URLs as specified (`/about/`). |
| Contact | `mailto:` link prefilled from a form | Nothing is saved, no acknowledgement email, no spam protection, enquiries lost if the visitor never presses send. |
| CMS / blog | Hard-coded copy in `src/data/content.js` and page files; blog is static preview cards | No editing, publishing, scheduling, RSS or editable SEO. |
| Motion / UX | Lenis smooth scroll, custom cursor component, grain overlay, page-fade transitions | The brief now asks to avoid forced smooth scrolling and custom cursors; page fades delay content and hurt LCP. |
| Content | Unverified testimonials, "Currently booking 2026", showreel block, unconfirmed email | Must be removed (see `docs/COPY-AUDIT.md`). |
| Missing | sitemap.xml, robots.txt, RSS, favicon from emblem, OG image, privacy page, analytics | All required at launch. |

## 2. Options

**A. Keep Vite and add pre-rendering** (for example `vite-react-ssg`) plus Vercel Functions and a hosted headless CMS.
- Fixes static SEO for the fixed pages.
- Every blog publish needs a full rebuild, or a webhook-triggered deploy. Scheduling needs a cron that rebuilds.
- The admin dashboard, auth, enquiry API and CMS have to be assembled from separate parts. More glue code, more places to break.

**B. Migrate to Next.js (App Router, TypeScript) on Vercel.** *Recommended.*
- Pages are statically generated with server-rendered metadata (`generateMetadata`), so titles, descriptions, canonicals, OG tags and JSON-LD are in the HTML.
- Incremental Static Regeneration: a published or scheduled post appears without a full redeploy.
- Route handlers give a secure enquiry endpoint in the same codebase.
- The CMS and admin can run inside the same app (see Payload below), so there is one deployment, one login, one database.
- Real 404s via `not-found.tsx`, trailing-slash URLs via `trailingSlash: true`, built-in `sitemap.ts`, `robots.ts` and image optimisation (AVIF/WebP).

### Why migrating is proportionate here
The current app is about 1,750 lines across six pages, and every page is being redesigned and its copy replaced anyway. Little working code would be thrown away. The parts worth keeping (brand tokens in `index.css`, logo files, approved copy) move across directly.

### Migration risks and how they are handled
| Risk | Mitigation |
|---|---|
| Production regression | Work stays on a separate redesign branch (currently `design/figma-frames`); production on `main` is untouched until written approval. Vercel preview URL per push. |
| URL changes (`/about` → `/about/`) | Permanent redirects for every legacy path; canonical tags on the new URLs. |
| Framer Motion and Lenis behaviour | Lenis and the custom cursor are dropped (brief). Remaining motion is CSS plus a small IntersectionObserver, with reduced-motion support. |
| Hosting cost (see below) | Decide plan before launch. |
| Learning curve for the client's team | Admin is a plain web dashboard; a short editing guide is part of handover. |

## 3. Recommended services (lowest recurring cost that stays reliable)

Check each provider's current terms before signing up; free-tier limits change.

| Need | Recommendation | Cost note |
|---|---|---|
| Hosting | **Vercel** (PRD preference) | Vercel's free Hobby plan is for non-commercial use. A business site should be on Pro (about US$20/month per member). Alternative with a commercial-use free tier: Cloudflare Pages (would need adapter work). **Client decision.** |
| CMS + admin + auth | **Payload CMS 3** (open source, runs inside the Next.js app at `/admin`) | No licence fee. Built-in email/password auth with hashed passwords, roles, drafts, versions and live preview. |
| Database | **Neon Postgres** (Vercel Marketplace) | Free tier is enough for this site's traffic. Supabase is a fine alternative, but its free projects pause after a period of inactivity. |
| Media storage | **Vercel Blob** via Payload's storage adapter | Small free allowance; photos are few. |
| Transactional email | **Resend** with a verified `nanditaspeaks.in` sender | Free tier covers far more than expected enquiry volume. Needs DNS access for SPF/DKIM. |
| Spam protection | Honeypot field + **Cloudflare Turnstile** (invisible mode) + server-side rate limit per IP | Free. No puzzles for visitors. |
| Analytics | **GA4** via `@next/third-parties`, one tag, consent banner only if required | Free. |
| Search | Google Search Console, sitemap submitted | Free. |

## 4. How each backend requirement is met (build phase, after approval)

| Requirement | Implementation |
|---|---|
| Enquiry form | Server action / route handler: validate with Zod on client and server, honeypot + Turnstile check, rate limit (5 per IP per hour), idempotency key to stop double submits. |
| Secure storage | `enquiries` collection in Postgres: id, created_at, name, organisation, email, timing, location, audience, message, status. Read access for admins only. |
| Owner notification + visitor acknowledgement | After the row is saved, send two Resend emails (separate templates). If sending fails, the enquiry is kept, marked `email_failed`, retried, and logged privately. |
| Admin dashboard | Payload admin: list, filter and search enquiries; status New / Contacted / In discussion / Confirmed / Closed; CSV export action. |
| Admin authentication | Payload auth, server-side access control on every collection, login rate limiting, no public API for private collections. |
| Content management | Globals for site settings (contact email, social links, phone/location toggles), Book (cover, description, synopsis, purchase link, show/hide), and editable page sections with show/hide switches for pending content. |
| Blog | `posts` collection: title, unique slug, category, excerpt, rich text (headings, images, quotes, lists, video embeds), featured image with required alt text, `publishedAt` for scheduling, draft/published, per-post SEO fields. `categories` collection. |
| Scheduling | Posts are visible only when `status = published` and `publishedAt <= now`; ISR revalidates hourly and on publish. |
| SEO | Per-page and per-post title, description, OG image; JSON-LD for Person, WebSite, ProfilePage, Service, Book and Article exactly as supplied in the Page Copy; `sitemap.xml`, `robots.txt`, RSS at `/blog/rss.xml`; staging and drafts `noindex`. |
| Analytics events | `invite_nandita_click`, `form_start`, `generate_lead` (only after the enquiry is saved), `book_link_click`, `video_start`. No names, emails or messages sent to GA4. |

## 5. Environment variables (names only; values never committed)

`DATABASE_URL`, `PAYLOAD_SECRET`, `BLOB_READ_WRITE_TOKEN`, `RESEND_API_KEY`, `ENQUIRY_NOTIFY_TO`, `EMAIL_FROM`, `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_SITE_URL`.
