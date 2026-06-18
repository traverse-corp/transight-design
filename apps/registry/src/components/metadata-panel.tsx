import type { RegistryItem } from '@/lib/registry'

interface MetadataPanelProps {
  item: RegistryItem
}

const Section = ({ title, items }: { title: string; items: string[] }) => (
  <div>
    <h3 className='mb-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--color-doc-muted)]'>
      {title}
    </h3>
    <ul className='flex flex-wrap gap-1.5'>
      {items.map((dep) => (
        <li
          key={dep}
          className='rounded-md border border-[color:var(--color-doc-border)] bg-[#fbfcfe] px-2 py-0.5 font-mono text-xs'
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
    <aside className='flex flex-col gap-5 rounded-lg border border-[color:var(--color-doc-border)] bg-white p-5'>
      <div>
        <h3 className='mb-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--color-doc-muted)]'>
          Type
        </h3>
        <code className='font-mono text-sm'>{item.type}</code>
      </div>
      {hasDeps && <Section title='NPM 의존성' items={item.dependencies ?? []} />}
      {hasRegDeps && (
        <Section title='Registry 의존성' items={item.registryDependencies ?? []} />
      )}
      {item.files && item.files.length > 0 && (
        <div>
          <h3 className='mb-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--color-doc-muted)]'>
            파일
          </h3>
          <ul className='flex flex-col gap-1'>
            {item.files.map((f) => (
              <li key={f.path} className='font-mono text-xs'>
                {f.path}
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  )
}
