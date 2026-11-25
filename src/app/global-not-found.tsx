import type { Metadata } from 'next'
import { Manrope, Marcellus } from 'next/font/google'
import React from 'react'
import '@/styles/base.css'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { NotFoundBody } from '@/components/NotFoundBody'

const marcellus = Marcellus({ subsets: ['latin'], weight: '400', variable: '--font-marcellus', display: 'swap' })
const manrope = Manrope({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-manrope', display: 'swap' })

export const metadata: Metadata = { title: 'Page not found | Nandita Speaks', robots: { index: false, follow: true } }

/** Served with a real 404 status for any URL that matches no route. */
export default function GlobalNotFound() {
  return (
    <html lang="en-IN" className={`${marcellus.variable} ${manrope.variable}`}>
      <body>
        <Header />
        <main id="main"><NotFoundBody /></main>
        <Footer settings={{ email: '', phone: '', location: '', socials: [], replyTime: '', notifyEmails: '', shareImage: null }} />
      </body>
    </html>
  )
}
