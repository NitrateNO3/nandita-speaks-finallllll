import { motion } from 'framer-motion'
import { RevealText, FadeUp, EASE } from '../components/Motion.jsx'
import { CTA } from '../components/UI.jsx'
import { PhotoSlot } from '../components/Media.jsx'
import { useSeo } from '../lib/useSeo.js'

/* Placeholder entries — swap for a CMS feed once posts are published. */
const posts = [
  { tag: 'Self-belief', title: 'What do I do with my life now?', excerpt: 'On the question that arrives after a setback — and the first small step back.', read: '4 min', tone: 'copper' },
  { tag: 'Independence', title: 'The day I called my insurance agent', excerpt: 'How doing the next practical thing became the way I cope.', read: '5 min', tone: 'stone' },
  { tag: 'Finding joy', title: 'Still singing through chemotherapy', excerpt: 'Why I kept my music classes when everything else had changed.', read: '3 min', tone: 'ink' },
  { tag: 'Identity', title: 'Keeping a life of your own', excerpt: 'A few interests that belong only to you — and why they matter.', read: '4 min', tone: 'stone' },
]

const ROTS = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2']

export default function Blog() {
  useSeo({
    title: 'The Journal | Nandita Thakur',
    description: 'Short, honest writing on self-belief, independence and finding your way forward, by motivational speaker Nandita Thakur.',
    path: '/blog/',
  })
  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden px-5 pb-12 pt-36 sm:px-8 sm:pt-44">
        <div className="copper-glow pointer-events-none absolute -right-10 top-10 h-[460px] w-[500px]" />
        <div className="mx-auto max-w-[1160px]">
          <motion.p initial={{ opacity: 0, y: -10, rotate: -4 }} animate={{ opacity: 1, y: 0, rotate: -3 }} transition={{ duration: 0.7, ease: EASE }} className="mb-4 inline-block font-hand text-2xl text-copper-deep sm:text-3xl">
            — the journal
          </motion.p>
          <h1 className="font-display leading-[1.03]">
            <RevealText text="Notes between" className="display-xl block" />
            <span className="relative inline-block">
              <RevealText text="the talks." className="display-xl block italic text-ink" delay={0.08} />
              <motion.svg viewBox="0 0 400 20" preserveAspectRatio="none" aria-hidden className="pointer-events-none absolute -bottom-1 left-0 h-3 w-full text-copper sm:h-5">
                <motion.path d="M3 13 C 80 4, 300 4, 397 10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, ease: EASE, delay: 0.9 }} />
              </motion.svg>
            </span>
          </h1>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8, ease: EASE }} className="mt-8 max-w-xl">
            <p className="text-lg leading-relaxed text-ink/70">
              Short, honest writing on self-belief, independence and finding your way forward. New pieces land here first.
            </p>
            <span className="mt-6 inline-block -rotate-2 bg-[#f3ead0] px-4 py-2 font-hand text-xl text-ink/70 shadow-[0_12px_24px_-14px_rgba(23,23,23,0.5)]">
              ✦ previews below — the journal launches soon
            </span>
          </motion.div>
        </div>
      </section>

      {/* ---------------- FEATURED (journal page) ---------------- */}
      <section className="mx-auto max-w-[1160px] px-5 py-10 sm:px-8">
        <FadeUp>
          <article className="group relative grid grid-cols-12 items-center gap-x-10 gap-y-8 -rotate-1 rounded-[3px] bg-[#fbf7ef] p-6 shadow-[0_30px_58px_-30px_rgba(23,23,23,0.5)] transition-transform duration-500 hover:rotate-0 sm:p-9">
            <span className="pointer-events-none absolute inset-3 rounded-[2px] border border-copper/20" />
            <div className="relative col-span-12 lg:col-span-6">
              <span className="absolute -top-3 left-6 z-20 h-6 w-24 -rotate-6 bg-stone/55 shadow-sm ring-1 ring-ink/5" />
              <span className="absolute -bottom-3 right-6 z-20 h-6 w-20 rotate-[7deg] bg-stone/55 shadow-sm ring-1 ring-ink/5" />
              <div className="overflow-hidden rounded-[2px]"><PhotoSlot label="" ratio="16/10" tone="copper" /></div>
            </div>
            <div className="relative col-span-12 lg:col-span-5 lg:col-start-8">
              <span className="font-hand text-xl text-copper-deep">featured · self-belief —</span>
              <h2 className="mt-1 font-display text-[1.7rem] italic leading-tight sm:text-[2.2rem]">Rebuilding belief, more than once</h2>
              <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-ink/65">
                The longer piece behind the talks — what it actually looked like to start over when the plan fell through, told without the gloss.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 font-hand text-xl text-ink/70 transition-transform duration-500 group-hover:translate-x-1">read the piece →</span>
            </div>
          </article>
        </FadeUp>
      </section>

      {/* ---------------- GRID (pinned notes) ---------------- */}
      <section className="mx-auto max-w-[1160px] px-5 pb-24 sm:px-8">
        <p className="font-hand text-3xl text-copper-deep sm:text-4xl">more notes —</p>
        <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.65, ease: EASE, delay: (i % 3) * 0.08 }}
              className={`group relative cursor-pointer rounded-[3px] bg-[#fbf7ef] p-4 shadow-[0_22px_42px_-24px_rgba(23,23,23,0.42)] transition-transform duration-500 hover:rotate-0 ${ROTS[i % ROTS.length]}`}
            >
              <span className="absolute -top-2.5 left-1/2 z-20 h-5 w-16 -translate-x-1/2 -rotate-3 bg-stone/55 shadow-sm ring-1 ring-ink/5" />
              <div className="overflow-hidden rounded-[2px]"><PhotoSlot label="" ratio="4/3" tone={p.tone} /></div>
              <div className="mt-4 flex items-center justify-between px-1">
                <span className="font-hand text-lg text-copper-deep">{p.tag}</span>
                <span className="-rotate-3 rounded-sm border border-copper-deep/50 px-1.5 py-0.5 text-[0.55rem] font-bold uppercase tracking-wider text-copper-deep">{p.read}</span>
              </div>
              <h3 className="mt-1 px-1 font-display text-[1.25rem] leading-tight transition-colors group-hover:text-copper-deep">{p.title}</h3>
              <p className="mt-2 px-1 text-[0.9rem] leading-relaxed text-ink/60">{p.excerpt}</p>
              <span className="mt-3 inline-flex items-center gap-2 px-1 pb-1 font-hand text-lg text-ink/55">read the note →</span>
            </motion.article>
          ))}
        </div>

        {/* closing sticky */}
        <FadeUp className="mt-20">
          <div className="relative mx-auto max-w-xl -rotate-1 bg-[#f3ead0] px-7 py-9 text-center shadow-[0_24px_46px_-24px_rgba(23,23,23,0.45)] sm:px-10">
            <span className="absolute left-1/2 top-3 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-copper-deep shadow" />
            <p className="font-hand text-2xl leading-snug text-ink/80 sm:text-3xl">want the next note in your inbox?</p>
            <p className="mt-2 text-[0.9rem] leading-relaxed text-ink/55">Say hello — I&rsquo;ll let you know when the journal opens.</p>
            <div className="mt-6"><CTA to="/contact">Get in touch</CTA></div>
          </div>
        </FadeUp>
      </section>
    </>
  )
}
