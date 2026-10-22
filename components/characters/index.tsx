'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useRef, type CSSProperties, type ReactElement } from 'react'
import { useLookAt } from '@/lib/pointer'
import { characterNames, type CharacterId } from '@/lib/categories'
import { reactionInfo, type ReactionType } from '@/lib/reactions'

// All characters are original SVG drawings. Pupils move with --lx/--ly and
// heads tilt with --tilt, which useLookAt writes on the wrapper element.

const INK = '#1E2A44'

export function RobotSvg() {
  return (
    <svg viewBox="0 0 120 160" className="char-svg" aria-hidden>
      <g className="head-tilt">
        <line x1="60" y1="10" x2="60" y2="24" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        <circle cx="60" cy="9" r="6" fill="#FF5C7A" stroke={INK} strokeWidth="2.5" className="blink-bulb" />
        <rect x="10" y="42" width="10" height="20" rx="4" fill="#C9D6EA" stroke={INK} strokeWidth="2.5" />
        <rect x="100" y="42" width="10" height="20" rx="4" fill="#C9D6EA" stroke={INK} strokeWidth="2.5" />
        <rect x="18" y="24" width="84" height="60" rx="20" fill="#EEF3FA" stroke={INK} strokeWidth="3" />
        <rect x="28" y="33" width="64" height="40" rx="13" fill="#1B2340" />
        <circle cx="46" cy="51" r="10" fill="#6FF3FF" />
        <circle cx="74" cy="51" r="10" fill="#6FF3FF" />
        <g className="pupils" style={{ '--eye': '4px' } as CSSProperties}>
          <circle cx="46" cy="51" r="4.5" fill="#0B1020" />
          <circle cx="74" cy="51" r="4.5" fill="#0B1020" />
          <circle cx="44.5" cy="49.5" r="1.4" fill="#fff" />
          <circle cx="72.5" cy="49.5" r="1.4" fill="#fff" />
        </g>
        <path d="M50 64 Q60 70 70 64" stroke="#6FF3FF" strokeWidth="3" fill="none" strokeLinecap="round" className="mouth" />
      </g>
      <rect x="52" y="83" width="16" height="8" fill="#C9D6EA" stroke={INK} strokeWidth="2.5" />
      <g className="arm arm-l">
        <rect x="6" y="94" width="16" height="36" rx="8" fill="#8FB3FF" stroke={INK} strokeWidth="2.5" />
      </g>
      <g className="arm arm-r">
        <rect x="98" y="94" width="16" height="36" rx="8" fill="#8FB3FF" stroke={INK} strokeWidth="2.5" />
      </g>
      <rect x="24" y="90" width="72" height="46" rx="16" fill="#8FB3FF" stroke={INK} strokeWidth="3" />
      <rect x="40" y="100" width="40" height="22" rx="7" fill="#EEF3FA" stroke={INK} strokeWidth="2" />
      <circle cx="50" cy="111" r="3.5" fill="#FF5C7A" className="led led-1" />
      <circle cx="60" cy="111" r="3.5" fill="#FFC84A" className="led led-2" />
      <circle cx="70" cy="111" r="3.5" fill="#55D88A" className="led led-3" />
      <rect x="30" y="136" width="24" height="16" rx="7" fill="#C9D6EA" stroke={INK} strokeWidth="2.5" />
      <rect x="66" y="136" width="24" height="16" rx="7" fill="#C9D6EA" stroke={INK} strokeWidth="2.5" />
    </svg>
  )
}

export function BheemSvg({ climbing = false }: { climbing?: boolean }) {
  const skin = '#B9703F'
  return (
    <svg viewBox="0 0 120 176" className="char-svg" aria-hidden>
      {climbing ? (
        <>
          <path d="M34 92 Q22 60 44 22" stroke={skin} strokeWidth="13" fill="none" strokeLinecap="round" />
          <path d="M86 92 Q98 60 76 22" stroke={skin} strokeWidth="13" fill="none" strokeLinecap="round" />
          <circle cx="45" cy="20" r="8" fill={skin} stroke={INK} strokeWidth="2" />
          <circle cx="75" cy="20" r="8" fill={skin} stroke={INK} strokeWidth="2" />
        </>
      ) : (
        <g className="arm arm-r">
          <path d="M86 92 Q104 104 98 126" stroke={skin} strokeWidth="13" fill="none" strokeLinecap="round" />
        </g>
      )}
      {!climbing && <path d="M34 92 Q16 104 22 126" stroke={skin} strokeWidth="13" fill="none" strokeLinecap="round" />}
      <path d="M36 84 Q60 76 84 84 L88 118 Q60 124 32 118 Z" fill={skin} stroke={INK} strokeWidth="2.5" />
      <path d="M36 84 Q44 82 50 83 L48 118 L32 118 Z" fill="#FFB547" stroke={INK} strokeWidth="2" />
      <path d="M84 84 Q76 82 70 83 L72 118 L88 118 Z" fill="#FFB547" stroke={INK} strokeWidth="2" />
      <rect x="31" y="114" width="58" height="8" rx="3" fill="#C2410C" stroke={INK} strokeWidth="2" />
      <path d="M32 121 L88 121 L92 150 L64 152 L60 136 L56 152 L28 150 Z" fill="#F28C28" stroke={INK} strokeWidth="2.5" />
      <rect x="34" y="148" width="18" height="18" rx="6" fill={skin} stroke={INK} strokeWidth="2" />
      <rect x="68" y="148" width="18" height="18" rx="6" fill={skin} stroke={INK} strokeWidth="2" />
      <g className="head-tilt">
        <circle cx="31" cy="52" r="6" fill={skin} stroke={INK} strokeWidth="2" />
        <circle cx="89" cy="52" r="6" fill={skin} stroke={INK} strokeWidth="2" />
        <circle cx="60" cy="50" r="30" fill={skin} stroke={INK} strokeWidth="2.5" />
        <path d="M30 46 Q32 18 60 18 Q88 18 90 46 Q76 32 60 35 Q44 32 30 46 Z" fill="#141414" />
        <circle cx="60" cy="14" r="8" fill="#141414" />
        <path d="M43 42 L54 44" stroke="#141414" strokeWidth="4" strokeLinecap="round" />
        <path d="M77 42 L66 44" stroke="#141414" strokeWidth="4" strokeLinecap="round" />
        <ellipse cx="49" cy="53" rx="7.5" ry="8.5" fill="#fff" stroke={INK} strokeWidth="1.5" />
        <ellipse cx="71" cy="53" rx="7.5" ry="8.5" fill="#fff" stroke={INK} strokeWidth="1.5" />
        <g className="pupils" style={{ '--eye': '3.5px' } as CSSProperties}>
          <circle cx="49" cy="54" r="4" fill="#141414" />
          <circle cx="71" cy="54" r="4" fill="#141414" />
          <circle cx="48" cy="52.5" r="1.2" fill="#fff" />
          <circle cx="70" cy="52.5" r="1.2" fill="#fff" />
        </g>
        <path d="M50 68 Q60 76 70 68" stroke="#5A1F0A" strokeWidth="3" fill="#fff" strokeLinecap="round" className="mouth" />
        <circle cx="41" cy="64" r="3.5" fill="#E07A5F" opacity=".55" />
        <circle cx="79" cy="64" r="3.5" fill="#E07A5F" opacity=".55" />
      </g>
    </svg>
  )
}

export function RabbitSvg() {
  return (
    <svg viewBox="0 0 120 150" className="char-svg" aria-hidden>
      <g className="head-tilt">
        <g className="ear ear-l">
          <ellipse cx="44" cy="30" rx="11" ry="28" fill="#fff" stroke={INK} strokeWidth="2.5" />
          <ellipse cx="44" cy="32" rx="5" ry="19" fill="#FFB3C7" />
        </g>
        <g className="ear ear-r">
          <ellipse cx="76" cy="30" rx="11" ry="28" fill="#fff" stroke={INK} strokeWidth="2.5" />
          <ellipse cx="76" cy="32" rx="5" ry="19" fill="#FFB3C7" />
        </g>
        <circle cx="60" cy="74" r="30" fill="#fff" stroke={INK} strokeWidth="2.5" />
        <g className="pupils" style={{ '--eye': '3px' } as CSSProperties}>
          <circle cx="49" cy="70" r="5.5" fill="#1A1A1A" />
          <circle cx="71" cy="70" r="5.5" fill="#1A1A1A" />
          <circle cx="47.5" cy="68" r="1.8" fill="#fff" />
          <circle cx="69.5" cy="68" r="1.8" fill="#fff" />
        </g>
        <path d="M56 80 L64 80 L60 85 Z" fill="#FF7FA3" className="nose" />
        <path d="M60 85 Q56 91 52 88 M60 85 Q64 91 68 88" stroke={INK} strokeWidth="2" fill="none" strokeLinecap="round" className="mouth" />
        <path d="M40 82 L24 79 M40 86 L25 89 M80 82 L96 79 M80 86 L95 89" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="42" cy="84" r="4" fill="#FFB3C7" opacity=".7" />
        <circle cx="78" cy="84" r="4" fill="#FFB3C7" opacity=".7" />
      </g>
      <ellipse cx="60" cy="124" rx="32" ry="22" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <circle cx="92" cy="128" r="8" fill="#fff" stroke={INK} strokeWidth="2" />
      <ellipse cx="44" cy="144" rx="12" ry="6" fill="#fff" stroke={INK} strokeWidth="2" />
      <ellipse cx="76" cy="144" rx="12" ry="6" fill="#fff" stroke={INK} strokeWidth="2" />
    </svg>
  )
}

export function OldManSvg() {
  const skin = '#D9A07A'
  return (
    <svg viewBox="0 0 120 184" className="char-svg" aria-hidden>
      <path d="M98 96 L106 180" stroke="#7A4A22" strokeWidth="6" strokeLinecap="round" />
      <path d="M98 96 Q96 84 86 88" stroke="#7A4A22" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M34 76 Q56 70 80 76 L90 150 L26 150 Z" fill="#FFF6E5" stroke={INK} strokeWidth="2.5" />
      <path d="M58 76 L58 110" stroke="#D8C8A8" strokeWidth="2" />
      <circle cx="58" cy="88" r="1.8" fill="#B89B6A" />
      <circle cx="58" cy="98" r="1.8" fill="#B89B6A" />
      <g className="arm arm-r">
        <path d="M80 82 Q96 88 98 100" stroke="#FFF6E5" strokeWidth="12" fill="none" strokeLinecap="round" />
        <circle cx="98" cy="100" r="6" fill={skin} stroke={INK} strokeWidth="2" />
      </g>
      <path d="M36 82 Q24 104 30 124" stroke="#FFF6E5" strokeWidth="12" fill="none" strokeLinecap="round" />
      <path d="M30 148 L88 148 L84 168 L32 168 Z" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <ellipse cx="44" cy="174" rx="10" ry="5" fill="#7A4A22" />
      <ellipse cx="72" cy="174" rx="10" ry="5" fill="#7A4A22" />
      <g className="head-tilt">
        <circle cx="34" cy="46" r="5" fill={skin} stroke={INK} strokeWidth="2" />
        <circle cx="82" cy="46" r="5" fill={skin} stroke={INK} strokeWidth="2" />
        <circle cx="58" cy="44" r="25" fill={skin} stroke={INK} strokeWidth="2.5" />
        <path d="M34 42 Q34 30 40 26 M82 42 Q82 30 76 26" stroke="#E6E6E6" strokeWidth="7" strokeLinecap="round" fill="none" />
        <path d="M40 34 Q48 30 54 34 M62 34 Q68 30 76 34" stroke="#E6E6E6" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <circle cx="48" cy="44" r="8" fill="#fff" stroke={INK} strokeWidth="2.5" />
        <circle cx="68" cy="44" r="8" fill="#fff" stroke={INK} strokeWidth="2.5" />
        <path d="M56 44 L60 44" stroke={INK} strokeWidth="2.5" />
        <g className="pupils" style={{ '--eye': '3px' } as CSSProperties}>
          <circle cx="48" cy="45" r="3" fill="#1A1A1A" />
          <circle cx="68" cy="45" r="3" fill="#1A1A1A" />
        </g>
        <path d="M58 50 Q55 56 58 57" stroke="#A86A45" strokeWidth="2" fill="none" />
        <path d="M40 60 Q50 54 58 59 Q66 54 76 60 Q68 66 58 62 Q48 66 40 60 Z" fill="#F2F2F2" stroke={INK} strokeWidth="1.8" className="mouth" />
      </g>
    </svg>
  )
}

export function TortoiseSvg() {
  return (
    <svg viewBox="0 0 100 64" className="char-svg" aria-hidden>
      <ellipse cx="86" cy="40" rx="10" ry="8" fill="#9BD46C" stroke={INK} strokeWidth="2" />
      <circle cx="89" cy="37" r="2" fill={INK} />
      <ellipse cx="26" cy="54" rx="8" ry="6" fill="#9BD46C" stroke={INK} strokeWidth="2" />
      <ellipse cx="66" cy="54" rx="8" ry="6" fill="#9BD46C" stroke={INK} strokeWidth="2" />
      <path d="M12 50 Q14 14 46 12 Q78 14 80 50 Z" fill="#5E9C3A" stroke={INK} strokeWidth="2.5" />
      <path d="M30 22 L46 32 L62 22 M46 32 L46 50 M22 40 L46 32 L70 40" stroke="#3E6B24" strokeWidth="2" fill="none" />
    </svg>
  )
}

export function HenSvg() {
  return (
    <svg viewBox="0 0 80 84" className="char-svg" aria-hidden>
      <path d="M30 12 Q34 2 38 10 Q42 0 46 10 Q50 4 50 14 Z" fill="#E63946" stroke={INK} strokeWidth="1.8" />
      <ellipse cx="44" cy="50" rx="28" ry="24" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <circle cx="40" cy="26" r="15" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <path d="M26 26 L16 30 L26 33 Z" fill="#FFB547" stroke={INK} strokeWidth="1.8" />
      <circle cx="35" cy="23" r="2.6" fill={INK} />
      <path d="M30 34 Q28 42 33 40" fill="#E63946" />
      <path d="M50 46 Q62 42 66 54 Q56 56 50 46 Z" fill="#F2E6D9" stroke={INK} strokeWidth="1.8" />
      <path d="M36 74 L34 82 M50 74 L52 82" stroke="#FFB547" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

const drawings: Record<CharacterId, (p: { climbing?: boolean }) => ReactElement> = {
  robot: () => <RobotSvg />,
  bheem: ({ climbing }) => <BheemSvg climbing={climbing} />,
  rabbit: () => <RabbitSvg />,
  oldman: () => <OldManSvg />,
}

type CompanionProps = {
  id: CharacterId
  size?: number
  reaction?: ReactionType | null
  /** Changes on every new reaction so the animation replays. */
  reactionKey?: number
  say?: string
  climbing?: boolean
  bubbleSide?: 'left' | 'right'
  className?: string
}

/** A character whose eyes follow the cursor and who can react with a speech bubble. */
export function Companion({ id, size = 110, reaction, reactionKey = 0, say, climbing, bubbleSide = 'right', className = '' }: CompanionProps) {
  const ref = useRef<HTMLDivElement>(null)
  useLookAt(ref)
  const Drawing = drawings[id]
  const info = reaction ? reactionInfo[reaction] : null

  return (
    <div ref={ref} className={`companion companion-${id} ${className}`} style={{ width: size }} title={characterNames[id]}>
      <AnimatePresence>
        {info && (
          <motion.div
            key={reactionKey}
            className={`bubble bubble-${bubbleSide}`}
            initial={{ opacity: 0, scale: 0.4, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: -6 }}
            transition={{ type: 'spring', stiffness: 420, damping: 20 }}
          >
            <span className="bubble-emoji">{info.emoji}</span> {say || info.say}
          </motion.div>
        )}
      </AnimatePresence>
      <div key={reactionKey} className={`companion-body idle-${id} ${reaction ? `react-${reaction}` : ''}`}>
        <Drawing climbing={climbing} />
      </div>
    </div>
  )
}
