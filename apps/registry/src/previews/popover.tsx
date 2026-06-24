'use client'

import { Popover, PopoverContent, PopoverTrigger } from '@transight-design/ui/components/popover'
import { Button } from '@transight-design/ui/components/button'

export const Preview = () => (
  <Popover>
    <PopoverTrigger render={<Button theme="outline">팝오버 열기</Button>} />
    <PopoverContent className="w-64">
      <p className="typo-sb14 text-cool-grey-11">알림</p>
      <p className="text-description mt-1">새로운 메시지가 3건 있습니다.</p>
    </PopoverContent>
  </Popover>
)
