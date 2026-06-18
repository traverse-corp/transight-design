import { readFileSync } from 'node:fs'
import { join } from 'node:path'

export interface RegistryItemFile {
  path: string
  content?: string
  type: string
}

export interface RegistryItem {
  name: string
  type: string
  title?: string
  description?: string
  dependencies?: string[]
  registryDependencies?: string[]
  files?: RegistryItemFile[]
}

export interface Registry {
  name: string
  homepage: string
  items: RegistryItem[]
}

const REGISTRY_ROOT: string = join(process.cwd(), '..', '..', 'packages', 'ui')

/** packages/ui/registry.json — 메타 (files.content 없음) */
export const loadRegistry = (): Registry => {
  const raw: string = readFileSync(join(REGISTRY_ROOT, 'registry.json'), 'utf-8')
  return JSON.parse(raw) as Registry
}

/** 빌드된 public/r/<name>.json — files.content 포함 */
export const loadBuiltItem = (name: string): RegistryItem | null => {
  try {
    const raw: string = readFileSync(
      join(REGISTRY_ROOT, 'public', 'r', `${name}.json`),
      'utf-8'
    )
    return JSON.parse(raw) as RegistryItem
  } catch {
    return null
  }
}

/**
 * shadcn 표준 base 컴포넌트 화이트리스트 (PHASE_0_INVENTORY.md §3.1).
 * 이 목록에 속하면 'base', 나머지 registry:ui 아이템은 'custom'.
 */
export const BASE_COMPONENTS: ReadonlySet<string> = new Set([
  'accordion',
  'alert',
  'alert-dialog',
  'avatar',
  'badge',
  'button',
  'calendar',
  'card',
  'carousel',
  'checkbox',
  'command',
  'dialog',
  'dropdown-menu',
  'empty',
  'field',
  'hover-card',
  'icon',
  'input',
  'input-group',
  'input-otp',
  'label',
  'pagination',
  'popover',
  'preview-card',
  'radio-group',
  'resizable',
  'scroll-area',
  'select',
  'separator',
  'sheet',
  'sidebar',
  'skeleton',
  'sonner',
  'spinner',
  'switch',
  'table',
  'tabs',
  'textarea',
  'toggle',
  'toggle-group',
  'tooltip'
])

/** 화면 표시용 가상 그룹 키 — base/custom 분류용 */
type GroupKey = 'registry:item' | 'registry:style' | 'registry:lib' | 'registry:hook' | 'ui-base' | 'ui-custom'

export const TYPE_LABELS: Record<string, string> = {
  'registry:style': 'Styles',
  'registry:lib': 'Lib',
  'registry:hook': 'Hooks',
  'registry:item': 'Bundles',
  'ui-base': 'Components — Base',
  'ui-custom': 'Components — Custom'
}

const TYPE_ORDER: GroupKey[] = [
  'registry:item',
  'registry:style',
  'registry:lib',
  'registry:hook',
  'ui-base',
  'ui-custom'
]

export interface ItemGroup {
  type: GroupKey
  label: string
  items: RegistryItem[]
}

const groupKeyFor = (item: RegistryItem): GroupKey | null => {
  if (item.type === 'registry:ui') {
    return BASE_COMPONENTS.has(item.name) ? 'ui-base' : 'ui-custom'
  }
  if (
    item.type === 'registry:item' ||
    item.type === 'registry:style' ||
    item.type === 'registry:lib' ||
    item.type === 'registry:hook'
  ) {
    return item.type
  }
  return null
}

export const groupByType = (items: RegistryItem[]): ItemGroup[] => {
  const buckets: Partial<Record<GroupKey, RegistryItem[]>> = {}
  for (const it of items) {
    const key = groupKeyFor(it)
    if (!key) continue
    const bucket = (buckets[key] ??= [])
    bucket.push(it)
  }
  return TYPE_ORDER.filter((t) => buckets[t]).map((type) => {
    const list = buckets[type] ?? []
    return {
      type,
      label: TYPE_LABELS[type] ?? type,
      items: list.slice().sort((a, b) => a.name.localeCompare(b.name))
    }
  })
}
