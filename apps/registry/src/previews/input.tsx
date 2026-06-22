import { Input } from '@transight-design/ui/components/input'

interface PreviewProps {
  selections?: Record<string, string>
}

type Variant = NonNullable<Parameters<typeof Input>[0]['variant']>
type Shape = NonNullable<Parameters<typeof Input>[0]['shape']>
type Size = NonNullable<Parameters<typeof Input>[0]['size']>
type DecoDir = NonNullable<Parameters<typeof Input>[0]['decoDir']>

export const Preview = ({ selections = {} }: PreviewProps) => (
  <Input
    variant={(selections.variant as Variant) ?? 'default'}
    shape={(selections.shape as Shape) ?? undefined}
    size={(selections.size as Size) ?? undefined}
    decoDir={(selections.decoDir as DecoDir) ?? undefined}
    className='w-80'
  />
)
