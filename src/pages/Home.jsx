import { useRef, useState, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { RevealText, FadeUp, EASE } from '../components/Motion.jsx'
import { CTA, TextLink, Eyebrow, Marquee, Accordion, ArrowRight, Parallax } from '../components/UI.jsx'
import { PhotoSlot } from '../components/Media.jsx'
import { themes, homeFaqs, AMAZON_URL } from '../data/content.js'
import { useSeo, schema } from '../lib/useSeo.js'

export default function Home() {
  useSeo({
    title: 'Nandita Thakur | Motivational Speaker for Women',
    description: "Nandita Thakur speaks to women about rebuilding self-belief after life's setbacks. Women-focused keynotes and motivational talks. Invite her to speak.",
    path: '/',
    jsonLd: schema.home,
  })
  return (
    <>
      <Hero />
      <SpeakStrip />
      <WhyISpeak />
      <WhoInvites />
      <Themes />
      <SingingChemo />
      <BookFeature />
      <Faqs />
    </>
  )
}

/* ---------------- CLOSING CTA ---------------- */
function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-ivory py-28 sm:py-36">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 copper-glow" />
      <span aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 select-none font-display italic leading-none text-ink/[0.035] lg:block">
        <span className="block text-[18vw]">speak</span>
      </span>
      <div className="relative mx-auto max-w-[1500px] px-5 text-center sm:px-8">
        <span className="eyebrow text-copper-deep">Let&rsquo;s talk</span>
        <RevealText as="h2" text="Invite Nandita to speak." className="display-xl mx-auto mt-6 max-w-4xl" />
        <FadeUp delay={0.2} className="mx-auto mt-10 flex max-w-md flex-col items-center gap-7">
          <p className="leading-relaxed text-ink/60">
            Tell me the date, the audience and what you have in mind. You don&rsquo;t need to book a call first.
          </p>
          <CTA>Start the conversation</CTA>
        </FadeUp>
      </div>
    </section>
  )
}

/* ---------------- HERO (scrapbook memoir) ---------------- */
const inkDrop = (delay = 0, rot = 0) => ({
  initial: { opacity: 0, y: -26, rotate: rot - 6 },
  animate: { opacity: 1, y: 0, rotate: rot },
  transition: { type: 'spring', stiffness: 70, damping: 12, delay },
})

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const op = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const yPhoto = useTransform(scrollYProgress, [0, 1], [0, 70])

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden px-5 pt-28 sm:px-8 sm:pt-32">
      {/* warm light + faint ruled-paper feel */}
      <div className="copper-glow pointer-events-none absolute -top-24 right-6 h-[520px] w-[520px]" />

      <div className="relative mx-auto grid max-w-[1320px] grid-cols-12 items-center gap-y-20 pb-20">
        {/* ---------- LEFT: handwritten type ---------- */}
        <div className="col-span-12 lg:col-span-7 lg:pr-4">
          {/* handwritten tag */}
          <motion.p
            {...inkDrop(0.05, -3)}
            className="mb-5 inline-block font-hand text-2xl text-copper-deep sm:text-3xl"
          >
            — a motivational speaker for women
          </motion.p>

          <h1 className="font-display leading-[1.04]">
            <RevealText text="Life after a" className="display-xl block" />

            <span className="block">
              {/* struck-through 'setback' */}
              <span className="relative inline-block align-baseline">
                <RevealText text="setback" className="display-xl serif-italic text-ink" delay={0.08} />
                <motion.svg
                  viewBox="0 0 300 44" preserveAspectRatio="none" aria-hidden
                  className="pointer-events-none absolute left-0 top-1/2 h-[0.62em] w-full -translate-y-1/2 text-copper"
                >
                  <motion.path
                    d="M6 30 C 70 10, 120 36, 182 18 C 236 2, 270 34, 296 16"
                    fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.7, ease: EASE, delay: 1.05 }}
                  />
                </motion.svg>
              </span>
              <RevealText text=" can still be" className="display-xl" delay={0.14} />
            </span>

            {/* looped 'your own.' + margin note */}
            <span className="relative inline-block">
              <RevealText text="your own." className="display-xl block" delay={0.2} />
              <motion.svg
                viewBox="0 0 380 150" preserveAspectRatio="none" aria-hidden
                className="pointer-events-none absolute -left-5 -right-5 -top-4 -bottom-5 h-auto w-auto text-copper"
              >
                <motion.path
                  d="M40 86 C 10 48, 150 20, 250 26 C 350 32, 376 74, 330 106 C 286 136, 120 140, 56 120 C 20 108, 18 92, 44 80"
                  fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 1.1, ease: EASE, delay: 1.35 }}
                />
              </motion.svg>
              <motion.span
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9, duration: 0.6 }}
                className="absolute -right-2 top-0 hidden translate-x-full rotate-6 pl-4 font-hand text-xl text-copper-deep lg:block"
              >
                ✎ still yours
              </motion.span>
            </span>
          </h1>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8, ease: EASE }} className="mt-10 max-w-md">
            <p className="text-lg leading-relaxed text-ink/70">
              I speak to women about believing in themselves again and finding a next step when life has not gone to plan. I&rsquo;m also an entrepreneur and the author of <span className="serif-italic">Silent Screams</span>.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <CTA>Invite Nandita to Speak</CTA>
              <Link to="/about" className="link-draw text-sm font-medium text-ink/70">Read my story →</Link>
            </div>
            <div className="mt-7 flex items-center gap-2.5 text-xs tracking-wide text-ink/50">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-copper opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-copper" />
              </span>
              Currently booking talks for 2026
            </div>
          </motion.div>
        </div>

        {/* ---------- RIGHT: taped photo ---------- */}
        <div className="col-span-12 lg:col-span-5">
          <motion.div style={{ y: yPhoto }} className="relative mx-auto w-[74%] max-w-[300px]">
            {/* annotation + hand-drawn arrow */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 0.8 }}
              className="absolute -left-20 -top-10 z-30 hidden w-40 -rotate-6 text-right lg:block"
            >
              <span className="font-hand text-2xl leading-tight text-ink/70">&ldquo;what do I<br />do now?&rdquo;</span>
              <svg viewBox="0 0 90 70" className="ml-auto mt-1 h-14 w-20 text-copper" aria-hidden>
                <path d="M8 8 C 40 24, 54 20, 72 52" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M72 52 l -13 -2 M72 52 l -3 -13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </motion.div>

            {/* the taped polaroid */}
            <motion.div
              {...inkDrop(0.35, -3)}
              className="relative bg-[#fbf7ef] p-3 pb-14 shadow-[0_30px_60px_-30px_rgba(23,23,23,0.5)]"
            >
              {/* tape strips */}
              <span className="absolute -top-3 left-6 z-20 h-7 w-24 -rotate-6 bg-stone/50 shadow-sm ring-1 ring-ink/5" />
              <span className="absolute -bottom-3 right-5 z-20 h-7 w-20 rotate-[7deg] bg-stone/50 shadow-sm ring-1 ring-ink/5" />

              <div className="overflow-hidden">
                <PhotoSlot label="" ratio="3/3.6" tone="copper" />
              </div>
              <p className="absolute inset-x-0 bottom-3 text-center font-hand text-2xl text-ink/70">
                me, starting over —
              </p>
            </motion.div>

            {/* little doodle */}
            <motion.span
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 0.6 }}
              className="absolute -bottom-6 -right-4 rotate-6 font-hand text-xl text-copper-deep sm:text-2xl"
            >
              ♪ still singing
            </motion.span>
          </motion.div>
        </div>
      </div>

      {/* scroll cue */}
      <motion.div style={{ opacity: op }} className="pointer-events-none absolute bottom-7 left-5 z-10 flex items-center gap-3 font-hand text-xl text-ink/45 sm:left-8">
        scroll
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>↓</motion.span>
      </motion.div>
    </section>
  )
}

/* ---------------- RUNNING RIBBON ---------------- */
const STITCH = { background: 'repeating-linear-gradient(90deg, rgba(244,239,231,0.55) 0 9px, transparent 9px 18px)' }

function Spark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="mx-5 h-4 w-4 shrink-0 text-ivory/75 sm:mx-7 sm:h-5 sm:w-5">
      <path
        d="M12 2 C 12.6 8.2, 15.8 11.2, 22 12 C 15.8 12.8, 12.6 15.8, 12 22 C 11.4 15.8, 8.2 12.8, 2 12 C 8.2 11.2, 11.4 8.2, 12 2 Z"
        fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"
      />
    </svg>
  )
}

function Ticker({ items, speed, reverse = false, render, sep }) {
  return (
    <div className="flex overflow-hidden">
      {[0, 1].map((k) => (
        <motion.div
          key={k}
          className="flex shrink-0 items-center whitespace-nowrap"
          animate={{ x: reverse ? ['-100%', '0%'] : ['0%', '-100%'] }}
          transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
          aria-hidden={k === 1}
        >
          {items.map((it, i) => (
            <span key={i} className="flex items-center">
              {render(it)}
              {sep}
            </span>
          ))}
        </motion.div>
      ))}
    </div>
  )
}

function SpeakStrip() {
  const top = ['Self-belief', 'Independence', 'An identity of your own', 'Living through uncertainty', 'Finding enjoyment again']
  const bottom = ['keynotes', 'honest stories', 'women-focused talks', 'questions to take home', 'a life of your own']

  return (
    <div className="relative bg-copper text-ivory">
      {/* sewn seams */}
      <div className="absolute inset-x-0 top-0 z-20 h-[2px]" style={STITCH} />
      <div className="absolute inset-x-0 bottom-0 z-20 h-[2px]" style={STITCH} />

      {/* tape, like it's stuck down */}
      <span className="absolute -top-2.5 left-[8%] z-30 h-6 w-20 -rotate-6 bg-stone/55 shadow-sm ring-1 ring-ink/5 sm:w-24" />
      <span className="absolute -bottom-2.5 right-[10%] z-30 h-6 w-16 rotate-[7deg] bg-stone/55 shadow-sm ring-1 ring-ink/5 sm:w-20" />

      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-copper to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-copper to-transparent sm:w-28" />

      <div className="overflow-hidden py-6 sm:py-7">
        <Ticker
          items={top}
          speed={36}
          sep={<Spark />}
          render={(t) => <span className="font-display text-[1.7rem] italic leading-none sm:text-[2.7rem]">{t}</span>}
        />
        <Ticker
          items={bottom}
          speed={44}
          reverse
          sep={<span className="mx-5 text-ivory/45 sm:mx-7">&middot;</span>}
          render={(t) => <span className="font-hand text-2xl text-ivory/85 sm:text-[2rem]">{t}</span>}
        />
      </div>
    </div>
  )
}

/* ---------------- WHY I SPEAK (journal page) ---------------- */
function HandUnderline({ children, delay = 0 }) {
  return (
    <span className="relative inline-block">
      {children}
      <motion.svg
        viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden
        className="pointer-events-none absolute -bottom-1 left-0 h-2 w-full text-copper"
      >
        <motion.path
          d="M2 7 C 60 1, 150 11, 198 4"
          fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE, delay }}
        />
      </motion.svg>
    </span>
  )
}

function WhyISpeak() {
  return (
    <section className="relative mx-auto max-w-[1160px] overflow-hidden px-5 py-16 sm:px-8 sm:py-20">
      <div className="grid grid-cols-12 items-start gap-x-10 gap-y-12">
        {/* LEFT: paper-clipped snapshot + sticky note */}
        <div className="col-span-12 lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 28, rotate: -6 }}
            whileInView={{ opacity: 1, y: 0, rotate: -2.5 }}
            viewport={{ once: true, margin: '-12%' }}
            transition={{ type: 'spring', stiffness: 60, damping: 13 }}
            className="relative mx-auto w-[66%] max-w-[230px] lg:mt-6"
          >
            {/* paperclip */}
            <svg viewBox="0 0 40 96" aria-hidden className="absolute -top-6 left-8 z-20 h-16 w-7 -rotate-6 text-ink/45 drop-shadow-sm">
              <path d="M13 16 L13 68 C13 80 29 80 29 68 L29 28 C29 19 17 19 17 28 L17 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <div className="relative bg-[#fbf7ef] p-2.5 pb-9 shadow-[0_24px_48px_-26px_rgba(23,23,23,0.5)]">
              <div className="overflow-hidden">
                <PhotoSlot label="" ratio="4/4.6" tone="stone" />
              </div>
              <p className="absolute inset-x-0 bottom-2.5 text-center font-hand text-lg text-ink/70">me, between talks —</p>
            </div>

            {/* pinned sticky note */}
            <div className="absolute -bottom-12 -right-10 z-20 w-36 rotate-[5deg] bg-[#f3ead0] px-4 py-3 shadow-[0_14px_26px_-14px_rgba(23,23,23,0.5)]">
              <span className="absolute left-1/2 top-1.5 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-copper-deep shadow-sm" />
              <p className="mt-1.5 text-center font-hand text-lg leading-tight text-ink/75">a small next step is still a step.</p>
            </div>
          </motion.div>
        </div>

        {/* RIGHT: the entry */}
        <div className="relative col-span-12 lg:col-span-7 lg:pl-10">
          {/* ink date stamp */}
          <span aria-hidden className="absolute right-0 top-0 hidden -rotate-6 rounded-sm border-2 border-copper/35 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-copper/55 lg:block">
            Mumbai · a real life
          </span>
          {/* faint coffee ring */}
          <svg viewBox="0 0 100 100" aria-hidden className="pointer-events-none absolute -right-6 top-20 hidden h-24 w-24 text-copper/15 lg:block">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="4" />
            <circle cx="50" cy="50" r="33" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>

          {/* notebook margin rule */}
          <span aria-hidden className="absolute left-0 top-1 hidden h-[84%] w-px bg-copper/40 lg:block" />
          <span aria-hidden className="absolute left-[3px] top-1 hidden h-[84%] w-px bg-copper/20 lg:block" />

          <FadeUp>
            <p className="font-hand text-2xl text-copper-deep sm:text-3xl">why I speak —</p>
            <h2 className="mt-1 max-w-sm font-display text-[1.6rem] leading-tight sm:text-[2rem]">Why I speak to women about self-belief</h2>
          </FadeUp>

          <FadeUp delay={0.1} className="mt-6">
            <p className="max-w-lg font-display text-lg leading-snug text-ink first-letter:float-left first-letter:mr-2.5 first-letter:mt-1 first-letter:font-display first-letter:text-[3rem] first-letter:not-italic first-letter:font-normal first-letter:leading-[0.7] first-letter:text-copper sm:text-xl">
              I married young, became a mother early and did not finish college. When I realised my marriage might not work, I started <HandUnderline delay={0.35}>earning my own money</HandUnderline>. That gave me <HandUnderline delay={0.7}>choices I would not otherwise have had</HandUnderline>.
            </p>
          </FadeUp>

          <FadeUp delay={0.15} className="mt-5">
            <p className="max-w-lg text-[0.95rem] leading-relaxed text-ink/65">
              I have had to rebuild more than once. I separated after 18 years of marriage. Both my parents had cancer at the same time and I looked after them. My father died while my mother was in treatment. I also had cancer myself.
            </p>
          </FadeUp>

          {/* the scrawled question */}
          <FadeUp delay={0.1} className="mt-7 max-w-lg">
            <p className="text-[0.95rem] text-ink/60">So I know what it is to look at your life and ask —</p>
            <span className="relative mt-1 inline-block">
              <p className="font-hand text-3xl leading-[1.05] text-ink sm:text-[2.4rem]">what do I do now?</p>
              <motion.svg
                viewBox="0 0 420 120" preserveAspectRatio="none" aria-hidden
                className="pointer-events-none absolute -left-4 -right-4 -top-3 -bottom-3 text-copper"
              >
                <motion.path
                  d="M36 70 C 8 36, 180 14, 300 20 C 404 26, 418 62, 372 92 C 318 120, 118 122, 54 100 C 18 88, 20 74, 42 66"
                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
                />
              </motion.svg>
              <span className="absolute -right-2 bottom-0 hidden translate-x-full rotate-3 pl-3 font-hand text-base text-copper-deep xl:block">← the reason I speak</span>
            </span>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-ink/65">That question is why I speak.</p>
          </FadeUp>

          <p className="mt-6 -rotate-2 font-hand text-3xl text-copper-deep">— Nandita</p>
          <p className="mt-4 text-sm"><TextLink to="/about">Read the full story on my About page →</TextLink></p>
        </div>
      </div>
    </section>
  )
}

/* ---------------- WHO CAN INVITE (invitation cards) ---------------- */
function InviteCard({ addressee, title, desc, cta, to, rotClass, delay }) {
  return (
    <FadeUp delay={delay}>
      <Link to={to} className="group block">
        <div className={`relative overflow-hidden rounded-[3px] bg-[#fbf7ef] px-7 pb-8 pt-7 text-ink shadow-[0_26px_50px_-24px_rgba(0,0,0,0.65)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 group-hover:rotate-0 group-hover:shadow-[0_44px_74px_-28px_rgba(0,0,0,0.75)] sm:px-9 sm:pb-9 ${rotClass}`}>
          {/* double-rule invite border */}
          <span className="pointer-events-none absolute inset-2.5 rounded-[2px] border border-copper/30" />
          <span className="pointer-events-none absolute inset-[13px] rounded-[2px] border border-copper/15" />

          {/* postage stamp */}
          <div className="absolute right-5 top-5 z-10 h-14 w-12 rotate-6 bg-ivory p-1 shadow-sm transition-transform duration-500 group-hover:-rotate-3 sm:right-7">
            <div className="flex h-full w-full items-center justify-center border border-dashed border-copper/55 bg-copper/10">
              <span className="font-display text-base italic text-copper-deep">NT</span>
            </div>
          </div>

          <div className="relative z-10">
            <p className="max-w-[70%] font-hand text-xl text-copper-deep">To: {addressee}</p>
            <span className="eyebrow mt-5 block text-copper-deep">An invitation</span>
            <h3 className="mt-2 max-w-sm font-display text-[1.45rem] leading-tight sm:text-[1.8rem]">{title}</h3>
            <p className="mt-4 max-w-sm text-[0.92rem] leading-relaxed text-ink/60">{desc}</p>

            {/* perforation */}
            <div className="relative my-6">
              <span className="absolute -left-7 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink sm:-left-9" />
              <span className="absolute -right-7 top-1/2 h-5 w-5 -translate-y-1/2 translate-x-1/2 rounded-full bg-ink sm:-right-9" />
              <span className="block border-t border-dashed border-ink/30" />
            </div>

            {/* ticket stub */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2.5 font-display text-lg italic">
                {cta}
                <ArrowRight className="transition-transform duration-500 group-hover:translate-x-1.5" />
              </span>
              <span className="-rotate-3 font-hand text-base text-ink/45">no call needed</span>
            </div>
          </div>
        </div>
      </Link>
    </FadeUp>
  )
}

function WhoInvites() {
  return (
    <section className="tex-dark relative overflow-hidden bg-ink py-16 text-ivory sm:py-20">
      {/* faint postmark rings */}
      <svg viewBox="0 0 120 120" aria-hidden className="pointer-events-none absolute -left-10 top-10 h-48 w-48 text-ivory/[0.05]">
        <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="60" cy="60" r="42" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 5" />
      </svg>

      <div className="relative mx-auto max-w-[1160px] px-5 sm:px-8">
        <p className="font-hand text-2xl text-copper sm:text-3xl">you&rsquo;re invited —</p>
        <RevealText as="h2" text="Two rooms. One honest conversation." className="mt-1 max-w-2xl font-display text-[1.8rem] leading-tight text-ivory sm:text-[2.6rem]" />

        <div className="mt-12 grid gap-8 sm:gap-10 lg:grid-cols-2">
          <InviteCard
            addressee="women's communities & events"
            title="Women's communities & events"
            desc="Talks for women's groups, associations and events, for audiences who want to hear an honest story and take something away to think about."
            cta="Talks for women's events"
            to="/speaking#women"
            rotClass="-rotate-2"
            delay={0}
          />
          <InviteCard
            addressee="companies & teams"
            title="Companies & teams"
            desc="Sessions for teams and middle managers on rebuilding self-belief and keeping a life of your own outside work."
            cta="Sessions for companies & teams"
            to="/speaking#companies"
            rotClass="rotate-2"
            delay={0.1}
          />
        </div>
      </div>
    </section>
  )
}

/* ---------------- THEMES (horizontal scroll rail) ---------------- */
const themeCardV = {
  hidden: { opacity: 0, y: 70, scale: 0.94 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.85, ease: EASE } },
}

function ThemeDot({ p, i, total }) {
  const start = 0.14 + (i / total) * 0.72
  const opacity = useTransform(p, [start - 0.12, start, start + 0.14], [0.28, 1, 0.28])
  const scale = useTransform(p, [start - 0.12, start, start + 0.14], [1, 1.7, 1])
  return <motion.span style={{ opacity, scale }} className="h-1.5 w-1.5 rounded-full bg-copper" />
}

const CARD_ROTS = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2', '-rotate-1']

function Postmark({ n }) {
  return (
    <div className="relative h-[72px] w-[72px] -rotate-6">
      <svg viewBox="0 0 80 80" aria-hidden className="h-full w-full text-copper/50">
        <circle cx="40" cy="40" r="37" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="40" cy="40" r="29" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" />
      </svg>
      <span className="absolute inset-0 flex flex-col items-center justify-center text-copper-deep">
        <span className="font-hand text-xl leading-none">no.</span>
        <span className="font-display text-lg italic leading-none">{n}</span>
      </span>
    </div>
  )
}

function RailBg() {
  const marks = [
    { l: '7%', t: '15%', r: -12, s: 1 },
    { l: '61%', t: '11%', r: 8, s: 0.8 },
    { l: '33%', t: '68%', r: -6, s: 1.15 },
    { l: '82%', t: '60%', r: 14, s: 0.9 },
  ]
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* colour washes */}
      <div className="absolute -left-24 top-8 h-[460px] w-[460px] rounded-full bg-copper/15 blur-3xl" />
      <div className="absolute -right-28 bottom-0 h-[520px] w-[520px] rounded-full bg-copper-deep/10 blur-3xl" />
      <div className="absolute left-1/3 top-1/2 h-[380px] w-[380px] -translate-y-1/2 rounded-full bg-stone/40 blur-3xl" />
      {/* graph grid */}
      <div className="tex-grid absolute inset-0 opacity-60" />
      {/* dashed travel routes */}
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 1600 900" fill="none">
        <motion.path d="M-40 680 C 360 420, 760 820, 1120 480 C 1360 260, 1560 360, 1680 260" stroke="rgba(183,123,97,0.35)" strokeWidth="2" strokeDasharray="2 12" strokeLinecap="round" animate={{ strokeDashoffset: [0, -56] }} transition={{ duration: 3, ease: 'linear', repeat: Infinity }} />
        <motion.path d="M-40 240 C 300 360, 640 180, 980 320 C 1240 430, 1500 300, 1680 420" stroke="rgba(23,23,23,0.13)" strokeWidth="2" strokeDasharray="2 12" strokeLinecap="round" animate={{ strokeDashoffset: [0, -56] }} transition={{ duration: 4, ease: 'linear', repeat: Infinity }} />
      </svg>
      {/* scattered postmarks */}
      {marks.map((m, i) => (
        <svg key={i} viewBox="0 0 80 80" className="absolute h-24 w-24 text-copper/15" style={{ left: m.l, top: m.t, transform: `rotate(${m.r}deg) scale(${m.s})` }}>
          <circle cx="40" cy="40" r="37" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="40" cy="40" r="28" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 5" />
        </svg>
      ))}
      {/* giant faint handwriting */}
      <span className="absolute left-[5%] top-[25%] -rotate-6 font-hand text-[7vw] leading-none text-ink/[0.05]">wish you were here</span>
      <span className="absolute bottom-[15%] right-[4%] rotate-3 font-hand text-[6vw] leading-none text-copper/[0.1]">from a real life</span>
      {/* floating sparkles */}
      <motion.span className="absolute left-[46%] top-[20%] text-xl text-copper/40" animate={{ y: [0, -14, 0], rotate: [0, 20, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>✦</motion.span>
      <motion.span className="absolute left-[24%] top-[42%] text-2xl text-copper-deep/40" animate={{ y: [0, 12, 0], rotate: [0, -20, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>✶</motion.span>
      <motion.span className="absolute right-[30%] top-[30%] text-lg text-copper/35" animate={{ y: [0, -10, 0], rotate: [0, 16, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}>✦</motion.span>
    </div>
  )
}

function ThemesRail() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [range, setRange] = useState(0)

  // measure how far the track must travel horizontally
  useLayoutEffect(() => {
    const calc = () => {
      const el = trackRef.current
      if (!el) return
      setRange(Math.max(0, el.scrollWidth - window.innerWidth))
    }
    calc()
    window.addEventListener('resize', calc)
    const t = setTimeout(calc, 400) // re-measure once web fonts settle
    return () => {
      window.removeEventListener('resize', calc)
      clearTimeout(t)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const x = useTransform(scrollYProgress, [0, 1], [0, -range])
  const numX = useTransform(x, (v) => -v * 0.12) // numbers lag behind for depth

  return (
    <section
      ref={sectionRef}
      style={{ height: `calc(100vh + ${range}px)` }}
      className="relative hidden bg-gradient-to-br from-ivory via-ivory-dim to-stone lg:block"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <RailBg />
        {/* top framing row */}
        <div className="absolute inset-x-0 top-0 flex items-end justify-between px-8 pt-28">
          <span className="font-hand text-3xl text-copper-deep">what I speak about —</span>
          <span className="flex items-center gap-3 font-hand text-xl text-ink/45">
            scroll to explore
            <span className="h-px w-8 bg-copper" />
          </span>
        </div>

        {/* horizontal track */}
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex items-center gap-10 pl-8 pr-[22vw] will-change-transform"
        >
          {/* intro panel */}
          <div className="shrink-0 w-[70vw] max-w-[440px]">
            <p className="font-hand text-3xl text-copper-deep sm:text-4xl">postcards from a real life —</p>
            <RevealText as="h2" text="Five themes I speak about." className="mt-1 max-w-md font-display text-[2rem] leading-tight sm:text-[2.6rem]" />
            <FadeUp delay={0.15}>
              <p className="mt-5 max-w-sm leading-relaxed text-ink/65">
                Each one is a note from something I lived through — told honestly, with questions the audience can take home.
              </p>
              <div className="mt-8"><CTA variant="outline">Invite Nandita to Speak</CTA></div>
            </FadeUp>
          </div>

          {/* theme postcards */}
          {themes.map((t, i) => (
            <motion.article
              key={t.n}
              variants={themeCardV}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              className="shrink-0"
            >
              <div className={`group relative flex h-[60vh] max-h-[440px] w-[78vw] max-w-[470px] flex-col justify-between overflow-hidden rounded-[3px] bg-[#fbf7ef] p-8 text-ink shadow-[0_26px_50px_-24px_rgba(23,23,23,0.45)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:rotate-0 sm:p-9 ${CARD_ROTS[i % CARD_ROTS.length]}`}>
                {/* double-rule postcard border */}
                <span className="pointer-events-none absolute inset-2.5 rounded-[2px] border border-copper/25" />

                {/* top: handwritten tag + stamps */}
                <div className="relative flex items-start justify-between">
                  <span className="font-hand text-2xl text-copper-deep">a postcard —</span>
                  <motion.div style={{ x: numX }} className="flex items-start gap-2">
                    <div className="mt-1 h-12 w-10 rotate-6 bg-ivory p-1 shadow-sm">
                      <div className="flex h-full w-full items-center justify-center border border-dashed border-copper/55 bg-copper/10">
                        <span className="font-display text-sm italic text-copper-deep">NT</span>
                      </div>
                    </div>
                    <Postmark n={t.n} />
                  </motion.div>
                </div>

                {/* bottom: the message */}
                <div className="relative">
                  <span className="eyebrow text-copper">{t.n} / 05</span>
                  <h3 className="mt-3 font-display text-[1.7rem] leading-tight transition-colors duration-500 group-hover:text-copper-deep sm:text-[2.1rem]">
                    {t.title}
                  </h3>
                  <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-ink/65">{t.body}</p>
                  <div className="relative mt-6">
                    <span className="block h-px w-full bg-ink/15" />
                    <span className="absolute -top-5 left-0 font-hand text-lg text-ink/55">— from a real life</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}

          {/* outro / CTA panel */}
          <div className="flex shrink-0 w-[64vw] max-w-[360px] flex-col justify-center">
            <p className="font-hand text-3xl text-copper-deep">last stop —</p>
            <RevealText as="h3" text="Your audience could hear one of these next." className="mt-1 max-w-xs font-display text-[1.7rem] leading-tight sm:text-[2.1rem]" />
            <FadeUp delay={0.1}><div className="mt-7"><CTA>Invite Nandita to Speak</CTA></div></FadeUp>
          </div>
        </motion.div>

        {/* right edge fade */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-28 bg-gradient-to-l from-ivory to-transparent" />

        {/* chapter dots */}
        <div className="absolute bottom-16 right-8 flex items-center gap-2.5">
          {themes.map((t, i) => (
            <ThemeDot key={t.n} p={scrollYProgress} i={i} total={themes.length} />
          ))}
        </div>

        {/* progress bar */}
        <div className="absolute inset-x-8 bottom-10">
          <div className="h-px w-full bg-ink/12">
            <motion.div style={{ scaleX: scrollYProgress }} className="h-px w-full origin-left bg-copper" />
          </div>
        </div>
      </div>
    </section>
  )
}

function ThemesStack() {
  return (
    <section className="relative mx-auto max-w-[1500px] px-5 py-16 lg:hidden">
      <p className="font-hand text-3xl text-copper-deep">postcards from a real life —</p>
      <RevealText as="h2" text="Five themes I speak about." className="mt-1 max-w-xs font-display text-[1.7rem] leading-tight" />
      <p className="mt-5 max-w-sm leading-relaxed text-ink/65">
        Each one is a note from something I lived through — told honestly, with questions the audience can take home.
      </p>
      <ul className="mt-10 space-y-6">
        {themes.map((t, i) => (
          <motion.li
            key={t.n}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-12%' }}
            transition={{ duration: 0.65, ease: EASE }}
            className={`relative overflow-hidden rounded-[3px] bg-[#fbf7ef] p-6 shadow-[0_18px_36px_-22px_rgba(23,23,23,0.45)] ${CARD_ROTS[i % CARD_ROTS.length]}`}
          >
            <span className="pointer-events-none absolute inset-2 rounded-[2px] border border-copper/25" />
            <div className="relative flex items-start justify-between gap-4">
              <div>
                <span className="eyebrow text-copper">{t.n} / 05</span>
                <h3 className="mt-2 font-display text-[1.4rem] leading-tight">{t.title}</h3>
              </div>
              <Postmark n={t.n} />
            </div>
            <p className="relative mt-3 leading-relaxed text-ink/65">{t.body}</p>
          </motion.li>
        ))}
      </ul>
      <div className="mt-9"><CTA variant="outline">Invite Nandita to Speak</CTA></div>
    </section>
  )
}

function Themes() {
  return (
    <>
      <ThemesRail />
      <ThemesStack />
    </>
  )
}

/* ---------------- SINGING THROUGH CHEMO ---------------- */
const EYEBROW_ON_DARK = '[&_.text-copper-deep]:text-ivory [&_.text-ink\\/55]:text-ivory/70 [&_.bg-copper\\/50]:bg-ivory/40'

function SingingChemo() {
  const bars = Array.from({ length: 56 })
  return (
    <section className="tex-dark relative overflow-hidden bg-copper-deep py-20 text-ivory sm:py-24">
      {/* soft stage light */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-ivory/[0.08] blur-3xl" />
      {/* faint sheet-music staff */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[38%] hidden h-14 opacity-[0.1] lg:block"
        style={{ background: 'repeating-linear-gradient(to bottom, transparent 0 12px, rgba(244,239,231,1) 12px 13px)' }}
      />

      <div className="relative mx-auto grid max-w-[1160px] grid-cols-12 items-center gap-x-10 gap-y-14 px-5 sm:px-8">
        {/* spinning vinyl */}
        <div className="col-span-12 flex justify-center lg:col-span-5 lg:justify-start">
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
              className="h-52 w-52 sm:h-64 sm:w-64"
            >
              <svg viewBox="0 0 200 200" className="h-full w-full drop-shadow-[0_24px_40px_rgba(0,0,0,0.45)]">
                <circle cx="100" cy="100" r="99" fill="#1b1512" />
                {[92, 84, 76, 68, 60, 52].map((r) => (
                  <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="rgba(244,239,231,0.10)" strokeWidth="1" />
                ))}
                <circle cx="100" cy="100" r="40" fill="#b77b61" />
                <circle cx="100" cy="100" r="40" fill="none" stroke="rgba(23,23,23,0.25)" strokeWidth="1" />
                <text x="100" y="93" textAnchor="middle" className="fill-ivory" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '15px' }}>still</text>
                <text x="100" y="112" textAnchor="middle" className="fill-ivory" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '15px' }}>singing</text>
                <circle cx="100" cy="100" r="3.5" fill="#1b1512" />
                <path d="M100 3 A97 97 0 0 1 197 100" fill="none" stroke="rgba(244,239,231,0.12)" strokeWidth="7" />
              </svg>
            </motion.div>

            {/* tonearm */}
            <svg viewBox="0 0 120 120" aria-hidden className="pointer-events-none absolute -right-6 -top-5 h-24 w-24 text-ivory/75 sm:h-28 sm:w-28">
              <circle cx="104" cy="16" r="7" fill="currentColor" />
              <path d="M104 16 L62 68" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              <circle cx="62" cy="68" r="4.5" fill="currentColor" />
            </svg>

            <span className="absolute -bottom-7 left-1 -rotate-3 font-hand text-xl text-ivory/80">♪ side A — through chemo</span>
          </div>
        </div>

        {/* text */}
        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <p className="font-hand text-2xl text-ivory/80 sm:text-3xl">how I cope —</p>
          <RevealText as="h2" text="I kept singing through chemotherapy." className="mt-1 max-w-xl font-display text-[1.9rem] italic leading-tight text-ivory sm:text-[2.5rem]" />
          <FadeUp delay={0.1}>
            <p className="mt-6 max-w-lg text-[0.96rem] leading-relaxed text-ivory/85">
              When I was diagnosed I was living alone. The first thing I did was call my insurance agent to find out what my policy covered, and I began arranging my treatment before I told my family. That is how I cope: when something goes wrong, I start doing what needs to be done. Other people cope in other ways, and that is fine.
            </p>
            <p className="mt-4 max-w-lg text-[0.96rem] leading-relaxed text-ivory/85">
              I carried on with my online music classes and kept singing through chemotherapy. Singing gave my days something that had nothing to do with being a patient.
            </p>
            <p className="mt-6">
              <Link to="/about" className="link-draw font-medium text-ivory">Read my full story →</Link>
            </p>
          </FadeUp>
        </div>
      </div>

      {/* the soundtrack — live waveform */}
      <div className="relative mx-auto mt-14 max-w-[1160px] px-5 sm:px-8">
        <div className="mb-2 flex items-center justify-between font-hand text-lg text-ivory/60">
          <span>the soundtrack —</span>
          <span>♪ still singing ♫</span>
        </div>
        <div className="relative flex h-20 items-end gap-[3px]">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-copper-deep to-transparent sm:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-copper-deep to-transparent sm:w-28" />
          {bars.map((_, i) => (
            <motion.span
              key={i}
              className="h-full flex-1 origin-bottom rounded-full bg-ivory/55"
              animate={{ scaleY: [0.16, 0.35 + ((i * 7) % 10) / 14, 0.16] }}
              transition={{
                duration: 1 + ((i * 3) % 9) * 0.14,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: ((i * 5) % 11) * 0.09,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- BOOK FEATURE ---------------- */
function BookCover() {
  return (
    <div className="relative aspect-[3/4.4] w-full overflow-hidden rounded-[2px] bg-gradient-to-br from-[#241e1a] via-[#191411] to-[#120e0c] ring-1 ring-ivory/10">
      {/* binding shadow + page edge */}
      <span className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/55 to-transparent" />
      <span className="absolute inset-y-[6px] right-0 w-[5px]" style={{ background: 'repeating-linear-gradient(to bottom, #e7e0d4 0 2px, #c4b69e 2px 3px)' }} />
      {/* copper frame */}
      <span className="pointer-events-none absolute inset-4 border border-copper/35" />
      {/* type */}
      <div className="relative flex h-full flex-col items-center justify-between px-6 py-8 text-center">
        <span className="text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-copper/80">a memoir</span>
        <div>
          <h3 className="font-display text-[1.9rem] italic leading-[1.02] text-ivory">Silent<br />Screams</h3>
          <span className="mx-auto mt-4 block h-px w-10 bg-copper/70" />
          <span className="mt-3 block font-hand text-lg text-ivory/55">the things we don&rsquo;t say</span>
        </div>
        <span className="text-[0.62rem] uppercase tracking-[0.3em] text-ivory/70" style={{ fontFamily: 'var(--font-display)' }}>Nandita Thakur</span>
      </div>
    </div>
  )
}

function BookFeature() {
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 120, damping: 14 })
  const sry = useSpring(ry, { stiffness: 120, damping: 14 })
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    ry.set(px * 20)
    rx.set(-py * 20)
  }
  const onLeave = () => { rx.set(0); ry.set(0) }

  return (
    <section className="tex-dark relative overflow-hidden bg-ink py-24 text-ivory sm:py-32">
      <div className="pointer-events-none absolute right-0 top-1/2 h-[520px] w-[520px] -translate-y-1/2 copper-glow" />
      <span className="pointer-events-none absolute -bottom-8 left-0 select-none font-display italic leading-none text-ivory/[0.04]">
        <span className="block text-[20vw]">Silent</span>
      </span>

      <div className="relative mx-auto grid max-w-[1160px] grid-cols-12 items-center gap-x-10 gap-y-20 px-5 sm:px-8">
        {/* cover + library card */}
        <div className="col-span-12 sm:col-span-6 lg:col-span-5">
          <div className="relative mx-auto max-w-[240px]" style={{ perspective: 1100 }}>
            {/* ground shadow */}
            <div aria-hidden className="pointer-events-none absolute -bottom-8 left-1/2 h-7 w-4/5 -translate-x-1/2 rounded-[50%] bg-black/45 blur-xl" />
            {/* margin annotation */}
            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6, duration: 0.8 }}
              className="absolute -left-28 top-4 z-30 hidden w-40 -rotate-6 text-right xl:block"
            >
              <span className="font-hand text-xl leading-tight text-ivory/75">the chapter I<br />almost didn&rsquo;t write</span>
              <svg viewBox="0 0 90 70" aria-hidden className="ml-auto mt-1 h-14 w-20 text-copper">
                <path d="M8 8 C 42 18, 58 24, 74 54" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M74 54 l -13 -1 M74 54 l -2 -13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </motion.div>

            {/* 3D tilt cover (a real book) */}
            <motion.div
              onMouseMove={onMove}
              onMouseLeave={onLeave}
              style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }}
              className="group relative"
            >
              <div className="absolute -inset-6 -z-10 copper-glow" />
              {/* stacked-page depth */}
              <span aria-hidden className="absolute inset-0 translate-x-[9px] translate-y-[11px] rounded-[2px] bg-[#0e0b09]" />
              <span aria-hidden className="absolute inset-0 translate-x-[5px] translate-y-[6px] rounded-[2px] bg-[#17120f]" />
              {/* cover */}
              <div className="relative shadow-[0_30px_55px_-24px_rgba(0,0,0,0.8)]">
                <BookCover />
                <span className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-[2px]">
                  <span className="absolute -inset-y-16 -left-1/2 w-1/2 rotate-12 bg-gradient-to-r from-transparent via-ivory/25 to-transparent opacity-0 transition-all duration-[900ms] ease-out group-hover:left-[120%] group-hover:opacity-100" />
                </span>
              </div>
            </motion.div>

            {/* library date-due card tucked in the pocket */}
            <div className="absolute -bottom-12 -right-5 z-20 w-44 rotate-[4deg] bg-[#f3ead0] px-3.5 py-3 text-ink shadow-[0_20px_36px_-18px_rgba(0,0,0,0.75)] sm:-right-10">
              <p className="text-center text-[0.55rem] font-semibold uppercase tracking-[0.25em] text-ink/70">Date Due</p>
              <div className="mt-2 space-y-2">
                {['12 Mar', '04 Jun', '19 Sep'].map((d) => (
                  <div key={d} className="flex items-center justify-between border-b border-ink/15 pb-1.5">
                    <span className="font-hand text-base text-ink/50">borrowed</span>
                    <span className="-rotate-3 rounded-sm border border-copper-deep/60 px-1.5 py-0.5 text-[0.55rem] font-bold uppercase tracking-wider text-copper-deep">{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 sm:col-span-6 lg:col-span-6 lg:col-start-7">
          <p className="font-hand text-2xl text-copper sm:text-3xl">from my book —</p>
          <RevealText as="h2" text="Putting the unsaid into words." className="mt-1 max-w-xl font-display text-[1.9rem] italic leading-tight text-ivory sm:text-[2.5rem]" />
          <FadeUp delay={0.15}>
            <p className="mt-6 max-w-lg text-[0.98rem] leading-relaxed text-ivory/75">
              I wrote <span className="serif-italic">Silent Screams</span> to put difficult experiences into words and to <HandUnderline delay={0.4}>find some closure</HandUnderline>. Writing it is part of why I can speak openly about hard experiences today.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <CTA to="/silent-screams">About the book</CTA>
              <a href={AMAZON_URL} target="_blank" rel="noopener noreferrer" className="link-draw text-sm font-medium text-ivory/80">Find it on Amazon →</a>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

/* ---------------- FAQ (index-card box) ---------------- */
function IndexCard({ q, a, i }) {
  const [open, setOpen] = useState(false)
  const rot = i % 2 === 0 ? '-rotate-1' : 'rotate-1'
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`group relative rounded-[3px] bg-[#fbf7ef] shadow-[0_14px_30px_-18px_rgba(23,23,23,0.5)] transition-transform duration-500 hover:rotate-0 ${rot}`}
    >
      {/* punched ring hole */}
      <span className="absolute left-1/2 top-2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-ivory-dim ring-1 ring-ink/10" />
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center gap-4 px-6 pb-4 pt-6 text-left">
        <span className="shrink-0 font-hand text-2xl text-copper-deep">Q.</span>
        <h3 className="flex-1 font-display text-[1.1rem] leading-snug text-ink sm:text-[1.25rem]">{q}</h3>
        <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${open ? 'rotate-45 border-ink bg-ink text-ivory' : 'border-ink/25 text-ink/60'}`}>
          <svg width="12" height="12" viewBox="0 0 14 14"><path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
        </span>
      </button>
      <span className="pointer-events-none mx-6 block h-px bg-copper/25" />
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="overflow-hidden"
      >
        <div className="flex gap-4 px-6 pb-6 pt-3">
          <span className="shrink-0 font-hand text-2xl text-ink/40">A.</span>
          <p className="text-[0.95rem] leading-relaxed text-ink/70">{a}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

function Faqs() {
  return (
    <section className="tex-grid relative bg-ivory-dim py-20 sm:py-24">
      <div className="mx-auto max-w-[1160px] px-5 sm:px-8">
        <div className="grid grid-cols-12 gap-x-10 gap-y-10">
          <div className="col-span-12 lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="font-hand text-3xl text-copper-deep sm:text-4xl">pull a card —</p>
              <h2 className="mt-1 max-w-xs font-display text-[1.7rem] leading-tight sm:text-[2.1rem]">Questions organisers ask</h2>
              <p className="mt-4 max-w-xs text-[0.95rem] text-ink/60">Tap a card to flip it over.</p>
              <span className="mt-6 inline-block -rotate-2 bg-ink px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-ivory">Organisers · A–Z</span>
              <FadeUp delay={0.2}>
                <div className="mt-8"><CTA variant="outline">Invite Nandita to Speak</CTA></div>
              </FadeUp>
            </div>
          </div>
          <div className="col-span-12 space-y-5 lg:col-span-7 lg:col-start-6">
            {homeFaqs.map((f, i) => (
              <IndexCard key={f.q} q={f.q} a={f.a} i={i} />
            ))}
            <p className="pt-2 text-center font-hand text-xl text-ink/55">
              can&rsquo;t find your card? <TextLink to="/contact">just ask →</TextLink>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
