'use client'
import Link from 'next/link'
import Script from 'next/script'
import React, { useEffect, useRef, useState } from 'react'
import { enquirySchema, type FieldErrors } from '@/lib/enquiry'
import { track } from './SiteScripts'

declare global {
  interface Window {
    turnstile?: { render: (el: HTMLElement, opts: Record<string, unknown>) => string; reset: (id?: string) => void }
  }
}

const FIELDS = [
  { name: 'name', label: 'Name', required: true, autoComplete: 'name' },
  { name: 'organisation', label: 'Organisation or community', autoComplete: 'organization' },
  { name: 'email', label: 'Email', required: true, type: 'email', autoComplete: 'email', full: true },
  { name: 'timing', label: 'Event date or approximate timing' },
  { name: 'location', label: 'Location, or online' },
  { name: 'audience', label: 'Audience and approximate size', full: true },
] as const

type Values = Record<'name' | 'organisation' | 'email' | 'timing' | 'location' | 'audience' | 'message' | 'website', string>
const empty: Values = { name: '', organisation: '', email: '', timing: '', location: '', audience: '', message: '', website: '' }

export function EnquiryForm({ thanksHeading, thanksText, replyTime, siteKey }: { thanksHeading: string; thanksText: string; replyTime: string; siteKey?: string }) {
  const [values, setValues] = useState<Values>(empty)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const submissionId = useRef<string>('')
  const startedAt = useRef<number | undefined>(undefined)
  const tsToken = useRef('')
  const tsBox = useRef<HTMLDivElement>(null)
  const thanks = useRef<HTMLDivElement>(null)

  useEffect(() => {
    submissionId.current = crypto.randomUUID()
  }, [])
  useEffect(() => {
    if (status === 'sent') thanks.current?.focus()
  }, [status])

  const renderTurnstile = () => {
    if (!siteKey || !tsBox.current || !window.turnstile || tsBox.current.dataset.done) return
    tsBox.current.dataset.done = '1'
    window.turnstile.render(tsBox.current, { sitekey: siteKey, appearance: 'interaction-only', callback: (t: string) => (tsToken.current = t) })
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!startedAt.current) {
      startedAt.current = Date.now()
      track('form_start', { form: 'speaking_enquiry' })
    }
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }))
    if (errors[e.target.name as keyof FieldErrors]) setErrors((er) => ({ ...er, [e.target.name]: undefined }))
  }

  const focusFirstError = (errs: FieldErrors) => {
    const first = (['name', 'email', 'message', 'organisation', 'timing', 'location', 'audience'] as const).find((k) => errs[k])
    if (first) document.getElementById(`f-${first}`)?.focus()
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'sending') return
    const data = { ...values, submissionId: submissionId.current, startedAt: startedAt.current, turnstileToken: tsToken.current }
    const check = enquirySchema.safeParse(data)
    if (!check.success) {
      const errs: FieldErrors = {}
      for (const i of check.error.issues) {
        const k = i.path[0] as keyof FieldErrors
        if (k && !errs[k]) errs[k] = i.message
      }
      setErrors(errs)
      focusFirstError(errs)
      return
    }
    setStatus('sending')
    setMessage('')
    try {
      const res = await fetch('/api/enquiry/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      const out = (await res.json().catch(() => ({}))) as { ok?: boolean; errors?: FieldErrors; message?: string }
      if (res.ok && out.ok) {
        track('generate_lead', { form: 'speaking_enquiry' })
        setStatus('sent')
        return
      }
      if (out.errors) {
        setErrors(out.errors)
        focusFirstError(out.errors)
      }
      setMessage(out.message || 'Your enquiry could not be sent. Please try again in a moment.')
      setStatus('error')
      if (siteKey) window.turnstile?.reset()
    } catch {
      setMessage('Your enquiry could not be sent. Check your connection and try again. Everything you typed is still here.')
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="thanks" role="status" tabIndex={-1} ref={thanks}>
        <h2 className="h3">{thanksHeading}</h2>
        <p className="muted">{thanksText}{replyTime ? ` You can expect a reply ${replyTime}.` : ''}</p>
      </div>
    )
  }

  const describedBy = (name: string, hint?: string) => [errors[name as keyof FieldErrors] ? `f-${name}-err` : '', hint || ''].filter(Boolean).join(' ') || undefined

  return (
    <form id="enquiry" noValidate onSubmit={onSubmit} aria-describedby={message ? 'form-status' : undefined}>
      {siteKey ? <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="lazyOnload" onReady={renderTurnstile} /> : null}
      <div className="form-grid">
        {FIELDS.map((f) => {
          const err = errors[f.name as keyof FieldErrors]
          return (
            <div key={f.name} className={`field ${'full' in f && f.full ? 'full' : ''} ${err ? 'has-error' : ''}`}>
              <label htmlFor={`f-${f.name}`}>
                {f.label} {'required' in f && f.required ? null : <span className="opt">(optional)</span>}
              </label>
              <input
                id={`f-${f.name}`}
                name={f.name}
                type={'type' in f ? f.type : 'text'}
                autoComplete={'autoComplete' in f ? f.autoComplete : undefined}
                required={'required' in f && f.required}
                aria-required={'required' in f && f.required ? true : undefined}
                aria-invalid={err ? true : undefined}
                aria-describedby={describedBy(f.name)}
                value={values[f.name]}
                onChange={onChange}
                maxLength={200}
              />
              {err ? <span className="err" id={`f-${f.name}-err`}>{err}</span> : null}
            </div>
          )
        })}
        <div className={`field full ${errors.message ? 'has-error' : ''}`}>
          <label htmlFor="f-message">A brief note about what you need</label>
          <textarea
            id="f-message"
            name="message"
            required
            aria-required
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={describedBy('message', 'f-message-hint')}
            maxLength={2000}
            value={values.message}
            onChange={onChange}
          />
          <span className="hint" id="f-message-hint">{values.message.length.toLocaleString('en-IN')} of 2,000 characters.</span>
          {errors.message ? <span className="err" id="f-message-err">{errors.message}</span> : null}
        </div>
        <div className="hp" aria-hidden="true">
          <label htmlFor="f-website">Leave this empty</label>
          <input id="f-website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={onChange} />
        </div>
      </div>
      <div ref={tsBox} style={{ marginTop: 16 }} />
      {message ? <p className="form-status" id="form-status" role="alert" style={{ marginTop: 24 }}>{message}</p> : null}
      <div className="form-foot" style={{ marginTop: 28 }}>
        <button className="btn" type="submit" disabled={status === 'sending'} aria-disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send Enquiry'}
        </button>
        <p className="small muted">Read how your details are used in the <Link className="tl" href="/privacy-policy/">Privacy Policy</Link>.</p>
      </div>
    </form>
  )
}
