import { CodeBlock } from '@/components/code-block'
import { InstallCommands } from '@/components/install-commands'
import { StylesNav } from './_components/styles-nav'

export const metadata = {
  title: 'Styles — Transight Design'
}

const CLI_INSTALL = `# 진입점 styles 한 방 설치 (tokens·typography·flex·theme·fonts 자동 동반)
npx @transight-design/cli add styles`

const SHADCN_INSTALL = `# 진입점 styles 한 방 설치 (tokens·typography·flex·theme·fonts 자동 동반)
npx shadcn@latest add traverse-corp/transight-design/styles`

const CSS_VITE = `/* src/index.css */
@import "./styles/index.css";`

const CSS_NEXTJS = `/* app/globals.css */
@import "../src/styles/index.css";`

const StylesInstallPage = () => (
  <div className='mx-auto flex h-screen max-w-7xl gap-10 px-6'>
    <StylesNav />

    <div className='h-screen min-w-0 flex-1 overflow-y-auto py-10'>
      <header className='mb-8'>
        <h1 className='typo-b24 text-fg-strong'>Install</h1>
        <p className='text-description mt-1'>
          진입점 <code className='typo-mono-m12 text-fg-default'>styles</code>를 설치하면 tokens ·
          typography · flex · theme · fonts 5종이 함께 깔립니다.
        </p>
      </header>

      <section className='mb-10'>
        <h2 className='text-section-title mb-3'>1. 설치 명령</h2>
        <InstallCommands
          options={[
            { label: 'Transight CLI', code: CLI_INSTALL },
            { label: 'shadcn', code: SHADCN_INSTALL }
          ]}
        />
      </section>

      <section className='mb-10'>
        <h2 className='text-section-title mb-3'>2. 진입 CSS에 import</h2>
        <p className='text-description mb-3'>
          SUIT / Pretendard 폰트 + Tailwind + 토큰 + 타이포 프리셋이 한 번에 들어옵니다.
        </p>
        <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
          <div>
            <p className='text-overline mb-1.5'>Vite</p>
            <CodeBlock code={CSS_VITE} language='css' maxHeight='auto' />
          </div>
          <div>
            <p className='text-overline mb-1.5'>Next.js (App Router)</p>
            <CodeBlock code={CSS_NEXTJS} language='css' maxHeight='auto' />
          </div>
        </div>
      </section>
    </div>
  </div>
)

export default StylesInstallPage
