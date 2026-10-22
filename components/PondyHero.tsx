'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { BouncyTitle } from './BouncyTitle'
import { img } from '@/lib/image'

const birds = [
  { top: '14%', delay: '0s', dur: '22s', scale: 1 },
  { top: '20%', delay: '-8s', dur: '28s', scale: 0.7 },
  { top: '9%', delay: '-15s', dur: '25s', scale: 0.85 },
]

const sparkles = [
  [38, 48], [46, 54], [55, 46], [62, 58], [70, 50], [50, 62], [78, 44], [33, 58],
]

export function PondyHero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.16])
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '90%'])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={ref} className="hero">
      <motion.div className="hero-bg" style={{ y: bgY, scale: bgScale }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img('/img/pondy-hero.png', 1400)}
          srcSet={`${img('/img/pondy-hero.png', 800)} 800w, ${img('/img/pondy-hero.png', 1400)} 1400w`}
          sizes="100vw"
          alt="Illustration of Pondicherry’s Rock Beach promenade with the lighthouse, Gandhi statue and yellow French houses"
          fetchPriority="high"
        />
        <span className="sun-glow" aria-hidden />
        {sparkles.map(([x, y], i) => (
          <span key={i} className="sparkle" style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 0.37}s` }} aria-hidden />
        ))}
      </motion.div>

      <div className="hero-sky" aria-hidden>
        <span className="cloud c1" />
        <span className="cloud c2" />
        <span className="cloud c3" />
        {birds.map((b, i) => (
          <svg key={i} className="bird" viewBox="0 0 40 16" style={{ top: b.top, animationDelay: b.delay, animationDuration: b.dur, scale: String(b.scale) }}>
            <path className="wing" d="M2 10 Q10 0 20 10 Q30 0 38 10" />
          </svg>
        ))}
      </div>

      <motion.div className="hero-copy" style={{ y: copyY, opacity: copyOpacity }}>
        <motion.p className="hero-kicker" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          Vanakkam · Bonjour · Hello
        </motion.p>
        <BouncyTitle text="Welcome to Perinban.com" className="hero-title" />
        <motion.p className="hero-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
          My learning and fun time — straight from beautiful, peaceful Pondicherry.
        </motion.p>
      </motion.div>

      <a href="#what-i-do" className="scroll-cue" aria-label="Scroll down">
        <span />
      </a>
      <svg className="hero-waves" viewBox="0 0 1440 140" preserveAspectRatio="none" aria-hidden>
        <path className="wave w1" d="M0 70 C 240 130, 480 10, 720 70 S 1200 130, 1440 70 V140 H0 Z" />
        <path className="wave w2" d="M0 95 C 240 45, 480 135, 720 95 S 1200 45, 1440 95 V140 H0 Z" />
      </svg>
    </section>
  )
}
