import Link from 'next/link'
import React from 'react'
import '@/styles/blog.css'
import { PostCards } from '@/components/PostCards'
import { Arrow, CtaBand, Note, Pending, Photo } from '@/components/ui'
import { CTA_LINE } from '@/content/defaults'
import { getBlogPage, getCategories, getPosts, getSettings } from '@/lib/cms'
import { formatDate, pageMetadata } from '@/lib/site'

export const revalidate = 3600

type Props = { searchParams: Promise<{ category?: string; page?: string }> }

export async function generateMetadata({ searchParams }: Props) {
  const [b, s, sp] = await Promise.all([getBlogPage(), getSettings(), searchParams])
  const meta = pageMetadata({ title: b.seo.title, description: b.seo.description, path: '/blog/', image: s.shareImage?.url })
  // Filtered and paginated views point search engines at the main index.
  return sp.category || sp.page ? { ...meta, robots: { index: false, follow: true } } : meta
}

export default async function BlogIndex({ searchParams }: Props) {
  const sp = await searchParams
  const page = Math.max(1, Number(sp.page) || 1)
  const category = sp.category || undefined
  const [b, cats, list] = await Promise.all([getBlogPage(), getCategories(), getPosts({ limit: 9 * page, category })])
  const [featured, ...rest] = list.docs

  return (
    <div className="pg-blog">
      <section className="masthead" aria-labelledby="bl-h1">
        <div className="wrap load-in">
          <h1 id="bl-h1">{b.h1}</h1>
          <div className="intro stack" style={{ gap: 14 }}>
            <p className="lede muted">{b.intro || <Pending>one-line introduction (Blog page copy not yet supplied)</Pending>}</p>
          </div>
        </div>
      </section>

      {!list.docs.length ? (
        <section className="band">
          <div className="wrap stack" style={{ gap: 20, maxWidth: 760 }}>
            <p className="lede">{category ? 'There are no posts in this category yet.' : 'The first posts are on their way.'}</p>
            {category ? <Link className="link" href="/blog/" style={{ alignSelf: 'flex-start' }}>See all posts <Arrow /></Link> : null}
            <Note label="Launch rule">The blog must not launch empty. Publish the first posts under Blog › Posts.</Note>
          </div>
        </section>
      ) : (
        <>
          {featured && page === 1 ? (
            <section aria-label="Featured post">
              <div className="wrap">
                <Link className="featured" href={`/blog/${featured.slug}/`}>
                  <Photo media={featured.featuredImage} slot="Featured image" ratio="3 / 2" priority sizes="(max-width: 767px) 100vw, 55vw" />
                  <div className="ft">
                    <div className="meta">{featured.category ? <span>{featured.category.title}</span> : null}<time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt)}</time></div>
                    <h2>{featured.title}</h2>
                    <p className="muted">{featured.excerpt}</p>
                    <span className="link" style={{ alignSelf: 'flex-start' }}>Read More <Arrow /></span>
                  </div>
                </Link>
              </div>
            </section>
          ) : null}

          <section className="band on-stone" aria-labelledby="all-h">
            <div className="wrap stack" style={{ gap: 40 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'end', gap: 24 }}>
                <h2 id="all-h" className="h3">All posts</h2>
                {cats.length ? (
                  <nav className="filters" aria-label="Filter posts by category">
                    <Link className="chip" href="/blog/" aria-current={!category ? 'page' : undefined}>All</Link>
                    {cats.map((c) => (
                      <Link key={c.slug} className="chip" href={`/blog/?category=${c.slug}`} aria-current={category === c.slug ? 'page' : undefined}>{c.title}</Link>
                    ))}
                  </nav>
                ) : null}
              </div>
              {rest.length ? <PostCards posts={rest} /> : <p className="muted">More posts will appear here.</p>}
              {list.hasNextPage ? (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Link className="btn btn--ghost" href={`/blog/?${new URLSearchParams({ ...(category ? { category } : {}), page: String(page + 1) })}`} scroll={false}>Load more posts</Link>
                </div>
              ) : null}
            </div>
          </section>
        </>
      )}

      <CtaBand heading="Invite Nandita to speak" line={CTA_LINE} />
    </div>
  )
}
