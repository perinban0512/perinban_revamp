import type { Metadata } from 'next'
import { NewsletterForm } from '@/components/Forms'
import { Reveal } from '@/components/Reveal'
import { img } from '@/lib/image'

export const metadata: Metadata = { title: 'Newsletter' }

export default function NewsletterPage() {
  return (
    <div className="page">
      <div className="split">
        <Reveal className="split-copy">
          <span className="eyebrow">Newsletter</span>
          <h1>Get my latest updates by email</h1>
          <p>Hi! Please subscribe to my newsletter to get the latest updates. Whenever I have something new, I’ll send it to you in the newsletter.</p>
          <div className="envelope" aria-hidden>
            <span className="env-letter">📰</span>
            <span className="env-body" />
          </div>
        </Reveal>
        <Reveal delay={0.1} className="card form-card">
          <NewsletterForm consent />
        </Reveal>
      </div>
      <Reveal className="wide-art" y={50}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img('/img/pondy-beach.png', 1400)} alt="Illustration of Paradise Beach near Pondicherry at sunset" loading="lazy" />
      </Reveal>
    </div>
  )
}
