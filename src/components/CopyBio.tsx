'use client'
import React, { useState } from 'react'

export function CopyBio({ targetId }: { targetId: string }) {
  const [msg, setMsg] = useState('')
  const copy = async () => {
    const el = document.getElementById(targetId)
    if (!el) return
    try {
      await navigator.clipboard.writeText(el.innerText)
      setMsg('Bio copied.')
    } catch {
      const r = document.createRange()
      r.selectNodeContents(el)
      const sel = window.getSelection()
      sel?.removeAllRanges()
      sel?.addRange(r)
      setMsg('Bio selected. Press Ctrl+C or Cmd+C to copy.')
    }
  }
  return (
    <>
      <button className="btn btn--ghost btn--sm" type="button" onClick={copy}>Copy bio</button>
      <span className="small muted" role="status">{msg}</span>
    </>
  )
}
