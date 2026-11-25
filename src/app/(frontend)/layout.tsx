import type { Metadata, Viewport } from 'next'
import { Manrope, Marcellus } from 'next/font/google'
import React from 'react'
import '@/styles/base.css'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { SiteScripts } from '@/components/SiteScripts'
import { SITE } from '@/content/defaults'
import { getSettings } from '@/lib/cms'
import { isIndexable } from '@/lib/site'

const marcellus = Marcellus({ subsets: ['latin'], weight: '400', variable: '--font-marcellus', display: 'swap' })
const manrope = Manrope({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-manrope', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  applicationName: SITE.name,
  robots: isIndexable ? { index: true, follow: true } : { index: false, follow: false },
  formatDetection: { telephone: false },
  alternates: { types: { 'application/rss+xml': `${SITE.url}/blog/rss.xml` } },
}

export const viewport: Viewport = { themeColor: '#171717', width: 'device-width', initialScale: 1, viewportFit: 'cover' }

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings()
  return (
    <html lang="en-IN" className={`${marcellus.variable} ${manrope.variable}`}>
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer settings={settings} />
        <SiteScripts gaId={process.env.NEXT_PUBLIC_GA_ID || undefined} />
      </body>
    </html>
  )
}
