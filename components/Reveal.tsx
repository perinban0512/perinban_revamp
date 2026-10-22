'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'

/** Fades and floats its children in the first time they scroll into view. */
export function Reveal({ delay = 0, y = 36, ...props }: HTMLMotionProps<'div'> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    />
  )
}
