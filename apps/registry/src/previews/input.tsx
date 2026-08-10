import { Input } from '@transight-design/ui/components/input'
import { Search } from 'lucide-react'

interface PreviewProps {
  selections?: Record<string, string>
}

type Color = NonNullable<Parameters<typeof Input>[0]['color']>
type Theme = NonNullable<Parameters<typeof Input>[0]['theme']>
type Shape = NonNullable<Parameters<typeof Input>[0]['shape']>
type Size = NonNullable<Parameters<typeof Input>[0]['size']>
export const Preview = ({ selections = {} }: PreviewProps) => {
  return (
    <Input
      color={(selections.color as Color) ?? undefined}
      theme={(selections.theme as Theme) ?? undefined}
      shape={(selections.shape as Shape) ?? undefined}
      size={(selections.size as Size) ?? undefined}
      decorator={<Search className="h-4 w-4" />}
      decoDir="end"
      onDecoratorClick={() => undefined}
      decoratorButtonProps={{ 'aria-label': '검색' }}
      placeholder="무엇이든 입력하세요"
      className="w-80"
    />
  )
}
