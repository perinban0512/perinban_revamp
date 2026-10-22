// Serves static images through the Netlify Image CDN so pages never ship
// full-resolution originals. Set NEXT_PUBLIC_IMAGE_CDN=off when self-hosting
// without Netlify to fall back to the raw files in /public.
const useCdn = process.env.NEXT_PUBLIC_IMAGE_CDN !== 'off'

export function img(src: string, width: number, quality = 78) {
  if (!useCdn) return src
  return `/.netlify/images?url=${encodeURIComponent(src)}&w=${width}&fm=webp&q=${quality}`
}
