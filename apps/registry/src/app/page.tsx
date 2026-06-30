import Link from 'next/link'
import { Boxes, LayoutGrid, Palette } from 'lucide-react'
import { CodeBlock } from '@/components/code-block'
import { InstallCommands } from '@/components/install-commands'

// 1. 번들 한 방 설치
const CLI_BUNDLE = `# 디자인 시스템 전체 번들 한 방 설치
# (토큰 · 폰트 · lib · hook · agent · icon + 정리 완료된 컴포넌트 일괄)
npx @transight-design/cli init`

const SHADCN_BUNDLE = `# 디자인 시스템 전체 번들 한 방 설치
npx shadcn@latest add traverse-corp/transight-design/transight-design`

// 2. 업데이트 (이미 설치된 코드를 최신 SoT로 덮어쓰기)
const CLI_UPDATE = `# 전체 번들 재설치 + 덮어쓰기 (디자인 시스템 변경 사항 반영)
npx @transight-design/cli add transight-design --overwrite

# 특정 컴포넌트만 업데이트
npx @transight-design/cli add button card --overwrite`

const SHADCN_UPDATE = `# 전체 번들 재설치 + 덮어쓰기
npx shadcn@latest add traverse-corp/transight-design/transight-design --overwrite

# 특정 컴포넌트만 업데이트
npx shadcn@latest add traverse-corp/transight-design/button --overwrite`

// 3. 개별 컴포넌트 설치
const CLI_PICK = `# 필요한 컴포넌트만 골라 설치
npx @transight-design/cli add button card dialog`

const SHADCN_PICK = `# 필요한 컴포넌트만 골라 설치
npx shadcn@latest add traverse-corp/transight-design/button
npx shadcn@latest add traverse-corp/transight-design/card`

const CSS_VITE = `/* src/index.css */
@import "./styles/index.css";`

const CSS_NEXTJS = `/* app/globals.css */
@import "../src/styles/index.css";`

const USAGE_CODE = `import { Button } from '@/components/base/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/base/card'

export default function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hello Transight</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>클릭</Button>
      </CardContent>
    </Card>
  )
}`

const Home = () => (
  <main className="mx-auto max-w-4xl px-6 py-20">
    {/* 히어로 */}
    <section className="mb-12 text-center">
      <h1 className="typo-eb54 text-fg-strong text-[clamp(40px,7vw,72px)]">
        TranSight Design System
      </h1>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="https://github.com/traverse-corp/transight-design"
          className="typo-sb14 text-fg-default border-border-default hover:border-primary-blue-1 hover:text-primary-blue-1 inline-flex h-11 items-center rounded-md border bg-bg-card px-6 transition-colors"
        >
          GitHub
        </Link>
      </div>
    </section>

    {/* 진입 분기 카드 */}
    <section className="mb-16 grid grid-cols-1 gap-4 md:grid-cols-3">
      <Link
        href="/styles"
        className="border-border-default hover:border-primary-blue-1 hover:shadow-primary group flex flex-col gap-3 rounded-xl border bg-bg-card p-6 transition-all"
      >
        <div className="bg-bg-muted flex h-11 w-11 items-center justify-center rounded-lg">
          <Palette className="text-ui-purple h-5 w-5" />
        </div>
        <div>
          <div className="typo-sb16 text-fg-strong">Styles</div>
          <div className="typo-r12 text-fg-muted mt-1">
            Tokens · Typography · Flex — 디자인 시스템의 기반 스타일 레이어.
          </div>
        </div>
        <div className="typo-sb14 text-ui-purple mt-auto inline-flex items-center gap-1">
          Browse <span aria-hidden>→</span>
        </div>
      </Link>

      <Link
        href="/components"
        className="border-border-default hover:border-primary-blue-1 hover:shadow-primary group flex flex-col gap-3 rounded-xl border bg-bg-card p-6 transition-all"
      >
        <div className="bg-primary-blue-1/10 flex h-11 w-11 items-center justify-center rounded-lg">
          <Boxes className="text-primary-blue-1 h-5 w-5" />
        </div>
        <div>
          <div className="typo-sb16 text-fg-strong">Components</div>
          <div className="typo-r12 text-fg-muted mt-1">
            Base UI 기반 컴포넌트 카탈로그. variant·color·size·shape로 조립.
          </div>
        </div>
        <div className="typo-sb14 text-primary-blue-1 mt-auto inline-flex items-center gap-1">
          Browse <span aria-hidden>→</span>
        </div>
      </Link>

      <Link
        href="/icon-system"
        className="border-border-default hover:border-primary-blue-1 hover:shadow-primary group flex flex-col gap-3 rounded-xl border bg-bg-card p-6 transition-all"
      >
        <div className="bg-primary-skyblue-1 flex h-11 w-11 items-center justify-center rounded-lg">
          <LayoutGrid className="text-primary-blue-deep h-5 w-5" />
        </div>
        <div>
          <div className="typo-sb16 text-fg-strong">Icon System</div>
          <div className="typo-r12 text-fg-muted mt-1">
            58개 SVG sprite + 팔레트 토큰 색상 × 5단계 크기로 강제된 Icon 컴포넌트.
          </div>
        </div>
        <div className="typo-sb14 text-primary-blue-deep mt-auto inline-flex items-center gap-1">
          Browse <span aria-hidden>→</span>
        </div>
      </Link>
    </section>

    {/* 설치 */}
    <section className="mb-12">
      <h2 className="typo-b24 text-fg-strong mb-4">설치</h2>

      {/* 1. 번들 한 방 설치 */}
      <h3 className="typo-sb14 text-fg-strong mt-4 mb-2">1. 번들 한 방 설치</h3>
      <p className="typo-r12 text-fg-muted mb-3">
        디자인 시스템 전체(토큰 · 폰트 · lib · hook · agent · icon + 정리 완료된 컴포넌트)를
        한 번에 깝니다. 처음 시작할 때 권장.
      </p>
      <InstallCommands
        options={[
          { label: 'Transight CLI', code: CLI_BUNDLE },
          { label: 'shadcn', code: SHADCN_BUNDLE }
        ]}
      />

      {/* 2. 업데이트 */}
      <h3 className="typo-sb14 text-fg-strong mt-8 mb-2">2. 업데이트</h3>
      <p className="typo-r12 text-fg-muted mb-3">
        디자인 시스템 SoT(토큰/컴포넌트)에 변경이 있을 때 기존 설치 파일을 최신으로 덮어씁니다.
        <code className="typo-m12-mono text-fg-default mx-1">--overwrite</code>로 prompt 없이 일괄 처리.
      </p>
      <InstallCommands
        options={[
          { label: 'Transight CLI', code: CLI_UPDATE },
          { label: 'shadcn', code: SHADCN_UPDATE }
        ]}
      />

      {/* 3. 개별 컴포넌트 설치 */}
      <h3 className="typo-sb14 text-fg-strong mt-8 mb-2">3. 개별 컴포넌트 설치</h3>
      <p className="typo-r12 text-fg-muted mb-3">
        번들에 빠진 컴포넌트(정리 중인 항목)나 특정 컴포넌트만 골라 깔 때 사용.
        여러 개를 공백으로 나열해 한 번에 설치할 수 있습니다.
      </p>
      <InstallCommands
        options={[
          { label: 'Transight CLI', code: CLI_PICK },
          { label: 'shadcn', code: SHADCN_PICK }
        ]}
      />
    </section>

    {/* 사용법 */}
    <section className="mb-12">
      <h2 className="typo-b24 text-fg-strong mb-4">사용</h2>

      {/* 진입 CSS — Vite/Next.js 별도 표시 */}
      <h3 className="typo-sb14 text-fg-strong mt-4 mb-2">1. 진입 CSS에 디자인 시스템 import</h3>
      <p className="typo-r12 text-fg-muted mb-3">
        SUIT 폰트 + Tailwind + 토큰 + 타이포 프리셋이 한 번에 들어옵니다.
      </p>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div>
          <p className="typo-sb9 text-fg-muted mb-1.5">Vite</p>
          <CodeBlock code={CSS_VITE} language="css" maxHeight="auto" />
        </div>
        <div>
          <p className="typo-sb9 text-fg-muted mb-1.5">Next.js (App Router)</p>
          <CodeBlock code={CSS_NEXTJS} language="css" maxHeight="auto" />
        </div>
      </div>

      <h3 className="typo-sb14 text-fg-strong mt-6 mb-2">2. 컴포넌트 사용</h3>
      <p className="typo-r12 text-fg-muted mb-3">
        설치된 컴포넌트는 카테고리별로{' '}
        <code className="typo-mono-m12 text-fg-default">components/base/</code> 또는{' '}
        <code className="typo-mono-m12 text-fg-default">components/custom/</code>에 떨어집니다.
      </p>
      <CodeBlock code={USAGE_CODE} language="tsx" maxHeight="auto" />
    </section>

    {/* 푸터 */}
    <footer className="typo-r12 text-fg-muted border-border-default mt-16 border-t pt-6">
      <p>
        MIT License ·{' '}
        <Link
          href="https://github.com/traverse-corp/transight-design"
          className="hover:text-primary-blue-1"
        >
          GitHub
        </Link>{' '}
        ·{' '}
        <Link
          href="https://www.npmjs.com/package/@transight-design/cli"
          className="hover:text-primary-blue-1"
        >
          npm
        </Link>
      </p>
    </footer>
  </main>
)

export default Home
