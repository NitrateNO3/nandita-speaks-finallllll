import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { Magnetic } from './Motion.jsx'

/* Primary CTA — arrow sweeps, magnetic pull */
export function CTA({ to = '/contact', children = 'Invite Nandita to Speak', variant = 'solid', className = '' }) {
  const solid = variant === 'solid'
  return (
    <Magnetic strength={0.25} className={`inline-block ${className}`}>
      <Link
        to={to}
        className={`group relative inline-flex items-center gap-4 rounded-full px-7 py-4 text-sm font-medium tracking-wide overflow-hidden ${
          solid ? 'text-ivory' : 'text-ink border border-ink/25'
        }`}
      >
        {solid && (
          <span className="absolute inset-0 bg-ink transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]" />
        )}
        <span className="absolute inset-0 bg-copper translate-y-[101%] group-hover:translate-y-0 transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]" />
        <span className="relative z-10 group-hover:text-ivory transition-colors duration-500">{children}</span>
        <span className="relative z-10 flex h-5 w-5 items-center justify-center overflow-hidden group-hover:text-ivory transition-colors duration-500">
          <ArrowRight className="transition-transform duration-500 group-hover:translate-x-5" />
          <ArrowRight className="absolute -translate-x-5 transition-transform duration-500 group-hover:translate-x-0" />
        </span>
      </Link>
    </Magnetic>
  )
}

export function ArrowRight({ className = '' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={className}>
      <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* Text link with animated underline */
export function TextLink({ to, children, external = false, className = '' }) {
  const cls = `link-draw text-copper-deep font-medium ${className}`
  if (external) {
    return <a href={to} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>
  }
  return <Link to={to} className={cls}>{children}</Link>
}

/* Section eyebrow with index + tiny mark */
export function Eyebrow({ index, label, className = '' }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="eyebrow text-copper-deep">{index}</span>
      <span className="h-px w-10 bg-copper/50" />
      <span className="eyebrow text-ink/55">{label}</span>
    </div>
  )
}

/* Infinite marquee */
export function Marquee({ items, speed = 28, reverse = false, className = '' }) {
  return (
    <div className={`relative flex overflow-hidden ${className}`}>
      {[0, 1].map((k) => (
        <motion.div
          key={k}
          className="marquee-track shrink-0"
          animate={{ x: reverse ? ['-100%', '0%'] : ['0%', '-100%'] }}
          transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
        >
          {items.map((it, i) => (
            <span key={i} className="mx-8 inline-flex items-center gap-8">
              <span>{it}</span>
              <span className="text-copper">✦</span>
            </span>
          ))}
        </motion.div>
      ))}
    </div>
  )
}

/* Accordion item (FAQ) */
export function Accordion({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-ink/12">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-6 py-6 text-left"
      >
        <h3 className="display-m text-[1.35rem] sm:text-[1.6rem] pr-4 transition-colors duration-300" style={{ color: open ? '#9c6249' : '#171717' }}>
          {q}
        </h3>
        <span className={`mt-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/25 transition-all duration-500 ${open ? 'rotate-45 bg-ink text-ivory border-ink' : ''}`}>
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <p className="max-w-3xl pb-7 pr-10 text-ink/70 leading-relaxed">{a}</p>
      </motion.div>
    </div>
  )
}

/* Parallax wrapper for any child */
export function Parallax({ children, offset = 80, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset])
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}
