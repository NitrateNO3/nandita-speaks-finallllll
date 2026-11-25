import Link from 'next/link'
import React from 'react'
import '@/styles/about.css'
import { Faq } from '@/components/Faq'
import { Arrow, CtaBand, CtaButton, HiddenSection, Inline, JsonLd, Note, Pending, Photo } from '@/components/ui'
import { ALT, SITE } from '@/content/defaults'
import { getAbout, getPhotos, getSettings } from '@/lib/cms'
import { absoluteUrl, pageMetadata } from '@/lib/site'

export const revalidate = 3600

export async function generateMetadata() {
  const [a, s, ph] = await Promise.all([getAbout(), getSettings(), getPhotos()])
  return pageMetadata({ title: a.seo.title, description: a.seo.description, path: '/about/', image: ph.aboutPortrait?.url || s.shareImage?.url })
}

export default async function AboutPage() {
  const [a, photos, settings] = await Promise.all([getAbout(), getPhotos(), getSettings()])
  const [s1, s2, s3, s4, s5] = a.storyParagraphs
  const story = photos.aboutStory

  const person: Record<string, unknown> = {
    '@type': 'Person',
    name: SITE.person,
    url: absoluteUrl('/about/'),
    jobTitle: 'Motivational Speaker for Women',
    description: 'Nandita Thakur is a speaker for women, an entrepreneur and the author of Silent Screams.',
    knowsAbout: ['Self-belief', 'Women’s independence', 'Rebuilding after setbacks'],
  }
  if (photos.aboutPortrait?.url) person.image = absoluteUrl(photos.aboutPortrait.url)
  if (settings.socials.length) person.sameAs = settings.socials.map((s) => s.url)

  const facts = a.facts.map((f) => (f.label === 'Also' && a.businessNames ? { ...f, value: `${f.value} ${a.businessNames}` } : f))
  const faqs = a.faqs.map((f) => (f.q === 'What is Silent Screams?' && a.bookOneLiner ? { ...f, a: `${f.a} ${a.bookOneLiner}` } : f))

  return (
    <div className="pg-about">
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'ProfilePage', mainEntity: person }} />

      <section className="a-head on-stone" aria-labelledby="ab-h1">
        <div className="wrap">
          <div className="a-head-grid">
            <div className="t load-in">
              <h1 id="ab-h1">{a.h1}</h1>
              <p className="lede"><Inline text={a.intro} /></p>
              <div className="actions"><CtaButton where="about-head" /></div>
            </div>
            <div className="portrait">
              <Photo media={photos.aboutPortrait} slot="Portrait" alt={ALT.aboutPortrait} dark brandFallback priority sizes="(max-width: 767px) 86vw, 30vw" />
            </div>
            <div className="facts-wrap">
              <h2>{a.factsHeading}</h2>
              <dl className="facts">
                {facts.map((f) => (
                  <div key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>
                      <Inline text={f.value} />
                      {f.label === 'Also' && !a.businessNames ? <> <Pending>business names, if Nandita wants them shown</Pending></> : null}
                    </dd>
                  </div>
                ))}
                {a.basedIn ? (
                  <div><dt>Based in</dt><dd>{a.basedIn}</dd></div>
                ) : null}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="story" aria-labelledby="story-h">
        <div className="wrap">
          <div className="flow">
            <div className="col">
              <h2 id="story-h">{a.storyHeading}</h2>
              {s1 ? <p className="first">{s1}</p> : null}
              {s2 ? <p>{s2}</p> : null}
            </div>
            <div className="pair">
              <div className="a"><Photo media={story[0]} slot="Photograph" alt="Plain description of the photo" ratio="3 / 2" sizes="(max-width: 767px) 100vw, 55vw" /></div>
              <div className="b"><Photo media={story[1]} slot="Photograph" alt="Plain description of the photo" ratio="4 / 5" sizes="(max-width: 767px) 70vw, 30vw" /></div>
            </div>
            <div className="col">
              {s3 ? <p>{s3}</p> : null}
              <Note label="Approval">Nandita approves this paragraph in writing before launch (Page Copy checklist).</Note>
              {s4 ? <p>{s4}</p> : null}
            </div>
            <div className="solo"><Photo media={story[2]} slot="Photograph" alt="Plain description of the photo" ratio="3 / 2" sizes="(max-width: 767px) 100vw, 45vw" /></div>
            <div className="col">
              {s5 ? (
                <p>
                  {s5}
                  {a.storyExtraLine ? <> {a.storyExtraLine}</> : <> <Pending>+ one short line in Nandita&rsquo;s words, if she wants one</Pending></>}
                </p>
              ) : null}
              {a.storyParagraphs.slice(5).map((p) => <p key={p}>{p}</p>)}
            </div>
          </div>
        </div>
      </section>

      <section className="band on-stone" aria-labelledby="now-h">
        <div className="wrap now">
          <h2 id="now-h" className="sr">{a.nowHeading}</h2>
          <div className="cols">
            {a.now.map((n) => (
              <div key={n.heading}>
                <h3>{n.heading}</h3>
                <p className="muted">
                  <Inline text={n.text} />
                  {n.heading === 'Business' ? (a.anthem ? <> {a.anthem}</> : <> <Pending>+ what Anthem is and Nandita&rsquo;s role, 2–3 sentences</Pending></>) : null}
                </p>
                {n.href && n.linkLabel ? <Link className="link" href={n.href} style={{ alignSelf: 'flex-start' }}>{n.linkLabel} <Arrow /></Link> : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="on-ink believe" aria-labelledby="bel-h">
        <div className="wrap">
          <h2 id="bel-h">{a.believeHeading}</h2>
          <ol>{a.beliefs.map((b) => <li key={b}>{b}</li>)}</ol>
          <Note label="Approval" className="believe-note">Nandita approves each line before launch.</Note>
        </div>
      </section>

      <HiddenSection>Music (from the Brief): a photo or video of Nandita singing with a few lines of text. No copy or video supplied yet.</HiddenSection>

      <section className="band" aria-labelledby="faq-h">
        <div className="wrap faq-grid">
          <div className="faq-head sr"><h2 id="faq-h">{a.faqHeading}</h2></div>
          <div className="faq-body"><Faq items={faqs} /></div>
        </div>
      </section>

      <CtaBand heading={a.ctaHeading} line={a.ctaLine} />
    </div>
  )
}
