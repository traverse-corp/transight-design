import { Checkbox } from '@transight-design/ui/components/checkbox'
import { Label } from '@transight-design/ui/components/label'

interface PreviewProps {
  selections?: Record<string, string>
}

type Color = NonNullable<Parameters<typeof Checkbox>[0]['color']>
type Shape = NonNullable<Parameters<typeof Checkbox>[0]['shape']>
type Size = NonNullable<Parameters<typeof Checkbox>[0]['size']>

export const Preview = ({ selections = {} }: PreviewProps) => (
  <div className='flex items-center gap-2'>
    <Checkbox
      id='preview-cb'
      defaultChecked
      color={(selections.color as Color) ?? undefined}
      shape={(selections.shape as Shape) ?? undefined}
      size={(selections.size as Size) ?? undefined}
    />
    <Label htmlFor='preview-cb'>약관에 동의합니다</Label>
  </div>
)
