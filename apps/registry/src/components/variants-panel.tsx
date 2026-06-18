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
  variant: 'Variant',
  size: 'Size'
}

export const hasVariants = (name: string): boolean => name in DATA

export const VariantsPanel = ({ name }: VariantsPanelProps) => {
  const info = DATA[name]
  if (!info) return null

  return (
    <div className='flex flex-col gap-5'>
      {Object.entries(info.groups).map(([groupName, values]) => {
        const defaultValue = info.defaults[groupName]
        return (
          <div key={groupName}>
            <div className='mb-2 flex items-baseline gap-2'>
              <h3 className='text-xs font-semibold uppercase tracking-wide text-[color:var(--color-doc-muted)]'>
                {GROUP_LABELS[groupName] ?? groupName}
              </h3>
              <span className='text-xs text-[color:var(--color-doc-muted)]'>{values.length}개</span>
            </div>
            <ul className='flex flex-wrap gap-1.5'>
              {values.map((value) => {
                const isDefault = value === defaultValue
                return (
                  <li
                    key={value}
                    className={`rounded-md border px-2 py-0.5 font-mono text-xs ${
                      isDefault
                        ? 'border-[color:var(--color-doc-accent)] bg-[color:var(--color-doc-accent)]/10 text-[color:var(--color-doc-accent)]'
                        : 'border-[color:var(--color-doc-border)] bg-[#fbfcfe]'
                    }`}
                    title={isDefault ? '기본값' : undefined}
                  >
                    {value}
                    {isDefault && <span className='ml-1'>•</span>}
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
