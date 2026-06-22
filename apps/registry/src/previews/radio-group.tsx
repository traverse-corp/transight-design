import { RadioGroup, RadioGroupItem } from '@transight-design/ui/components/radio-group'
import { Label } from '@transight-design/ui/components/label'

interface PreviewProps {
  selections?: Record<string, string>
}

type Color = NonNullable<Parameters<typeof RadioGroup>[0]['color']>
type Shape = NonNullable<Parameters<typeof RadioGroup>[0]['shape']>
type Size = NonNullable<Parameters<typeof RadioGroup>[0]['size']>

export const Preview = ({ selections = {} }: PreviewProps) => (
  <RadioGroup
    defaultValue='option-1'
    color={(selections.color as Color) ?? undefined}
    shape={(selections.shape as Shape) ?? undefined}
    size={(selections.size as Size) ?? undefined}
    className='flex flex-col gap-2'
  >
    {['option-1', 'option-2', 'option-3'].map((opt, i) => (
      <div key={opt} className='flex items-center gap-2'>
        <RadioGroupItem value={opt} id={opt} />
        <Label htmlFor={opt}>옵션 {i + 1}</Label>
      </div>
    ))}
  </RadioGroup>
)
