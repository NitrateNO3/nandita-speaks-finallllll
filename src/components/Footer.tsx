import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { SITE } from '@/content/defaults'
import type { Settings } from '@/lib/cms'
import { NAV } from '@/content/nav'
import { Note } from './ui'

export function Footer({ settings }: { settings: Settings }) {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="stack" style={{ gap: 28 }}>
            <Image src="/brand/web/logo-ivory.png" alt="Nandita Speaks" width={1073} height={753} sizes="150px" style={{ alignSelf: 'flex-start', width: 'auto' }} />
            <p style={{ maxWidth: '26em', color: 'var(--muted-dark)' }}>{SITE.footerLine}</p>
          </div>
          <nav className="footer-nav" aria-label="Footer">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href}>{n.label}</Link>
            ))}
            <Link href="/privacy-policy/">Privacy Policy</Link>
          </nav>
          <div className="stack" style={{ gap: 20, alignItems: 'flex-start' }}>
            <p className="label">Speaking enquiries</p>
            <Link className="btn btn--light" href="/contact/" data-cta="footer">{SITE.cta}</Link>
            {settings.email ? <a className="tl" href={`mailto:${settings.email}`} style={{ color: 'var(--ivory)' }}>{settings.email}</a> : null}
            {settings.socials.length ? (
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexWrap: 'wrap', gap: '8px 20px' }}>
                {settings.socials.map((s) => (
                  <li key={s.url}><a className="tl" href={s.url} target="_blank" rel="noopener noreferrer me" style={{ color: 'var(--muted-dark)' }}>{s.label}</a></li>
                ))}
              </ul>
            ) : null}
            {!settings.email || !settings.socials.length ? (
              <Note label="Hidden">Enquiry email and social links appear here once they are added under Settings › Contact and social.</Note>
            ) : null}
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Nandita Thakur. All rights reserved.</span>
          <Link href="/privacy-policy/">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  )
}
