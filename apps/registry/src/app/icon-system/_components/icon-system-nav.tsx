'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

const TABS = [
  { href: '/icon-system', label: 'Install' },
  { href: '/icon-system/browse', label: 'Browse' }
]

interface IconSystemNavProps {
  /** Browse 페이지에서만 필터 컨트롤을 children으로 주입 */
  children?: ReactNode
}

/**
 * Icon System 좌측 패널 공통 셸 — Go Main + 섹션 타이틀 + Browse/Install 탭.
 * children으로 page-specific 추가 영역(Browse의 size/color 필터 등)을 받는다.
 */
export const IconSystemNav = ({ children }: IconSystemNavProps) => {
  const pathname = usePathname()

  return (
    <aside className='h-screen w-60 shrink-0 overflow-y-auto py-10'>
      {/* Go Main */}
      <Link
        href='/'
        className='flex-start-center typo-sb14 text-fg-default hover:text-primary-blue-1 mb-6 gap-1.5 rounded-md px-2 py-1.5'
      >
        <span aria-hidden>←</span>
        <span>Go Main</span>
      </Link>

      <h3 className='typo-b14 text-fg-strong mb-3 px-2'>Icon System</h3>

      {/* Browse / Install 탭 */}
      <nav className='mb-6 flex flex-col gap-0.5'>
        {TABS.map((tab) => {
          const active = pathname === tab.href
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={
                active
                  ? 'bg-primary-blue-opacity-10 text-primary-blue-1 typo-sb14 block rounded-md px-3 py-1.5'
                  : 'text-fg-default hover:bg-bg-muted hover:text-fg-strong typo-m14 block rounded-md px-3 py-1.5'
              }
            >
              {tab.label}
            </Link>
          )
        })}
      </nav>

      {children}
    </aside>
  )
}
