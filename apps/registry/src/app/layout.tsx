import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Transight Design System',
  description: 'shadcn 방식 배포형 디자인 시스템 — Base UI + Tailwind v4',
  metadataBase: new URL('https://transight-design.app')
}

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang='ko'>
    <body>{children}</body>
  </html>
)

export default RootLayout
