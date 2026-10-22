export type CategoryId =
  | 'outside-fun'
  | '3d'
  | 'video-editing'
  | 'coding'
  | 'graphics'
  | 'experience'
  | 'robotics'
  | 'sysadmin'

export type CharacterId = 'robot' | 'bheem' | 'rabbit' | 'oldman'
export type Side = 'left' | 'right'

export type Category = {
  id: CategoryId
  label: string
  color: string
  ink: string
  blurb: string
  /** Character that pops out of the chip and stays on screen afterwards. */
  unlocks?: CharacterId
}

export const categories: Category[] = [
  { id: 'outside-fun', label: 'Outside Fun', color: '#7BC86C', ink: '#1F4D18', blurb: 'Beaches, ponds, villages and pets', unlocks: 'rabbit' },
  { id: '3d', label: '3D', color: '#F5A3C7', ink: '#6B1340', blurb: 'Blender, donuts and spinning things' },
  { id: 'video-editing', label: 'Video Editing', color: '#9B8CFF', ink: '#241A6B', blurb: 'Cuts, clips and timelines' },
  { id: 'coding', label: 'Coding', color: '#4CC3C8', ink: '#0B3D40', blurb: 'Programs, scripts and bugs I fixed' },
  { id: 'graphics', label: 'Graphics', color: '#FFB547', ink: '#5C3300', blurb: 'Illustrator, Photoshop and doodles', unlocks: 'bheem' },
  { id: 'experience', label: 'Experience', color: '#E2725B', ink: '#4A160B', blurb: 'Things that happened to me', unlocks: 'oldman' },
  { id: 'robotics', label: 'Robotics', color: '#8FB3FF', ink: '#102A66', blurb: 'Robots, sensors and motors', unlocks: 'robot' },
  { id: 'sysadmin', label: 'Sysadmin', color: '#B8C4CF', ink: '#1E2A35', blurb: 'Fixing computers and servers' },
]

export const categoryById = Object.fromEntries(categories.map((c) => [c.id, c])) as Record<CategoryId, Category>

export const characterNames: Record<CharacterId, string> = {
  robot: 'Robo',
  bheem: 'Bheem',
  rabbit: 'Bunny',
  oldman: 'Thatha',
}

const allCharacters: CharacterId[] = ['robot', 'bheem', 'rabbit', 'oldman']

/**
 * Which companions sit in the left and right rails of a blog post,
 * decided by the post's primary category.
 */
export function characterSides(primary: CategoryId): Record<Side, CharacterId[]> {
  const left: CharacterId[] =
    primary === 'coding' || primary === 'video-editing' || primary === 'robotics'
      ? ['robot']
      : primary === '3d' || primary === 'graphics'
        ? ['bheem']
        : primary === 'outside-fun' || primary === 'experience'
          ? ['rabbit', 'oldman']
          : []
  return { left, right: allCharacters.filter((c) => !left.includes(c)) }
}

export const categoryIcons: Record<CategoryId, string> = {
  'outside-fun': '🐰',
  '3d': '🍩',
  'video-editing': '🎬',
  coding: '💻',
  graphics: '🎨',
  experience: '🧓',
  robotics: '🤖',
  sysadmin: '🖥️',
}
