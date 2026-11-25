import { notFound } from 'next/navigation'
import React from 'react'
import '@/styles/article.css'
import { Article, type FullPost } from '@/components/Article'
import { getPhotos, getPostBySlug, getPosts, payload } from '@/lib/cms'
import { pageMetadata } from '@/lib/site'

export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams() {
  try {
    const p = await payload()
    const res = await p.find({ collection: 'posts', where: { and: [{ _status: { equals: 'published' } }, { publishedAt: { less_than_equal: new Date().toISOString() } }] }, limit: 200, depth: 0, select: { slug: true } as never })
    return res.docs.map((d) => ({ slug: (d as unknown as { slug: string }).slug }))
  } catch {
    return []
  }
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = (await getPostBySlug(slug)) as FullPost | null
  if (!post) return { title: 'Post not found', robots: { index: false } }
  const meta = pageMetadata({
    title: post.seo?.title || `${post.title} | Nandita Thakur`,
    description: post.seo?.description || post.excerpt,
    path: `/blog/${post.slug}/`,
    image: post.seo?.image?.url || post.featuredImage?.url,
  })
  return { ...meta, openGraph: { ...meta.openGraph, type: 'article' as const, publishedTime: post.publishedAt, authors: ['Nandita Thakur'] } }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = (await getPostBySlug(slug)) as FullPost | null
  if (!post) notFound()
  const [photos, sameCat] = await Promise.all([getPhotos(), getPosts({ limit: 4, category: post.category?.slug })])
  const related = sameCat.docs.filter((p) => p.slug !== post.slug).slice(0, 3)
  return <Article post={post} related={related} authorPhoto={photos.authorPhoto} />
}
