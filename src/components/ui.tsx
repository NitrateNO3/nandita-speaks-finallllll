import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { SITE } from '@/content/defaults'
import { showPreviewNotes } from '@/lib/site'

/** Renders *italic* and [label](/path/) inside approved copy. Nothing else is interpreted. */
export function Inline({ text }: { text: string }) {
  const parts: React.ReactNode[] = []
  const re = /\[([^\]]+)\]\(([^)\s]+)\)|\*([^*]+)\*/g
  let last = 0
  let m: RegExpExecArray | null
  let i = 0
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    if (m[1]) {
      const href = m[2]
      const internal = href.startsWith('/')
      parts.push(
        internal ? (
          <Link key={i++} className="tl" href={href}>{m[1]}</Link>
        ) : (
          <a key={i++} className="tl" href={href} target="_blank" rel="noopener noreferrer">{m[1]}</a>
        ),
      )
    } else parts.push(<i key={i++}>{m[3]}</i>)
    last = m.index + m[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return <>{parts}</>
}

/** Design note: private preview only. */
export function Note({ label, children, className = '' }: { label: string; children: React.ReactNode; className?: string }) {
  if (!showPreviewNotes) return null
  return (
    <p className={`note small ${className}`}>
      <b>{label}</b>
      <span>{children}</span>
    </p>
  )
}

/** Inline marker for copy the client still has to supply: private preview only. */
export function Pending({ children }: { children: React.ReactNode }) {
  if (!showPreviewNotes) return null
  return <span className="pending">{children}</span>
}

/** A section that is hidden from visitors; in the private preview it shows as a labelled strip. */
export function HiddenSection({ children }: { children: React.ReactNode }) {
  if (!showPreviewNotes) return null
  return (
    <div className="hidden-section">
      <div className="wrap">
        <p className="note"><b>Hidden section</b><span>{children}</span></p>
      </div>
    </div>
  )
}

type Media = { url?: string | null; alt?: string | null; width?: number | null; height?: number | null } | null | undefined

/** Payload returns absolute URLs (and a trailing slash with trailingSlash on). Local files become root-relative. */
export function mediaSrc(url: string) {
  const site = (process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/$/, '')
  let u = url
  if (site && u.startsWith(site)) u = u.slice(site.length)
  else if (/^https?:\/\/localhost(:\d+)?\//.test(u)) u = u.replace(/^https?:\/\/localhost(:\d+)?/, '')
  return u.replace(/(\.[a-z0-9]{2,5})\/$/i, '$1')
}

/**
 * A real photograph from the CMS. Without one, production renders nothing,
 * and the private preview shows a labelled slot with the required alt text.
 */
export function Photo({
  media,
  slot,
  alt,
  ratio = '4 / 5',
  dark = false,
  priority = false,
  sizes = '(max-width: 767px) 100vw, 45vw',
  fill = false,
  className = '',
  brandFallback = false,
}: {
  media: Media
  slot: string
  alt?: string
  ratio?: string
  dark?: boolean
  priority?: boolean
  sizes?: string
  fill?: boolean
  className?: string
  /** Until a photo exists, show the approved emblem (decorative) instead of leaving a hole in the layout. */
  brandFallback?: boolean
}) {
  if (media?.url) {
    const a = media.alt || alt || ''
    return (
      <figure className={`photo ${dark ? 'photo--dark' : ''} ${className}`} style={fill ? { height: '100%' } : { aspectRatio: ratio }}>
        <Image src={mediaSrc(media.url)} alt={a} fill sizes={sizes} priority={priority} style={{ objectFit: 'cover' }} />
      </figure>
    )
  }
  if (!showPreviewNotes) {
    if (!brandFallback) return null
    return (
      <div className={`photo-brand ${dark ? 'photo-brand--dark' : ''} ${className}`} style={fill ? { height: '100%' } : { aspectRatio: ratio }} aria-hidden="true">
        <Image src="/brand/web/mark-copper.png" alt="" width={949} height={569} sizes="220px" />
      </div>
    )
  }
  return (
    <figure className={`ph ${dark ? 'ph--dark' : ''} ${className}`} style={fill ? { height: '100%' } : { aspectRatio: ratio }} aria-label={alt || slot}>
      <Image className="ph-mark" src={dark ? '/brand/web/mark-ivory.png' : '/brand/web/mark-copper.png'} alt="" width={949} height={569} sizes="180px" />
      <figcaption>
        <b>{slot}</b>Awaiting Nandita&rsquo;s real photograph. Upload it under Pages › Photographs.
        {alt ? <><br />Alt: &ldquo;{alt}&rdquo;</> : null}
      </figcaption>
    </figure>
  )
}

export function CtaBand({ heading, line, extra }: { heading: string; line: string; extra?: React.ReactNode }) {
  return (
    <section className="cta-band" aria-labelledby="cta-h">
      <div className="wrap">
        <div className="stack" style={{ gap: 22 }}>
          <Image className="cta-mark" src="/brand/web/mark-copper.png" alt="" width={949} height={569} sizes="120px" style={{ marginBottom: 6 }} />
          <h2 id="cta-h" className="page-title" style={{ maxWidth: '12em' }}>{heading}</h2>
          <p className="lede muted" style={{ maxWidth: '30em' }}>{line}</p>
          {extra}
        </div>
        <Link className="btn btn--light" href="/contact/" data-cta="band">{SITE.cta}</Link>
      </div>
    </section>
  )
}

export function CtaButton({ light = false, where }: { light?: boolean; where: string }) {
  return (
    <Link className={`btn ${light ? 'btn--light' : ''}`} href="/contact/" data-cta={where}>
      {SITE.cta}
    </Link>
  )
}

export function Arrow() {
  return <span aria-hidden="true">&rarr;</span>
}

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
}
