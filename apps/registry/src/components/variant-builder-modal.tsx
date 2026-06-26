'use client'

import * as React from 'react'
import { useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogPopup,
  DialogTitle,
  DialogTrigger
} from '@transight-design/ui/components/dialog'
import { CodeBlock } from './code-block'

interface VariantBuilderModalProps {
  /** trigger 노드 — children으로 받아 그대로 DialogTrigger의 render에 위임 */
  trigger: React.ReactElement
  /** 컴포넌트 PascalCase 이름 (예: 'Button', 'Badge') */
  componentName: string
  /** 현재 Style 토글 선택 — { color, theme, shape, size, ... } */
  selections: Record<string, string>
}

const STYLE_AXES = ['color', 'theme', 'shape', 'size'] as const

/**
 * 셸 명령으로 빌드 — AI 무관, 사용자가 직접 실행하거나 AI에 위임.
 * 가독성과 popup 폭 안전을 위해 한 줄당 하나의 옵션으로 줄바꿈 (POSIX 백슬래시).
 */
const buildCliCommand = (
  componentName: string,
  variantName: string,
  selections: Record<string, string>
) => {
  const lower = componentName.toLowerCase()
  const lines = [
    `npx @transight-design/cli variant add \\`,
    `  --component=${lower} \\`,
    `  --name=${variantName}`
  ]
  for (const axis of STYLE_AXES) {
    if (selections[axis]) {
      lines[lines.length - 1] += ' \\'
      lines.push(`  --${axis}=${selections[axis]}`)
    }
  }
  return lines.join('\n')
}

export const VariantBuilderModal = ({
  trigger,
  componentName,
  selections
}: VariantBuilderModalProps) => {
  const [name, setName] = useState('')

  const command = buildCliCommand(componentName, name || 'my-variant', selections)

  return (
    <Dialog>
      <DialogTrigger render={trigger} />
      <DialogPopup size='xl'>
        <DialogTitle>Variant 추가</DialogTitle>
        <DialogDescription>
          현재 Style 토글 조합을 새 variant로 등록하는 CLI 명령을 만들어드립니다.
          이름을 입력하고 명령을 복사한 뒤, (1) 터미널에서 직접 실행하거나
          (2) AI 에이전트에게 "이 명령 실행해줘"로 위임하세요. AI 종류에 무관합니다.
        </DialogDescription>

        <div className='flex flex-col gap-2'>
          <label className='typo-sb12 text-fg-muted' htmlFor='variant-name'>
            Variant 이름
          </label>
          <input
            id='variant-name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='예: success / muted / brand-blue'
            className='border-border-default focus:border-primary-blue-1 typo-m14 rounded-md border bg-bg-card px-3 py-2 outline-none'
          />
        </div>

        <div className='flex flex-col gap-2'>
          <span className='typo-sb12 text-fg-muted'>CLI 명령</span>
          <CodeBlock code={command} language='bash' maxHeight='auto' />
          <p className='text-description'>
            CLI가 사용자 repo의 컴포넌트 파일을 찾아 <code className='typo-mono-m12'>VariantPresets</code>{' '}
            객체에 한 줄을 자동 삽입합니다. Style 4축(color/theme/shape/size)만 받으며, 미명시 축은 cva
            default로 자동 매핑됩니다.
          </p>
        </div>

        <DialogFooter className='mt-2'>
          <DialogClose theme='outline' size='sm'>
            닫기
          </DialogClose>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  )
}
