import { motion } from 'framer-motion'
import { RevealText, FadeUp, EASE } from '../components/Motion.jsx'
import { CTA, TextLink, Eyebrow, Parallax, ArrowRight } from '../components/UI.jsx'
import { PhotoSlot } from '../components/Media.jsx'
import { AMAZON_URL } from '../data/content.js'
import { useSeo, schema } from '../lib/useSeo.js'

const motifs = [
  ['Independence', 'Earning my own money, and what it changed.'],
  ['An identity of your own', 'Keeping something that belongs only to you.'],
  ['Your own decisions', 'The quiet courage to choose for yourself.'],
]

export default function Book() {
  useSeo({
    title: 'Silent Screams by Nandita Thakur | The Book',
    description: 'Silent Screams is Nandita Thakur\'s book — written to put difficult experiences into words and find some closure. Available as an eBook.',
    path: '/silent-screams/',
    jsonLd: schema.book,
  })
  return (
    <>
      <Hero />
      <AboutBook />
      <Motifs />
      <Quote />
      <BuyBand />
    </>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink pt-36 pb-24 text-ivory sm:pt-44">
      <div className="copper-glow pointer-events-none absolute left-1/2 top-0 h-[600px] w-[700px] -translate-x-1/2" />
      <div className="mx-auto grid max-w-[1500px] grid-cols-12 items-center gap-x-6 gap-y-14 px-5 sm:px-8">
        <div className="col-span-12 lg:col-span-6">
          <FadeUp>
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-copper" />
              <span className="eyebrow text-ivory/60">The book</span>
            </div>
          </FadeUp>
          <h1 className="mt-7">
            <RevealText text="Silent" className="display-xl block text-ivory" />
            <RevealText text="Screams" className="display-xl block serif-italic text-copper" delay={0.1} />
          </h1>
          <FadeUp delay={0.4} className="mt-9 max-w-lg">
            <p className="text-lg leading-relaxed text-ivory/70">
              A book I wrote to put difficult experiences into words — and to find some closure. By <span className="serif-italic text-ivory">Nandita Thakur</span>.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <a href={AMAZON_URL} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-4 rounded-full bg-copper px-7 py-4 text-sm font-medium text-ink transition-colors hover:bg-ivory" data-cursor="hover">
                Read on Amazon
                <ArrowRight className="transition-transform duration-500 group-hover:translate-x-2" />
              </a>
              <span className="text-sm text-ivory/45">Available as an eBook</span>
            </div>
          </FadeUp>
        </div>
        <div className="col-span-12 lg:col-span-5 lg:col-start-8">
          <Parallax offset={40}>
            <div className="relative mx-auto max-w-xs">
              <motion.img
                src="/brand/mark-ivory.png" alt=""
                className="absolute -right-8 -top-8 z-10 h-20 w-20 object-contain"
                animate={{ rotate: [0, 6, 0], y: [0, -10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              />
              <PhotoSlot label="Silent Screams — cover" ratio="3/4.4" tone="copper" />
            </div>
          </Parallax>
        </div>
      </div>
    </section>
  )
}

function AboutBook() {
  return (
    <section className="mx-auto max-w-[1500px] px-5 py-28 sm:px-8 sm:py-36">
      <div className="grid grid-cols-12 gap-x-6">
        <div className="col-span-12 lg:col-span-4">
          <Eyebrow index="01" label="About the book" />
        </div>
        <div className="col-span-12 mt-8 lg:col-span-7 lg:col-start-6 lg:mt-0">
          <RevealText
            as="p"
            text="I wrote Silent Screams to put difficult experiences into words and to find some closure."
            className="font-display text-3xl leading-snug text-ink sm:text-[2.6rem]"
          />
          <FadeUp delay={0.2}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/70">
              Writing it is part of why I can speak openly about hard experiences today. The book moves through the themes I keep returning to — independence, having an identity of your own, and the courage it takes to make your own decisions.
            </p>
            <p className="mt-6">
              <TextLink to="/about">Read more about Nandita</TextLink>
            </p>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

function Motifs() {
  return (
    <section className="bg-stone py-24 sm:py-28">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <Eyebrow index="02" label="What runs through it" />
        <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-ink/12 bg-ink/12 sm:grid-cols-3">
          {motifs.map(([k, v], i) => (
            <motion.div
              key={k}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
              className="group bg-stone p-9 transition-colors duration-500 hover:bg-ivory"
            >
              <span className="font-display text-5xl text-copper/50">0{i + 1}</span>
              <h3 className="display-m mt-5 text-[1.6rem] group-hover:text-copper-deep transition-colors">{k}</h3>
              <p className="mt-4 leading-relaxed text-ink/65">{v}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Quote() {
  return (
    <section className="mx-auto max-w-[1500px] px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-4xl text-center">
        <span className="font-display text-7xl text-copper/40">“</span>
        <RevealText
          as="p"
          text="Life after a setback can still be your own."
          className="display-m -mt-6 text-ink sm:text-[3rem]"
        />
        <FadeUp delay={0.2}>
          <p className="mt-8 eyebrow text-ink/50">Nandita Thakur</p>
        </FadeUp>
      </div>
    </section>
  )
}

function BuyBand() {
  return (
    <section className="mx-auto max-w-[1500px] px-5 pb-28 sm:px-8">
      <div className="relative overflow-hidden rounded-sm bg-ink p-10 text-ivory sm:p-16">
        <div className="copper-glow pointer-events-none absolute -right-20 -top-20 h-[400px] w-[400px]" />
        <div className="relative grid grid-cols-12 items-end gap-x-6 gap-y-8">
          <div className="col-span-12 lg:col-span-8">
            <RevealText as="h2" text="Bring Silent Screams home." className="display-l text-ivory" />
            <FadeUp delay={0.15}>
              <p className="mt-6 max-w-lg text-ivory/60">Available as an eBook on Amazon India.</p>
            </FadeUp>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:text-right">
            <a href={AMAZON_URL} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-4 rounded-full bg-copper px-8 py-4 text-sm font-medium text-ink transition-colors hover:bg-ivory" data-cursor="hover">
              Read on Amazon
              <ArrowRight className="transition-transform duration-500 group-hover:translate-x-2" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
