import { useEffect } from 'react'

const SITE = 'https://nanditaspeaks.in'

function setMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/**
 * Manage per-page title, meta description, Open Graph tags,
 * canonical URL and JSON-LD structured data for this SPA.
 */
export function useSeo({ title, description, path = '/', jsonLd }) {
  useEffect(() => {
    if (title) document.title = title
    setMeta('name', 'description', description)

    // Open Graph
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:url', SITE + path)
    setMeta('name', 'twitter:card', 'summary_large_image')

    // Canonical
    let link = document.head.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
    }
    link.setAttribute('href', SITE + path)

    // JSON-LD
    const scriptId = 'page-jsonld'
    let script = document.getElementById(scriptId)
    if (jsonLd) {
      if (!script) {
        script = document.createElement('script')
        script.type = 'application/ld+json'
        script.id = scriptId
        document.head.appendChild(script)
      }
      script.textContent = JSON.stringify(jsonLd)
    } else if (script) {
      script.remove()
    }
  }, [title, description, path, jsonLd])
}

export const schema = {
  home: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        name: 'Nandita Thakur',
        url: SITE + '/',
        jobTitle: 'Motivational Speaker for Women',
        description: 'Nandita Thakur is a motivational speaker for women, an entrepreneur and the author of Silent Screams.',
      },
      { '@type': 'WebSite', name: 'Nandita Speaks', url: SITE + '/' },
    ],
  },
  speaking: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: "Keynotes and motivational talks for women's events",
    serviceType: 'Keynote speaking',
    description: "Keynotes and motivational talks by Nandita Thakur on rebuilding self-belief after life's setbacks, for women's events, communities and company sessions.",
    url: SITE + '/speaking/',
    provider: { '@type': 'Person', name: 'Nandita Thakur', url: SITE + '/' },
  },
  about: {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: 'Nandita Thakur',
      url: SITE + '/about/',
      jobTitle: 'Motivational Speaker for Women',
      description: 'Nandita Thakur is a speaker for women, an entrepreneur and the author of Silent Screams.',
      knowsAbout: ['Self-belief', "Women's independence", 'Rebuilding after setbacks'],
    },
  },
  book: {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: 'Silent Screams',
    author: { '@type': 'Person', name: 'Nandita Thakur' },
    url: SITE + '/silent-screams/',
    bookFormat: 'https://schema.org/EBook',
  },
}
