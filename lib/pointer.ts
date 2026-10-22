'use client'

import { useEffect, type RefObject } from 'react'

type Point = { x: number; y: number }
type Listener = () => void

// One shared listener for the whole page, so dozens of watching eyes
// do not each attach their own pointermove handler.
let pointer: Point = { x: 0, y: 0 }
const listeners = new Set<Listener>()
let started = false
let frame = 0

function notify() {
  if (frame) return
  frame = requestAnimationFrame(() => {
    frame = 0
    listeners.forEach((fn) => fn())
  })
}

function start() {
  if (started || typeof window === 'undefined') return
  started = true
  pointer = { x: window.innerWidth / 2, y: window.innerHeight * 0.4 }
  window.addEventListener('pointermove', (e) => {
    pointer = { x: e.clientX, y: e.clientY }
    notify()
  }, { passive: true })
  // Elements move under a still cursor while scrolling, so eyes follow along.
  window.addEventListener('scroll', notify, { passive: true })
  window.addEventListener('resize', notify, { passive: true })
}

/**
 * Writes --lx / --ly (pupil offset, -1..1) and --tilt (head tilt, deg) onto the
 * element so its SVG eyes can follow the cursor with pure CSS transforms.
 */
export function useLookAt(ref: RefObject<HTMLElement | SVGElement | null>, anchorY = 0.35) {
  useEffect(() => {
    start()
    const update = () => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height * anchorY
      const dx = pointer.x - cx
      const dy = pointer.y - cy
      const dist = Math.hypot(dx, dy) || 1
      const pull = Math.min(1, dist / 220)
      el.style.setProperty('--lx', ((dx / dist) * pull).toFixed(3))
      el.style.setProperty('--ly', ((dy / dist) * pull).toFixed(3))
      el.style.setProperty('--tilt', `${Math.max(-12, Math.min(12, dx / 40)).toFixed(1)}deg`)
    }
    listeners.add(update)
    update()
    return () => {
      listeners.delete(update)
    }
  }, [ref, anchorY])
}
