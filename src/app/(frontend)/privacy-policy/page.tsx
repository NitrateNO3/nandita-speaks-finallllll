import { RichText } from '@payloadcms/richtext-lexical/react'
import Link from 'next/link'
import React from 'react'
import '@/styles/privacy-policy.css'
import { Note } from '@/components/ui'
import { getLegal } from '@/lib/cms'
import { formatDate, pageMetadata } from '@/lib/site'

export const revalidate = 3600

export async function generateMetadata() {
  const { privacy } = await getLegal()
  const meta = pageMetadata({ title: 'Privacy Policy | Nandita Speaks', description: 'How nanditaspeaks.in collects and uses the details sent through the speaking enquiry form.', path: '/privacy-policy/' })
  return privacy ? meta : { ...meta, robots: { index: false, follow: true } }
}

export default async function PrivacyPage() {
  const { privacy, updated } = await getLegal()
  return (
    <div className="pg-privacy-policy">
      <section className="pp-head" aria-labelledby="pp-h1">
        <div className="wrap stack load-in" style={{ gap: 20 }}>
          <h1 id="pp-h1" className="page-title">Privacy Policy</h1>
          {updated ? <p className="muted small">Last updated: {formatDate(updated)}</p> : null}
        </div>
      </section>
      <section style={{ paddingBottom: 'var(--section)' }}>
        <div className="wrap">
          <div className="pp" style={{ gridTemplateColumns: '1fr' }}>
            {privacy ? (
              <div className="rich" style={{ marginInline: 0 }}><RichText data={privacy as never} /></div>
            ) : (
              <div className="prose" style={{ gridColumn: '1 / -1' }}>
                <p>The full privacy policy is being prepared. Details sent through the <Link className="tl" href="/contact/">enquiry form</Link> are used only to reply to that enquiry.</p>
                <Note label="Pending">Policy text is to be supplied by the client and added under Pages › Privacy Policy. The holding line above needs client approval before launch.</Note>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
