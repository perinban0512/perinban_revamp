'use client'

import { motion } from 'framer-motion'

/** A heading whose letters drop in one by one and wiggle on hover. */
export function BouncyTitle({ text, className = '', as = 'h1' }: { text: string; className?: string; as?: 'h1' | 'h2' }) {
  const Tag = as === 'h1' ? motion.h1 : motion.h2
  return (
    <Tag className={`bouncy ${className}`} aria-label={text} initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.04 } } }}>
      {text.split(' ').map((word, wi) => (
        <span key={wi} className="bouncy-word" aria-hidden>
          {word.split('').map((ch, ci) => (
            <motion.span
              key={ci}
              className="bouncy-letter"
              variants={{ hidden: { y: -60, opacity: 0, rotate: -20 }, show: { y: 0, opacity: 1, rotate: 0, transition: { type: 'spring', stiffness: 500, damping: 14 } } }}
              whileHover={{ y: -12, rotate: 8, transition: { type: 'spring', stiffness: 600 } }}
            >
              {ch}
            </motion.span>
          ))}
        </span>
      ))}
    </Tag>
  )
}
