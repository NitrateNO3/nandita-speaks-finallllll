import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { RevealText, FadeUp, EASE } from '../components/Motion.jsx'
import { CTA, TextLink, Eyebrow, Accordion, ArrowRight, Parallax } from '../components/UI.jsx'
import { PhotoSlot } from '../components/Media.jsx'
import { themes, talks, homeFaqs, AMAZON_URL } from '../data/content.js'
import { useSeo, schema } from '../lib/useSeo.js'

const EYEBROW_DARK = '[&_.text-copper-deep]:text-copper [&_.text-ink\\/55]:text-ivory/55 [&_.bg-copper\\/50]:bg-copper/60'

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
      <Credibility />
      <Reel />
      <WhyISpeak />
      <BigQuote />
      <Themes />
      <SignatureTalks />
      <Praise />
      <WhoInvites />
      <SingingChemo />
      <BookFeature />
      <HowToInvite />
      <Faqs />
    </>
  )
}

/* ---------------- HERO (centre-stage) ---------------- */
function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yText = useTransform(scrollYProgress, [0, 1], [0, -90])
  const yBand = useTransform(scrollYProgress, [0, 1], [0, 70])
  const yGhost = useTransform(scrollYProgress, [0, 1], [0, -160])
  const op = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col items-center overflow-hidden px-5 pb-24 pt-36 sm:px-8 sm:pt-40">
      {/* drifting wine spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-12%] h-[72vh] w-[94vw] max-w-[1100px] -translate-x-1/2 rounded-full bg-copper/15 blur-[130px]"
        animate={{ x: [-34, 34, -34], opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* giant kinetic ghost word */}
      <motion.span
        aria-hidden
        style={{ y: yGhost }}
        className="pointer-events-none absolute left-1/2 top-[20%] -translate-x-1/2 select-none font-display text-[26vw] italic leading-none text-ink/[0.045]"
      >
        <motion.span className="block" animate={{ x: [-12, 12, -12] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}>belief</motion.span>
      </motion.span>

      {/* centre column */}
      <motion.div style={{ y: yText }} className="relative z-10 mx-auto flex max-w-[1080px] flex-col items-center text-center">
        <FadeUp>
          <div className="flex items-center justify-center gap-4">
            <motion.span className="h-px bg-copper" initial={{ width: 0 }} animate={{ width: 42 }} transition={{ duration: 0.9, ease: EASE, delay: 0.2 }} />
            <span className="text-[0.7rem] uppercase tracking-[0.34em] text-ink/55">Motivational Speaker for Women</span>
            <motion.span className="h-px bg-copper" initial={{ width: 0 }} animate={{ width: 42 }} transition={{ duration: 0.9, ease: EASE, delay: 0.2 }} />
          </div>
        </FadeUp>

        <h1 className="mt-8 font-display text-ink">
          <RevealText text="Life after a" className="block text-[clamp(2.8rem,8vw,7rem)] leading-[0.98]" />
          <span className="block text-[clamp(2.8rem,8vw,7rem)] leading-[0.98]">
            <span className="italic text-copper">setback</span>{' '}
            <RevealText text="can still" className="inline" delay={0.1} />
          </span>
          <span className="relative inline-block">
            <RevealText text="be your own." className="block text-[clamp(2.8rem,8vw,7rem)] leading-[0.98]" delay={0.2} />
            <motion.span
              className="absolute -bottom-1 left-0 h-[2px] bg-copper"
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} style={{ transformOrigin: 'left' }} transition={{ duration: 1, ease: EASE, delay: 1.15 }}
            />
          </span>
        </h1>

        <FadeUp delay={0.55}>
          <p className="mx-auto mt-9 max-w-xl text-lg leading-relaxed text-ink/70">
            I speak to women about believing in themselves again and finding a next step when life has not gone to plan — an entrepreneur and the author of <span className="italic">Silent Screams</span>.
          </p>
        </FadeUp>

        <FadeUp delay={0.68}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-7">
            <CTA>Invite Nandita to Speak</CTA>
            <Link to="/about" className="link-draw text-sm font-medium text-ink/70">Read my story →</Link>
          </div>
          <div className="mt-8 flex items-center justify-center gap-2.5 text-[0.68rem] uppercase tracking-[0.22em] text-ink/45">
            <span className="h-1.5 w-1.5 rounded-full bg-copper" /> Currently booking 2026 · in person &amp; online
          </div>
        </FadeUp>
      </motion.div>

      {/* cinematic portrait band */}
      <motion.div style={{ y: yBand }} className="relative z-10 mt-16 w-full max-w-[1200px]">
        <motion.div
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          animate={{ clipPath: 'inset(0% 0 0 0)' }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.5 }}
          className="relative overflow-hidden"
        >
          <motion.div initial={{ scale: 1.14 }} animate={{ scale: 1 }} transition={{ duration: 2, ease: EASE, delay: 0.5 }}>
            <PhotoSlot label="" ratio="16/5.5" tone="copper" />
          </motion.div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-5 py-4 text-[0.64rem] uppercase tracking-[0.22em] text-ivory/85 sm:px-8">
            <span>Nandita Thakur</span>
            <span>Speaker &middot; Author &middot; Entrepreneur</span>
          </div>
        </motion.div>
        <div className="pointer-events-none absolute -inset-2 border border-ink/12" />
      </motion.div>

      {/* scroll cue */}
      <motion.div style={{ opacity: op }} className="pointer-events-none absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[0.62rem] uppercase tracking-[0.28em] text-ink/40">
        Scroll
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>↓</motion.span>
      </motion.div>
    </section>
  )
}

/* ---------------- CREDIBILITY ---------------- */
function Credibility() {
  const facts = [
    ['Author', 'of Silent Screams'],
    ['Founder', 'of two businesses'],
    ['5 themes', 'drawn from a real life'],
    ['In person / online', 'keynotes & talks'],
  ]
  return (
    <section className="border-y border-ink/12 bg-ivory-dim/40">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-px bg-ink/10 sm:grid-cols-4">
        {facts.map(([big, sub], i) => (
          <motion.div
            key={big}
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
            className="bg-ivory px-5 py-10 text-center sm:px-8 sm:py-12"
          >
            <p className="font-display text-[clamp(1.3rem,2vw,1.9rem)] italic leading-tight text-ink">{big}</p>
            <p className="mt-2.5 text-[0.62rem] uppercase tracking-[0.22em] text-ink/45">{sub}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ---------------- REEL ---------------- */
function Reel() {
  return (
    <section className="tex-dark relative overflow-hidden bg-ink py-24 text-ivory sm:py-32">
      <div className="copper-glow pointer-events-none absolute -left-24 bottom-0 h-[420px] w-[420px]" />
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow index="—" label="Watch" className={EYEBROW_DARK} />
            <RevealText as="h2" text="See Nandita on stage." className="mt-8 font-display text-[clamp(1.9rem,4vw,3.4rem)] italic leading-tight text-ivory" />
          </div>
          <span className="text-[0.7rem] uppercase tracking-[0.22em] text-ivory/45">A two-minute reel</span>
        </div>

        <FadeUp className="mt-12">
          <button type="button" aria-label="Play showreel" className="group relative block w-full overflow-hidden">
            <motion.div initial={{ clipPath: 'inset(100% 0 0 0)' }} whileInView={{ clipPath: 'inset(0% 0 0 0)' }} viewport={{ once: true }} transition={{ duration: 1.1, ease: EASE }}>
              <motion.div initial={{ scale: 1.12 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.9, ease: EASE }}>
                <PhotoSlot label="" ratio="16/8" tone="copper" />
              </motion.div>
            </motion.div>
            <span className="pointer-events-none absolute inset-0 bg-ink/35 transition-colors duration-500 group-hover:bg-ink/25" />
            <span className="pointer-events-none absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-copper text-ivory transition-transform duration-500 group-hover:scale-110 sm:h-24 sm:w-24">
              <span className="absolute inset-0 animate-ping rounded-full bg-copper opacity-40" />
              <svg width="22" height="22" viewBox="0 0 24 24" className="relative ml-1"><path d="M6 4l14 8-14 8z" fill="currentColor" /></svg>
            </span>
            <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between px-5 py-4 text-[0.64rem] uppercase tracking-[0.2em] text-ivory/80 sm:px-8">
              <span>Keynote · women&rsquo;s conference</span>
              <span>02:04</span>
            </span>
          </button>
        </FadeUp>
      </div>
    </section>
  )
}

/* ---------------- WHY I SPEAK ---------------- */
function WhyISpeak() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
      <Eyebrow index="01" label="Why I speak" />
      <div className="mt-12 grid grid-cols-12 gap-x-8 gap-y-14">
        <div className="col-span-12 lg:col-span-7">
          <RevealText as="h2" text="I have had to rebuild more than once." className="max-w-2xl font-display text-[clamp(1.9rem,3.8vw,3.4rem)] leading-[1.08]" />
          <FadeUp delay={0.1}>
            <p className="mt-9 max-w-xl text-lg leading-relaxed text-ink/70">
              I married young, became a mother early and did not finish college. When I realised my marriage might not work, I started working towards earning my own money. That gave me choices I would not otherwise have had.
            </p>
            <p className="mt-6 max-w-xl leading-relaxed text-ink/60">
              I separated after 18 years. Both my parents had cancer at the same time and I looked after them. My father died while my mother was in treatment. I also had cancer myself. I know what it is like to look at your life and ask, <span className="italic text-ink">&ldquo;What do I do now?&rdquo;</span> That question is why I speak.
            </p>
            <p className="mt-10 flex items-center gap-4 text-[0.7rem] uppercase tracking-[0.22em] text-ink/45">
              <span className="h-px w-10 bg-copper" /> Nandita Thakur
            </p>
            <p className="mt-8"><TextLink to="/about">Read the full story</TextLink></p>
          </FadeUp>
        </div>
        <div className="col-span-12 lg:col-span-4 lg:col-start-9">
          <FadeUp delay={0.15}>
            <Parallax offset={40}>
              <div className="relative">
                <PhotoSlot label="" ratio="4/5" tone="stone" />
                <div className="pointer-events-none absolute -inset-3 border border-ink/15" />
              </div>
            </Parallax>
            <p className="mt-7 text-[0.68rem] uppercase tracking-[0.22em] text-ink/45">Nandita, between talks</p>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

/* ---------------- BIG QUOTE ---------------- */
function BigQuote() {
  return (
    <section className="tex-dark relative overflow-hidden bg-ink py-28 text-ivory sm:py-40">
      <div className="copper-glow pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[720px] -translate-x-1/2 -translate-y-1/2" />
      <div className="relative mx-auto max-w-[1050px] px-5 text-center sm:px-8">
        <span className="text-[0.7rem] uppercase tracking-[0.3em] text-copper">In her words</span>
        <RevealText as="h2" text="A small next step is still a step." className="mx-auto mt-9 max-w-4xl font-display text-[clamp(2rem,5.2vw,4.2rem)] italic leading-[1.08] text-ivory" />
        <p className="mt-10 text-[0.68rem] uppercase tracking-[0.24em] text-ivory/45">Nandita Thakur</p>
      </div>
    </section>
  )
}

/* ---------------- THEMES (tiled matrix) ---------------- */
function Themes() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
      <div className="max-w-2xl">
        <Eyebrow index="02" label="What I speak about" />
        <RevealText as="h2" text="Five themes, drawn from a real life." className="mt-8 font-display text-[clamp(1.9rem,4vw,3.4rem)] leading-[1.06]" />
        <FadeUp delay={0.1}>
          <p className="mt-6 max-w-lg leading-relaxed text-ink/60">
            Each one comes from something I lived through — told honestly, with questions the audience can take home.
          </p>
        </FadeUp>
      </div>

      <div className="mt-16 grid gap-px overflow-hidden rounded-[2px] border border-ink/12 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
        {themes.map((t, i) => (
          <motion.div
            key={t.n}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.6, ease: EASE, delay: (i % 3) * 0.08 }}
            className="group relative flex flex-col bg-ivory p-8 transition-colors duration-500 hover:bg-ivory-dim sm:p-10"
          >
            <div className="flex items-start justify-between">
              <span className="font-display text-[2.6rem] italic leading-none text-copper/35 transition-colors duration-500 group-hover:text-copper">{t.n}</span>
              <ArrowRight className="mt-2 -translate-x-2 text-copper opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
            </div>
            <h3 className="mt-10 font-display text-[1.4rem] leading-tight">{t.title}</h3>
            <p className="mt-4 text-[0.92rem] leading-relaxed text-ink/60">{t.body}</p>
          </motion.div>
        ))}

        {/* closing invite tile */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.16 }}
          className="tex-dark flex flex-col justify-between bg-ink p-8 text-ivory sm:p-10"
        >
          <span className="font-display text-[2.6rem] italic leading-none text-copper/60">06</span>
          <div className="mt-10">
            <p className="font-display text-[1.4rem] leading-tight">Each one, shaped to your room.</p>
            <Link to="/contact" className="group mt-6 inline-flex items-center gap-3 text-sm text-ivory/85">
              <span className="link-draw">Invite Nandita to speak</span>
              <ArrowRight className="transition-transform duration-500 group-hover:translate-x-2" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ---------------- SIGNATURE TALKS ---------------- */
function SignatureTalks() {
  return (
    <section className="tex-grid bg-ivory-dim/50 py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow index="03" label="Signature talks" />
            <RevealText as="h2" text="Talks you can bring to your room." className="mt-8 max-w-xl font-display text-[clamp(1.7rem,3vw,2.8rem)] leading-tight" />
          </div>
          <Link to="/speaking" className="link-draw hidden shrink-0 text-sm font-medium text-ink/70 sm:inline-flex">See all talks →</Link>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {talks.map((t, i) => (
            <motion.article
              key={t.title}
              initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
              className="group flex flex-col border border-ink/12 bg-ivory p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-ink/30 hover:shadow-[0_30px_60px_-32px_rgba(23,23,23,0.35)]"
            >
              <span className="text-[0.7rem] uppercase tracking-[0.3em] text-copper">Talk 0{i + 1}</span>
              <h3 className="mt-5 font-display text-[1.4rem] leading-tight">{t.title}</h3>
              <p className="mt-4 flex-1 text-[0.92rem] leading-relaxed text-ink/60">{t.body}</p>
              <p className="mt-6 border-t border-ink/10 pt-5 font-display text-[1.05rem] italic leading-snug text-ink/75">
                &ldquo;{t.questions[0]}&rdquo;
              </p>
              <Link to="/contact" className="mt-6 inline-flex items-center gap-3 text-sm font-medium text-ink">
                <span className="link-draw">Enquire about this talk</span>
                <ArrowRight className="transition-transform duration-500 group-hover:translate-x-2" />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- PRAISE ---------------- */
/* Placeholder quotes with generic role attributions — replace with real, named testimonials
   (name · title · organisation) as they come in; named praise converts far better. */
const PRAISE = [
  { text: 'Our audience did not want her to stop. She spoke to exactly where they were.', by: 'Organiser · women’s leadership forum' },
  { text: 'Honest, warm and completely unscripted. People were still talking about it weeks later.', by: 'People lead · corporate women’s network' },
  { text: 'She turned a room of strangers into a room that trusted each other.', by: 'Host · community event for women' },
]

function Praise() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % PRAISE.length), 6000)
    return () => clearInterval(t)
  }, [])
  const q = PRAISE[i]
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow index="—" label="Praise" className="justify-center" />
        <span aria-hidden className="mt-6 block font-display text-6xl italic leading-none text-copper/50">&ldquo;</span>
        <div className="relative min-h-[220px] sm:min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="absolute inset-0"
            >
              <p className="font-display text-[clamp(1.5rem,3vw,2.6rem)] italic leading-[1.16] text-ink">{q.text}</p>
              <p className="mt-8 text-[0.7rem] uppercase tracking-[0.24em] text-ink/45">{q.by}</p>
            </motion.blockquote>
          </AnimatePresence>
        </div>
        <div className="mt-6 flex items-center justify-center gap-3">
          {PRAISE.map((_, k) => (
            <button
              key={k}
              onClick={() => setI(k)}
              aria-label={`Quote ${k + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${k === i ? 'w-8 bg-copper' : 'w-1.5 bg-ink/20 hover:bg-ink/40'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- WHO CAN INVITE ---------------- */
function WhoInvites() {
  const cards = [
    { n: '01', k: 'For women’s communities & events', d: 'Talks for women’s groups, associations and events, for audiences who want to hear an honest story and take something away to think about.', to: '/speaking#women' },
    { n: '02', k: 'For companies & teams', d: 'Sessions for teams and middle managers on rebuilding self-belief and keeping a life of your own outside work.', to: '/speaking#companies' },
  ]
  return (
    <section className="tex-dark bg-ink py-24 text-ivory sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Eyebrow index="04" label="Who can invite me" className={EYEBROW_DARK} />
        <RevealText as="h2" text="Two rooms. One honest conversation." className="mt-10 max-w-3xl font-display text-[clamp(1.9rem,4.2vw,3.6rem)] leading-[1.06] text-ivory" />
        <div className="mt-16 grid gap-px overflow-hidden border border-ivory/12 bg-ivory/12 lg:grid-cols-2">
          {cards.map((c) => (
            <Link key={c.n} to={c.to} className="group relative bg-ink p-9 transition-colors duration-500 hover:bg-ink-soft sm:p-12">
              <span className="text-[0.7rem] uppercase tracking-[0.3em] text-copper">{c.n}</span>
              <h3 className="mt-7 max-w-sm font-display text-[clamp(1.5rem,2.4vw,2.2rem)] leading-tight transition-colors duration-500 group-hover:text-copper">{c.k}</h3>
              <p className="mt-5 max-w-md leading-relaxed text-ivory/55">{c.d}</p>
              <span className="mt-10 inline-flex items-center gap-3 text-sm text-ivory/80">
                <span className="link-draw">Explore</span>
                <ArrowRight className="transition-transform duration-500 group-hover:translate-x-2" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- SINGING THROUGH CHEMO ---------------- */
function SingingChemo() {
  const bars = Array.from({ length: 60 })
  return (
    <section className="tex-dark relative overflow-hidden bg-copper-deep py-24 text-ivory sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[760px] -translate-x-1/2 rounded-full bg-ivory/[0.07] blur-3xl" />
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid grid-cols-12 gap-x-8 gap-y-10">
          <div className="col-span-12 lg:col-span-6">
            <Eyebrow index="05" label="How I cope" className={EYEBROW_DARK} />
            <RevealText as="h2" text="I kept singing through chemotherapy." className="mt-8 max-w-xl font-display text-[clamp(1.8rem,3.4vw,3rem)] italic leading-[1.1] text-ivory" />
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <FadeUp>
              <p className="text-[0.98rem] leading-relaxed text-ivory/80">
                When I was diagnosed I was living alone. The first thing I did was call my insurance agent to find out what my policy covered, and I began arranging my treatment before I told my family. That is how I cope: when something goes wrong, I start doing what needs to be done.
              </p>
              <p className="mt-5 text-[0.98rem] leading-relaxed text-ivory/80">
                I carried on with my online music classes and kept singing through chemotherapy. Singing gave my days something that had nothing to do with being a patient.
              </p>
              <p className="mt-7"><Link to="/about" className="link-draw text-sm font-medium text-ivory">Read my full story →</Link></p>
            </FadeUp>
          </div>
        </div>
        <div className="mt-16 flex h-14 items-end gap-1.5">
          {bars.map((_, i) => (
            <motion.span
              key={i}
              className="h-full flex-1 origin-bottom bg-ivory/30"
              animate={{ scaleY: [0.1, 0.3 + ((i * 7) % 10) / 18, 0.1] }}
              transition={{ duration: 1.4 + ((i * 3) % 7) * 0.12, repeat: Infinity, ease: 'easeInOut', delay: ((i * 5) % 11) * 0.08 }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- BOOK ---------------- */
function BookCover() {
  return (
    <div className="relative aspect-[3/4.4] w-full overflow-hidden rounded-[2px] bg-gradient-to-br from-[#241e1a] via-[#191411] to-[#120e0c] ring-1 ring-ivory/10">
      <span className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/55 to-transparent" />
      <span className="absolute inset-y-[6px] right-0 w-[5px]" style={{ background: 'repeating-linear-gradient(to bottom, #e7e0d4 0 2px, #c4b69e 2px 3px)' }} />
      <span className="pointer-events-none absolute inset-4 border border-copper/35" />
      <div className="relative flex h-full flex-col items-center justify-between px-6 py-8 text-center">
        <span className="text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-copper/80">a memoir</span>
        <div>
          <h3 className="font-display text-[1.9rem] italic leading-[1.02] text-ivory">Silent<br />Screams</h3>
          <span className="mx-auto mt-4 block h-px w-10 bg-copper/70" />
        </div>
        <span className="text-[0.62rem] uppercase tracking-[0.3em] text-ivory/70" style={{ fontFamily: 'var(--font-display)' }}>Nandita Thakur</span>
      </div>
    </div>
  )
}

function BookFeature() {
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 120, damping: 16 })
  const sry = useSpring(ry, { stiffness: 120, damping: 16 })
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 16)
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 16)
  }
  const onLeave = () => { rx.set(0); ry.set(0) }

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
      <div className="grid grid-cols-12 items-center gap-x-12 gap-y-14">
        <div className="col-span-12 sm:col-span-5 lg:col-span-4" style={{ perspective: 1100 }}>
          <motion.div
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }}
            className="group relative mx-auto max-w-[250px]"
          >
            <div className="absolute -inset-6 -z-10 copper-glow" />
            <span aria-hidden className="absolute inset-0 translate-x-[9px] translate-y-[11px] rounded-[2px] bg-[#0e0b09]" />
            <span aria-hidden className="absolute inset-0 translate-x-[5px] translate-y-[6px] rounded-[2px] bg-[#17120f]" />
            <div className="relative shadow-[0_30px_55px_-24px_rgba(0,0,0,0.6)]">
              <BookCover />
              <span className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-[2px]">
                <span className="absolute -inset-y-16 -left-1/2 w-1/2 rotate-12 bg-gradient-to-r from-transparent via-ivory/25 to-transparent opacity-0 transition-all duration-[900ms] ease-out group-hover:left-[120%] group-hover:opacity-100" />
              </span>
            </div>
          </motion.div>
        </div>

        <div className="col-span-12 sm:col-span-7 lg:col-span-6 lg:col-start-6">
          <Eyebrow index="06" label="My book" />
          <RevealText as="h2" text="Putting the unsaid into words." className="mt-8 max-w-xl font-display text-[clamp(1.8rem,3.4vw,3rem)] italic leading-[1.1]" />
          <FadeUp delay={0.15}>
            <p className="mt-8 max-w-lg leading-relaxed text-ink/70">
              I wrote <span className="serif-italic">Silent Screams</span> to put difficult experiences into words and to find some closure. Writing it is part of why I can speak openly about hard experiences today.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-7">
              <CTA to="/silent-screams">About the book</CTA>
              <a href={AMAZON_URL} target="_blank" rel="noopener noreferrer" className="link-draw text-sm font-medium text-ink/70">Find it on Amazon →</a>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

/* ---------------- HOW TO INVITE ---------------- */
function HowToInvite() {
  const steps = [
    ['01', 'Send an enquiry', 'Share the date or timing, the audience and size, and whether it’s in person or online. No need to book a call first.'],
    ['02', 'We shape the talk', 'I tailor the themes and length to your room and what you want people to leave with.'],
    ['03', 'Nandita speaks', 'An honest, warm talk from real experience — with a few questions your audience takes home.'],
  ]
  return (
    <section className="tex-dark bg-ink py-24 text-ivory sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow index="07" label="How to invite me" className={EYEBROW_DARK} />
            <RevealText as="h2" text="Three steps to a date in the diary." className="mt-8 max-w-xl font-display text-[clamp(1.7rem,3.4vw,3rem)] leading-tight text-ivory" />
          </div>
          <div className="hidden sm:block"><CTA>Start an enquiry</CTA></div>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden border border-ivory/12 bg-ivory/12 lg:grid-cols-3">
          {steps.map(([n, k, d], i) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
              className="bg-ink p-9 sm:p-11"
            >
              <span className="font-display text-5xl italic text-copper/60">{n}</span>
              <h3 className="mt-6 font-display text-[1.5rem] leading-tight">{k}</h3>
              <p className="mt-4 leading-relaxed text-ivory/55">{d}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 sm:hidden"><CTA>Start an enquiry</CTA></div>
      </div>
    </section>
  )
}

/* ---------------- FAQ (switchboard) ---------------- */
function Faqs() {
  const [active, setActive] = useState(0)
  const faq = homeFaqs[active]
  const pad = (n) => String(n + 1).padStart(2, '0')

  return (
    <section className="tex-dark relative overflow-hidden bg-ink py-24 text-ivory sm:py-32">
      <div className="copper-glow pointer-events-none absolute -right-24 top-0 h-[460px] w-[460px]" />
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <Eyebrow index="08" label="For organisers" className={EYEBROW_DARK} />
        <RevealText as="h2" text="Questions organisers ask" className="mt-8 max-w-2xl font-display text-[clamp(1.9rem,4vw,3.4rem)] leading-tight text-ivory" />

        <div className="mt-16 grid grid-cols-12 gap-x-12 gap-y-12">
          {/* question switchboard */}
          <ul className="col-span-12 lg:col-span-6">
            {homeFaqs.map((f, i) => (
              <li key={f.q}>
                <button
                  onClick={() => setActive(i)}
                  className="group relative flex w-full items-center gap-5 border-b border-ivory/10 py-6 pl-5 text-left"
                >
                  {active === i && (
                    <motion.span layoutId="faqMarker" className="absolute left-0 top-1/2 h-9 w-[3px] -translate-y-1/2 bg-copper" transition={{ type: 'spring', stiffness: 320, damping: 30 }} />
                  )}
                  <span className={`font-display text-sm transition-colors duration-300 ${active === i ? 'text-copper' : 'text-ivory/40'}`}>{pad(i)}</span>
                  <span className={`font-display text-[clamp(1.15rem,1.9vw,1.7rem)] leading-snug transition-colors duration-300 ${active === i ? 'text-ivory' : 'text-ivory/45 group-hover:text-ivory/80'}`}>
                    {f.q}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {/* answer panel */}
          <div className="relative col-span-12 lg:col-span-6 lg:pl-8">
            <AnimatePresence mode="wait">
              <motion.span
                key={`n-${active}`}
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                aria-hidden
                className="pointer-events-none absolute -top-14 right-0 select-none font-display text-[12rem] italic leading-none text-ivory/[0.055]"
              >
                {pad(active)}
              </motion.span>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="relative lg:min-h-[260px]"
              >
                <motion.span className="block h-px w-16 bg-copper" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} style={{ transformOrigin: 'left' }} transition={{ duration: 0.6, ease: EASE }} />
                <p className="mt-7 font-display text-[clamp(1.2rem,1.9vw,1.7rem)] italic leading-snug text-ivory">{faq.q}</p>
                <p className="mt-6 max-w-lg leading-relaxed text-ivory/60">{faq.a}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <p className="mt-16 border-t border-ivory/10 pt-10 text-ivory/50">
          Can&rsquo;t find your question? <Link to="/contact" className="link-draw font-medium text-ivory">Just ask →</Link>
        </p>
      </div>
    </section>
  )
}
