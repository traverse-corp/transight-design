import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { IconSprite } from '@/icons/sprite.gen'
import { I18nProvider } from '@/components/i18n-provider'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Transight Design System',
  description: 'shadcn 방식 배포형 디자인 시스템 — Base UI + Tailwind v4',
  metadataBase: new URL('https://transight-design.app')
}

/**
 * FOUC 방지 — next-themes의 권장 inline script.
 * <html>에 'dark' 클래스를 paint 전에 동기 부착해 다크 → 라이트 깜빡임 차단.
 */
const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var resolved = stored && stored !== 'system'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (resolved === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang='ko' suppressHydrationWarning>
    <head>
      <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
    </head>
    <body>
      <IconSprite />
      <ThemeProvider>
        <I18nProvider>{children}</I18nProvider>
      </ThemeProvider>
    </body>
  </html>
)

export default RootLayout
