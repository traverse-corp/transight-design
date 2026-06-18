import { Input } from '@transight-design/ui/components/input'

export const Preview = () => (
  <div className='flex w-72 flex-col gap-3'>
    <Input placeholder='이메일 주소' />
    <Input placeholder='비밀번호' type='password' />
    <Input placeholder='비활성화' disabled />
  </div>
)
