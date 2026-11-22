import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { useLenis, getLenis } from './lib/useLenis.js'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'

import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Speaking from './pages/Speaking.jsx'
import Book from './pages/Book.jsx'
import Blog from './pages/Blog.jsx'
import Contact from './pages/Contact.jsx'

function ScrollManager() {
  const { pathname } = useLocation()
  useEffect(() => {
    const l = getLenis()
    if (l) l.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function Page({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
      <Footer />
    </motion.main>
  )
}

export default function App() {
  useLenis()
  const location = useLocation()

  return (
    <>
      <div className="grain" aria-hidden />
      <Nav />
      <ScrollManager />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Page><Home /></Page>} />
          <Route path="/about" element={<Page><About /></Page>} />
          <Route path="/speaking" element={<Page><Speaking /></Page>} />
          <Route path="/silent-screams" element={<Page><Book /></Page>} />
          <Route path="/blog" element={<Page><Blog /></Page>} />
          <Route path="/contact" element={<Page><Contact /></Page>} />
          <Route path="*" element={<Page><Home /></Page>} />
        </Routes>
      </AnimatePresence>
    </>
  )
}
