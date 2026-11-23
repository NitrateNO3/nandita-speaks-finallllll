import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { RevealText, FadeUp } from './Motion.jsx'
import { CTA } from './UI.jsx'

const words = ['Self-belief', 'An identity of your own', 'Independence', 'Living through uncertainty', 'Finding enjoyment again']

export default function Footer() {
  return (
    <footer className="tex-dark relative overflow-hidden bg-ink text-ivory">
      <div className="copper-glow pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2" />

      {/* invite */}
      <div className="relative mx-auto max-w-[1400px] px-5 pb-16 pt-24 sm:px-8 sm:pt-28">
        <span className="text-[0.7rem] uppercase tracking-[0.32em] text-copper">Let&rsquo;s talk</span>
        <RevealText as="h2" text="Planning an event for women?" className="mt-6 max-w-4xl font-display text-[clamp(2rem,5vw,4.2rem)] leading-[1.05]" />
        <FadeUp delay={0.15}>
          <p className="mt-8 max-w-xl leading-relaxed text-ivory/60">
            Tell me the date, the audience and what you have in mind. You don&rsquo;t need to book a call first.
          </p>
          <div className="mt-10"><CTA>Invite Nandita to Speak</CTA></div>
        </FadeUp>
      </div>

      {/* keyword line */}
      <div className="relative overflow-hidden border-y border-ivory/12 py-6">
        <div className="flex">
          {[0, 1].map((k) => (
            <motion.div
              key={k}
              className="flex shrink-0 items-center whitespace-nowrap"
              animate={{ x: ['0%', '-100%'] }}
              transition={{ duration: 50, ease: 'linear', repeat: Infinity }}
              aria-hidden={k === 1}
            >
              {words.map((t, i) => (
                <span key={i} className="flex items-center text-[0.72rem] uppercase tracking-[0.3em] text-ivory/45">
                  <span className="mx-9">{t}</span>
                  <span className="h-1 w-1 rounded-full bg-copper/70" />
                </span>
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      {/* columns */}
      <div className="relative mx-auto grid max-w-[1400px] gap-12 px-5 py-16 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <img src="/brand/wordmark-ivory.png" alt="Nandita Speaks" className="h-16 w-auto object-contain object-left" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/55">
            Motivational speaker for women, entrepreneur and author of <span className="serif-italic text-ivory/80">Silent Screams</span>.
          </p>
        </div>

        <FooterCol title="Explore" links={[
          ['Home', '/'], ['Speaking', '/speaking'], ['About', '/about'], ['Silent Screams', '/silent-screams'],
        ]} />
        <FooterCol title="More" links={[
          ['Blog', '/blog'], ['Contact', '/contact'],
        ]} external={[
          ['Buy the book', 'https://www.amazon.in/Silent-Screams-Nandita-Thakur-ebook/dp/B0CFYQCY1N'],
        ]} />
      </div>

      <div className="relative mx-auto flex max-w-[1400px] flex-col gap-3 border-t border-ivory/12 px-5 py-8 text-[0.68rem] uppercase tracking-[0.2em] text-ivory/40 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <span>© {new Date().getFullYear()} Nandita Thakur · nanditaspeaks.in</span>
        <span>Life after a setback can still be your own</span>
      </div>
    </footer>
  )
}

function FooterCol({ title, links = [], external = [] }) {
  return (
    <div>
      <span className="text-[0.7rem] uppercase tracking-[0.28em] text-copper/80">{title}</span>
      <ul className="mt-5 space-y-3">
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
