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
import { Button } from '@transight-design/ui/components/button'
import { CodeBlock } from './code-block'

interface VariantBuilderModalProps {
  /** trigger 노드 — children으로 받아 그대로 DialogTrigger의 render에 위임 */
  trigger: React.ReactElement
  /** 컴포넌트 PascalCase 이름 (예: 'Button', 'Badge') */
  componentName: string
  /** 현재 Style 토글 선택 — { color, theme, shape, size, ... } */
  selections: Record<string, string>
}

const buildPresetCode = (
  componentName: string,
  variantName: string,
  selections: Record<string, string>
) => {
  const lower = componentName.toLowerCase()
  const inline = Object.entries(selections)
    .filter(([, v]) => Boolean(v))
    .map(([k, v]) => `${k}: '${v}'`)
    .join(', ')

  return `// ${lower}.tsx — ${lower}VariantPresets 객체에 한 줄만 추가하면 끝.
// TS variant union과 카탈로그가 자동으로 새 키를 인식합니다.

const ${lower}VariantPresets = {
  // ... 기존
  '${variantName}': { ${inline} }
} satisfies Record<string, ${componentName}PresetStyle>

// 사용
<${componentName} variant="${variantName}" />`
}

export const VariantBuilderModal = ({
  trigger,
  componentName,
  selections
}: VariantBuilderModalProps) => {
  const [name, setName] = useState('')

  const code = buildPresetCode(componentName, name || 'my-variant', selections)

  return (
    <Dialog>
      <DialogTrigger render={trigger} />
      <DialogPopup size='lg'>
        <DialogTitle>새 Variant 만들기</DialogTitle>
        <DialogDescription>
          현재 Style 토글로 만든 조합을 preset으로 등록할 수 있게 스니펫을 생성합니다.
          이름을 입력하고 코드를 복사해 컴포넌트 파일에 추가하세요.
        </DialogDescription>

        <div className='flex flex-col gap-2'>
          <label className='typo-sb12 text-cool-grey-07' htmlFor='variant-name'>
            Variant 이름
          </label>
          <input
            id='variant-name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='예: success / muted / brand-blue'
            className='border-cool-grey-04 focus:border-primary-blue-1 typo-m14 rounded-md border bg-white px-3 py-2 outline-none'
          />
        </div>

        <div className='flex flex-col gap-2'>
          <span className='typo-sb12 text-cool-grey-07'>현재 Style 조합</span>
          <CodeBlock code={code} language='tsx' maxHeight='auto' />
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
