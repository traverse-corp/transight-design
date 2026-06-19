import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import { loadRegistry, loadBuiltItem, STYLE_META } from '@/lib/registry'
import { ItemInstallCommands } from '@/components/install-commands'
import { InteractivePreview } from '@/components/interactive-preview'
import { TokensView } from '@/views/tokens-view'
import { TypoView } from '@/views/typo-view'
import { FlexView } from '@/views/flex-view'

export const generateStaticParams = (): { name: string }[] => {
  const registry = loadRegistry()
  return registry.items.map((it) => ({ name: it.name }))
}

interface PageProps {
  params: Promise<{ name: string }>
}

const SectionTitle = ({ children }: { children: ReactNode }) => (
  <h2 className='typo-sb12 text-cool-grey-07 mb-3 uppercase tracking-wide'>{children}</h2>
)

/** style-tokens / style-typography / style-flex 특화 콘텐츠 */
const STYLE_VIEWS: Record<string, () => ReactNode> = {
  'style-tokens': () => <TokensView />,
  'style-typography': () => <TypoView />,
  'style-flex': () => <FlexView />
}

const ComponentPage = async ({ params }: PageProps) => {
  const { name } = await params
  const item = loadBuiltItem(name)
  if (!item) notFound()

  const meta = STYLE_META[item.name]
  const title = meta?.displayName ?? item.name
  const description = meta?.description ?? item.description
  const StyleView = STYLE_VIEWS[item.name]

  return (
    <main>
      <header className='mb-8'>
        <h1 className='typo-eb32 text-cool-grey-11'>{title}</h1>
        {description && <p className='text-subtitle mt-2'>{description}</p>}
      </header>

      {/* 설치 — 항상 맨 위 */}
      <section className='mb-8'>
        <SectionTitle>설치</SectionTitle>
        <ItemInstallCommands itemName={item.name} />
      </section>

      {/* Style 전용 뷰 — 또는 일반 컴포넌트 뷰 (인터랙티브 프리뷰만) */}
      {StyleView ? (
        <StyleView />
      ) : (
        <section>
          <SectionTitle>Preview</SectionTitle>
          <div className='border-cool-grey-04 rounded-lg border bg-white p-8'>
            <InteractivePreview name={item.name} />
          </div>
        </section>
      )}
    </main>
  )
}

export default ComponentPage
