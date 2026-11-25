import React from 'react'
import '@/styles/speaking.css'
import { CopyBio } from '@/components/CopyBio'
import { Faq } from '@/components/Faq'
import { CtaBand, CtaButton, HiddenSection, Inline, JsonLd, Note, Pending } from '@/components/ui'
import { SITE } from '@/content/defaults'
import { getSettings, getSpeaking } from '@/lib/cms'
import { absoluteUrl, pageMetadata, showPreviewNotes } from '@/lib/site'

export const revalidate = 3600

export async function generateMetadata() {
  const [s, st] = await Promise.all([getSpeaking(), getSettings()])
  return pageMetadata({ title: s.seo.title, description: s.seo.description, path: '/speaking/', image: st.shareImage?.url })
}

export default async function SpeakingPage() {
  const [s, settings] = await Promise.all([getSpeaking(), getSettings()])
  const showTalks = s.talksApproved || showPreviewNotes
  const showBio = s.bioApproved || showPreviewNotes
  const session = [
    ['Length', s.sessionLength],
    ['Format', s.sessionFormat],
    ['Languages', s.sessionLanguages],
    ['Based in and travel', s.sessionBaseTravel],
    ['Audience questions', s.sessionQuestions],
  ] as const
  const sessionComplete = session.every(([, v]) => v)
  const replyLine = s.replyTimeLine || settings.replyTime

  const index = [
    ['#women', 'Women’s communities and events', true],
    ['#companies', 'Companies and teams', true],
    ['#themes', 'What I speak about', true],
    ['#talks', 'Talk ideas', showTalks],
    ['#bio', 'Bio for your programme', showBio],
    ['#faq', 'Questions organisers ask', true],
  ] as const

  return (
    <div className="pg-speaking">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Keynotes and motivational talks for women’s events',
          serviceType: 'Keynote speaking',
          description: 'Keynotes and motivational talks by Nandita Thakur on rebuilding self-belief after life’s setbacks, for women’s events, communities and company sessions.',
          url: absoluteUrl('/speaking/'),
          provider: { '@type': 'Person', name: SITE.person, url: absoluteUrl('/') },
        }}
      />

      <section className="s-head" aria-labelledby="sp-h1">
        <div className="wrap">
          <div className="s-head-grid">
            <div className="t load-in">
              <h1 id="sp-h1">{s.h1}</h1>
              <p className="lede">{s.intro}</p>
              <div className="actions"><CtaButton light where="speaking-head" /></div>
            </div>
            <nav className="index" aria-label="On this page">
              <p>On this page</p>
              <ol>
                {index.filter(([, , show]) => show).map(([href, label]) => (
                  <li key={href}><a href={href}>{label}</a></li>
                ))}
              </ol>
            </nav>
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="who-h">
        <div className="wrap who">
          <h2 id="who-h" className="sr">{s.whoHeading}</h2>
          <div className="aud-row" id="women">
            <h3>{s.womenHeading}</h3>
            <div className="body">
              {s.womenParagraphs.map((p, i) => (
                <p key={i}>
                  {p}
                  {i === 0 && !s.womenEventTypesConfirmed ? <> <Pending>confirm event types with Nandita</Pending></> : null}
                </p>
              ))}
            </div>
          </div>
          <div className="aud-row" id="companies">
            <h3>{s.companiesHeading}</h3>
            <div className="body">{s.companiesParagraphs.map((p, i) => <p key={i}>{p}</p>)}</div>
          </div>
        </div>
      </section>

      <section className="band on-stone" id="themes" aria-labelledby="th-h">
        <div className="wrap">
          <h2 id="th-h" className="sr">{s.themesHeading}</h2>
          <div className="t-table">
            {s.themes.map((t, i) => (
              <div className="t-row" key={t.title}>
                <span className="n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {showTalks ? (
        <section className="band on-ink" id="talks" aria-labelledby="tk-h">
          <div className="wrap">
            <div className="talks-head">
              <h2 id="tk-h" className="sr">{s.talksHeading}</h2>
              <p>{s.talksIntro} <Pending>confirm lengths</Pending></p>
            </div>
            {!s.talksApproved ? (
              <Note label="Not public yet" className="talks-note">The talk titles are proposals. Visitors do not see this section until “Talks approved” is ticked under Pages › Speaking.</Note>
            ) : null}
            {s.talks.map((t) => (
              <article className="talk" key={t.title}>
                <h3>{t.title}</h3>
                <p className="desc"><Inline text={t.description} /></p>
                <div className="qs">
                  <p>Questions the audience takes home</p>
                  <ul>{(t.questions as unknown as (string | { text: string })[]).map((q) => { const v = typeof q === 'string' ? q : q.text; return <li key={v}>{v}</li> })}</ul>
                </div>
              </article>
            ))}
            <p className="lede talks-outro">{s.talksOutro} <Pending>confirm with Nandita</Pending></p>
          </div>
        </section>
      ) : null}

      {sessionComplete ? (
        <section className="band" aria-labelledby="ses-h">
          <div className="wrap">
            <h2 id="ses-h" className="sr" style={{ marginBottom: 40 }}>{s.sessionHeading}</h2>
            <dl className="facts">
              {session.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
            </dl>
          </div>
        </section>
      ) : (
        <HiddenSection>Session details: length, format, languages, base and travel, time for audience questions. Shown once every detail is filled in under Pages › Speaking.</HiddenSection>
      )}

      {showBio ? (
        <section className="band on-stone" id="bio" aria-labelledby="bio-h">
          <div className="wrap bio">
            <div className="h">
              <h2 id="bio-h" className="sr">{s.bioHeading}</h2>
              <p className="muted">{s.bioIntro}</p>
              {!s.bioApproved ? <Note label="Approval">Hidden from visitors until “Bio approved” is ticked under Pages › Speaking.</Note> : null}
            </div>
            <div className="card-bio">
              <p className="txt" id="bio-text">{s.bio}</p>
              <div className="tools">
                <CopyBio targetId="bio-text" />
                {s.bioPhotosUrl ? (
                  <a className="link" href={s.bioPhotosUrl} target="_blank" rel="noopener noreferrer">Download high-resolution photos</a>
                ) : (
                  <Pending>Download high-resolution photos (link pending)</Pending>
                )}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="band" aria-labelledby="spoken-h">
        <div className="wrap spoken">
          <h2 id="spoken-h">{s.spokenHeading}</h2>
          <p className="stmt">{s.spokenIntro}</p>
          {s.spokenItems.length ? (
            <ul style={{ gridColumn: '6 / -1', margin: '24px 0 0', paddingLeft: '1.1em', display: 'grid', gap: 10 }}>
              {s.spokenItems.map((x) => <li key={x}>{x}</li>)}
            </ul>
          ) : null}
        </div>
      </section>

      <section className="band on-stone" id="faq" aria-labelledby="faq-h">
        <div className="wrap faq-grid">
          <div className="faq-head sr"><h2 id="faq-h">{s.faqHeading}</h2></div>
          <div className="faq-body">
            <Faq items={s.faqs} />
            <Note label="Later" className="faq-later">Shaping the talk, format, length, fees and workshops are added under Pages › Speaking › FAQs once Nandita confirms the answers.</Note>
          </div>
        </div>
      </section>

      <CtaBand
        heading={s.ctaHeading}
        line={replyLine ? `${s.ctaLine} ${replyLine}` : s.ctaLine}
        extra={
          s.profilePdfUrl ? (
            <a className="link" href={s.profilePdfUrl} target="_blank" rel="noopener noreferrer" style={{ alignSelf: 'flex-start', color: 'var(--ivory)' }}>Speaker profile (PDF)</a>
          ) : (
            <Pending>+ reply time · + speaker profile PDF link</Pending>
          )
        }
      />
    </div>
  )
}
