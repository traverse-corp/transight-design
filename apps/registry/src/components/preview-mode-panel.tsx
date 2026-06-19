'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'
import { CodeBlock } from './code-block'

interface PreviewModePanelProps {
  preview: ReactNode
  code: string
  codeLabel?: string
}

export const PreviewModePanel = ({ preview, code, codeLabel = 'tsx' }: PreviewModePanelProps) => {
  const [mode, setMode] = useState<'preview' | 'code'>('preview')

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end gap-1">
        <button
          type="button"
          onClick={() => setMode('preview')}
          className={
            mode === 'preview'
              ? 'bg-cool-grey-09 typo-mono-m12 rounded-md px-2.5 py-1 text-white'
              : 'text-cool-grey-07 hover:bg-cool-grey-02 hover:text-cool-grey-11 typo-mono-m12 rounded-md px-2.5 py-1 transition-colors'
          }
        >
          Component
        </button>
        <button
          type="button"
          onClick={() => setMode('code')}
          className={
            mode === 'code'
              ? 'bg-cool-grey-09 typo-mono-m12 rounded-md px-2.5 py-1 text-white'
              : 'text-cool-grey-07 hover:bg-cool-grey-02 hover:text-cool-grey-11 typo-mono-m12 rounded-md px-2.5 py-1 transition-colors'
          }
        >
          {`</>`}
        </button>
      </div>
      {mode === 'preview' ? (
        preview
      ) : (
        <CodeBlock code={code} language={codeLabel} maxHeight="24rem" />
      )}
    </div>
  )
}
