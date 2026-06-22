import { CodeBlock } from '@/components/code-block'
import { InstallCommands } from '@/components/install-commands'
import { IconSystemNav } from './_components/icon-system-nav'

export const metadata = {
  title: 'Icon System — Transight Design'
}

const CLI_INSTALL = `# Icon System만 설치 (styles 자동 동반)
npx @transight-design/cli add icon`

const SHADCN_INSTALL = `# Icon System만 설치 (styles 자동 동반)
npx shadcn@latest add traverse-corp/transight-design/icon`

const MOUNT_GUIDE = `// app/layout.tsx (Next.js App Router)
import { IconSprite } from '@/icons/sprite.gen'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <IconSprite />
        {children}
      </body>
    </html>
  )
}`

const USAGE_CODE = `import { Icon } from '@/icons/icon'

<Icon src="ic-com-search" color="primary-blue-1" size="sm" />`

const IconSystemInstallPage = () => (
  <div className='mx-auto flex h-screen max-w-7xl gap-10 px-6'>
    <IconSystemNav />

    <div className='h-screen min-w-0 flex-1 overflow-y-auto py-10'>
      <header className='mb-8'>
        <h1 className='typo-b24 text-cool-grey-11'>Install</h1>
        <p className='text-description mt-1'>
          Icon System만 따로 설치할 수 있습니다. 컴포넌트는 함께 설치되지 않고,{' '}
          <code className='typo-mono-m12 text-cool-grey-09'>styles</code>만 자동 동반됩니다.
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
        <h2 className='text-section-title mb-3'>2. 앱 루트에 IconSprite 마운트</h2>
        <p className='text-description mb-3'>
          모든 <code className='typo-mono-m12 text-cool-grey-09'>{'<Icon />'}</code>는 한 번 마운트된
          sprite의 symbol을 참조합니다. 루트 레이아웃에 단 한 번만 둡니다.
        </p>
        <CodeBlock code={MOUNT_GUIDE} language='tsx' maxHeight='auto' />
      </section>

      <section className='mb-10'>
        <h2 className='text-section-title mb-3'>3. 사용</h2>
        <p className='text-description mb-3'>
          <code className='typo-mono-m12 text-cool-grey-09'>src</code>는 아이콘 ID,{' '}
          <code className='typo-mono-m12 text-cool-grey-09'>color</code>는 팔레트 토큰 strict union,{' '}
          <code className='typo-mono-m12 text-cool-grey-09'>size</code>는{' '}
          <code className='typo-mono-m12 text-cool-grey-09'>xs/sm/md/lg/xl</code>입니다. 없는 토큰을
          넘기면 컴파일 에러.
        </p>
        <CodeBlock code={USAGE_CODE} language='tsx' maxHeight='auto' />
      </section>
    </div>
  </div>
)

export default IconSystemInstallPage
