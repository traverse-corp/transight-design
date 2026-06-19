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

export const Preview = () => (
  <Sheet>
    <SheetTrigger render={<Button appearance="outline">시트 열기</Button>} />
    <SheetContent>
      <SheetHeader>
        <SheetTitle>설정</SheetTitle>
        <SheetDescription>계정 정보를 확인하고 수정합니다.</SheetDescription>
      </SheetHeader>
      <div className="py-4">
        <p className="text-body">시트 본문 영역입니다.</p>
      </div>
      <SheetFooter>
        <SheetClose render={<Button>저장</Button>} />
      </SheetFooter>
    </SheetContent>
  </Sheet>
)
