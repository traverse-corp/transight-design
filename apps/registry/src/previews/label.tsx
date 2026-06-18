import { Label } from '@transight-design/ui/components/label'
import { Input } from '@transight-design/ui/components/input'

export const Preview = () => (
  <div className='flex w-72 flex-col gap-2'>
    <Label htmlFor='preview-email'>이메일</Label>
    <Input id='preview-email' placeholder='you@example.com' />
  </div>
)
