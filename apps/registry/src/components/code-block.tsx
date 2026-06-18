import { CopyButton } from './copy-button'

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  maxHeight?: string
}

export const CodeBlock = ({ code, language, filename, maxHeight = '36rem' }: CodeBlockProps) => (
  <div className='overflow-hidden rounded-lg border border-cool-grey-04'>
    <div className='flex items-center justify-between border-b border-cool-grey-04 bg-cool-grey-01 px-4 py-2'>
      <span className='font-mono text-xs text-cool-grey-07'>
        {filename ?? language ?? 'code'}
      </span>
      <CopyButton text={code} />
    </div>
    <pre
      className='overflow-auto bg-cool-grey-11 p-4 text-xs leading-relaxed text-cool-grey-03'
      style={{ maxHeight }}
    >
      <code>{code}</code>
    </pre>
  </div>
)
