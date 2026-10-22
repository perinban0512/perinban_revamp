import type { Metadata } from 'next'
import { ContactForm } from '@/components/Forms'
import { Reveal } from '@/components/Reveal'
import { site } from '@/lib/fixtures'

export const metadata: Metadata = { title: 'Contact Me' }

export default function ContactPage() {
  return (
    <div className="page">
      <div className="split">
        <Reveal className="split-copy">
          <span className="eyebrow">Contact Me</span>
          <h1>Hi, I’m Perinban — welcome to Perinban.com!</h1>
          <p>Reach me using the form below. Thanks!</p>
          <a className="mail-chip" href={`mailto:${site.email}`}>
            <span aria-hidden>📮</span> {site.email}
          </a>
          <p className="muted">Want to meet? Send me your email ID and I’ll send you a Google Meet link.</p>
        </Reveal>
        <Reveal delay={0.1} className="card form-card">
          <ContactForm />
        </Reveal>
      </div>
    </div>
  )
}
