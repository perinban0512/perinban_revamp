'use client'

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import type { CharacterId } from '@/lib/categories'

type Ctx = { unlocked: CharacterId[]; unlock: (id: CharacterId) => void; reset: () => void }

const CompanionsContext = createContext<Ctx>({ unlocked: [], unlock: () => {}, reset: () => {} })
const KEY = 'perinban:companions'

/** Remembers which characters a visitor has released from the category chips. */
export function CompanionsProvider({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState<CharacterId[]>([])

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || '[]')
      if (Array.isArray(saved)) setUnlocked(saved)
    } catch {}
  }, [])

  const unlock = useCallback((id: CharacterId) => {
    setUnlocked((prev) => {
      if (prev.includes(id)) return prev
      const next = [...prev, id]
      localStorage.setItem(KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const reset = useCallback(() => {
    localStorage.removeItem(KEY)
    setUnlocked([])
  }, [])

  return <CompanionsContext.Provider value={{ unlocked, unlock, reset }}>{children}</CompanionsContext.Provider>
}

export const useCompanions = () => useContext(CompanionsContext)
