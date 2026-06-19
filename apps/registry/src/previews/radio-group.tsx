import { RadioGroup, RadioGroupItem } from '@transight-design/ui/components/radio-group'
import { Label } from '@transight-design/ui/components/label'

export const Preview = () => (
  <RadioGroup defaultValue='option-1' className='flex flex-col gap-2'>
    {['option-1', 'option-2', 'option-3'].map((opt, i) => (
      <div key={opt} className='flex items-center gap-2'>
        <RadioGroupItem value={opt} id={opt} />
        <Label htmlFor={opt}>옵션 {i + 1}</Label>
      </div>
    ))}
  </RadioGroup>
)
