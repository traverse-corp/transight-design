import { notFound, redirect } from 'next/navigation'
import type { ReactNode } from 'react'
import { loadRegistry, loadBuiltItem } from '@/lib/registry'
import { ItemInstallCommands } from '@/components/install-commands'
import { InteractivePreview } from '@/components/interactive-preview'

export const generateStaticParams = (): { name: string }[] => {
  const registry = loadRegistry()
  return registry.items
    .filter((it) => it.type === 'registry:ui' && it.name !== 'icon')
    .map((it) => ({ name: it.name }))
}

interface PageProps {
  params: Promise<{ name: string }>
}

const SectionTitle = ({ children }: { children: ReactNode }) => (
  <h2 className='typo-sb12 text-cool-grey-07 mb-3 uppercase tracking-wide'>{children}</h2>
)

/** style-* item은 /styles/browse/<slug>로 redirect — 사이드바에서 빠졌지만 legacy 링크 안전망 */
const STYLE_REDIRECT: Record<string, string> = {
  'style-tokens': '/styles/browse/tokens',
  'style-typography': '/styles/browse/typography',
  'style-flex': '/styles/browse/flex'
}

const ComponentPage = async ({ params }: PageProps) => {
  const { name } = await params

  const styleTarget = STYLE_REDIRECT[name]
  if (styleTarget) redirect(styleTarget)

  const item = loadBuiltItem(name)
  if (!item) notFound()

  const title = item.name
  const description = item.description

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

      <section>
        <SectionTitle>Style</SectionTitle>
        <div className='border-cool-grey-04 rounded-lg border bg-white p-8'>
          <InteractivePreview name={item.name} />
        </div>
      </section>
    </main>
  )
}

export default ComponentPage
