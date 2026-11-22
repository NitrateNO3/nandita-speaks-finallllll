import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RevealText, FadeUp, EASE } from '../components/Motion.jsx'
import { useSeo } from '../lib/useSeo.js'

const fields = [
  { name: 'name', label: 'your name', type: 'text', req: true, col: 'sm:col-span-6' },
  { name: 'email', label: 'email', type: 'email', req: true, col: 'sm:col-span-6' },
  { name: 'org', label: 'organisation / event', type: 'text', req: false, col: 'sm:col-span-6' },
  { name: 'date', label: 'date or approx. timing', type: 'text', req: false, col: 'sm:col-span-6' },
  { name: 'audience', label: 'audience & size', type: 'text', req: false, col: 'sm:col-span-12' },
]

export default function Contact() {
  useSeo({
    title: 'Invite Nandita to Speak | Contact',
    description: "Invite Nandita Thakur to speak at your women's event or company session. Share the date, the audience and what you have in mind.",
    path: '/contact/',
  })
  const [sent, setSent] = useState(false)
  const [format, setFormat] = useState('In person')
  const [values, setValues] = useState({})

  const onChange = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    const body = encodeURIComponent(
      `Name: ${values.name || ''}\nEmail: ${values.email || ''}\nOrganisation/event: ${values.org || ''}\n` +
      `Date/timing: ${values.date || ''}\nAudience & size: ${values.audience || ''}\nFormat: ${format}\n\n` +
      `What I have in mind:\n${values.message || ''}`
    )
    window.location.href = `mailto:hello@nanditaspeaks.in?subject=${encodeURIComponent('Speaking enquiry — ' + (values.org || values.name || ''))}&body=${body}`
    setSent(true)
  }

  return (
    <section className="relative min-h-[100svh] overflow-hidden px-5 pb-24 pt-36 sm:px-8 sm:pt-44">
      <div className="copper-glow pointer-events-none absolute left-1/2 top-0 h-[520px] w-[640px] -translate-x-1/2" />
      <div className="mx-auto max-w-[1160px]">
        <div className="grid grid-cols-12 gap-x-12 gap-y-14">
          {/* left — pitch */}
          <div className="col-span-12 lg:col-span-5">
            <motion.p initial={{ opacity: 0, y: -10, rotate: -4 }} animate={{ opacity: 1, y: 0, rotate: -3 }} transition={{ duration: 0.7, ease: EASE }} className="mb-4 inline-block font-hand text-2xl text-copper-deep sm:text-3xl">
              — let&rsquo;s talk
            </motion.p>
            <h1 className="font-display leading-[1.04]">
              <RevealText text="Invite Nandita" className="display-l block" />
              <span className="relative inline-block">
                <RevealText text="to speak." className="display-l block italic text-ink" delay={0.08} />
                <motion.svg viewBox="0 0 400 20" preserveAspectRatio="none" aria-hidden className="pointer-events-none absolute -bottom-1 left-0 h-3 w-full text-copper sm:h-5">
                  <motion.path d="M3 13 C 80 4, 300 4, 397 10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, ease: EASE, delay: 0.9 }} />
                </motion.svg>
              </span>
            </h1>
            <FadeUp delay={0.35}>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-ink/70">
                Planning an event for women, or a session for your team? Tell me the date, the audience and what you have in mind. You don&rsquo;t need to book a call first.
              </p>
              <ul className="mt-9 space-y-3">
                {["Women's events & communities", 'Company sessions & teams', 'Keynotes & shorter talks'].map((t) => (
                  <li key={t} className="flex items-center gap-3 font-hand text-xl text-ink/70">
                    <span className="text-copper">✦</span> {t}
                  </li>
                ))}
              </ul>
              <p className="mt-9 font-hand text-xl text-copper-deep">
                or just write — <a href="mailto:hello@nanditaspeaks.in" className="link-draw">hello@nanditaspeaks.in</a>
              </p>
            </FadeUp>
          </div>

          {/* right — enquiry card */}
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <FadeUp delay={0.2}>
              <div className="relative mx-auto max-w-md bg-[#fbf7ef] p-5 shadow-[0_30px_58px_-32px_rgba(23,23,23,0.5)] sm:p-7">
                <span className="pointer-events-none absolute inset-3 rounded-[2px] border border-copper/25" />
                {/* stamp + postmark */}
                <div className="absolute right-5 top-5 z-10 flex items-start gap-2 -rotate-3 sm:right-7">
                  <div className="h-11 w-9 rotate-6 bg-ivory p-1 shadow-sm">
                    <div className="flex h-full w-full items-center justify-center border border-dashed border-copper/55 bg-copper/10">
                      <span className="font-display text-xs italic text-copper-deep">NT</span>
                    </div>
                  </div>
                  <div className="relative h-14 w-14 -rotate-6">
                    <svg viewBox="0 0 80 80" aria-hidden className="h-full w-full text-copper/50">
                      <circle cx="40" cy="40" r="37" fill="none" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="40" cy="40" r="29" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center font-hand text-sm text-copper-deep">post</span>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {!sent ? (
                    <motion.div key="form" exit={{ opacity: 0, y: -10 }}>
                      <p className="relative font-hand text-xl text-copper-deep sm:text-2xl">the enquiry card —</p>
                      <p className="relative mt-1 max-w-[70%] text-[0.8rem] leading-relaxed text-ink/50">Fill in what you can. No need to book a call first.</p>

                      <form onSubmit={onSubmit} className="relative mt-6 grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-12">
                        {fields.map((f) => (
                          <div key={f.name} className={`sm:col-span-12 ${f.col}`}>
                            <Field {...f} onChange={onChange} />
                          </div>
                        ))}

                        <div className="sm:col-span-12">
                          <span className="font-hand text-lg text-copper-deep">format —</span>
                          <div className="mt-1.5 flex flex-wrap gap-4">
                            {['In person', 'Online', 'Either'].map((opt) => (
                              <button type="button" key={opt} onClick={() => setFormat(opt)} className="flex items-center gap-2">
                                <span className={`flex h-4 w-4 items-center justify-center rounded-[3px] border-2 transition-all duration-300 ${format === opt ? 'border-ink bg-ink text-ivory' : 'border-ink/35 text-transparent'}`}>
                                  <svg width="9" height="9" viewBox="0 0 14 14"><path d="M2 7.5l3.5 3.5L12 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
                                </span>
                                <span className="font-hand text-lg text-ink/70">{opt}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="sm:col-span-12">
                          <Field name="message" label="what you have in mind" textarea onChange={onChange} />
                        </div>

                        <div className="sm:col-span-12">
                          <div className="flex items-center gap-3">
                            <button type="submit" className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3 text-sm font-medium text-ivory transition-colors hover:bg-copper hover:text-ink">
                              Send it off
                              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                            </button>
                            <span className="inline-flex h-10 w-10 -rotate-6 items-center justify-center rounded-full bg-copper-deep font-display text-base italic text-ivory shadow-md">N</span>
                          </div>
                          <p className="mt-3 font-hand text-base text-ink/50">opens your email, already filled in ✎</p>
                        </div>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div key="done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="relative flex flex-col items-center py-14 text-center">
                      <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: -8 }} transition={{ type: 'spring', stiffness: 200, damping: 13 }} className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-copper-deep/70 text-copper-deep">
                        <span className="font-display text-xl italic leading-none">sent!</span>
                      </motion.div>
                      <h2 className="mt-6 font-display text-[1.8rem] italic">Thank you.</h2>
                      <p className="mt-2 max-w-sm text-[0.95rem] leading-relaxed text-ink/65">Your email app should have opened with the details filled in. Hit send and I&rsquo;ll be in touch.</p>
                      <button onClick={() => setSent(false)} className="mt-6 font-hand text-xl text-copper-deep">send another →</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({ name, label, type = 'text', req = false, textarea = false, onChange }) {
  return (
    <label className="group block">
      <span className="font-hand text-lg text-copper-deep transition-colors">
        {label}{req && <span className="text-copper"> *</span>}
      </span>
      {textarea ? (
        <textarea
          name={name} rows={3} required={req} onChange={onChange}
          className="mt-0.5 w-full resize-none border-b border-dashed border-ink/25 bg-transparent py-1.5 text-sm text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-copper"
          placeholder="a few lines about your audience and event…"
        />
      ) : (
        <input
          name={name} type={type} required={req} onChange={onChange}
          className="mt-0.5 w-full border-b border-dashed border-ink/25 bg-transparent py-1.5 text-sm text-ink outline-none transition-colors focus:border-copper"
        />
      )}
    </label>
  )
}
