import Link from 'next/link'
import { navLinks } from '@/lib/nav'
import { site } from '@/lib/fixtures'

export function Footer() {
  return (
    <footer className="site-footer">
      <svg className="footer-waves" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden>
        <path className="wave w1" d="M0 60 C 240 120, 480 0, 720 60 S 1200 120, 1440 60 V120 H0 Z" />
        <path className="wave w2" d="M0 80 C 240 30, 480 120, 720 80 S 1200 30, 1440 80 V120 H0 Z" />
      </svg>
      <div className="footer-boat" aria-hidden>⛵</div>
      <div className="footer-inner">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-tagline.png" alt="Perinban.com — My learning and fun time" width={170} height={110} className="footer-logo" />
          <p>Made with love in Pondicherry, India.</p>
        </div>
        <nav className="footer-nav">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href}>{l.label}</Link>
          ))}
        </nav>
        <p className="footer-mail">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <br />© {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  )
}
