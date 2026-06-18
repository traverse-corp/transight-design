import Link from 'next/link'
import { loadRegistry, BASE_COMPONENTS } from '@/lib/registry'

const StatCard = ({
  label,
  count,
  sub
}: {
  label: string
  count: number | string
  sub: string
}) => (
  <div className='border-cool-grey-04 rounded-lg border bg-white p-4'>
    <p className='text-overline'>{label}</p>
    <p className='typo-b24 text-cool-grey-11 mt-1'>{count}</p>
    <p className='text-description mt-1'>{sub}</p>
  </div>
)

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className='typo-sb12 text-cool-grey-07 mb-4 uppercase tracking-wide'>{children}</h2>
)

const ComponentsHome = () => {
  const registry = loadRegistry()
  const ui = registry.items.filter((i) => i.type === 'registry:ui')
  const baseCount = ui.filter((i) => BASE_COMPONENTS.has(i.name)).length
  const customCount = ui.length - baseCount

  const featured = ['button', 'card', 'alert', 'badge', 'input', 'avatar']

  return (
    <main>
      <header className='mb-10'>
        <h1 className='text-page-title'>Components</h1>
        <p className='text-subtitle mt-2'>
          왼쪽 사이드바에서 원하는 항목을 선택하세요. 각 페이지에서 라이브 프리뷰, variant 목록,
          소스 코드, 설치 명령을 확인할 수 있습니다.
        </p>
      </header>

      <section className='mb-10'>
        <SectionTitle>카탈로그 요약</SectionTitle>
        <div className='grid grid-cols-3 gap-3'>
          <StatCard label='Styles' count={3} sub='flex · tokens · typo' />
          <StatCard label='Base Components' count={baseCount} sub='shadcn 표준 컴포넌트' />
          <StatCard label='Custom Components' count={customCount} sub='자체 제작 확장' />
        </div>
      </section>

      <section>
        <SectionTitle>빠른 진입</SectionTitle>
        <ul className='grid grid-cols-2 gap-2 sm:grid-cols-3'>
          {featured.map((name) => (
            <li key={name}>
              <Link
                href={`/components/${name}`}
                className='typo-m14 text-cool-grey-09 border-cool-grey-04 hover:border-primary-blue-1 hover:text-primary-blue-1 block rounded-md border bg-white px-3 py-2 transition-colors'
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default ComponentsHome
