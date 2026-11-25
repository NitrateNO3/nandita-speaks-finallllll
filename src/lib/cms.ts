import 'server-only'
import config from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'
import { ABOUT, BLOG, BOOK, CONTACT, HOME, SPEAKING } from '@/content/defaults'
import { mergeDefaults } from '@/globals/fromDefaults'

export const payload = cache(async () => getPayload({ config }))

type Media = { url?: string | null; alt?: string | null; width?: number | null; height?: number | null; sizes?: Record<string, { url?: string | null; width?: number | null; height?: number | null }> } | null

/** Reads a global; never throws (a missing database falls back to the approved Page Copy). */
async function readGlobal(slug: string): Promise<Record<string, unknown> | null> {
  try {
    const p = await payload()
    return (await p.findGlobal({ slug: slug as never, depth: 1 })) as unknown as Record<string, unknown>
  } catch (err) {
    console.error(`[cms] could not read global "${slug}":`, (err as Error).message)
    return null
  }
}

export const getHome = cache(async () => mergeDefaults(HOME, await readGlobal('home-page')))
export const getAbout = cache(async () => mergeDefaults(ABOUT, await readGlobal('about-page')))
export const getSpeaking = cache(async () => mergeDefaults(SPEAKING, await readGlobal('speaking-page')))
export const getContact = cache(async () => mergeDefaults(CONTACT, await readGlobal('contact-page')))
export const getBlogPage = cache(async () => mergeDefaults({ seo: BLOG.seo, h1: BLOG.h1, intro: BLOG.intro }, await readGlobal('blog-page')))

export const getBook = cache(async () => {
  const g = await readGlobal('book')
  return {
    ...mergeDefaults(BOOK, g),
    cover: (g?.cover as Media) || null,
    synopsis: (g?.synopsis as string) || '',
    purchaseUrl: (g?.purchaseUrl as string) || '',
    purchaseConfirmed: Boolean(g?.purchaseConfirmed),
  }
})

export const getPhotos = cache(async () => {
  const g = (await readGlobal('photos')) || {}
  return {
    heroPortrait: (g.heroPortrait as Media) || null,
    homeWhy: (g.homeWhy as Media) || null,
    homeStory: (g.homeStory as Media) || null,
    aboutPortrait: (g.aboutPortrait as Media) || null,
    aboutStory: ((g.aboutStory as Media[]) || []).filter(Boolean),
    bioPhoto: (g.bioPhoto as Media) || null,
    authorPhoto: (g.authorPhoto as Media) || null,
  }
})

export type Settings = {
  email: string
  phone: string
  location: string
  socials: { label: string; url: string }[]
  replyTime: string
  notifyEmails: string
  shareImage: Media
}

export const getSettings = cache(async (): Promise<Settings> => {
  const g = (await readGlobal('site-settings')) || {}
  return {
    email: g.showEmail && g.contactEmail ? String(g.contactEmail) : '',
    phone: g.showPhone && g.phone ? String(g.phone) : '',
    location: g.showLocation && g.location ? String(g.location) : '',
    socials: ((g.socials as { label: string; url: string }[]) || []).filter((s) => s?.url && /^https:\/\//.test(s.url)),
    replyTime: (g.replyTime as string) || '',
    notifyEmails: (g.notifyEmails as string) || '',
    shareImage: (g.shareImage as Media) || null,
  }
})

export type PostCard = {
  id: string | number
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  category: { title: string; slug: string } | null
  featuredImage: Media
}

const publishedWhere = (extra: Record<string, unknown> = {}) => ({
  and: [{ _status: { equals: 'published' } }, { publishedAt: { less_than_equal: new Date().toISOString() } }, extra],
})

export async function getPosts({ limit = 9, page = 1, category }: { limit?: number; page?: number; category?: string } = {}) {
  try {
    const p = await payload()
    const res = await p.find({
      collection: 'posts',
      where: publishedWhere(category ? { 'category.slug': { equals: category } } : {}) as never,
      sort: '-publishedAt',
      limit,
      page,
      depth: 1,
      overrideAccess: false,
    })
    return { docs: res.docs as unknown as PostCard[], totalDocs: res.totalDocs, hasNextPage: res.hasNextPage }
  } catch (err) {
    console.error('[cms] posts:', (err as Error).message)
    return { docs: [] as PostCard[], totalDocs: 0, hasNextPage: false }
  }
}

export async function getPostBySlug(slug: string, draft = false) {
  try {
    const p = await payload()
    const res = await p.find({
      collection: 'posts',
      where: draft ? { slug: { equals: slug } } : (publishedWhere({ slug: { equals: slug } }) as never),
      draft,
      limit: 1,
      depth: 2,
      overrideAccess: draft,
    })
    return (res.docs[0] as unknown as PostCard & { content: unknown; seo?: { title?: string; description?: string; image?: Media }; updatedAt: string }) || null
  } catch {
    return null
  }
}

export async function getCategories() {
  try {
    const p = await payload()
    const res = await p.find({ collection: 'categories', sort: 'order', limit: 50, depth: 0 })
    return res.docs as unknown as { id: string | number; title: string; slug: string }[]
  } catch {
    return []
  }
}

export async function getLegal() {
  const g = await readGlobal('legal')
  return { privacy: (g?.privacyPolicy as unknown) || null, updated: (g?.privacyUpdated as string) || '' }
}
