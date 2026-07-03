import { Input } from '@transight-design/ui/components/input'
import { Mail } from 'lucide-react'

interface PreviewProps {
  selections?: Record<string, string>
}

type Color = NonNullable<Parameters<typeof Input>[0]['color']>
type Theme = NonNullable<Parameters<typeof Input>[0]['theme']>
type Shape = NonNullable<Parameters<typeof Input>[0]['shape']>
type Size = NonNullable<Parameters<typeof Input>[0]['size']>
type DecoDir = NonNullable<Parameters<typeof Input>[0]['decoDir']>

export const Preview = ({ selections = {} }: PreviewProps) => {
  const decoratorOn = selections.decorator === 'on'
  const decorator = decoratorOn ? <Mail className='text-fg-muted h-4 w-4' /> : undefined

  return (
    <Input
      color={(selections.color as Color) ?? undefined}
      theme={(selections.theme as Theme) ?? undefined}
      shape={(selections.shape as Shape) ?? undefined}
      size={(selections.size as Size) ?? undefined}
      decoDir={(selections.decoDir as DecoDir) ?? undefined}
      decorator={decorator}
      placeholder='무엇이든 입력하세요'
      className='w-80'
    />
  )
}
