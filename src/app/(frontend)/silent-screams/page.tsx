import React from 'react'
import '@/styles/silent-screams.css'
import { CtaBand, HiddenSection, Inline, JsonLd, Note, Pending, Photo } from '@/components/ui'
import { ALT, CTA_LINE, SITE } from '@/content/defaults'
import { getBook } from '@/lib/cms'
import { absoluteUrl, pageMetadata } from '@/lib/site'

export const revalidate = 3600

export async function generateMetadata() {
  const b = await getBook()
  return pageMetadata({
    title: 'Silent Screams by Nandita Thakur',
    description: b.description || 'Silent Screams is a book by Nandita Thakur, written to put difficult experiences into words and to find some closure.',
    path: '/silent-screams/',
    image: b.cover?.url,
  })
}

export default async function BookPage() {
  const b = await getBook()
  const book: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: b.title,
    author: { '@type': 'Person', name: SITE.person, url: absoluteUrl('/about/') },
    url: absoluteUrl('/silent-screams/'),
  }
  if (b.description) book.description = b.description
  if (b.cover?.url) book.image = absoluteUrl(b.cover.url)
  if (b.purchaseConfirmed && b.purchaseUrl) book.offers = { '@type': 'Offer', url: b.purchaseUrl }

  return (
    <div className="pg-silent-screams">
      <JsonLd data={book} />
      <section className="b-head" aria-labelledby="bk-h1">
        <div className="wrap load-in">
          <p className="by">{b.byline}</p>
          <h1 id="bk-h1">{b.title}</h1>
          <p className="desc">{b.description || <Pending>short approved description of the book</Pending>}</p>
          <div className="cover"><Photo media={b.cover} slot="Book cover" alt={ALT.bookCover} ratio="2 / 3" priority brandFallback sizes="340px" /></div>
        </div>
      </section>

      <section className="why" aria-labelledby="why-h">
        <div className="wrap grid2">
          <h2 id="why-h" className="sr">{b.whyHeading}</h2>
          <div className="prose">
            {b.why.map((p) => <p key={p}><Inline text={p} /></p>)}
            <Note label="Copy">These sentences are approved copy from the Home and About pages. The Silent Screams page copy is still to come; edit it under Pages › Silent Screams.</Note>
          </div>
        </div>
      </section>

      {b.synopsis ? (
        <section className="band on-stone" aria-labelledby="syn-h">
          <div className="wrap">
            <div className="prose" style={{ marginInline: 'auto' }}>
              <h2 id="syn-h">{b.synopsisHeading}</h2>
              {b.synopsis.split(/\n{2,}/).map((p) => <p key={p}>{p}</p>)}
            </div>
          </div>
        </section>
      ) : (
        <HiddenSection>About the book: the approved synopsis. Shown once it is added under Pages › Silent Screams.</HiddenSection>
      )}

      {b.purchaseConfirmed && b.purchaseUrl ? (
        <section className="band" aria-labelledby="buy-h">
          <div className="wrap">
            <div className="buy">
              <div className="stack" style={{ gap: 10 }}><h2 id="buy-h">{b.buyHeading}</h2><p className="muted">Opens the retailer&rsquo;s page in a new tab.</p></div>
              <a className="btn" href={b.purchaseUrl} target="_blank" rel="noopener noreferrer" data-event="book_link_click">{b.buyLabel}</a>
            </div>
          </div>
        </section>
      ) : (
        <HiddenSection>Where to buy: the Buy the Book button appears once the purchase link is confirmed under Pages › Silent Screams.</HiddenSection>
      )}

      <CtaBand heading="Invite Nandita to speak" line={CTA_LINE} />
    </div>
  )
}
