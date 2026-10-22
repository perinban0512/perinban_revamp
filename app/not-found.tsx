import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="page center not-found">
      <div className="nf-emoji" aria-hidden>🦀</div>
      <h1>Oops! This page swam away.</h1>
      <p>Let’s go back to the beach.</p>
      <Link href="/" className="btn btn-primary">Back home</Link>
    </div>
  )
}
