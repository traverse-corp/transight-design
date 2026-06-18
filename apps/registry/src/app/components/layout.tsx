import type { ReactNode } from 'react'
import { loadRegistry, buildSidebarGroups } from '@/lib/registry'
import { SidebarNav } from '@/components/sidebar-nav'

const CatalogLayout = ({ children }: { children: ReactNode }) => {
  const registry = loadRegistry()
  const groups = buildSidebarGroups(registry.items)

  return (
    <div className='mx-auto flex max-w-7xl gap-10 px-6 py-10'>
      <SidebarNav groups={groups} />
      <div className='min-w-0 flex-1'>{children}</div>
    </div>
  )
}

export default CatalogLayout
