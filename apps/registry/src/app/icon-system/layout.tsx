import type { ReactNode } from 'react'
import { CatalogShell } from '@/components/catalog-shell'

const IconSystemLayout = ({ children }: { children: ReactNode }) => (
  <CatalogShell>{children}</CatalogShell>
)

export default IconSystemLayout
