import Link from 'next/link'
import React from 'react'
import '@/styles/home.css'
import { PostCards } from '@/components/PostCards'
import { Faq } from '@/components/Faq'
import { Arrow, CtaBand, CtaButton, Inline, JsonLd, Note, Pending, Photo } from '@/components/ui'
import { ALT, SITE } from '@/content/defaults'
import { getBook, getHome, getPhotos, getPosts, getSettings } from '@/lib/cms'
import { absoluteUrl, pageMetadata } from '@/lib/site'

export const revalidate = 3600

export async function generateMetadata() {
  const [h, s] = await Promise.all([getHome(), getSettings()])
  return pageMetadata({ title: h.seo.title, description: h.seo.description, path: '/', image: s.shareImage?.url })
}

export default async function HomePage() {
  const [h, photos, book, posts, settings] = await Promise.all([getHome(), getPhotos(), getBook(), getPosts({ limit: 3 }), getSettings()])
  const display = h.displayLine.replace(/\s*your own\.$/, '')
  const hasYourOwn = display !== h.displayLine

  const person: Record<string, unknown> = {
    '@type': 'Person',
    name: SITE.person,
    url: absoluteUrl('/'),
    jobTitle: 'Motivational Speaker for Women',
    description: 'Nandita Thakur is a motivational speaker for women, an entrepreneur and the author of Silent Screams.',
  }
  if (photos.heroPortrait?.url) person.image = absoluteUrl(photos.heroPortrait.url)
  if (settings.socials.length) person.sameAs = settings.socials.map((s) => s.url)

  return (
    <div className="pg-home">
      <JsonLd data={{ '@context': 'https://schema.org', '@graph': [person, { '@type': 'WebSite', name: SITE.name, url: absoluteUrl('/') }] }} />

      <section className="hero" aria-labelledby="hero-h1">
        <div className="wrap">
          <div className="hero-grid">
            <div className="hero-text load-in">
              <h1 id="hero-h1" className="hero-h1">{h.h1}</h1>
              <p className="display">
                {hasYourOwn ? <>{display} <em>your own.</em></> : h.displayLine}
              </p>
              <p className="intro"><Inline text={h.intro} /></p>
              <p className="support">{h.supportLine}</p>
              <div className="actions">
                <CtaButton light where="hero" />
                <Link className="link" href="/about/">Read my story <Arrow /></Link>
              </div>
            </div>
            <div className="hero-img">
              <Photo media={photos.heroPortrait} slot="Hero portrait" alt={ALT.heroPortrait} ratio="auto" fill dark priority brandFallback sizes="(max-width: 767px) 100vw, 42vw" />
            </div>
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="why-h">
        <div className="wrap why">
          <div className="why-head sr"><h2 id="why-h">{h.whyHeading}</h2></div>
          <div className="why-img"><Photo media={photos.homeWhy} slot="Photograph" alt="Plain description of the photo, checked against it" /></div>
          <div className="why-text">
            {h.whyParagraphs.map((p, i) => (
              <p key={i} className={i === 0 ? 'first' : undefined}><Inline text={p} /></p>
            ))}
          </div>
        </div>
      </section>

      <section className="band on-stone" aria-labelledby="who-h">
        <div className="wrap aud-wrap">
          <h2 id="who-h" className="sr">{h.audiencesHeading}</h2>
          <div className="audiences">
            {h.audiences.map((a, i) => (
              <div className="aud" key={a.heading}>
                <span className="idx" aria-hidden="true">{i === 0 ? 'I' : 'II'}</span>
                <h3>{a.heading}</h3>
                <p className="muted">{a.text}</p>
                <Link className="link" href={a.href} style={{ alignSelf: 'flex-start' }}>{a.linkLabel} <Arrow /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="themes-h">
        <div className="wrap themes">
          <div className="themes-head sr"><h2 id="themes-h">{h.themesHeading}</h2></div>
          <ol className="themes-list">
            {h.themes.map((t, i) => (
              <li className="theme" key={t.title}>
                <span className="n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <div><h3>{t.title}</h3><p>{t.text}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="chemo" aria-labelledby="chemo-h">
        <Photo media={photos.homeStory} slot="Photo or music video" alt="Nandita Thakur singing" ratio="auto" fill dark brandFallback sizes="(max-width: 767px) 100vw, 50vw" />
        <div className="txt">
          <h2 id="chemo-h">{h.storyHeading}</h2>
          {h.storyParagraphs.map((p, i) => (
            <p key={i}>
              <Inline text={p} />
              {i === h.storyParagraphs.length - 1 ? (h.storyExtraLine ? <> {h.storyExtraLine}</> : <> <Pending>+ one short, light line in Nandita&rsquo;s words</Pending></>) : null}
            </p>
          ))}
          <Link className="link" href="/about/" style={{ alignSelf: 'flex-start' }}>Read my full story <Arrow /></Link>
        </div>
      </section>

      <section className="band" aria-labelledby="spoken-h">
        <div className="wrap">
          <div className="spoken">
            <h2 id="spoken-h">{h.spokenHeading}</h2>
            <p className="stmt">{h.spokenIntro}</p>
            {h.spokenItems.length ? (
              <ul className="more" style={{ margin: '28px 0 0', paddingLeft: '1.1em', display: 'grid', gap: 10 }}>
                {h.spokenItems.map((s) => <li key={s}>{s}</li>)}
              </ul>
            ) : (
              <Note label="Expandable" className="more">Verified organisation names, audiences, photos and feedback are added under Pages › Home › Spoken items.</Note>
            )}
          </div>
        </div>
      </section>

      <section className="band on-stone" aria-labelledby="book-h">
        <div className="wrap book">
          <div className="cover"><Photo media={book.cover} slot="Book cover" alt={ALT.bookCover} ratio="2 / 3" brandFallback sizes="(max-width: 767px) 230px, 25vw" /></div>
          <div className="book-text">
            <h2 id="book-h" className="sr"><Inline text={h.bookHeading} /></h2>
            <p className="lede"><Inline text={h.bookText} /></p>
            <Link className="link" href="/silent-screams/" style={{ alignSelf: 'flex-start' }}><span><Inline text={h.bookLinkLabel} /></span> <Arrow /></Link>
          </div>
        </div>
      </section>

      {posts.docs.length >= 3 ? (
        <section className="band" aria-labelledby="blog-h">
          <div className="wrap stack" style={{ gap: 44 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'end', gap: 20 }}>
              <h2 id="blog-h" className="sr">{h.blogHeading}</h2>
              <Link className="link" href="/blog/">All posts <Arrow /></Link>
            </div>
            <PostCards posts={posts.docs} />
          </div>
        </section>
      ) : null}

      <section className="band on-stone" aria-labelledby="faq-h">
        <div className="wrap faq-grid">
          <div className="faq-head sr"><h2 id="faq-h">{h.faqHeading}</h2></div>
          <div className="faq-body"><Faq items={h.faqs} /></div>
        </div>
      </section>

      <CtaBand heading={h.ctaHeading} line={h.ctaLine} />
    </div>
  )
}
