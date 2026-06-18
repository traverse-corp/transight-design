import Link from 'next/link'
import { notFound } from 'next/navigation'
import { loadRegistry, loadBuiltItem } from '@/lib/registry'
import { CodeBlock } from '@/components/code-block'
import { InstallCommands } from '@/components/install-commands'
import { MetadataPanel } from '@/components/metadata-panel'
import { PREVIEWS, hasPreview } from '@/previews'

export const generateStaticParams = (): { name: string }[] => {
  const registry = loadRegistry()
  return registry.items.map((it) => ({ name: it.name }))
}

interface PageProps {
  params: Promise<{ name: string }>
}

const ComponentPage = async ({ params }: PageProps) => {
  const { name } = await params
  const item = loadBuiltItem(name)
  if (!item) notFound()

  const PreviewComponent = hasPreview(name) ? PREVIEWS[name] : null
  const firstFile = item.files?.[0]

  return (
    <main className='mx-auto max-w-6xl px-6 py-10'>
      <nav className='mb-6 text-sm text-[color:var(--color-doc-muted)]'>
        <Link href='/' className='hover:text-[color:var(--color-doc-accent)]'>
          ← 전체 목록
        </Link>
      </nav>

      <header className='mb-8'>
        <div className='flex items-baseline gap-3'>
          <h1 className='text-3xl font-extrabold tracking-tight'>{item.name}</h1>
          <code className='font-mono text-sm text-[color:var(--color-doc-muted)]'>{item.type}</code>
        </div>
        {item.description && (
          <p className='mt-2 text-[color:var(--color-doc-muted)]'>{item.description}</p>
        )}
      </header>

      <div className='grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_280px]'>
        <div className='flex min-w-0 flex-col gap-6'>
          {/* 프리뷰 */}
          <section>
            <h2 className='mb-3 text-sm font-semibold uppercase tracking-wide text-[color:var(--color-doc-muted)]'>
              Preview
            </h2>
            <div className='rounded-lg border border-[color:var(--color-doc-border)] bg-white p-8'>
              {PreviewComponent ? (
                <PreviewComponent />
              ) : (
                <div className='py-8 text-center text-sm text-[color:var(--color-doc-muted)]'>
                  Preview는 Phase 6c에서 추가됩니다.
                  <br />
                  현재 라이브 프리뷰: button, badge, alert, card, separator, skeleton, spinner,
                  avatar, input, label
                </div>
              )}
            </div>
          </section>

          {/* 설치 */}
          <section>
            <h2 className='mb-3 text-sm font-semibold uppercase tracking-wide text-[color:var(--color-doc-muted)]'>
              설치
            </h2>
            <InstallCommands itemName={item.name} />
          </section>

          {/* 소스 코드 */}
          {firstFile?.content && (
            <section>
              <h2 className='mb-3 text-sm font-semibold uppercase tracking-wide text-[color:var(--color-doc-muted)]'>
                소스 코드
              </h2>
              <CodeBlock
                code={firstFile.content}
                language={firstFile.path.split('.').pop()}
                filename={firstFile.path}
              />
            </section>
          )}
        </div>

        <MetadataPanel item={item} />
      </div>
    </main>
  )
}

export default ComponentPage
