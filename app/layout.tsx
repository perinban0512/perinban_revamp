import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Fredoka, Nunito } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CompanionsProvider } from '@/components/CompanionsProvider'
import { CompanionLayer } from '@/components/CompanionLayer'

const display = Fredoka({ subsets: ['latin'], variable: '--font-display', weight: ['400', '500', '600', '700'] })
const body = Nunito({ subsets: ['latin'], variable: '--font-body' })

export const metadata: Metadata = {
  title: { default: 'Perinban.com — My learning and fun time', template: '%s · Perinban.com' },
  description: 'Perinban’s blog from Pondicherry, India: technology, nature & travel, pets, coding, 3D, robotics and more.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <CompanionsProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CompanionLayer />
        </CompanionsProvider>
      </body>
    </html>
  )
}
