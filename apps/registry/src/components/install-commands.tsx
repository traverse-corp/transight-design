import { CodeBlock } from './code-block'

interface InstallCommandsProps {
  itemName: string
}

const GITHUB_REPO: string = 'traverse-corp/transight-design'

export const InstallCommands = ({ itemName }: InstallCommandsProps) => {
  const cli: string = `npx @transight-design/cli add ${itemName}`
  const shadcn: string = `npx shadcn@latest add ${GITHUB_REPO}/${itemName}`

  return (
    <div className='flex flex-col gap-3'>
      <div>
        <p className='mb-1.5 text-xs font-semibold text-[color:var(--color-doc-muted)]'>
          Transight CLI
        </p>
        <CodeBlock code={cli} language='bash' maxHeight='auto' />
      </div>
      <div>
        <p className='mb-1.5 text-xs font-semibold text-[color:var(--color-doc-muted)]'>
          shadcn (GitHub 주소 직접)
        </p>
        <CodeBlock code={shadcn} language='bash' maxHeight='auto' />
      </div>
    </div>
  )
}
