import { RichText } from '@payloadcms/richtext-lexical/react'
import Link from 'next/link'
import React from 'react'
import { PostCards } from '@/components/PostCards'
import { Arrow, CtaButton, JsonLd, Photo } from '@/components/ui'
import { SITE } from '@/content/defaults'
import type { PostCard } from '@/lib/cms'
import { absoluteUrl, formatDate } from '@/lib/site'

type Media = { url?: string | null; alt?: string | null } | null
export type FullPost = PostCard & { content: unknown; updatedAt: string; seo?: { title?: string; description?: string; image?: Media } }

/** Plain text from Lexical JSON, for reading time. */
function textOf(node: unknown): string {
  if (!node || typeof node !== 'object') return ''
  const n = node as { text?: string; children?: unknown[]; root?: unknown }
  if (n.root) return textOf(n.root)
  return (n.text || '') + ' ' + (n.children || []).map(textOf).join(' ')
}

export const readingMinutes = (content: unknown) => Math.max(1, Math.round(textOf(content).split(/\s+/).filter(Boolean).length / 200))

export function Article({ post, related, authorPhoto }: { post: FullPost; related: PostCard[]; authorPhoto: Media }) {
  const mins = readingMinutes(post.content)
  const ld: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.seo?.description || post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { '@type': 'Person', name: SITE.person, url: absoluteUrl('/about/') },
    publisher: { '@type': 'Person', name: SITE.person, url: absoluteUrl('/') },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}/`),
  }
  if (post.featuredImage?.url) ld.image = absoluteUrl(post.featuredImage.url)

  return (
    <div className="pg-article">
      <JsonLd data={ld} />
      <article>
        <header className="a-head">
          <div className="wrap">
            <div className="t load-in">
              <nav className="crumbs" aria-label="Breadcrumb">
                <Link href="/blog/">Blog</Link>
                {post.category ? <><span aria-hidden="true">/</span><Link href={`/blog/?category=${post.category.slug}`}>{post.category.title}</Link></> : null}
              </nav>
              <h1 className="page-title">{post.title}</h1>
              <div className="a-meta">
                {post.category ? <span className="cat">{post.category.title}</span> : null}
                <span>By <b>{SITE.person}</b></span>
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                <span>{mins} min read</span>
              </div>
            </div>
          </div>
        </header>
        <div className="wrap">
          <div className="a-img"><Photo media={post.featuredImage} slot="Featured image" ratio="16 / 9" priority sizes="(max-width: 1120px) 100vw, 1120px" /></div>
        </div>
        <div className="band">
          <div className="wrap">
            <div className="rich">
              <RichText data={post.content as never} />
            </div>
            <aside className="author" aria-label="About the author">
              <Photo media={authorPhoto} slot="" ratio="1 / 1" sizes="96px" />
              <div className="stack" style={{ gap: 8 }}>
                <p style={{ fontFamily: 'var(--display)', fontSize: 22 }}>{SITE.person}</p>
                <p className="muted small">Nandita Thakur is a motivational speaker for women, an entrepreneur and the author of <i>Silent Screams</i>.</p>
                <Link className="link" href="/about/" style={{ alignSelf: 'flex-start', fontSize: 14 }}>About Nandita <Arrow /></Link>
              </div>
            </aside>
            <div style={{ maxWidth: 'var(--measure)', margin: '40px auto 0' }}><CtaButton where="article" /></div>
          </div>
        </div>
      </article>
      {related.length ? (
        <section className="band on-stone" aria-labelledby="rel-h">
          <div className="wrap stack" style={{ gap: 40 }}>
            <h2 id="rel-h">More from this category</h2>
            <PostCards posts={related} />
          </div>
        </section>
      ) : null}
    </div>
  )
}
