import Link from 'next/link'
import { Icon } from '@/icon-system/icon'
import { CodeBlock } from '@/components/code-block'
import { InstallCommands } from '@/components/install-commands'

const CLI_INSTALL = `# Essential Pack만 먼저 설치
npx @transight-design/cli add essential

# 전체 번들 한 방 설치
npx @transight-design/cli init

# 또는 개별 컴포넌트
npx @transight-design/cli add button card dialog`

const SHADCN_INSTALL = `# Essential Pack만 먼저 설치
npx shadcn@latest add traverse-corp/transight-design/essential

# 전체 번들
npx shadcn@latest add traverse-corp/transight-design/transight-design

# 또는 개별 컴포넌트
npx shadcn@latest add traverse-corp/transight-design/button`

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

const ESSENTIAL_GUIDE = `# Essential Pack
button, badge, input, label, textarea, checkbox, radio-group, select, switch,
dialog, tooltip, separator, skeleton, spinner`

const Home = () => (
  <main className="mx-auto max-w-4xl px-6 py-20">
    {/* 히어로 */}
    <section className="mb-12 text-center">
      <h1 className="typo-eb54 text-cool-grey-11 text-[clamp(40px,7vw,72px)]">
        TranSight Design System
      </h1>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="https://github.com/traverse-corp/transight-design"
          className="typo-sb14 text-cool-grey-09 border-cool-grey-04 hover:border-primary-blue-1 hover:text-primary-blue-1 inline-flex h-11 items-center rounded-md border bg-white px-6 transition-colors"
        >
          GitHub
        </Link>
      </div>
    </section>

    {/* 진입 분기 카드 */}
    <section className="mb-16 grid grid-cols-1 gap-4 md:grid-cols-2">
      <Link
        href="/components"
        className="border-cool-grey-04 hover:border-primary-blue-1 hover:shadow-primary group flex flex-col gap-3 rounded-xl border bg-white p-6 transition-all"
      >
        <div className="bg-primary-blue-opacity-10 flex h-11 w-11 items-center justify-center rounded-lg">
          <Icon src="ic-com-set" color="primary-blue-1" size="lg" />
        </div>
        <div>
          <div className="typo-sb16 text-cool-grey-11">Components</div>
          <div className="text-description mt-1">
            Base UI 기반 컴포넌트 카탈로그. variant·color·size·shape로 조립.
          </div>
        </div>
        <div className="typo-sb14 text-primary-blue-1 mt-auto inline-flex items-center gap-1">
          Browse <span aria-hidden>→</span>
        </div>
      </Link>

      <Link
        href="/icon-system"
        className="border-cool-grey-04 hover:border-primary-blue-1 hover:shadow-primary group flex flex-col gap-3 rounded-xl border bg-white p-6 transition-all"
      >
        <div className="bg-primary-skyblue-1 flex h-11 w-11 items-center justify-center rounded-lg">
          <Icon src="ic-saved-folder" color="primary-blue-deep" size="lg" />
        </div>
        <div>
          <div className="typo-sb16 text-cool-grey-11">Icon System</div>
          <div className="text-description mt-1">
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
      <h2 className="text-section-title mb-4">설치</h2>
      <p className="text-description mb-3">
        처음 시작할 때는 Essential Pack을 먼저 설치하세요. 버튼, 입력, 선택 컨트롤, 피드백
        컴포넌트처럼 서비스 화면에 거의 항상 필요한 기본 컴포넌트만 들어갑니다.
      </p>
      <InstallCommands
        options={[
          { label: 'Transight CLI', code: CLI_INSTALL },
          { label: 'shadcn', code: SHADCN_INSTALL }
        ]}
      />
      <div className="mt-3">
        <CodeBlock code={ESSENTIAL_GUIDE} language="txt" maxHeight="auto" />
      </div>
    </section>

    {/* 사용법 */}
    <section className="mb-12">
      <h2 className="text-section-title mb-4">사용</h2>

      {/* 진입 CSS — Vite/Next.js 별도 표시 */}
      <h3 className="text-label mt-4 mb-2">1. 진입 CSS에 디자인 시스템 import</h3>
      <p className="text-description mb-3">
        SUIT 폰트 + Tailwind + 토큰 + 타이포 프리셋이 한 번에 들어옵니다.
      </p>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div>
          <p className="text-overline mb-1.5">Vite</p>
          <CodeBlock code={CSS_VITE} language="css" maxHeight="auto" />
        </div>
        <div>
          <p className="text-overline mb-1.5">Next.js (App Router)</p>
          <CodeBlock code={CSS_NEXTJS} language="css" maxHeight="auto" />
        </div>
      </div>

      <h3 className="text-label mt-6 mb-2">2. 컴포넌트 사용</h3>
      <p className="text-description mb-3">
        설치된 컴포넌트는 카테고리별로{' '}
        <code className="typo-mono-m12 text-cool-grey-09">components/base/</code> 또는{' '}
        <code className="typo-mono-m12 text-cool-grey-09">components/custom/</code>에 떨어집니다.
      </p>
      <CodeBlock code={USAGE_CODE} language="tsx" maxHeight="auto" />
    </section>

    {/* 푸터 */}
    <footer className="text-description border-cool-grey-04 mt-16 border-t pt-6">
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
