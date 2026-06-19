'use client'

import { Toaster } from '@transight-design/ui/components/sonner'
import { toast } from 'sonner'
import { Button } from '@transight-design/ui/components/button'

export const Preview = () => (
  <>
    <Button onClick={() => toast.success('저장되었습니다')}>토스트 띄우기</Button>
    <Toaster />
  </>
)
