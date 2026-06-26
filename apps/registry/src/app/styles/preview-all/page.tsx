'use client'

import { PREVIEWS, hasPreview } from '@/previews'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

/**
 * 전체 컴포넌트 light/dark side-by-side 검증 페이지.
 * Phase 2 다크모드 마이그레이션 진행 시 컴포넌트별 시각 회귀 확인용.
 *
 * 사용자의 현재 테마 설정과 별개로 light/dark을 동시에 렌더하기 위해
 * 다크 셀은 `.dark` 클래스 스코프를 강제 부여한다 (theme.css의 @custom-variant 정의에 의존).
 */

// 사이드바 노출 컴포넌트와 동일 (lib/registry.ts의 VISIBLE_COMPONENTS와 동기화 권장)
const COMPONENTS: string[] = [
  'accordion',
  'alert',
  'avatar',
  'badge',
  'button',
  'card',
  'checkbox',
  'dialog',
  'dropdown-menu',
  'hover-card',
  'input',
  'label',
  'password-input',
  'popover',
  'radio-group',
  'search-input',
  'select',
  'separator',
  'sheet',
  'skeleton',
  'spinner',
  'switch',
  'tabs',
  'textarea',
  'tooltip'
]

const PreviewAllPage = () => {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <main className='bg-bg-page text-fg-strong min-h-screen px-8 py-10'>
      <header className='mb-10'>
        <h1 className='typo-eb32 text-fg-strong'>Preview All — Light / Dark</h1>
        <p className='text-fg-muted typo-m14 mt-2'>
          다크모드 마이그레이션 회귀 검증용. 각 행은 같은 컴포넌트의 라이트/다크 동시 렌더.
        </p>
        {mounted && (
          <p className='text-fg-muted typo-mono-m12 mt-1'>
            현재 사용자 테마: <span className='text-fg-default'>{theme}</span>
          </p>
        )}
      </header>

      <div className='border-border-default overflow-hidden rounded-lg border'>
        <div className='bg-bg-muted text-fg-muted typo-sb12 grid grid-cols-[12rem_1fr_1fr] gap-px uppercase tracking-wide'>
          <div className='px-4 py-2'>Component</div>
          <div className='px-4 py-2'>Light</div>
          <div className='px-4 py-2'>Dark</div>
        </div>
        <div className='border-border-default grid grid-cols-[12rem_1fr_1fr] gap-px border-t'>
          {COMPONENTS.filter(hasPreview).map((name) => {
            const Preview = PREVIEWS[name]!
            return (
              <Row
                key={name}
                name={name}
                cell={
                  <div className='flex-center min-h-32 w-full'>
                    <Preview />
                  </div>
                }
              />
            )
          })}
        </div>
      </div>
    </main>
  )
}

interface RowProps {
  name: string
  cell: React.ReactNode
}

/** 컴포넌트 행 1개 — 같은 cell 노드를 light/dark 두 번 렌더 */
const Row = ({ name, cell }: RowProps) => (
  <>
    <div className='border-border-default bg-bg-card text-fg-default typo-mono-m12 flex items-center border-t px-4 py-2 first:border-t-0'>
      {name}
    </div>
    <div className='border-border-default bg-bg-card border-t p-6 first:border-t-0'>
      {/* light 스코프 — 명시적으로 .dark가 없는 셀 */}
      <div className='bg-bg-page text-fg-strong rounded-md p-4'>{cell}</div>
    </div>
    <div className='border-border-default bg-bg-card border-t p-6 first:border-t-0'>
      {/* dark 스코프 — .dark 강제 부여 */}
      <div className='dark bg-bg-page text-fg-strong rounded-md p-4'>{cell}</div>
    </div>
  </>
)

export default PreviewAllPage
