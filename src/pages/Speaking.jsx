import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { RevealText, FadeUp, EASE } from '../components/Motion.jsx'
import { CTA } from '../components/UI.jsx'
import { Postmark, TapedPhoto, IndexCard } from '../components/Scrap.jsx'
import { getLenis } from '../lib/useLenis.js'
import { themes, talks, speakingFaqs } from '../data/content.js'
import { useSeo, schema } from '../lib/useSeo.js'

const ROTS = ['-rotate-1', 'rotate-1', '-rotate-1', 'rotate-1', '-rotate-1']

export default function Speaking() {
  useSeo({
    title: "Speaker for Women's Events | Keynotes by Nandita Thakur",
    description: "Invite Nandita Thakur to speak at your women's event or company session. Talks on rebuilding self-belief, independence and finding enjoyment again.",
    path: '/speaking/',
    jsonLd: schema.speaking,
  })
  const { hash } = useLocation()
  useEffect(() => {
    if (!hash) return
    const el = document.querySelector(hash)
    if (!el) return
    const t = setTimeout(() => {
      const l = getLenis()
      if (l) l.scrollTo(el, { offset: -90 })
      else el.scrollIntoView({ behavior: 'smooth' })
    }, 400)
    return () => clearTimeout(t)
  }, [hash])

  return (
    <>
      <Hero />
      <WhoISpeakTo />
      <Themes />
      <TalkIdeas />
      <Bio />
      <Faqs />
    </>
  )
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-36 sm:px-8 sm:pt-44">
      <div className="copper-glow pointer-events-none absolute right-0 top-10 h-[480px] w-[520px]" />
      <div className="mx-auto grid max-w-[1160px] grid-cols-12 items-center gap-x-10 gap-y-16">
        <div className="col-span-12 lg:col-span-7">
          <motion.p initial={{ opacity: 0, y: -10, rotate: -4 }} animate={{ opacity: 1, y: 0, rotate: -3 }} transition={{ duration: 0.7, ease: EASE }} className="mb-4 inline-block font-hand text-2xl text-copper-deep sm:text-3xl">
            — keynotes &amp; talks
          </motion.p>
          <h1 className="font-display leading-[1.04]">
            <RevealText text="Keynotes & talks for" className="display-l block" />
            <span className="relative inline-block">
              <RevealText text="women's events." className="display-l block italic text-ink" delay={0.08} />
              <motion.svg viewBox="0 0 400 20" preserveAspectRatio="none" aria-hidden className="pointer-events-none absolute -bottom-1 left-0 h-3 w-full text-copper sm:h-5">
                <motion.path d="M3 13 C 80 4, 300 4, 397 10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, ease: EASE, delay: 0.9 }} />
              </motion.svg>
            </span>
          </h1>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8, ease: EASE }} className="mt-9 max-w-lg">
            <p className="text-lg leading-relaxed text-ink/70">
              I speak at women&rsquo;s events, community gatherings and company sessions about rebuilding self-belief after life&rsquo;s setbacks — told honestly, with a few questions for the audience to take home.
            </p>
            <div className="mt-8"><CTA>Invite Nandita to Speak</CTA></div>
          </motion.div>
        </div>
        <div className="col-span-12 lg:col-span-5">
          <motion.div initial={{ opacity: 0, y: 28, rotate: 6 }} animate={{ opacity: 1, y: 0, rotate: 2 }} transition={{ type: 'spring', stiffness: 60, damping: 13, delay: 0.2 }}>
            <TapedPhoto className="mx-auto w-[66%] max-w-[240px]" ratio="3/3.7" tone="copper" caption="on stage —" note="♪ a full room" rot="rotate-0" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- WHO I SPEAK TO (flyers) ---------------- */
function WhoISpeakTo() {
  const blocks = [
    {
      id: 'women', n: '01', k: "For women's communities & events", caption: 'a women’s event —', tone: 'stone', rot: '-rotate-2',
      body: [
        "I speak at International Women's Day sessions, women's network meetings, association and community gatherings, and conferences for women.",
        'Some of the women in the room will have been through a major setback. Others will have spent years meeting everyone else\'s expectations and slowly lost confidence. My life will not match every woman\'s, and I do not tell anyone what to decide. I share what happened to me and ask questions.',
      ],
    },
    {
      id: 'companies', n: '02', k: 'For companies & teams', caption: 'a company session —', tone: 'copper', rot: 'rotate-2',
      body: [
        'I also speak to teams and middle managers about rebuilding self-belief after a setback, making your own decisions and keeping a life of your own outside work.',
        'The audience can be women only or a mixed group. These are talks that start a conversation. I do not run a leadership programme.',
      ],
    },
  ]
  return (
    <section className="mx-auto max-w-[1160px] px-5 py-20 sm:px-8 sm:py-24">
      <p className="font-hand text-3xl text-copper-deep sm:text-4xl">who I speak to —</p>
      <div className="mt-12 space-y-16">
        {blocks.map((b, i) => (
          <div key={b.id} id={b.id} className="grid scroll-mt-28 grid-cols-12 items-center gap-x-12 gap-y-10">
            <div className={`col-span-12 lg:col-span-5 ${i % 2 ? 'lg:order-2' : ''}`}>
              <TapedPhoto className="mx-auto w-[72%] max-w-[270px]" ratio="4/3.4" tone={b.tone} caption={b.caption} rot={b.rot} />
            </div>
            <div className="col-span-12 lg:col-span-6">
              <span className="font-hand text-xl text-copper-deep">{b.n} —</span>
              <RevealText as="h2" text={b.k} className="mt-1 max-w-md font-display text-[1.6rem] italic leading-tight sm:text-[2rem]" />
              <FadeUp delay={0.15}>
                {b.body.map((p, j) => (
                  <p key={j} className="mt-4 max-w-xl text-[0.98rem] leading-relaxed text-ink/70">{p}</p>
                ))}
              </FadeUp>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------------- THEMES (postcards on dark) ---------------- */
function Themes() {
  return (
    <section className="tex-dark bg-ink py-20 text-ivory sm:py-24">
      <div className="mx-auto max-w-[1160px] px-5 sm:px-8">
        <p className="font-hand text-3xl text-copper sm:text-4xl">what I speak about —</p>
        <RevealText as="h2" text="Five themes, drawn from a real life." className="mt-1 max-w-xl font-display text-[1.7rem] leading-tight text-ivory sm:text-[2.2rem]" />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {themes.map((t, i) => (
            <motion.div
              key={t.n}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: (i % 3) * 0.08 }}
              className={`group relative overflow-hidden rounded-[3px] bg-[#fbf7ef] p-6 text-ink shadow-[0_22px_40px_-22px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:rotate-0 ${ROTS[i % ROTS.length]}`}
            >
              <span className="pointer-events-none absolute inset-2.5 rounded-[2px] border border-copper/25" />
              <div className="relative flex items-start justify-between">
                <span className="eyebrow text-copper">{t.n} / 05</span>
                <Postmark n={t.n} className="scale-[0.8]" />
              </div>
              <h3 className="relative mt-1 font-display text-[1.25rem] leading-tight">{t.title}</h3>
              <p className="relative mt-3 text-[0.9rem] leading-relaxed text-ink/65">{t.body}</p>
            </motion.div>
          ))}
          <div className="relative flex flex-col justify-center rotate-1 rounded-[3px] bg-copper p-7 text-ink shadow-[0_22px_40px_-22px_rgba(0,0,0,0.5)]">
            <p className="font-hand text-2xl leading-tight sm:text-3xl">each one, shaped to your room —</p>
            <div className="mt-5"><CTA variant="outline" className="[&_a]:border-ink/40">Let&rsquo;s talk</CTA></div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- TALK IDEAS (programme cards) ---------------- */
function TalkIdeas() {
  return (
    <section className="mx-auto max-w-[1160px] px-5 py-20 sm:px-8 sm:py-24">
      <p className="font-hand text-3xl text-copper-deep sm:text-4xl">talk ideas —</p>
      <RevealText as="h2" text="Three starting points. Any can be shaped to your room." className="mt-1 max-w-2xl font-display text-[1.7rem] leading-tight sm:text-[2.2rem]" />

      <div className="mt-12 space-y-8">
        {talks.map((t, i) => (
          <motion.article
            key={t.title}
            initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, ease: EASE }}
            className={`relative rounded-[3px] bg-[#fbf7ef] p-7 shadow-[0_22px_44px_-24px_rgba(23,23,23,0.4)] sm:p-9 ${i % 2 ? 'rotate-1' : '-rotate-1'}`}
          >
            <span className="pointer-events-none absolute inset-3 rounded-[2px] border border-copper/20" />
            <div className="relative grid grid-cols-12 gap-x-8 gap-y-5">
              <div className="col-span-12 lg:col-span-5">
                <span className="font-display text-5xl italic text-copper/50">0{i + 1}</span>
                <h3 className="mt-2 max-w-md font-display text-[1.5rem] leading-tight sm:text-[1.9rem]">{t.title}</h3>
              </div>
              <div className="col-span-12 lg:col-span-7">
                <p className="text-[0.95rem] leading-relaxed text-ink/70">{t.body}</p>
                <p className="mt-6 font-hand text-xl text-copper-deep">questions to take home —</p>
                <ul className="mt-2 space-y-1.5">
                  {t.questions.map((q) => (
                    <li key={q} className="flex gap-2.5 font-hand text-lg text-ink/70">
                      <span className="text-copper">✶</span>{q}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

/* ---------------- BIO (press clipping) ---------------- */
function Bio() {
  return (
    <section className="bg-stone py-20 sm:py-24">
      <div className="mx-auto max-w-[1160px] px-5 sm:px-8">
        <div className="relative mx-auto max-w-2xl -rotate-1 bg-[#fbf7ef] p-7 shadow-[0_28px_55px_-28px_rgba(23,23,23,0.5)] sm:p-10">
          {/* paperclip */}
          <svg viewBox="0 0 40 96" aria-hidden className="absolute -top-6 left-10 z-20 h-16 w-7 -rotate-6 text-ink/40 drop-shadow-sm">
            <path d="M13 16 L13 68 C13 80 29 80 29 68 L29 28 C29 19 17 19 17 28 L17 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="pointer-events-none absolute inset-3 rounded-[2px] border border-copper/20" />
          <div className="relative flex items-center justify-between">
            <p className="font-hand text-2xl text-copper-deep sm:text-3xl">press bio —</p>
            <span className="-rotate-3 font-hand text-lg text-ink/45">copy &amp; paste ✎</span>
          </div>
          <p className="relative mt-4 font-display text-xl leading-snug text-ink sm:text-[1.5rem]">
            Nandita Thakur is a motivational speaker for women, an entrepreneur and the author of <span className="serif-italic text-copper-deep">Silent Screams</span>.
          </p>
          <p className="relative mt-4 text-[0.95rem] leading-relaxed text-ink/65">
            She speaks about rebuilding belief in yourself after life&rsquo;s setbacks, drawing on her own experience of building a working life of her own, caring for her parents through cancer and keeping up her music while she was in treatment herself.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ---------------- FAQ (index cards) ---------------- */
function Faqs() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-[1160px] px-5 sm:px-8">
        <div className="grid grid-cols-12 gap-x-10 gap-y-10">
          <div className="col-span-12 lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="font-hand text-3xl text-copper-deep sm:text-4xl">before you enquire —</p>
              <h2 className="mt-1 max-w-xs font-display text-[1.7rem] leading-tight sm:text-[2.1rem]">Questions organisers ask</h2>
              <p className="mt-4 max-w-xs text-[0.95rem] text-ink/60">Tap a card to flip it over.</p>
              <div className="mt-8"><CTA variant="outline">Invite Nandita to Speak</CTA></div>
            </div>
          </div>
          <div className="col-span-12 space-y-5 lg:col-span-7 lg:col-start-6">
            {speakingFaqs.map((f, i) => <IndexCard key={f.q} q={f.q} a={f.a} i={i} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
