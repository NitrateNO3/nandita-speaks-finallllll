import { NextResponse, type NextRequest } from 'next/server'
import { getSettings, payload } from '@/lib/cms'
import { deliverEnquiryEmails } from '@/lib/deliver'

export const dynamic = 'force-dynamic'

/** Vercel Cron: retries enquiry emails that failed (up to 5 attempts). Protected by CRON_SECRET. */
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET
  if (!secret || req.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }
  const p = await payload()
  const settings = await getSettings()
  const { docs } = await p.find({
    collection: 'enquiries',
    where: { and: [{ emailStatus: { in: ['failed', 'pending'] } }, { emailAttempts: { less_than: 5 } }] },
    limit: 20,
    depth: 0,
    overrideAccess: true,
  })
  const results: Record<string, string> = {}
  for (const d of docs) results[String(d.id)] = await deliverEnquiryEmails(p, d as never, settings)
  return NextResponse.json({ retried: docs.length, results })
}
