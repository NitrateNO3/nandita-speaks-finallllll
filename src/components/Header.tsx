'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { NAV } from '@/content/nav'


const isCurrent = (path: string, href: string) => (href === '/' ? path === '/' : path.startsWith(href))

export function Header() {
  const path = usePathname() || '/'
  const [open, setOpen] = useState(false)
  const btn = useRef<HTMLButtonElement>(null)
  const firstLink = useRef<HTMLAnchorElement>(null)

  useEffect(() => setOpen(false), [path])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (open) firstLink.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false)
        btn.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="wrap">
          <Link className="brand" href="/" aria-label="Nandita Speaks, home">
            <Image src="/brand/web/logo-ivory.png" alt="Nandita Speaks" width={1073} height={753} priority sizes="90px" />
          </Link>
          <nav className="nav" aria-label="Main">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} aria-current={isCurrent(path, n.href) ? 'page' : undefined}>{n.label}</Link>
            ))}
          </nav>
          <Link className="btn btn--light btn--sm header-cta" href="/contact/" data-cta="header">Invite Nandita to Speak</Link>
          <button
            ref={btn}
            className="menu-btn"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
          </button>
        </div>
      </header>
      <div className="mobile-menu" id="mobile-menu" hidden={!open}>
        <div className="wrap">
          <nav aria-label="Mobile">
            {NAV.map((n, i) => (
              <Link
                key={n.href}
                ref={i === 0 ? firstLink : undefined}
                className="m-link"
                href={n.href}
                aria-current={isCurrent(path, n.href) ? 'page' : undefined}
                onClick={() => setOpen(false)}
              >
                {n.label}
                <small>{String(i + 1).padStart(2, '0')}</small>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}
