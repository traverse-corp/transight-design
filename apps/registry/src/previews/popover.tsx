'use client'

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger
} from '@transight-design/ui/components/popover'
import { Button } from '@transight-design/ui/components/button'

interface PreviewProps {
  selections?: Record<string, string>
}

type Shape = NonNullable<Parameters<typeof PopoverContent>[0]['shape']>
type Size = NonNullable<Parameters<typeof PopoverContent>[0]['size']>

export const Preview = ({ selections = {} }: PreviewProps) => (
  <Popover>
    <PopoverTrigger render={<Button theme='outline'>팝오버 열기</Button>} />
    <PopoverContent
      shape={(selections.shape as Shape) ?? undefined}
      size={(selections.size as Size) ?? undefined}
    >
      <PopoverHeader>
        <PopoverTitle>알림</PopoverTitle>
        <PopoverDescription>새로운 메시지가 3건 있습니다.</PopoverDescription>
      </PopoverHeader>
    </PopoverContent>
  </Popover>
)
