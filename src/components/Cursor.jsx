import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const d = dot.current
    const r = ring.current
    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my
    let raf

    const move = (e) => {
      mx = e.clientX
      my = e.clientY
      d.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`
    }

    const tick = () => {
      rx += (mx - rx) * 0.16
      ry += (my - ry) * 0.16
      r.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(tick)
    }

    const over = (e) => {
      if (e.target.closest('a, button, [data-cursor="hover"]')) {
        r.classList.add('hovering')
      }
    }
    const out = (e) => {
      if (e.target.closest('a, button, [data-cursor="hover"]')) {
        r.classList.remove('hovering')
      }
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout', out)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
    </>
  )
}
