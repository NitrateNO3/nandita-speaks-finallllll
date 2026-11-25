import { headers } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import React from 'react'
import '@/styles/article.css'
import { Article, type FullPost } from '@/components/Article'
import { getPhotos, getPostBySlug, payload } from '@/lib/cms'

/** Draft preview for signed-in admin users. Never cached, never indexed. */
export const dynamic = 'force-dynamic'
export const metadata = { title: 'Draft preview', robots: { index: false, follow: false } }

export default async function PreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = await payload()
  const { user } = await p.auth({ headers: await headers() })
  if (!user) redirect(`/admin/login?redirect=${encodeURIComponent(`/blog-preview/${slug}/`)}`)
  const post = (await getPostBySlug(slug, true)) as FullPost | null
  if (!post) notFound()
  const photos = await getPhotos()
  return (
    <>
      <p className="note" style={{ borderRadius: 0, justifyContent: 'center' }}><b>Draft preview</b><span>Only signed-in editors can see this page.</span></p>
      <Article post={post} related={[]} authorPhoto={photos.authorPhoto} />
    </>
  )
}
