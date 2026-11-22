import { useState } from 'react'
import { motion } from 'framer-motion'
import { EASE } from './Motion.jsx'
import { PhotoSlot } from './Media.jsx'

/* A hand-drawn underline that draws itself in under its children. */
export function HandUnderline({ children, delay = 0 }) {
  return (
    <span className="relative inline-block">
      {children}
      <motion.svg viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden className="pointer-events-none absolute -bottom-1 left-0 h-2 w-full text-copper">
        <motion.path
          d="M2 7 C 60 1, 150 11, 198 4"
          fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE, delay }}
        />
      </motion.svg>
    </span>
  )
}

/* Little perforated "NT" postage stamp. */
export function Stamp() {
  return (
    <div className="h-12 w-10 rotate-6 bg-ivory p-1 shadow-sm">
      <div className="flex h-full w-full items-center justify-center border border-dashed border-copper/55 bg-copper/10">
        <span className="font-display text-sm italic text-copper-deep">NT</span>
      </div>
    </div>
  )
}

/* Round postmark with a label in the middle. */
export function Postmark({ n, className = '' }) {
  return (
    <div className={`relative h-[72px] w-[72px] -rotate-6 ${className}`}>
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

/* Hand-drawn sparkle separator. */
export function Spark({ className = 'mx-6 h-4 w-4 shrink-0 text-copper/80' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path d="M12 2 C 12.6 8.2, 15.8 11.2, 22 12 C 15.8 12.8, 12.6 15.8, 12 22 C 11.4 15.8, 8.2 12.8, 2 12 C 8.2 11.2, 11.4 8.2, 12 2 Z" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  )
}

/* A taped Polaroid with an optional caption + margin note. */
export function TapedPhoto({ ratio = '3/3.7', tone = 'stone', caption, note, rot = '-rotate-2', className = '' }) {
  return (
    <div className={`relative ${rot} ${className}`}>
      <span className="absolute -top-3 left-6 z-20 h-6 w-20 -rotate-6 bg-stone/55 shadow-sm ring-1 ring-ink/5" />
      <span className="absolute -bottom-3 right-5 z-20 h-6 w-16 rotate-[7deg] bg-stone/55 shadow-sm ring-1 ring-ink/5" />
      <div className={`relative bg-[#fbf7ef] p-3 ${caption ? 'pb-10' : ''} shadow-[0_26px_52px_-28px_rgba(23,23,23,0.5)]`}>
        <div className="overflow-hidden"><PhotoSlot label="" ratio={ratio} tone={tone} /></div>
        {caption && <p className="absolute inset-x-0 bottom-3 text-center font-hand text-xl text-ink/70">{caption}</p>}
      </div>
      {note && <span className="absolute -bottom-7 -right-3 font-hand text-xl text-copper-deep">{note}</span>}
    </div>
  )
}

/* Flip-open index card (FAQ). */
export function IndexCard({ q, a, i = 0 }) {
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
