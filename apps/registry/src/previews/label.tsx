import { Label } from '@transight-design/ui/components/label'
import { Input } from '@transight-design/ui/components/input'

interface PreviewProps {
  selections?: Record<string, string>
}

type Variant = NonNullable<Parameters<typeof Label>[0]['variant']>
type Size = NonNullable<Parameters<typeof Label>[0]['size']>

export const Preview = ({ selections = {} }: PreviewProps) => (
  <div className='flex w-72 flex-col gap-2'>
    <Label
      htmlFor='preview-email'
      variant={(selections.variant as Variant) ?? 'default'}
      size={(selections.size as Size) ?? undefined}
    >
      이메일
    </Label>
    <Input id='preview-email' />
  </div>
)
