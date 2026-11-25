'use client'
import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

/** Send a GA4 event. Never pass names, emails or message text. */
export function track(event: string, params: Record<string, string | number> = {}) {
  window.gtag?.('event', event, params)
}

/**
 * GA4 (only when NEXT_PUBLIC_GA_ID is set), CTA click tracking, and the reveal-on-scroll motion.
 * Content is visible by default; only elements below the fold at load get the reveal treatment.
 */
export function SiteScripts({ gaId }: { gaId?: string }) {
  const path = usePathname()

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>('[data-cta],[data-event]')
      if (!el) return
      if (el.dataset.cta) track('invite_nandita_click', { location: el.dataset.cta, page: location.pathname })
      if (el.dataset.event) track(el.dataset.event, { page: location.pathname })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
    const vh = window.innerHeight
    const els = Array.from(document.querySelectorAll<HTMLElement>('main section')).filter((el) => el.getBoundingClientRect().top > vh)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target) } }),
      { rootMargin: '0px 0px -8% 0px' },
    )
    els.forEach((el) => { el.classList.add('rv'); io.observe(el) })
    document.documentElement.classList.add('js-reveal')
    return () => io.disconnect()
  }, [path])

  if (!gaId) return null
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
      </Script>
    </>
  )
}
