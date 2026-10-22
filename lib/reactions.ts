export type ReactionType = 'wave' | 'cheer' | 'shock' | 'think' | 'laugh' | 'love' | 'sleepy' | 'nod'

export const reactionInfo: Record<ReactionType, { emoji: string; label: string; say: string }> = {
  wave: { emoji: '👋', label: 'Wave', say: 'Hi there!' },
  cheer: { emoji: '🎉', label: 'Cheer', say: 'Yaaay!' },
  shock: { emoji: '😲', label: 'Shocked', say: 'Whoa!' },
  think: { emoji: '🤔', label: 'Thinking', say: 'Hmm…' },
  laugh: { emoji: '😂', label: 'Laugh', say: 'Ha ha ha!' },
  love: { emoji: '😍', label: 'Love it', say: 'So cute!' },
  sleepy: { emoji: '😴', label: 'Sleepy', say: 'Zzz…' },
  nod: { emoji: '👍', label: 'Agree', say: 'Correct!' },
}
