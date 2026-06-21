import Link from 'next/link'
import { loadRegistry, groupByType } from '@/lib/registry'

const Home = () => {
  const registry = loadRegistry()
  const groups = groupByType(registry.items)
  const total: number = registry.items.length

  return (
    <main className='mx-auto max-w-5xl px-6 py-16'>
      <header className='mb-12'>
        <h1 className='text-4xl font-extrabold tracking-tight'>{registry.name}</h1>
        <p className='mt-2 text-[color:var(--color-doc-muted)]'>
          shadcn 방식 배포형 디자인 시스템 — Base UI + Tailwind v4
        </p>
        <p className='mt-1 text-sm text-[color:var(--color-doc-muted)]'>
          현재 <strong>{total}</strong>개 아이템 호스팅 중
        </p>
      </header>

      <section className='mb-10'>
        <Link
          href='/icon-system'
          className='group flex items-center justify-between rounded-lg border border-[color:var(--color-doc-border)] bg-[#fbfcfe] p-5 transition hover:border-[color:var(--color-doc-accent)]'
        >
          <div>
            <div className='text-xs font-semibold uppercase tracking-wider text-[color:var(--color-doc-muted)]'>
              Foundation
            </div>
            <div className='mt-1 text-lg font-bold text-cool-grey-11'>Icon System</div>
            <div className='mt-1 text-sm text-[color:var(--color-doc-muted)]'>
              58개 아이콘 · 색상·크기 토큰 인터랙티브 미리보기
            </div>
          </div>
          <div className='text-cool-grey-06 transition group-hover:text-[color:var(--color-doc-accent)]'>
            →
          </div>
        </Link>
      </section>

      <section className='mb-10 rounded-lg border border-[color:var(--color-doc-border)] bg-[#fbfcfe] p-6'>
        <h2 className='mb-3 text-lg font-semibold'>설치</h2>
        <pre className='overflow-x-auto rounded bg-[#131b2d] p-4 text-sm text-white'>
          <code>{`# 전체 번들 한 방 설치
npx @transight-design/cli init

# 개별 컴포넌트
npx @transight-design/cli add button card dialog

# 또는 shadcn에 GitHub 주소 직접
npx shadcn@latest add traverse-corp/transight-design/button`}</code>
        </pre>
      </section>

      {groups.map((group) => (
        <section key={group.type} className='mb-10'>
          <div className='mb-3 flex items-baseline justify-between'>
            <h2 className='text-xl font-bold'>{group.label}</h2>
            <span className='text-sm text-[color:var(--color-doc-muted)]'>
              {group.items.length}개
            </span>
          </div>
          <ul className='grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4'>
            {group.items.map((item) => (
              <li key={item.name}>
                <Link
                  href={`/components/${item.name}`}
                  className='block truncate rounded-md border border-[color:var(--color-doc-border)] px-3 py-2 text-sm hover:border-[color:var(--color-doc-accent)] hover:text-[color:var(--color-doc-accent)]'
                  title={item.description ?? item.name}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <footer className='mt-16 border-t border-[color:var(--color-doc-border)] pt-6 text-sm text-[color:var(--color-doc-muted)]'>
        <p>
          MIT License · <Link href='https://github.com/traverse-corp/transight-design'>GitHub</Link>
        </p>
        <p className='mt-1'>각 아이템 클릭 시 프리뷰·소스·설치 명령 확인</p>
      </footer>
    </main>
  )
}

export default Home
