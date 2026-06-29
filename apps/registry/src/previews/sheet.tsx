'use client'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@transight-design/ui/components/sheet'
import { Button } from '@transight-design/ui/components/button'

interface PreviewProps {
  selections?: Record<string, string>
}

type Side = NonNullable<Parameters<typeof SheetContent>[0]['side']>
type Size = NonNullable<Parameters<typeof SheetContent>[0]['size']>

export const Preview = ({ selections = {} }: PreviewProps) => (
  <Sheet>
    <SheetTrigger render={<Button theme='outline'>시트 열기</Button>} />
    <SheetContent
      side={(selections.side as Side) ?? undefined}
      size={(selections.size as Size) ?? undefined}
    >
      <SheetHeader>
        <SheetTitle>설정</SheetTitle>
        <SheetDescription>계정 정보를 확인하고 수정합니다.</SheetDescription>
      </SheetHeader>
      <div className='px-4 py-2'>
        <p className='typo-m13 text-fg-default'>시트 본문 영역입니다.</p>
      </div>
      <SheetFooter>
        <SheetClose render={<Button>저장</Button>} />
      </SheetFooter>
    </SheetContent>
  </Sheet>
)
