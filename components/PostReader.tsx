'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import Link from 'next/link'
import { Fragment, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { Companion } from '@/components/characters'
import { formatDate } from '@/components/PostCard'
import { categoryById, characterSides, type CharacterId, type Side } from '@/lib/categories'
import type { Block, Post, ReactionCue } from '@/lib/fixtures'
import type { ReactionType } from '@/lib/reactions'

type Live = { reaction: ReactionType; say?: string; character?: CharacterId; key: number } | null

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** Finds the first block containing each cue word, so every cue wraps exactly one spot in the text. */
function placeCues(body: Block[], cues: ReactionCue[]) {
  const byBlock = new Map<number, Map<string, number[]>>()
  cues.forEach((cue, i) => {
    const word = cue.word.toLowerCase()
    const at = body.findIndex((b) => b.type !== 'code' && textOf(b).toLowerCase().includes(word))
    if (at < 0) return
    const words = byBlock.get(at) ?? new Map<string, number[]>()
    words.set(word, [...(words.get(word) ?? []), i])
    byBlock.set(at, words)
  })
  return byBlock
}

function textOf(b: Block) {
  return b.type === 'list' ? b.items.join(' ') : b.text
}

function withCues(text: string, words: Map<string, number[]> | undefined): ReactNode {
  if (!words?.size) return text
  const pattern = new RegExp(`(${[...words.keys()].map(escape).join('|')})`, 'i')
  const out: ReactNode[] = []
  let rest = text
  const pending = new Map(words)
  let k = 0
  while (pending.size) {
    const m = rest.match(pattern)
    if (!m || m.index === undefined) break
    const key = m[0].toLowerCase()
    const ids = pending.get(key)
    out.push(rest.slice(0, m.index))
    if (ids) {
      out.push(<span key={k++} className="cue" data-cues={ids.join(',')}>{m[0]}</span>)
      pending.delete(key)
    } else {
      out.push(m[0])
    }
    rest = rest.slice(m.index + m[0].length)
  }
  out.push(rest)
  return out.map((n, i) => <Fragment key={i}>{n}</Fragment>)
}

export function PostReader({ post }: { post: Post }) {
  const primary = categoryById[post.categories[0]]
  const sides = characterSides(primary.id)
  const cueMap = useMemo(() => placeCues(post.body, post.reactions), [post])
  const articleRef = useRef<HTMLElement>(null)
  const [live, setLive] = useState<Record<Side, Live>>({ left: null, right: null })

  const { scrollYProgress } = useScroll({ target: articleRef, offset: ['start 80px', 'end end'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })

  useEffect(() => {
    const timers: Partial<Record<Side, ReturnType<typeof setTimeout>>> = {}
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement
          el.classList.toggle('is-live', entry.isIntersecting)
          if (!entry.isIntersecting) return
          el.dataset.cues!.split(',').map(Number).forEach((i) => {
            const cue = post.reactions[i]
            setLive((l) => ({ ...l, [cue.side]: { reaction: cue.reaction, say: cue.say, character: cue.character, key: Date.now() + i } }))
            clearTimeout(timers[cue.side])
            timers[cue.side] = setTimeout(() => setLive((l) => ({ ...l, [cue.side]: null })), 3200)
          })
        })
      },
      // A cue fires when it crosses the middle band of the screen — the line being read.
      { rootMargin: '-42% 0px -42% 0px' },
    )
    articleRef.current?.querySelectorAll<HTMLElement>('.cue').forEach((el) => io.observe(el))
    return () => {
      io.disconnect()
      Object.values(timers).forEach(clearTimeout)
    }
  }, [post])

  const rail = (side: Side) => (
    <aside className={`rail rail-${side}`} aria-hidden>
      <div className="rail-inner">
        {sides[side].map((id, i) => {
          const l = live[side]
          const mine = l && (!l.character || l.character === id) ? l : null
          return (
            <motion.div key={id} initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 + i * 0.15, type: 'spring', stiffness: 160, damping: 14 }}>
              <Companion
                id={id}
                size={id === 'rabbit' ? 78 : 96}
                reaction={mine?.reaction ?? null}
                reactionKey={mine?.key ?? 0}
                say={mine?.say}
                bubbleSide={side === 'left' ? 'right' : 'left'}
              />
            </motion.div>
          )
        })}
      </div>
    </aside>
  )

  return (
    <div className="reader" style={{ '--chip': primary.color, '--chip-ink': primary.ink } as CSSProperties}>
      <motion.div className="read-progress" style={{ scaleX: progress }} />
      {rail('left')}
      <article ref={articleRef} className="article">
        <Link href="/blogs" className="back-link">← All blogs</Link>
        <div className="article-tags">
          {post.categories.map((c) => (
            <span key={c} className="post-tag" style={{ '--chip': categoryById[c].color, '--chip-ink': categoryById[c].ink } as CSSProperties}>
              {categoryById[c].label}
            </span>
          ))}
        </div>
        <h1>{post.title}</h1>
        <p className="article-meta">
          {formatDate(post.date)} · {post.readMins} min read · <span className="editor-badge">{post.editor === 'payload' ? 'Written in Payload' : 'Designed in Webstudio'}</span>
        </p>
        {post.reactions.length > 0 && <p className="reader-tip">Psst… my friends on the sides react to some words while you read. 👀</p>}
        <div className="article-body">
          {post.body.map((b, i) => {
            const words = cueMap.get(i)
            if (b.type === 'h2') return <h2 key={i}>{withCues(b.text, words)}</h2>
            if (b.type === 'code') return <pre key={i}><code>{b.text}</code></pre>
            if (b.type === 'quote') return <blockquote key={i}>{withCues(b.text, words)}</blockquote>
            if (b.type === 'list') return <ul key={i}>{b.items.map((it, j) => <li key={j}>{it}</li>)}</ul>
            return <p key={i}>{withCues(b.text, words)}</p>
          })}
        </div>
        <div className="article-end">
          <span>Thanks for reading! 🙏</span>
          <Link href="/newsletter" className="btn btn-primary">Get new posts by email</Link>
        </div>
      </article>
      {rail('right')}
    </div>
  )
}
