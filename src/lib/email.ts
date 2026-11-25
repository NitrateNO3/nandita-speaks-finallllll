import 'server-only'

type Enquiry = {
  id: string | number
  name: string
  organisation?: string | null
  email: string
  timing?: string | null
  location?: string | null
  audience?: string | null
  message: string
  createdAt?: string
}

const esc = (s: unknown) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

async function send(payload: { to: string[]; subject: string; html: string; text: string; reply_to?: string }) {
  const key = process.env.RESEND_API_KEY
  const from = process.env.EMAIL_FROM
  if (!key || !from) return { ok: false as const, notConfigured: true as const, error: 'Email is not configured' }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, ...payload }),
  })
  if (!res.ok) return { ok: false as const, notConfigured: false as const, error: `Resend ${res.status}` }
  return { ok: true as const }
}

const row = (k: string, v: unknown) =>
  v ? `<tr><td style="padding:6px 16px 6px 0;color:#5A534B;vertical-align:top">${k}</td><td style="padding:6px 0">${esc(v)}</td></tr>` : ''

/** Team notification and visitor acknowledgement. Both are attempted; the result says what happened. */
export async function sendEnquiryEmails(e: Enquiry, notifyTo: string[], replyTime: string) {
  const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://nanditaspeaks.in'
  const team = await send({
    to: notifyTo,
    reply_to: e.email,
    subject: `New speaking enquiry from ${e.name}${e.organisation ? `, ${e.organisation}` : ''}`,
    html: `<div style="font-family:Arial,sans-serif;font-size:15px;color:#171717">
<p>A new speaking enquiry was sent from the website.</p>
<table>${row('Name', e.name)}${row('Organisation', e.organisation)}${row('Email', e.email)}${row('Timing', e.timing)}${row('Location', e.location)}${row('Audience', e.audience)}</table>
<p style="white-space:pre-wrap;border-left:2px solid #B77B61;padding-left:12px">${esc(e.message)}</p>
<p><a href="${site}/admin/collections/enquiries/${e.id}">Open in the dashboard</a></p></div>`,
    text: `New speaking enquiry\n\nName: ${e.name}\nOrganisation: ${e.organisation || '-'}\nEmail: ${e.email}\nTiming: ${e.timing || '-'}\nLocation: ${e.location || '-'}\nAudience: ${e.audience || '-'}\n\n${e.message}\n\n${site}/admin/collections/enquiries/${e.id}`,
  })

  const visitor = await send({
    to: [e.email],
    subject: 'Your speaking enquiry to Nandita Thakur',
    html: `<div style="font-family:Arial,sans-serif;font-size:15px;color:#171717;line-height:1.6">
<p>Dear ${esc(e.name)},</p>
<p>Thank you for your enquiry. It has reached Nandita&rsquo;s team.${replyTime ? ` You can expect a reply ${esc(replyTime)}.` : ''}</p>
<p style="color:#5A534B">What you sent:</p>
<p style="white-space:pre-wrap;border-left:2px solid #B77B61;padding-left:12px">${esc(e.message)}</p>
<p>Nandita Speaks<br><a href="${site}">${site.replace(/^https?:\/\//, '')}</a></p></div>`,
    text: `Dear ${e.name},\n\nThank you for your enquiry. It has reached Nandita's team.${replyTime ? ` You can expect a reply ${replyTime}.` : ''}\n\nWhat you sent:\n${e.message}\n\nNandita Speaks\n${site}`,
  })

  return { team, visitor }
}
