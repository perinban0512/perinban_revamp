import Link from 'next/link'
import type { CSSProperties } from 'react'
import { categoryById, categoryIcons } from '@/lib/categories'
import type { Post } from '@/lib/fixtures'

export function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function PostCard({ post }: { post: Post }) {
  const cat = categoryById[post.categories[0]]
  return (
    <Link href={`/blogs/${post.slug}`} className="post-card" style={{ '--chip': cat.color, '--chip-ink': cat.ink } as CSSProperties}>
      <div className="post-cover" aria-hidden>
        <span className="cover-dot d1" />
        <span className="cover-dot d2" />
        <span className="cover-dot d3" />
        <span className="cover-icon">{categoryIcons[cat.id]}</span>
      </div>
      <div className="post-body">
        <span className="post-tag">{post.tag}</span>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <div className="post-meta">
          <span>{formatDate(post.date)} · {post.readMins} min read</span>
          <span className="read-more">Read more →</span>
        </div>
      </div>
    </Link>
  )
}
