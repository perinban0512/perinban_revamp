'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState, type FormEvent } from 'react'
import { isEmail, sendContactMessage, subscribeToNewsletter } from '@/lib/forms'

type Status = 'idle' | 'sending' | 'done'

function Field({ label, name, type = 'text', placeholder, required, hint, textarea, error }: {
  label: string; name: string; type?: string; placeholder?: string; required?: boolean; hint?: string; textarea?: boolean; error?: string
}) {
  return (
    <label className={`field ${error ? 'has-error' : ''}`}>
      <span className="field-label">{label}{required && <em aria-hidden> *</em>}</span>
      {textarea ? (
        <textarea name={name} placeholder={placeholder} required={required} rows={5} />
      ) : (
        <input name={name} type={type} placeholder={placeholder} required={required} />
      )}
      {error ? <span className="field-error">{error}</span> : hint && <span className="field-hint">{hint}</span>}
    </label>
  )
}

function Success({ title, text }: { title: string; text: string }) {
  return (
    <motion.div className="form-success" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 16 }}>
      <motion.div className="success-burst" animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }} transition={{ duration: 0.8 }}>🎉</motion.div>
      <h3>{title}</h3>
      <p>{text}</p>
    </motion.div>
  )
}

export function NewsletterForm({ compact = false, consent = false }: { compact?: boolean; consent?: boolean }) {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [name, setName] = useState('')

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const input = { name: String(data.get('name') || ''), email: String(data.get('email') || '') }
    const errs: Record<string, string> = {}
    if (!input.name.trim()) errs.name = 'Please tell me your name.'
    if (!isEmail(input.email)) errs.email = 'That email doesn’t look right. For example: you@gmail.com'
    setErrors(errs)
    if (Object.keys(errs).length) return
    setStatus('sending')
    await subscribeToNewsletter(input)
    setName(input.name)
    setStatus('done')
  }

  return (
    <AnimatePresence mode="wait">
      {status === 'done' ? (
        <Success key="ok" title={`Thank you, ${name}!`} text="You’re on the list. I’ll send you an email whenever I post something new." />
      ) : (
        <motion.form key="form" className={`form ${compact ? 'form-compact' : ''}`} onSubmit={submit} noValidate exit={{ opacity: 0, scale: 0.95 }}>
          <Field label="Name" name="name" placeholder="Enter your name" required error={errors.name} />
          <Field label="Email" name="email" type="email" placeholder="you@gmail.com" required error={errors.email} hint="Enter your email address to subscribe." />
          {consent && <p className="consent">By submitting your information, you’re giving me permission to email you. You can unsubscribe at any time.</p>}
          <button className="btn btn-primary" disabled={status === 'sending'}>
            {status === 'sending' ? 'Subscribing…' : 'Subscribe'}
            <span className="btn-plane" aria-hidden>✉️</span>
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  )
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const input = {
      name: String(data.get('name') || ''),
      email: String(data.get('email') || ''),
      subject: String(data.get('subject') || ''),
      message: String(data.get('message') || ''),
    }
    const errs: Record<string, string> = {}
    if (!input.name.trim()) errs.name = 'Please tell me your name.'
    if (!isEmail(input.email)) errs.email = 'Please enter a valid email.'
    if (!input.message.trim()) errs.message = 'Please write a message.'
    setErrors(errs)
    if (Object.keys(errs).length) return
    setStatus('sending')
    await sendContactMessage(input)
    setStatus('done')
  }

  return (
    <AnimatePresence mode="wait">
      {status === 'done' ? (
        <Success key="ok" title="Message sent!" text="Thanks for writing to me. I’ll reply to your email soon." />
      ) : (
        <motion.form key="form" className="form" onSubmit={submit} noValidate exit={{ opacity: 0, scale: 0.95 }}>
          <div className="form-row">
            <Field label="Name" name="name" placeholder="Your name" required error={errors.name} />
            <Field label="Email" name="email" type="email" placeholder="Your email" required error={errors.email} />
          </div>
          <Field label="Subject" name="subject" placeholder="Subject" />
          <Field label="Message" name="message" placeholder="Your message" required textarea error={errors.message} />
          <button className="btn btn-primary" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send message'}
            <span className="btn-plane" aria-hidden>🚀</span>
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
