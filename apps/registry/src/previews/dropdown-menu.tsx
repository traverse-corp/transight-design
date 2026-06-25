'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@transight-design/ui/components/dropdown-menu'
import { Button } from '@transight-design/ui/components/button'

interface PreviewProps {
  selections?: Record<string, string>
}

type Size = NonNullable<Parameters<typeof DropdownMenuContent>[0]['size']>

export const Preview = ({ selections = {} }: PreviewProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger render={<Button theme='outline'>메뉴 열기</Button>} />
    <DropdownMenuContent className='w-48' size={(selections.size as Size) ?? undefined}>
      <DropdownMenuLabel>계정</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          프로필
          <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>설정</DropdownMenuItem>
        <DropdownMenuItem>알림</DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem variant='destructive'>로그아웃</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)
