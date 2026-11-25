import { createHash } from 'crypto'
import { NextResponse, type NextRequest } from 'next/server'
import { payload, getSettings } from '@/lib/cms'
import { deliverEnquiryEmails } from '@/lib/deliver'
import { enquirySchema, type FieldErrors } from '@/lib/enquiry'

export const dynamic = 'force-dynamic'

const MAX_BODY = 20_000
const RATE_LIMIT = 5 // enquiries per IP per hour
const MIN_FILL_MS = 2500 // faster than this is treated as a bot

const generic = (status: number, message = 'Your enquiry could not be sent. Please try again in a moment. Everything you typed is still in the form.') =>
  NextResponse.json({ ok: false, message }, { status, headers: { 'Cache-Control': 'no-store' } })

async function verifyTurnstile(token: string, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return true // not configured (local development); honeypot and rate limit still apply
  if (!token) return false
  const body = new URLSearchParams({ secret, response: token, remoteip: ip })
  const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body })
  const data = (await r.json().catch(() => ({}))) as { success?: boolean }
  return Boolean(data.success)
}

export async function POST(req: NextRequest) {
  const len = Number(req.headers.get('content-length') || 0)
  if (len > MAX_BODY) return generic(413)

  let raw: unknown
  try {
    raw = await req.json()
  } catch {
    return generic(400)
  }

  const parsed = enquirySchema.safeParse(raw)
  if (!parsed.success) {
    // A filled honeypot fails validation too; answer like a success so bots learn nothing.
    if ((raw as { website?: string })?.website) return NextResponse.json({ ok: true })
    const errors: FieldErrors = {}
    for (const issue of parsed.error.issues) {
      const k = issue.path[0] as keyof FieldErrors
      if (k && !errors[k]) errors[k] = issue.message
    }
    return NextResponse.json({ ok: false, errors, message: 'Please check the highlighted fields.' }, { status: 422 })
  }
  const d = parsed.data
  if (d.startedAt && Date.now() - d.startedAt < MIN_FILL_MS) return NextResponse.json({ ok: true })

  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || req.headers.get('x-real-ip') || 'unknown'
  if (!(await verifyTurnstile(d.turnstileToken, ip))) return generic(400, 'We could not confirm the form was sent by a person. Please reload the page and try again.')

  try {
    const p = await payload()
    const ipHash = createHash('sha256').update(`${ip}:${process.env.PAYLOAD_SECRET || 'local'}`).digest('hex').slice(0, 32)

    // Duplicate submit (double click, retry after a network error): same submission id, same result.
    const existing = await p.find({ collection: 'enquiries', where: { submissionId: { equals: d.submissionId } }, limit: 1, depth: 0, overrideAccess: true })
    if (existing.docs.length) return NextResponse.json({ ok: true })

    const since = new Date(Date.now() - 60 * 60 * 1000).toISOString()
    const recent = await p.count({ collection: 'enquiries', where: { and: [{ ipHash: { equals: ipHash } }, { createdAt: { greater_than: since } }] }, overrideAccess: true })
    if (recent.totalDocs >= RATE_LIMIT) return generic(429, 'Too many enquiries were sent from this connection. Please try again in an hour.')

    // 1. Persist first. The enquiry is safe from this point on.
    const doc = await p.create({
      collection: 'enquiries',
      overrideAccess: true,
      data: {
        name: d.name,
        organisation: d.organisation,
        email: d.email,
        timing: d.timing,
        location: d.location,
        audience: d.audience,
        message: d.message,
        submissionId: d.submissionId,
        ipHash,
        status: 'new',
        emailStatus: 'pending',
      },
    })

    // 2. Then notify the team and acknowledge the visitor. A failure here never loses the enquiry.
    const settings = await getSettings()
    await deliverEnquiryEmails(p, doc as never, settings)

    return NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (err) {
    console.error('[enquiry] failed:', (err as Error).message)
    return generic(500)
  }
}
