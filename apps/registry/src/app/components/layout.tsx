import type { ReactNode } from 'react'
import { loadRegistry, buildComponentsSidebarGroups } from '@/lib/registry'
import { CatalogShell } from '@/components/catalog-shell'

const CatalogLayout = ({ children }: { children: ReactNode }) => {
  const registry = loadRegistry()
  const groups = buildComponentsSidebarGroups(registry.items)
  return <CatalogShell groups={groups}>{children}</CatalogShell>
}

export default CatalogLayout
