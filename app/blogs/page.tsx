import type { Metadata } from 'next'
import { BlogsBrowser } from '@/components/BlogsBrowser'

export const metadata: Metadata = { title: 'Blogs' }

export default function BlogsPage() {
  return (
    <div className="page">
      <header className="page-hero page-hero-blogs">
        <span className="eyebrow">Blogs</span>
        <h1>Everything I write about</h1>
        <p>Pick a category, or just scroll through all my posts.</p>
      </header>
      <BlogsBrowser />
    </div>
  )
}
