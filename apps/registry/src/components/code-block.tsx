import { CopyButton } from './copy-button'

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  maxHeight?: string
}

export const CodeBlock = ({ code, language, filename, maxHeight = '36rem' }: CodeBlockProps) => (
  <div className='overflow-hidden rounded-lg border border-[color:var(--color-doc-border)]'>
    <div className='flex items-center justify-between border-b border-[color:var(--color-doc-border)] bg-[#fbfcfe] px-4 py-2'>
      <span className='font-mono text-xs text-[color:var(--color-doc-muted)]'>
        {filename ?? language ?? 'code'}
      </span>
      <CopyButton text={code} />
    </div>
    <pre
      className='overflow-auto bg-[color:var(--color-doc-code-bg)] p-4 text-xs leading-relaxed text-[color:var(--color-doc-code-fg)]'
      style={{ maxHeight }}
    >
      <code>{code}</code>
    </pre>
  </div>
)
