'use client'

import { useState } from 'react'
import { CodeBlock } from './code-block'

interface CodeOption {
  /** 탭 버튼 라벨 (예: 'Transight CLI', 'shadcn') */
  label: string
  /** 표시할 코드 */
  code: string
}

interface InstallCommandsProps {
  options: CodeOption[]
}

/**
 * 설치 명령 표시 — 상단 탭 버튼으로 옵션 전환.
 * 같은 작업의 여러 변형(CLI vs shadcn 등)을 한 코드 박스에서 갈아끼움.
 */
export const InstallCommands = ({ options }: InstallCommandsProps) => {
  const [activeIdx, setActiveIdx] = useState(0)
  const active = options[activeIdx] ?? options[0]
  if (!active) return null

  return (
    <div className='flex flex-col gap-2'>
      {/* 탭 버튼 */}
      <div className='flex flex-wrap gap-1'>
        {options.map((opt, idx) => {
          const isActive = idx === activeIdx
          return (
            <button
              key={opt.label}
              type='button'
              onClick={() => setActiveIdx(idx)}
              className={
                isActive
                  ? 'bg-fg-strong typo-sb12 rounded-md px-3 py-1.5 text-fg-inverse'
                  : 'text-fg-muted hover:bg-bg-muted hover:text-fg-strong typo-sb12 rounded-md px-3 py-1.5 transition-colors'
              }
            >
              {opt.label}
            </button>
          )
        })}
      </div>

      {/* 코드 박스 */}
      <CodeBlock code={active.code} language='bash' maxHeight='auto' />
    </div>
  )
}

const GITHUB_REPO: string = 'traverse-corp/transight-design'

/** 단일 아이템 install 명령 (CLI · shadcn 2종) — 컴포넌트 상세 페이지용 */
export const ItemInstallCommands = ({ itemName }: { itemName: string }) => (
  <InstallCommands
    options={[
      { label: 'Transight CLI', code: `npx @transight-design/cli add ${itemName}` },
      { label: 'shadcn', code: `npx shadcn@latest add ${GITHUB_REPO}/${itemName}` }
    ]}
  />
)
