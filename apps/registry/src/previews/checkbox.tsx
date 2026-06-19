import { Checkbox } from '@transight-design/ui/components/checkbox'
import { Label } from '@transight-design/ui/components/label'

export const Preview = () => (
  <div className='flex items-center gap-2'>
    <Checkbox id='preview-cb' />
    <Label htmlFor='preview-cb'>약관에 동의합니다</Label>
  </div>
)
