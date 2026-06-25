import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from '@transight-design/ui/components/command'

interface PreviewProps {
  selections?: Record<string, string>
}

type Shape = NonNullable<Parameters<typeof Command>[0]['shape']>
type Size = NonNullable<Parameters<typeof Command>[0]['size']>

export const Preview = ({ selections = {} }: PreviewProps) => (
  <Command
    className='border-cool-grey-04 w-80 border'
    shape={(selections.shape as Shape) ?? undefined}
    size={(selections.size as Size) ?? undefined}
  >
    <CommandInput placeholder='검색...' />
    <CommandList>
      <CommandEmpty>결과 없음</CommandEmpty>
      <CommandGroup heading='추천'>
        <CommandItem>
          대시보드
          <CommandShortcut>⌘D</CommandShortcut>
        </CommandItem>
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
