import React from 'react'
import '@/styles/contact.css'
import { EnquiryForm } from '@/components/EnquiryForm'
import { Note } from '@/components/ui'
import { getContact, getSettings } from '@/lib/cms'
import { pageMetadata } from '@/lib/site'

export const revalidate = 3600

export async function generateMetadata() {
  const [c, s] = await Promise.all([getContact(), getSettings()])
  return pageMetadata({ title: c.seo.title, description: c.seo.description, path: '/contact/', image: s.shareImage?.url })
}

export default async function ContactPage() {
  const [c, s] = await Promise.all([getContact(), getSettings()])
  const hasDetails = Boolean(s.email || s.phone || s.location || s.socials.length)
  return (
    <div className="pg-contact">
      <div className="c-split">
        <section className="c-side" aria-labelledby="ct-h1">
          <div className="stack load-in" style={{ gap: 28 }}>
            <h1 id="ct-h1">{c.h1}</h1>
            <p className="lede">{c.intro}</p>
            <Note label="Copy">Contact page copy is not supplied yet. These lines reuse approved sentences from the Home page and FAQ.</Note>
          </div>
          <div className="inc">
            <h2>{c.includeHeading}</h2>
            <ul>{c.include.map((i) => <li key={i}>{i}</li>)}</ul>
          </div>
        </section>

        <section className="c-main" aria-label="Speaking enquiry form">
          <EnquiryForm thanksHeading={c.thanksHeading} thanksText={c.thanksText} replyTime={s.replyTime} siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || undefined} />
          {hasDetails ? (
            <div className="details">
              <h2 className="h3">Contact details</h2>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 8 }}>
                {s.email ? <li><a className="tl" href={`mailto:${s.email}`}>{s.email}</a></li> : null}
                {s.phone ? <li><a className="tl" href={`tel:${s.phone.replace(/\s+/g, '')}`}>{s.phone}</a></li> : null}
                {s.location ? <li>{s.location}</li> : null}
                {s.socials.map((x) => <li key={x.url}><a className="tl" href={x.url} target="_blank" rel="noopener noreferrer me">{x.label}</a></li>)}
              </ul>
            </div>
          ) : (
            <Note label="Hidden">Email, phone, location and social links appear here once they are added and switched on under Settings › Contact and social.</Note>
          )}
        </section>
      </div>
    </div>
  )
}
