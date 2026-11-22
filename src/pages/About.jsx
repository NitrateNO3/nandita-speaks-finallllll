import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { RevealText, FadeUp, EASE } from '../components/Motion.jsx'
import { CTA, TextLink } from '../components/UI.jsx'
import { PhotoSlot } from '../components/Media.jsx'
import { aboutFaqs, beliefs } from '../data/content.js'
import { useSeo, schema } from '../lib/useSeo.js'

const facts = [
  ['Name', 'Nandita Thakur'],
  ['Known for', 'Speaking to women about self-belief & starting again'],
  ['Author of', 'Silent Screams'],
  ['Also', 'Entrepreneur — a salon business & a travel business'],
  ['Speaks at', "Women's events, communities & company sessions"],
]

const story = [
  'I married young, became a mother early and did not finish college. For years my life was my family and my home.',
  'When I realised my marriage might not work, I started working towards earning my own money. I built a salon business and a travel business myself. Earning my own money gave me choices I would not otherwise have had.',
  'My marriage was a narcissistic relationship. It took me a long time to see that, and longer to leave. I separated after 18 years.',
  'Then both my parents were diagnosed with cancer, and I looked after them. My father died while my mother was in treatment. After that, I was diagnosed with cancer myself.',
  'I was living alone when I was diagnosed. I called my insurance agent to find out what my policy covered and began arranging my treatment before I told my family. I carried on with my online music classes and kept singing through chemotherapy. I am back at work now.',
]

/* ---------------- small scrapbook helpers ---------------- */
function HandUnderline({ children, delay = 0 }) {
  return (
    <span className="relative inline-block">
      {children}
      <motion.svg viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden className="pointer-events-none absolute -bottom-1 left-0 h-2 w-full text-copper">
        <motion.path
          d="M2 7 C 60 1, 150 11, 198 4"
          fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, ease: EASE, delay }}
        />
      </motion.svg>
    </span>
  )
}

function Stamp() {
  return (
    <div className="h-12 w-10 rotate-6 bg-ivory p-1 shadow-sm">
      <div className="flex h-full w-full items-center justify-center border border-dashed border-copper/55 bg-copper/10">
        <span className="font-display text-sm italic text-copper-deep">NT</span>
      </div>
    </div>
  )
}

function IndexCard({ q, a, i }) {
  const [open, setOpen] = useState(false)
  const rot = i % 2 === 0 ? '-rotate-1' : 'rotate-1'
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`group relative rounded-[3px] bg-[#fbf7ef] shadow-[0_14px_30px_-18px_rgba(23,23,23,0.5)] transition-transform duration-500 hover:rotate-0 ${rot}`}
    >
      <span className="absolute left-1/2 top-2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-ivory-dim ring-1 ring-ink/10" />
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center gap-4 px-6 pb-4 pt-6 text-left">
        <span className="shrink-0 font-hand text-2xl text-copper-deep">Q.</span>
        <h3 className="flex-1 font-display text-[1.1rem] leading-snug text-ink sm:text-[1.25rem]">{q}</h3>
        <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${open ? 'rotate-45 border-ink bg-ink text-ivory' : 'border-ink/25 text-ink/60'}`}>
          <svg width="12" height="12" viewBox="0 0 14 14"><path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
        </span>
      </button>
      <span className="pointer-events-none mx-6 block h-px bg-copper/25" />
      <motion.div initial={false} animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }} transition={{ duration: 0.5, ease: EASE }} className="overflow-hidden">
        <div className="flex gap-4 px-6 pb-6 pt-3">
          <span className="shrink-0 font-hand text-2xl text-ink/40">A.</span>
          <p className="text-[0.95rem] leading-relaxed text-ink/70">{a}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function About() {
  useSeo({
    title: 'About Nandita Thakur | Speaker, Entrepreneur and Author',
    description: 'Nandita Thakur is a speaker for women, an entrepreneur and the author of Silent Screams. Read her story of rebuilding life after setbacks.',
    path: '/about/',
    jsonLd: schema.about,
  })
  return (
    <>
      <Hero />
      <QuickFacts />
      <Story />
      <WhatIDoNow />
      <Beliefs />
      <Faqs />
    </>
  )
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-36 sm:px-8 sm:pt-44">
      <div className="copper-glow pointer-events-none absolute -left-16 top-24 h-[460px] w-[460px]" />
      <div className="mx-auto grid max-w-[1160px] grid-cols-12 items-center gap-x-10 gap-y-16">
        {/* type */}
        <div className="col-span-12 lg:col-span-7">
          <motion.p initial={{ opacity: 0, y: -10, rotate: -4 }} animate={{ opacity: 1, y: 0, rotate: -3 }} transition={{ duration: 0.7, ease: EASE }} className="mb-4 inline-block font-hand text-2xl text-copper-deep sm:text-3xl">
            — the short version
          </motion.p>
          <h1 className="font-display leading-[1.02]">
            <RevealText text="About" className="display-xl block" />
            <span className="relative inline-block">
              <RevealText text="Nandita." className="display-xl block italic text-ink" delay={0.08} />
              <motion.svg viewBox="0 0 400 20" preserveAspectRatio="none" aria-hidden className="pointer-events-none absolute -bottom-1 left-0 h-3 w-full text-copper sm:h-5">
                <motion.path d="M3 13 C 80 4, 300 4, 397 10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, ease: EASE, delay: 0.9 }} />
              </motion.svg>
            </span>
          </h1>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8, ease: EASE }} className="mt-9 max-w-md">
            <p className="text-lg leading-relaxed text-ink/70">
              I am a speaker for women, an entrepreneur and the author of <span className="serif-italic">Silent Screams</span>. I speak about rebuilding belief in yourself after life&rsquo;s setbacks — because I have had to do it more than once.
            </p>
            <div className="mt-8"><CTA>Invite Nandita to Speak</CTA></div>
          </motion.div>
        </div>

        {/* taped photo */}
        <div className="col-span-12 lg:col-span-5">
          <motion.div initial={{ opacity: 0, y: 28, rotate: -6 }} animate={{ opacity: 1, y: 0, rotate: -2.5 }} transition={{ type: 'spring', stiffness: 60, damping: 13, delay: 0.2 }} className="relative mx-auto w-[66%] max-w-[240px]">
            <span className="absolute -top-3 left-6 z-20 h-6 w-20 -rotate-6 bg-stone/55 shadow-sm ring-1 ring-ink/5" />
            <span className="absolute -bottom-3 right-5 z-20 h-6 w-16 rotate-[7deg] bg-stone/55 shadow-sm ring-1 ring-ink/5" />
            <div className="relative bg-[#fbf7ef] p-3 pb-10 shadow-[0_26px_52px_-28px_rgba(23,23,23,0.5)]">
              <div className="overflow-hidden"><PhotoSlot label="" ratio="3/3.7" tone="stone" /></div>
              <p className="absolute inset-x-0 bottom-3 text-center font-hand text-xl text-ink/70">this is me —</p>
            </div>
            <span className="absolute -bottom-7 -right-3 -rotate-6 font-hand text-xl text-copper-deep">♪ still singing</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- QUICK FACTS (filled card) ---------------- */
function QuickFacts() {
  return (
    <section className="mx-auto max-w-[1160px] px-5 sm:px-8">
      <FadeUp>
        <div className="relative mx-auto max-w-3xl -rotate-1 rounded-[3px] bg-[#fbf7ef] p-7 shadow-[0_26px_50px_-26px_rgba(23,23,23,0.5)] sm:p-9">
          <span className="pointer-events-none absolute inset-3 rounded-[2px] border border-copper/25" />
          <div className="absolute right-6 top-6 -rotate-3 sm:right-8"><Stamp /></div>
          <p className="relative font-hand text-2xl text-copper-deep sm:text-3xl">the facts —</p>
          <dl className="relative mt-5 grid gap-x-10 gap-y-5 pr-16 sm:grid-cols-2 sm:pr-0">
            {facts.map(([k, v]) => (
              <div key={k} className="border-b border-dashed border-ink/20 pb-3">
                <dt className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ink/45">{k}</dt>
                <dd className="mt-1 font-hand text-xl leading-tight text-ink sm:text-2xl">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </FadeUp>
    </section>
  )
}

/* ---------------- STORY (stitched thread) ---------------- */
function Story() {
  const labels = ['first —', 'then —', 'and then —', 'after that —', 'now —']
  return (
    <section className="mx-auto max-w-[1160px] px-5 py-20 sm:px-8 sm:py-24">
      <div className="grid grid-cols-12 gap-x-10">
        <div className="col-span-12 lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="font-hand text-3xl text-copper-deep sm:text-4xl">my story —</p>
            <RevealText as="h2" text="I have had to rebuild more than once." className="mt-1 max-w-xs font-display text-[1.7rem] leading-tight sm:text-[2.1rem]" />
          </div>
        </div>
        <div className="col-span-12 mt-10 lg:col-span-7 lg:col-start-6 lg:mt-0">
          <ol className="relative pl-10 sm:pl-12">
            <span aria-hidden className="absolute bottom-2 left-2 top-2 border-l border-dashed border-copper/40" />
            {story.map((p, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-12%' }}
                transition={{ duration: 0.7, ease: EASE }}
                className="relative mb-10 last:mb-0"
              >
                <span className="absolute -left-[41px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-copper bg-ivory sm:-left-[49px]" />
                <span className="font-hand text-xl text-copper-deep">{labels[i] ?? '—'}</span>
                <p className={`mt-1 leading-relaxed ${i === 0 ? 'font-display text-xl text-ink sm:text-[1.5rem]' : 'text-[0.98rem] text-ink/70'}`}>{p}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

/* ---------------- WHAT I DO NOW (luggage tags) ---------------- */
function WhatIDoNow() {
  const items = [
    { k: 'Speaking', d: "I speak at women's events, community gatherings and company sessions about self-belief, independence and finding enjoyment again.", link: ['Invite me to speak', '/speaking'] },
    { k: 'Writing', d: 'I wrote Silent Screams to put difficult experiences into words and to find some closure.', link: ['About the book', '/silent-screams'] },
    { k: 'Business', d: 'I built a salon business and a travel business myself, and I am back at work now.', link: null },
  ]
  return (
    <section className="tex-dark relative overflow-hidden bg-ink py-20 text-ivory sm:py-24">
      <div className="mx-auto max-w-[1160px] px-5 sm:px-8">
        <p className="font-hand text-3xl text-copper sm:text-4xl">what I do now —</p>
        <div className="mt-12 grid gap-10 sm:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.k}
              initial={{ opacity: 0, y: 30, rotate: -4 }}
              whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 2 : -2 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
              className="group relative bg-[#fbf7ef] px-6 pb-6 pt-8 text-ink shadow-[0_24px_44px_-22px_rgba(0,0,0,0.6)] transition-transform duration-500 hover:rotate-0"
            >
              <span aria-hidden className="absolute left-1/2 -top-4 h-4 w-px -translate-x-1/2 bg-ivory/25" />
              <span className="absolute left-1/2 top-3 h-3 w-3 -translate-x-1/2 rounded-full bg-ink/75 ring-2 ring-[#fbf7ef]" />
              <span className="pointer-events-none absolute inset-2.5 rounded-[2px] border border-copper/25" />
              <div className="relative">
                <span className="font-display text-4xl italic text-copper/55">0{i + 1}</span>
                <h3 className="mt-2 font-display text-[1.5rem]">{it.k}</h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-ink/65">{it.d}</p>
                {it.link && (
                  <Link to={it.link[1]} className="link-draw mt-4 inline-block text-sm font-medium text-copper-deep">{it.link[0]} →</Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- BELIEFS (sticky notes) ---------------- */
function Beliefs() {
  const rots = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2']
  const tones = ['#f3ead0', '#ead9c2', '#f0e3cf', '#e9dcc6']
  return (
    <section className="mx-auto max-w-[1160px] px-5 py-20 sm:px-8 sm:py-24">
      <p className="font-hand text-3xl text-copper-deep sm:text-4xl">what I believe —</p>
      <div className="mt-12 grid gap-10 sm:grid-cols-2">
        {beliefs.map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, ease: EASE, delay: i * 0.05 }}
            className={`relative px-7 py-9 shadow-[0_20px_38px_-20px_rgba(23,23,23,0.45)] ${rots[i % rots.length]}`}
            style={{ background: tones[i % tones.length] }}
          >
            <span className="absolute left-1/2 top-3 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-copper-deep shadow" />
            <p className="font-hand text-2xl leading-snug text-ink/80 sm:text-[1.7rem]">{b}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ---------------- FAQ (index cards) ---------------- */
function Faqs() {
  return (
    <section className="tex-grid bg-ivory-dim py-20 sm:py-24">
      <div className="mx-auto max-w-[1160px] px-5 sm:px-8">
        <div className="grid grid-cols-12 gap-x-10 gap-y-10">
          <div className="col-span-12 lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="font-hand text-3xl text-copper-deep sm:text-4xl">good to know —</p>
              <h2 className="mt-1 max-w-xs font-display text-[1.7rem] leading-tight sm:text-[2.1rem]">Questions people ask about Nandita</h2>
              <p className="mt-4 max-w-xs text-[0.95rem] text-ink/60">Tap a card to flip it over.</p>
            </div>
          </div>
          <div className="col-span-12 space-y-5 lg:col-span-7 lg:col-start-6">
            {aboutFaqs.map((f, i) => <IndexCard key={f.q} q={f.q} a={f.a} i={i} />)}
            <p className="pt-2 text-center font-hand text-xl text-ink/55">
              want the whole story? <TextLink to="/silent-screams">it&rsquo;s in my book →</TextLink>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
