import type { ReactNode } from 'react'
import type { NavGroup } from '@/lib/registry'
import { SidebarNav } from '@/components/sidebar-nav'

interface CatalogShellProps {
  children: ReactNode
  groups: NavGroup[]
}

/**
 * 카탈로그 공유 셸 — 좌측 사이드바 + 우측 컨텐츠 2단 레이아웃.
 * 사이드바 그룹 구성은 라우트별 layout에서 주입한다.
 */
export const CatalogShell = ({ children, groups }: CatalogShellProps) => (
  <div className='mx-auto flex h-screen max-w-7xl gap-10 px-6'>
    <div className='scrollbar-subtle h-screen w-60 shrink-0 overflow-y-auto py-10'>
      <SidebarNav groups={groups} />
    </div>
    <div className='scrollbar-subtle h-screen min-w-0 flex-1 overflow-y-auto py-10'>{children}</div>
  </div>
)
