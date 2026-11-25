# QA report: build milestone 1 (25 Nov 2026)

Branch `redesign/nextjs`. Tested locally on a production build (`next build` + `next start`) with a SQLite database, design notes off, indexing on (to match production). Not yet tested on Vercel, on real devices, or with real email/Turnstile keys.

## Lighthouse (mobile, Lighthouse 13.6.0, simulated throttling, localhost)

Two runs per page, identical results:

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` | 100 | 100 | 100 | 100 | 0.9 s | 0 | 10 ms |
| `/about/` | 100 | 100 | 100 | 100 | 0.9 s | 0 | 10 ms |
| `/speaking/` | 100 | 100 | 100 | 100 | 0.9 s | 0 | 10 ms |
| `/silent-screams/` | 100 | 100 | 100 | 100 | 0.9 s | 0 | 10 ms |
| `/blog/` | 96 | 100 | 100 | 100 | 2.7 s | 0 | 20 ms |
| `/blog/[slug]/` (QA post) | 97 | 100 | 100 | 100 | 2.6 s | 0 | 10 ms |
| `/contact/` | 100 | 100 | 100 | 100 | 0.9 s | 0 | 10 ms |
| `/privacy-policy/` | 100 | 100 | 100 | 69 | 0.9 s | 0 | 10 ms |

- Privacy Policy SEO is 69 **by design**: the page is `noindex` until the client's policy text is added. It becomes indexable automatically once the text is saved.
- Localhost has no network latency. Scores on Vercel with real photographs will be lower and must be re-measured on the staging URL before launch.
- Issues found and fixed during this pass: Payload's `Critical-CH` header made browsers load every page twice (now limited to `/admin`); the footer label failed contrast; blog filter links used `aria-pressed`; the load animation hid text (hurting LCP).

## Responsive

All 9 routes (including a 404) at 320, 375, 390, 768, 1024, 1440 and 1920 px: no horizontal scrolling (63 checks). At 390 px every page has one H1, no skipped heading levels, no broken images, no design notes or `[ADD]/[CONFIRM]` text in the public view, the header "Invite Nandita to Speak" button visible, and every primary CTA links to `/contact/`.

## Functional

| Check | Result |
|---|---|
| Every route returns 200; unknown URLs and missing posts return 404 | Pass |
| `/about` → `/about/` (308), `/book` → `/silent-screams/` | Pass |
| `robots.txt` blocks all outside production; `sitemap.xml` lists pages and published posts | Pass |
| RSS at `/blog/rss.xml` lists published posts only | Pass |
| Title, description, canonical, Open Graph and JSON-LD in the HTML source | Pass |
| Enquiry: empty form shows three field errors and focuses Name | Pass (browser) |
| Enquiry: valid submission saved once, thank-you shown | Pass (browser + API) |
| Enquiry: duplicate submit (same id) not saved twice | Pass |
| Enquiry: honeypot filled, or sent in under 2.5 s, answered as success and not saved | Pass |
| Enquiry: 6th enquiry from one IP within an hour gets 429 | Pass |
| Enquiry: without email settings the enquiry is still saved and marked `not-configured` | Pass |
| Public REST: read or create enquiries without signing in | Denied (403) |
| Admin: first user can be created once; a second "first user" is refused | Pass |
| Admin: list enquiries, change status, export CSV (all / by status); CSV denied when signed out | Pass |
| Blog: published posts show; a post scheduled for the future does not appear on the index, RSS or its URL | Pass |
| Mobile menu: opens, closes on Escape, returns focus, CTA stays visible | Pass |

## Not yet tested (needs client accounts or devices)

- Real email delivery (Resend) and the visitor acknowledgement
- Turnstile verification
- GA4 events in DebugView
- Postgres migrations and media uploads to Vercel Blob
- Safari, Firefox, Edge, iOS and Android devices; 200% zoom
- Backup and restore
