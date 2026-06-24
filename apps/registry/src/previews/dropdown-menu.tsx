'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@transight-design/ui/components/dropdown-menu'
import { Button } from '@transight-design/ui/components/button'

export const Preview = () => (
  <DropdownMenu>
    <DropdownMenuTrigger render={<Button theme="outline">메뉴 열기</Button>} />
    <DropdownMenuContent className="w-48">
      <DropdownMenuLabel>계정</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>프로필</DropdownMenuItem>
        <DropdownMenuItem>설정</DropdownMenuItem>
        <DropdownMenuItem>알림</DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>로그아웃</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)
