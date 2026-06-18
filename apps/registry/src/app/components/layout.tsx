import type { ReactNode } from 'react'
import { loadRegistry, buildSidebarGroups } from '@/lib/registry'
import { SidebarNav } from '@/components/sidebar-nav'

const CatalogLayout = ({ children }: { children: ReactNode }) => {
  const registry = loadRegistry()
  const groups = buildSidebarGroups(registry.items)

  return (
    <div className='mx-auto flex h-screen max-w-7xl gap-10 px-6'>
      <div className='h-screen w-60 shrink-0 overflow-y-auto py-10'>
        <SidebarNav groups={groups} />
      </div>
      <div className='h-screen min-w-0 flex-1 overflow-y-auto py-10'>{children}</div>
    </div>
  )
}

export default CatalogLayout
