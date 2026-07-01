import { CopyButton } from './copy-button'

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  maxHeight?: string
}

// 복사용 텍스트 가공 — bash 코드블록은 안내용 주석(`#`)을 제거해 명령어만 클립보드로.
// 빈 라인은 유지(여러 명령 사이 구분), 연속 빈 라인 ≥3은 2개로 정규화.
// 다른 language는 그대로 복사 (// , 블록 주석 등은 본문일 가능성이 높아 일괄 처리 안전하지 않음).
const buildCopyText = (code: string, language?: string): string => {
  if (language !== 'bash') return code
  return code
    .split('\n')
    .filter((line) => !line.trim().startsWith('#'))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/^\n+|\n+$/g, '')
}

export const CodeBlock = ({ code, language, filename, maxHeight = '36rem' }: CodeBlockProps) => (
  <div className='overflow-hidden rounded-lg border border-border-default'>
    <div className='flex items-center justify-between border-b border-border-default bg-bg-subtle px-4 py-2'>
      <span className='typo-mono-m12 text-fg-muted'>
        {filename ?? language ?? 'code'}
      </span>
      <CopyButton text={buildCopyText(code, language)} />
    </div>
    <pre
      className='scrollbar-on-dark overflow-auto bg-bg-inverse p-4 typo-mono-m12 leading-relaxed text-fg-inverse'
      style={{ maxHeight }}
    >
      <code>{code}</code>
    </pre>
  </div>
)
