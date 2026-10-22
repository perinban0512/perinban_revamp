import type { Metadata } from 'next'
import Link from 'next/link'
import { Reveal } from '@/components/Reveal'
import { site } from '@/lib/fixtures'
import { img } from '@/lib/image'

export const metadata: Metadata = { title: 'About Me' }

export default function AboutPage() {
  return (
    <div className="page about">
      <Reveal className="polaroid" y={-40}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={site.aboutPhoto} alt="M. Perinban" />
        <span className="polaroid-caption">Hello from Pondy! 👋</span>
        <span className="tape" aria-hidden />
      </Reveal>
      <Reveal delay={0.1} className="about-copy">
        <span className="eyebrow">About Me</span>
        <h1>I’m so happy to see you visiting my website!</h1>
        <p>
          Hello! I’m <strong>M. Perinban</strong>. I post useful and funny things here. I’m from beautiful and peaceful
          Pondicherry, India.
        </p>
        <p className="gift">
          <span aria-hidden>🎁</span> This website is a <strong>Pongal gift</strong> from my mother and father.
        </p>
        <p>
          To contact me, please visit the <Link href="/contact">Contact Me</Link> page.
        </p>
        <p className="thanks">Thank you!</p>
      </Reveal>
      <Reveal className="wide-art" y={50}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img('/img/pondy-street.png', 1400)} alt="Illustration of White Town, Pondicherry" loading="lazy" />
      </Reveal>
    </div>
  )
}
