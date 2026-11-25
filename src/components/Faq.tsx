'use client'
import React, { useId, useState } from 'react'

/** Accordion: a button inside each H3 with aria-expanded and a linked region. Answers stay in the HTML. */
export function Faq({ items, openFirst = true }: { items: { q: string; a: string }[]; openFirst?: boolean }) {
  const base = useId()
  const [open, setOpen] = useState<number | null>(openFirst ? 0 : null)
  return (
    <div className="faq">
      {items.map((it, i) => {
        const id = `${base}-${i}`
        const isOpen = open === i
        return (
          <div className="faq-item" key={id}>
            <h3>
              <button type="button" aria-expanded={isOpen} aria-controls={id} id={`${id}-q`} onClick={() => setOpen(isOpen ? null : i)}>
                <span>{it.q}</span>
                <span className="faq-icon" aria-hidden="true" />
              </button>
            </h3>
            <div className="faq-panel" id={id} role="region" aria-labelledby={`${id}-q`} hidden={!isOpen}>
              <p>{it.a}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
