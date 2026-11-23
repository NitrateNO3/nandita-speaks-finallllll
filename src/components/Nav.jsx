import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll } from 'framer-motion'

const links = [
  { to: '/', label: 'Home', n: '01' },
  { to: '/speaking', label: 'Speaking', n: '02' },
  { to: '/about', label: 'About', n: '03' },
  { to: '/blog', label: 'Blog', n: '04' },
  { to: '/contact', label: 'Contact', n: '05' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const { scrollYProgress } = useScroll()

  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      {/* scroll progress */}
      <motion.div style={{ scaleX: scrollYProgress }} className="fixed left-0 top-0 z-[1002] h-[2px] w-full origin-left bg-copper" />

      <header className={`fixed left-0 top-0 z-[1000] w-full transition-all duration-500 ${scrolled ? 'border-b border-ink/10 bg-ivory/90 py-3 shadow-[0_8px_30px_-20px_rgba(23,23,23,0.5)] backdrop-blur-md' : 'py-6'}`}>
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 sm:px-8">
          {/* lockup */}
          <Link to="/" className="relative z-[1001] flex items-center gap-3" aria-label="Nandita Thakur — home">
            <span className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-500 ${open ? 'border-ivory/40 text-ivory' : 'border-ink/25 text-ink'}`}>
              <span className="font-display text-base italic leading-none">N</span>
            </span>
            <span className="leading-none">
              <span className={`block font-display text-[1.05rem] tracking-tight transition-colors duration-500 ${open ? 'text-ivory' : 'text-ink'}`}>Nandita Thakur</span>
              <span className={`mt-0.5 block text-[0.56rem] uppercase tracking-[0.3em] transition-colors duration-500 ${open ? 'text-ivory/50' : 'text-ink/45'}`}>Speaker &middot; Author</span>
            </span>
          </Link>

          {/* desktop links */}
          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} active={pathname === l.to}>{l.label}</NavLink>
            ))}
            <Link to="/contact" className="group relative ml-3 inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-ink px-6 py-3 text-[0.68rem] uppercase tracking-[0.18em] text-ivory">
              <span className="absolute inset-0 origin-left scale-x-0 bg-copper transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
              <span className="relative z-10 transition-colors duration-500 group-hover:text-ink">Invite to Speak</span>
              <span className="relative z-10 transition-all duration-500 group-hover:translate-x-1 group-hover:text-ink">→</span>
            </Link>
          </nav>

          {/* mobile toggle */}
          <button onClick={() => setOpen((v) => !v)} className="relative z-[1001] flex h-11 w-11 items-center justify-center lg:hidden" aria-label="Menu">
            <div className="flex flex-col gap-[6px]">
              <span className={`block h-px w-7 transition-all duration-500 ${open ? 'translate-y-[3.5px] rotate-45 bg-ivory' : 'bg-ink'}`} />
              <span className={`block h-px w-7 transition-all duration-500 ${open ? '-translate-y-[3.5px] -rotate-45 bg-ivory' : 'bg-ink'}`} />
            </div>
          </button>
        </div>
      </header>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="tex-dark fixed inset-0 z-[1000] bg-ink text-ivory"
          >
            <div className="flex h-full flex-col justify-center px-6 pt-24 sm:px-12">
              <span className="mb-10 text-[0.7rem] uppercase tracking-[0.3em] text-copper">Menu</span>
              <ul>
                {links.map((l, i) => (
                  <motion.li
                    key={l.to}
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-ivory/12"
                  >
                    <Link to={l.to} className="group flex items-baseline gap-5 py-4">
                      <span className="text-[0.7rem] uppercase tracking-[0.2em] text-copper/80">{l.n}</span>
                      <span className={`font-display text-[2.6rem] leading-none transition-all duration-500 group-hover:translate-x-4 group-hover:text-copper sm:text-[4rem] ${pathname === l.to ? 'italic text-copper' : ''}`}>
                        {l.label}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-[0.72rem] uppercase tracking-[0.2em] text-ivory/50">
                <a href="mailto:hello@nanditaspeaks.in" className="link-draw">hello@nanditaspeaks.in</a>
                <span>Currently booking 2026</span>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}

function NavLink({ to, children, active }) {
  return (
    <Link to={to} className={`group relative text-[0.72rem] uppercase tracking-[0.18em] transition-colors duration-300 ${active ? 'text-ink' : 'text-ink/55 hover:text-ink'}`}>
      {children}
      <span className={`absolute -bottom-1.5 left-0 h-px bg-copper transition-all duration-500 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
    </Link>
  )
}
