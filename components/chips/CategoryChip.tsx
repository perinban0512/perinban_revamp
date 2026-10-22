'use client'

import dynamic from 'next/dynamic'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState, type CSSProperties } from 'react'
import { categoryIcons as icons, type Category, type CharacterId } from '@/lib/categories'
import { BheemSvg, HenSvg, OldManSvg, RabbitSvg, RobotSvg, TortoiseSvg } from '@/components/characters'

const Donut3D = dynamic(() => import('@/components/Donut3D'), { ssr: false })

type Props = {
  category: Category
  active: boolean
  onSelect: () => void
  onUnlock: (id: CharacterId) => void
}

export function CategoryChip({ category, active, onSelect, onUnlock }: Props) {
  const [hover, setHover] = useState(false)
  const { id } = category

  // Characters that climb out of a chip stay on screen for good,
  // but only once the visitor has watched them come out.
  useEffect(() => {
    if (!hover || !category.unlocks) return
    const t = setTimeout(() => onUnlock(category.unlocks!), 1100)
    return () => clearTimeout(t)
  }, [hover, category.unlocks, onUnlock])

  const style = { '--chip': category.color, '--chip-ink': category.ink } as CSSProperties
  const premiere = id === 'video-editing' && hover

  return (
    <div
      className={`chip-wrap chip-wrap-${id}`}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      style={style}
    >
      <div className="chip-fx chip-fx-behind" aria-hidden>
        {hover && id === 'coding' && <CodeStream />}
      </div>
      <button
        type="button"
        className={`chip ${active ? 'is-active' : ''} ${premiere ? 'is-premiere' : ''}`}
        aria-pressed={active}
        onClick={onSelect}
      >
        <span className="chip-icon" aria-hidden>{icons[id]}</span>
        <span className="chip-label">{category.label}</span>
        {/* The Video Editing chip turns into a tiny Premiere Pro window in place. */}
        <AnimatePresence>{premiere && <PremiereChip key="pr" label={category.label} />}</AnimatePresence>
      </button>
      <div className="chip-fx" aria-hidden>
        <AnimatePresence>
          {hover && id === 'outside-fun' && <FarmBurst key="farm" />}
          {hover && id === '3d' && (
            <motion.div key="donut" className="fx-donut" initial={{ y: 50, scale: 0.2, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 40, scale: 0.2, opacity: 0 }} transition={{ type: 'spring', stiffness: 220, damping: 14 }}>
              <Donut3D size={150} />
            </motion.div>
          )}
          {premiere && <ProgramMonitor key="monitor" />}
          {hover && id === 'graphics' && <GraphicsBurst key="gfx" />}
          {hover && id === 'experience' && (
            <motion.div key="oldman" className="fx-rise fx-oldman" initial={{ y: 120 }} animate={{ y: 0 }} exit={{ y: 120 }} transition={{ duration: 1.1, ease: [0.3, 1.4, 0.5, 1] }}>
              <div className="climb-wobble"><OldManSvg /></div>
            </motion.div>
          )}
          {hover && id === 'robotics' && (
            <motion.div key="robot" className="fx-rise fx-robot" initial={{ y: 120, rotate: -8 }} animate={{ y: 0, rotate: 0 }} exit={{ y: 120 }} transition={{ type: 'spring', stiffness: 160, damping: 11 }}>
              <RobotSvg />
              <span className="spark s1" /><span className="spark s2" /><span className="spark s3" />
            </motion.div>
          )}
          {hover && id === 'sysadmin' && <Terminal key="term" />}
        </AnimatePresence>
      </div>
    </div>
  )
}

function FarmBurst() {
  const critters = [
    { el: <RabbitSvg />, x: -70, h: -110, w: 56, d: 0, dur: 0.9 },
    { el: <HenSvg />, x: 64, h: -90, w: 46, d: 0.15, dur: 0.8 },
    { el: <TortoiseSvg />, x: 6, h: -46, w: 62, d: 0.3, dur: 1.6 },
  ]
  return (
    <motion.div className="fx-farm" exit={{ opacity: 0 }}>
      {critters.map((c, i) => (
        <motion.div
          key={i}
          className="fx-critter"
          style={{ width: c.w }}
          initial={{ x: 0, y: 40, scale: 0.3 }}
          animate={{ x: [0, c.x * 0.6, c.x], y: [40, c.h, c.h * 0.55], scale: 1 }}
          transition={{ delay: c.d, duration: c.dur, ease: 'easeOut' }}
        >
          <motion.div animate={{ y: [0, -18, 0] }} transition={{ delay: c.d + c.dur, duration: c.dur * 0.6, repeat: Infinity, ease: 'easeOut' }}>
            {c.el}
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  )
}

const snippets = [
  'const me = "Perinban";',
  'function learn(topic) {',
  '  return topic + " 🚀";',
  'for (let i = 0; i < 10; i++)',
  'print("Hello Pondy!")',
  'if (bug) fix(bug);',
  '<h1>Welcome</h1>',
  'git commit -m "yay"',
  'npm run dev',
  'while (alive) code();',
]

function CodeStream() {
  const [lines, setLines] = useState<{ id: number; text: string; x: number }[]>([])

  useEffect(() => {
    let n = 0
    const spawn = () => {
      const id = n++
      setLines((ls) => [...ls.slice(-5), { id, text: snippets[id % snippets.length], x: (id % 3) * 22 - 22 }])
    }
    spawn()
    const t = setInterval(spawn, 650)
    return () => clearInterval(t)
  }, [])

  return (
    <>
      {lines.map((l) => (
        <motion.div
          key={l.id}
          className="fx-codeline"
          style={{ marginLeft: l.x * 2 }}
          initial={{ y: 14, opacity: 1 }}
          animate={{ y: -150, opacity: [1, 1, 0] }}
          transition={{ duration: 3.2, ease: 'linear' }}
        >
          <Typed text={l.text} />
        </motion.div>
      ))}
    </>
  )
}

function Typed({ text }: { text: string }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setN((v) => (v >= text.length ? v : v + 1)), 45)
    return () => clearInterval(t)
  }, [text])
  return (
    <span>
      {text.slice(0, n)}
      <span className="caret">▍</span>
    </span>
  )
}

function PremiereChip({ label }: { label: string }) {
  return (
    <motion.span className="premiere" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }} transition={{ type: 'spring', stiffness: 400, damping: 22 }}>
      <span className="premiere-bar">
        <span className="premiere-dot" />
        <span>{label}</span>
        <span className="premiere-tc">00:00:12:08</span>
      </span>
      <span className="premiere-tracks">
        <span className="track"><i className="clip c1" /><i className="clip c2" /></span>
        <span className="track"><i className="clip c3" /><i className="clip c4" /></span>
        <span className="track audio"><i className="clip c5" /></span>
        <span className="playhead" />
      </span>
    </motion.span>
  )
}

function ProgramMonitor() {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setFrame((f) => f + 1), 1000 / 24)
    return () => clearInterval(t)
  }, [])
  const secs = Math.floor(frame / 24)
  const tc = `00:00:${String(12 + (secs % 48)).padStart(2, '0')}:${String(frame % 24).padStart(2, '0')}`
  return (
    <motion.div className="fx-monitor" initial={{ y: 30, opacity: 0, scale: 0.7 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 20, opacity: 0, scale: 0.7 }}>
      <div className="monitor-title">
        <span /> <span /> <span /> Program: beach_vlog_final
      </div>
      <div className="monitor-screen">
        <div className="monitor-sun" />
        <div className="monitor-sea" />
        <div className="monitor-boat">⛵</div>
        <div className="monitor-cut" />
      </div>
      <div className="monitor-foot">
        <span>▶</span>
        <span className="monitor-tc">{tc}</span>
        <span>✂</span>
      </div>
    </motion.div>
  )
}

function GraphicsBurst() {
  const shapes = [
    { cls: 'shape-circle', x: -90, y: -60, r: 90 },
    { cls: 'shape-tri', x: 80, y: -80, r: -120 },
    { cls: 'shape-star', x: -50, y: -130, r: 200 },
    { cls: 'shape-square', x: 96, y: -20, r: 140 },
    { cls: 'shape-blob', x: -104, y: -4, r: -60 },
  ]
  return (
    <motion.div className="fx-gfx" exit={{ opacity: 0 }}>
      {shapes.map((s, i) => (
        <motion.span
          key={s.cls}
          className={`fx-shape ${s.cls}`}
          initial={{ x: 0, y: 30, scale: 0, rotate: 0 }}
          animate={{ x: s.x, y: s.y, scale: 1, rotate: s.r }}
          transition={{ delay: i * 0.06, type: 'spring', stiffness: 180, damping: 12 }}
        />
      ))}
      <motion.svg className="fx-pen" viewBox="0 0 200 80" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <motion.path d="M10 60 C 50 0, 90 0, 100 40 S 160 80, 190 20" fill="none" stroke="#1E2A44" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9 }} />
      </motion.svg>
      <motion.div className="fx-rise fx-bheem" initial={{ y: 120 }} animate={{ y: [120, -30, 0] }} transition={{ duration: 0.9, times: [0, 0.6, 1] }}>
        <BheemSvg />
      </motion.div>
    </motion.div>
  )
}

function Terminal() {
  return (
    <motion.div className="fx-terminal" initial={{ y: 30, opacity: 0, scale: 0.7 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 20, opacity: 0, scale: 0.7 }}>
      <div className="term-line"><b>$</b> <Typed text="sudo systemctl status pondy" /></div>
      <div className="term-ok">● pondy.service — active (running) ☀️</div>
      <div className="rack">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rack-unit"><i /><i /><i /></div>
        ))}
      </div>
    </motion.div>
  )
}
