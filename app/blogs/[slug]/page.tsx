import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PostReader } from '@/components/PostReader'
import { getPost, posts } from '@/lib/fixtures'

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPost((await params).slug)
  return post ? { title: post.title, description: post.excerpt } : {}
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug)
  if (!post) notFound()
  return <PostReader post={post} />
}
