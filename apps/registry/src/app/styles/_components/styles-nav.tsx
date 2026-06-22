'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const TABS = [
  { href: '/styles', label: 'Install', match: (p: string) => p === '/styles' },
  {
    href: '/styles/browse',
    label: 'Browse',
    match: (p: string) => p.startsWith('/styles/browse')
  }
]

const BROWSE_ITEMS = [
  { slug: 'tokens', label: 'Tokens' },
  { slug: 'typography', label: 'Typo' },
  { slug: 'flex', label: 'Flex' }
]

/**
 * Styles 좌측 패널 — Go Main + Install/Browse 탭. Browse 활성 시 tokens/typo/flex
 * sub-nav도 함께 노출한다.
 */
export const StylesNav = () => {
  const pathname = usePathname()
  const browseActive = pathname.startsWith('/styles/browse')

  return (
    <aside className='h-screen w-60 shrink-0 overflow-y-auto py-10'>
      <Link
        href='/'
        className='flex-start-center typo-sb14 text-cool-grey-08 hover:text-primary-blue-1 mb-6 gap-1.5 rounded-md px-2 py-1.5'
      >
        <span aria-hidden>←</span>
        <span>Go Main</span>
      </Link>

      <h3 className='typo-b14 text-cool-grey-11 mb-3 px-2'>Styles</h3>

      <nav className='mb-6 flex flex-col gap-0.5'>
        {TABS.map((tab) => {
          const active = tab.match(pathname)
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={
                active
                  ? 'bg-primary-blue-opacity-10 text-primary-blue-1 typo-sb14 block rounded-md px-3 py-1.5'
                  : 'text-cool-grey-08 hover:bg-cool-grey-02 hover:text-cool-grey-11 typo-m14 block rounded-md px-3 py-1.5'
              }
            >
              {tab.label}
            </Link>
          )
        })}
      </nav>

      {browseActive && (
        <section className='border-cool-grey-04 border-t pt-6'>
          <h4 className='typo-sb12 text-cool-grey-07 mb-3 px-2 uppercase tracking-wider'>
            Browse
          </h4>
          <div className='flex flex-col gap-0.5'>
            {BROWSE_ITEMS.map((item) => {
              const href = `/styles/browse/${item.slug}`
              const active = pathname === href
              return (
                <Link
                  key={item.slug}
                  href={href}
                  className={
                    active
                      ? 'bg-primary-blue-opacity-10 text-primary-blue-1 typo-sb14 block rounded-md px-3 py-1.5'
                      : 'text-cool-grey-08 hover:bg-cool-grey-02 hover:text-cool-grey-11 typo-m14 block rounded-md px-3 py-1.5'
                  }
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </section>
      )}
    </aside>
  )
}
