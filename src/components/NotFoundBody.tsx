import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import '@/styles/notfound.css'

export function NotFoundBody() {
  return (
    <div className="pg-notfound">
      <section className="nf" aria-labelledby="nf-h1">
        <div className="wrap">
          <div className="t load-in">
            <p className="code">Error 404</p>
            <h1 id="nf-h1">This page could not be found.</h1>
            <p className="lede muted">The link may be old, or the address may have a typo.</p>
            <nav aria-label="Helpful pages">
              <Link href="/">Home <span aria-hidden="true">&rarr;</span></Link>
              <Link href="/speaking/">Speaking <span aria-hidden="true">&rarr;</span></Link>
              <Link href="/contact/" data-cta="404">Invite Nandita to Speak <span aria-hidden="true">&rarr;</span></Link>
            </nav>
          </div>
          <Image className="mark" src="/brand/web/mark-copper.png" alt="" width={949} height={569} />
        </div>
      </section>
    </div>
  )
}
