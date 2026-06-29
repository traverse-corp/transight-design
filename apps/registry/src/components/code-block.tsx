import { CopyButton } from './copy-button'

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  maxHeight?: string
}

export const CodeBlock = ({ code, language, filename, maxHeight = '36rem' }: CodeBlockProps) => (
  <div className='overflow-hidden rounded-lg border border-border-default'>
    <div className='flex items-center justify-between border-b border-border-default bg-bg-subtle px-4 py-2'>
      <span className='typo-mono-m12 text-fg-muted'>
        {filename ?? language ?? 'code'}
      </span>
      <CopyButton text={code} />
    </div>
    <pre
      className='overflow-auto bg-bg-inverse p-4 typo-mono-m12 leading-relaxed text-fg-inverse'
      style={{ maxHeight }}
    >
      <code>{code}</code>
    </pre>
  </div>
)
