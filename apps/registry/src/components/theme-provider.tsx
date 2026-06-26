'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ReactNode } from 'react'

interface ThemeProviderProps {
  children: ReactNode
}

/**
 * next-themes wrapper.
 * - attribute="class": <html>에 'dark' 클래스 토글 (theme.css의 .dark 셀렉터와 정합)
 * - defaultTheme="system": OS prefers-color-scheme 따름
 * - disableTransitionOnChange: 토글 순간 transition flicker 방지
 */
export const ThemeProvider = ({ children }: ThemeProviderProps) => (
  <NextThemesProvider
    attribute='class'
    defaultTheme='system'
    enableSystem
    disableTransitionOnChange
  >
    {children}
  </NextThemesProvider>
)
