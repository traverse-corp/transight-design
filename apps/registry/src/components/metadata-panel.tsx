import type { RegistryItem } from '@/lib/registry'

interface MetadataPanelProps {
  item: RegistryItem
}

const Section = ({ title, items }: { title: string; items: string[] }) => (
  <div>
    <h3 className='mb-2 typo-sb12 uppercase tracking-wide text-fg-muted'>
      {title}
    </h3>
    <ul className='flex flex-wrap gap-1.5'>
      {items.map((dep) => (
        <li
          key={dep}
          className='rounded-md border border-border-default bg-bg-subtle px-2 py-0.5 typo-mono-m12'
        >
          {dep}
        </li>
      ))}
    </ul>
  </div>
)

export const MetadataPanel = ({ item }: MetadataPanelProps) => {
  const hasDeps: boolean = !!item.dependencies && item.dependencies.length > 0
  const hasRegDeps: boolean =
    !!item.registryDependencies && item.registryDependencies.length > 0

  return (
    <aside className='flex flex-col gap-5 rounded-lg border border-border-default bg-bg-card p-5'>
      <div>
        <h3 className='mb-2 typo-sb12 uppercase tracking-wide text-fg-muted'>
          Type
        </h3>
        <code className='typo-mono-m14'>{item.type}</code>
      </div>
      {hasDeps && <Section title='NPM 의존성' items={item.dependencies ?? []} />}
      {hasRegDeps && (
        <Section title='Registry 의존성' items={item.registryDependencies ?? []} />
      )}
      {item.files && item.files.length > 0 && (
        <div>
          <h3 className='mb-2 typo-sb12 uppercase tracking-wide text-fg-muted'>
            파일
          </h3>
          <ul className='flex flex-col gap-1'>
            {item.files.map((f) => (
              <li key={f.path} className='typo-mono-m12'>
                {f.path}
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  )
}
