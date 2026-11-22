import { motion } from 'framer-motion'
import { useRef } from 'react'

const EASE = [0.16, 1, 0.3, 1]

/* Reveal words of a line from a clip mask, staggered */
export function RevealText({ text, className = '', as = 'span', delay = 0, stagger = 0.06 }) {
  const words = text.split(' ')
  const Tag = motion[as] || motion.span
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10%' }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '110%' },
              show: { y: 0, transition: { duration: 0.9, ease: EASE } },
            }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

/* Simple fade + rise on scroll */
export function FadeUp({ children, className = '', delay = 0, y = 40 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12%' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

/* Magnetic wrapper — element drifts toward cursor */
export function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null)
  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }
  const onLeave = () => {
    const el = ref.current
    if (el) el.style.transform = 'translate(0px, 0px)'
  }
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)' }}
    >
      {children}
    </div>
  )
}

export { EASE }
