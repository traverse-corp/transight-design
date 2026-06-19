import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@transight-design/ui/components/command'

export const Preview = () => (
  <Command className='border-cool-grey-04 w-80 rounded-lg border'>
    <CommandInput placeholder='검색...' />
    <CommandList>
      <CommandEmpty>결과 없음</CommandEmpty>
      <CommandGroup heading='추천'>
        <CommandItem>대시보드</CommandItem>
        <CommandItem>주소 동결</CommandItem>
        <CommandItem>리포트</CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading='설정'>
        <CommandItem>프로필</CommandItem>
        <CommandItem>알림</CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
)
