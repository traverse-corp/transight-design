import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput
} from '@transight-design/ui/components/input-group'
import { Search } from 'lucide-react'

interface PreviewProps {
  selections?: Record<string, string>
}

type Color = NonNullable<Parameters<typeof InputGroup>[0]['color']>
type Theme = NonNullable<Parameters<typeof InputGroup>[0]['theme']>
type Shape = NonNullable<Parameters<typeof InputGroup>[0]['shape']>
type Size = NonNullable<Parameters<typeof InputGroup>[0]['size']>

export const Preview = ({ selections = {} }: PreviewProps) => (
  <InputGroup
    color={(selections.color as Color) ?? undefined}
    theme={(selections.theme as Theme) ?? undefined}
    shape={(selections.shape as Shape) ?? undefined}
    size={(selections.size as Size) ?? undefined}
    className="w-80"
  >
    <InputGroupAddon>
      <Search />
    </InputGroupAddon>
    <InputGroupInput placeholder="검색..." />
    <InputGroupAddon align="inline-end">
      <InputGroupButton aria-label="검색 실행">검색</InputGroupButton>
    </InputGroupAddon>
  </InputGroup>
)
