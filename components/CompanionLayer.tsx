'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { Companion } from '@/components/characters'
import { useCompanions } from '@/components/CompanionsProvider'
import type { CharacterId } from '@/lib/categories'

/**
 * Characters released from the category chips. Once out they never leave and
 * keep watching the cursor on every page, except blog posts, which place them
 * in their own left/right reading rails.
 */
export function CompanionLayer() {
  const { unlocked } = useCompanions()
  const pathname = usePathname()
  if (/^\/blogs\/.+/.test(pathname)) return null
  const has = (id: CharacterId) => unlocked.includes(id)

  return (
    <div className="companion-layer" aria-hidden>
      <AnimatePresence>
        {has('bheem') && (
          <motion.div key="vine" className="vine-wrap" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.svg className="vine" viewBox="0 0 60 320" preserveAspectRatio="xMidYMin meet" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.9, ease: 'easeOut' }}>
              <path d="M30 0 C 18 50, 42 90, 30 140 S 20 230, 30 320" stroke="#3F7D20" strokeWidth="6" fill="none" strokeLinecap="round" />
              {[30, 80, 130, 180, 230, 280].map((y, i) => (
                <path key={y} d={i % 2 ? `M30 ${y} q 18 -8 22 6 q -14 6 -22 -6` : `M30 ${y} q -18 -8 -22 6 q 14 6 22 -6`} fill="#6BBE45" stroke="#3F7D20" strokeWidth="1.5" />
              ))}
            </motion.svg>
            <motion.div className="vine-bheem" initial={{ y: 300 }} animate={{ y: [300, 220, 230, 150, 160, 80, 90] }} transition={{ delay: 0.8, duration: 2.2, ease: 'easeInOut' }}>
              <div className="vine-sway">
                <Companion id="bheem" size={86} climbing />
              </div>
            </motion.div>
          </motion.div>
        )}
        {has('robot') && (
          <motion.div key="robot" className="dock dock-robot" initial={{ y: 200 }} animate={{ y: 0 }} transition={{ type: 'spring', stiffness: 120, damping: 12 }}>
            <Companion id="robot" size={92} />
          </motion.div>
        )}
        {(has('rabbit') || has('oldman')) && (
          <div key="left" className="dock dock-left">
            {has('oldman') && (
              <motion.div initial={{ x: -160 }} animate={{ x: 0 }} transition={{ duration: 1.4, ease: 'easeOut' }} className="walk-in">
                <Companion id="oldman" size={84} />
              </motion.div>
            )}
            {has('rabbit') && (
              <motion.div initial={{ x: -160, y: 0 }} animate={{ x: 0, y: [0, -30, 0, -20, 0] }} transition={{ duration: 1.2 }}>
                <Companion id="rabbit" size={70} />
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
