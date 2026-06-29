import variantsData from '@/data/variants.json'

interface VariantInfo {
  groups: Record<string, string[]>
  defaults: Record<string, string>
}

const DATA = variantsData as Record<string, VariantInfo>

interface VariantsPanelProps {
  name: string
}

const GROUP_LABELS: Record<string, string> = {
  color: 'Color',
  theme: 'Theme',
  shape: 'Shape',
  variant: 'Variant',
  size: 'Size'
}

export const hasVariants = (name: string): boolean => name in DATA

export const VariantsPanel = ({ name }: VariantsPanelProps) => {
  const info = DATA[name]
  if (!info) return null

  return (
    <div className="flex flex-col gap-5">
      {Object.entries(info.groups).map(([groupName, values]) => {
        const defaultValue = info.defaults[groupName]
        return (
          <div key={groupName}>
            <div className="mb-2 flex items-baseline gap-2">
              <h3 className="text-fg-muted typo-sb12 tracking-wide uppercase">
                {GROUP_LABELS[groupName] ?? groupName}
              </h3>
              <span className="text-fg-muted typo-r12">{values.length}개</span>
            </div>
            <ul className="flex flex-wrap gap-1.5">
              {values.map((value) => {
                const isDefault = value === defaultValue
                return (
                  <li
                    key={value}
                    className={`rounded-md border px-2 py-0.5 typo-mono-m12 ${
                      isDefault
                        ? 'border-primary-blue-1 bg-primary-blue-1/10 text-primary-blue-1'
                        : 'border-border-default bg-bg-subtle'
                    }`}
                    title={isDefault ? '기본값' : undefined}
                  >
                    {value}
                    {isDefault && <span className="ml-1">•</span>}
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </div>
  )
}
