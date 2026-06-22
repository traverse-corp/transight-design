import type { ReactNode } from 'react'
import { buildIconSystemSidebarGroups } from '@/lib/registry'
import { CatalogShell } from '@/components/catalog-shell'

const IconSystemLayout = ({ children }: { children: ReactNode }) => {
  const groups = buildIconSystemSidebarGroups()
  return <CatalogShell groups={groups}>{children}</CatalogShell>
}

export default IconSystemLayout
