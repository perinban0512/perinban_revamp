'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { categories, characterNames, type CategoryId } from '@/lib/categories'
import { sortedPosts } from '@/lib/fixtures'
import { CategoryChip } from '@/components/chips/CategoryChip'
import { PostCard } from '@/components/PostCard'
import { useCompanions } from '@/components/CompanionsProvider'

export function BlogsBrowser() {
  const [active, setActive] = useState<CategoryId | null>(null)
  const { unlocked, unlock, reset } = useCompanions()
  const shown = active ? sortedPosts.filter((p) => p.categories.includes(active)) : sortedPosts

  return (
    <>
      <div className="chips-stage">
        <div className="chips" role="toolbar" aria-label="Filter by category">
          <button type="button" className={`chip chip-all ${active === null ? 'is-active' : ''}`} aria-pressed={active === null} onClick={() => setActive(null)}>
            <span className="chip-icon" aria-hidden>✨</span> All
          </button>
          {categories.map((c) => (
            <CategoryChip key={c.id} category={c} active={active === c.id} onSelect={() => setActive(active === c.id ? null : c.id)} onUnlock={unlock} />
          ))}
        </div>
        <p className="chips-hint">
          {unlocked.length === 0 ? (
            <>Hover over a category to see what jumps out! 👀</>
          ) : (
            <>
              Your new friends: {unlocked.map((id) => characterNames[id]).join(', ')}. They’ll keep watching what you read.{' '}
              <button type="button" className="link-btn" onClick={reset}>Send them home</button>
            </>
          )}
        </p>
      </div>

      <motion.div layout className="post-grid post-grid-wide">
        <AnimatePresence mode="popLayout">
          {shown.map((p) => (
            <motion.div key={p.slug} layout initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.85 }} transition={{ type: 'spring', stiffness: 260, damping: 24 }}>
              <PostCard post={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {shown.length === 0 && <p className="empty">No posts in this category yet — coming soon!</p>}
    </>
  )
}
