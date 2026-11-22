import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CTA } from './UI.jsx'

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
      <header className={`fixed left-0 top-0 z-[1000] w-full transition-all duration-500 ${scrolled ? 'border-b border-ink/10 bg-ivory/95 py-3 shadow-[0_6px_22px_-16px_rgba(23,23,23,0.55)]' : 'py-5'}`}>
        <div className={`mx-auto flex max-w-[1500px] items-center justify-between px-5 sm:px-8 transition-all duration-500`}>
          <Link to="/" className="relative z-[1001] flex items-center gap-3" aria-label="Nandita Speaks home">
            <img
              src="/brand/mark-ivory.png"
              alt=""
              className={`h-9 w-9 object-contain transition-all duration-500 ${open ? 'invert-0' : 'invert'}`}
            />
            <span className={`hidden font-display text-lg sm:block transition-colors duration-500 ${open ? 'text-ivory' : 'text-ink'}`}>
              Nandita<span className="text-copper"> Speaks</span>
            </span>
          </Link>

          <div className="hidden items-center gap-9 lg:flex">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} active={pathname === l.to}>{l.label}</NavLink>
            ))}
            <CTA className="ml-2">Invite to Speak</CTA>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="relative z-[1001] flex h-11 w-11 items-center justify-center lg:hidden"
            aria-label="Menu"
          >
            <div className="flex flex-col gap-[6px]">
              <span className={`block h-px w-7 transition-all duration-400 ${open ? 'translate-y-[3.5px] rotate-45 bg-ivory' : 'bg-ink'}`} />
              <span className={`block h-px w-7 transition-all duration-400 ${open ? '-translate-y-[3.5px] -rotate-45 bg-ivory' : 'bg-ink'}`} />
            </div>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[1000] bg-ink text-ivory"
          >
            <div className="flex h-full flex-col justify-center px-6 pt-24 sm:px-12">
              <span className="eyebrow mb-10 text-copper">Menu</span>
              <ul>
                {links.map((l, i) => (
                  <motion.li
                    key={l.to}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-ivory/12"
                  >
                    <Link to={l.to} className="group flex items-baseline gap-5 py-4">
                      <span className="eyebrow text-copper/80">{l.n}</span>
                      <span className={`display-l text-[2.6rem] sm:text-[4rem] transition-all duration-400 group-hover:translate-x-4 group-hover:text-copper ${pathname === l.to ? 'italic text-copper' : ''}`}>
                        {l.label}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}

function NavLink({ to, children, active }) {
  return (
    <Link to={to} className="group relative text-sm font-medium text-ink/75 transition-colors hover:text-ink">
      {children}
      <span className={`absolute -bottom-1 left-0 h-px bg-copper transition-all duration-500 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
    </Link>
  )
}
