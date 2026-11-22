import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { RevealText, FadeUp } from './Motion.jsx'
import { CTA } from './UI.jsx'

const FOOT_STITCH = { background: 'repeating-linear-gradient(90deg, rgba(244,239,231,0.32) 0 9px, transparent 9px 18px)' }

function Spark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="mx-6 h-4 w-4 shrink-0 text-copper/80">
      <path d="M12 2 C 12.6 8.2, 15.8 11.2, 22 12 C 15.8 12.8, 12.6 15.8, 12 22 C 11.4 15.8, 8.2 12.8, 2 12 C 8.2 11.2, 11.4 8.2, 12 2 Z" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  )
}

function FootRibbon() {
  const items = ['Believe again', 'An identity of your own', 'Independence', 'Living through uncertainty', 'Finding enjoyment again']
  return (
    <div className="relative">
      <div className="h-[2px]" style={FOOT_STITCH} />
      <div className="relative overflow-hidden py-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink to-transparent sm:w-28" />
        <div className="flex overflow-hidden">
          {[0, 1].map((k) => (
            <motion.div
              key={k}
              className="flex shrink-0 items-center whitespace-nowrap"
              animate={{ x: ['0%', '-100%'] }}
              transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
              aria-hidden={k === 1}
            >
              {items.map((t, i) => (
                <span key={i} className="flex items-center">
                  <span className="font-display text-2xl italic text-ivory/70 sm:text-3xl">{t}</span>
                  <Spark />
                </span>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="h-[2px]" style={FOOT_STITCH} />
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="tex-dark relative overflow-hidden bg-ink text-ivory">
      <div className="copper-glow pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2" />

      {/* Big invite band — an RSVP letter */}
      <div className="relative mx-auto max-w-[1160px] px-5 pb-14 pt-20 sm:px-8 sm:pt-28">
        <FadeUp>
          <div className="group relative mx-auto max-w-2xl -rotate-1 rounded-[3px] bg-[#fbf7ef] p-8 text-ink shadow-[0_44px_80px_-34px_rgba(0,0,0,0.85)] transition-transform duration-500 hover:rotate-0 sm:p-12">
            {/* invite rule */}
            <span className="pointer-events-none absolute inset-3 rounded-[2px] border border-copper/25" />

            {/* stamp + postmark */}
            <div className="absolute right-6 top-6 z-10 flex items-start gap-2 -rotate-3 sm:right-9">
              <div className="h-12 w-10 rotate-6 bg-ivory p-1 shadow-sm">
                <div className="flex h-full w-full items-center justify-center border border-dashed border-copper/55 bg-copper/10">
                  <span className="font-display text-sm italic text-copper-deep">NT</span>
                </div>
              </div>
              <div className="relative h-16 w-16 -rotate-6">
                <svg viewBox="0 0 80 80" aria-hidden className="h-full w-full text-copper/50">
                  <circle cx="40" cy="40" r="37" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="40" cy="40" r="29" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-hand text-base text-copper-deep">RSVP</span>
              </div>
            </div>

            <div className="relative pr-16 sm:pr-24">
              <p className="font-hand text-3xl text-copper-deep sm:text-4xl">let&rsquo;s talk —</p>
              <RevealText as="h2" text="Planning an event for women?" className="mt-1 max-w-md font-display text-[1.9rem] leading-tight sm:text-[2.6rem]" />
              <p className="mt-2 font-hand text-xl text-ink/45">To: Nandita Thakur · Mumbai</p>
              <p className="mt-5 max-w-md text-[0.98rem] leading-relaxed text-ink/65">
                Tell me the date, the audience and what you have in mind. You don&rsquo;t need to book a call first.
              </p>
              <div className="mt-7 flex items-center gap-4">
                <CTA>Invite Nandita to Speak</CTA>
                <span className="inline-flex h-11 w-11 -rotate-6 items-center justify-center rounded-full bg-copper-deep font-display text-lg italic text-ivory shadow-md">N</span>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>

      <FootRibbon />

      {/* Columns */}
      <div className="relative mx-auto grid max-w-[1160px] gap-10 px-5 py-14 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <img src="/brand/wordmark-ivory.png" alt="Nandita Speaks" className="h-20 w-auto object-contain object-left" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory/55">
            Motivational speaker for women, entrepreneur and author of <span className="serif-italic text-ivory/80">Silent Screams</span>.
          </p>
          <p className="mt-5 -rotate-2 font-hand text-2xl text-copper">— with warmth, Nandita</p>
        </div>

        <FooterCol title="explore" links={[
          ['Home', '/'], ['About', '/about'], ['Speaking', '/speaking'], ['Silent Screams', '/silent-screams'],
        ]} />
        <FooterCol title="more" links={[
          ['Journal', '/blog'], ['Contact', '/contact'],
        ]} external={[
          ['Buy the book', 'https://www.amazon.in/Silent-Screams-Nandita-Thakur-ebook/dp/B0CFYQCY1N'],
        ]} />
      </div>

      <div className="relative mx-auto flex max-w-[1160px] flex-col gap-3 border-t border-ivory/12 px-5 py-8 text-xs text-ivory/40 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <span>© {new Date().getFullYear()} Nandita Thakur · nanditaspeaks.in</span>
        <span className="flex items-center gap-2 font-hand text-lg text-ivory/55">
          Life after a setback can still be your own.
          <span className="text-copper">✦</span>
        </span>
      </div>
    </footer>
  )
}

function FooterCol({ title, links = [], external = [] }) {
  return (
    <div>
      <span className="font-hand text-2xl text-copper">{title} —</span>
      <ul className="mt-4 space-y-3">
        {links.map(([label, to]) => (
          <li key={to}>
            <Link to={to} className="link-draw text-sm text-ivory/70 hover:text-ivory">{label}</Link>
          </li>
        ))}
        {external.map(([label, href]) => (
          <li key={href}>
            <a href={href} target="_blank" rel="noopener noreferrer" className="link-draw text-sm text-ivory/70 hover:text-ivory">{label} ↗</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
