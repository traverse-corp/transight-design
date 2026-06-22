import { Textarea } from '@transight-design/ui/components/textarea'

interface PreviewProps {
  selections?: Record<string, string>
}

type Shape = NonNullable<Parameters<typeof Textarea>[0]['shape']>
type Size = NonNullable<Parameters<typeof Textarea>[0]['size']>

export const Preview = ({ selections = {} }: PreviewProps) => (
  <Textarea
    shape={(selections.shape as Shape) ?? undefined}
    size={(selections.size as Size) ?? undefined}
    placeholder='메시지를 입력하세요...'
    className='w-80'
  />
)
