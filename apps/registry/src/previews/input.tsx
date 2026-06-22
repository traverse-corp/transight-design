import { Input } from '@transight-design/ui/components/input'
import { Mail } from 'lucide-react'

interface PreviewProps {
  selections?: Record<string, string>
}

type Variant = NonNullable<Parameters<typeof Input>[0]['variant']>
type Shape = NonNullable<Parameters<typeof Input>[0]['shape']>
type Size = NonNullable<Parameters<typeof Input>[0]['size']>
type DecoDir = NonNullable<Parameters<typeof Input>[0]['decoDir']>

export const Preview = ({ selections = {} }: PreviewProps) => {
  // interactive-preview의 input 분기에서는 decoDir 대신 합성 'decorator' 컨트롤을
  // 'none' / 'start' / 'end' 3-state로 노출한다.
  const decoratorMode = selections.decorator ?? 'none'
  const decorator =
    decoratorMode === 'none' ? undefined : <Mail className='text-cool-grey-07 h-4 w-4' />
  const decoDir: DecoDir | undefined =
    decoratorMode === 'end' ? 'end' : decoratorMode === 'start' ? 'start' : undefined

  return (
    <Input
      variant={(selections.variant as Variant) ?? 'default'}
      shape={(selections.shape as Shape) ?? undefined}
      size={(selections.size as Size) ?? undefined}
      decoDir={decoDir}
      decorator={decorator}
      className='w-80'
    />
  )
}
