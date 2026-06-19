import { Checkbox } from '@transight-design/ui/components/AnimatedCheckbox'
import { Label } from '@transight-design/ui/components/label'

export const Preview = () => (
  <div className='flex items-center gap-2'>
    <Checkbox id='preview-anim-cb' />
    <Label htmlFor='preview-anim-cb'>애니메이션 체크박스</Label>
  </div>
)
