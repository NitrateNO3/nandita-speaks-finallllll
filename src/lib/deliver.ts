import 'server-only'
import type { Payload } from 'payload'
import type { Settings } from './cms'
import { sendEnquiryEmails } from './email'

type Doc = { id: string | number; name: string; organisation?: string; email: string; timing?: string; location?: string; audience?: string; message: string; emailAttempts?: number }

/** Sends both emails for a saved enquiry and records the outcome on it. Used by the form and the retry job. */
export async function deliverEnquiryEmails(p: Payload, doc: Doc, settings: Settings) {
  const notify = (settings.notifyEmails || process.env.ENQUIRY_NOTIFY_TO || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  let emailStatus: 'sent' | 'failed' | 'not-configured' = 'sent'
  let emailError = ''
  try {
    if (!notify.length) {
      emailStatus = 'not-configured'
      emailError = 'No notification address set'
    } else {
      const { team, visitor } = await sendEnquiryEmails(doc, notify, settings.replyTime)
      if (!team.ok || !visitor.ok) {
        const notConfigured = (!team.ok && team.notConfigured) || (!visitor.ok && visitor.notConfigured)
        emailStatus = notConfigured ? 'not-configured' : 'failed'
        emailError = [!team.ok && `team: ${team.error}`, !visitor.ok && `visitor: ${visitor.error}`].filter(Boolean).join('; ')
      }
    }
  } catch (err) {
    emailStatus = 'failed'
    emailError = (err as Error).message.slice(0, 200)
  }
  if (emailStatus !== 'sent') console.error(`[enquiry ${doc.id}] email ${emailStatus}: ${emailError}`)
  await p.update({
    collection: 'enquiries',
    id: doc.id,
    overrideAccess: true,
    data: { emailStatus, emailError, emailAttempts: (doc.emailAttempts || 0) + 1 },
  })
  return emailStatus
}
