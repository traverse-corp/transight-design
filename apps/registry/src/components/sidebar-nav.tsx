'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export interface NavItem {
  /** 라우트 segment ('/components/<name>'의 name 부분) */
  name: string
  /** 사이드바에 표시할 라벨 */
  label: string
  /** 명시 시 이 경로로 링크 — 미지정 시 `/components/${name}`로 fallback */
  href?: string
  /** Essential Pack 소속 — 라벨 우측에 별표(★) 표시 */
  essential?: boolean
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

interface SidebarNavProps {
  groups: NavGroup[]
}

export const SidebarNav = ({ groups }: SidebarNavProps) => {
  const pathname = usePathname()

  return (
    <aside className='w-full'>
      {/* Go Main — 메인 페이지로 이동 */}
      <Link
        href='/'
        className='mb-6 flex-start-center typo-sb14 text-cool-grey-08 hover:text-primary-blue-1 gap-1.5 rounded-md px-2 py-1.5'
      >
        <span aria-hidden>←</span>
        <span>Go Main</span>
      </Link>

      <nav className='flex flex-col gap-7'>
        {groups.map((group, idx) => (
          <div key={group.label} className={idx > 0 ? 'border-cool-grey-04 border-t pt-6' : ''}>
            <div className='flex-between-center mb-3 px-2'>
              <h3 className='typo-b14 text-cool-grey-11'>{group.label}</h3>
              <span className='typo-m11 text-cool-grey-06'>{group.items.length}</span>
            </div>
            <ul className='flex flex-col gap-0.5'>
              {group.items.map((item) => {
                const href = item.href ?? `/components/${item.name}`
                const active = pathname === href
                return (
                  <li key={item.name}>
                    <Link
                      href={href}
                      className={
                        active
                          ? 'bg-primary-blue-opacity-10 typo-sb14 text-primary-blue-1 flex items-center justify-between gap-2 rounded-md px-3 py-1.5'
                          : 'typo-m14 text-cool-grey-08 hover:bg-cool-grey-02 hover:text-cool-grey-11 flex items-center justify-between gap-2 rounded-md px-3 py-1.5'
                      }
                    >
                      <span className='truncate'>{item.label}</span>
                      {item.essential && (
                        <span
                          aria-label='Essential pack'
                          title='Essential pack'
                          className='text-accent-amber shrink-0 leading-none'
                        >
                          ★
                        </span>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
