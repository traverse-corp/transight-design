import { Field, FieldLabel, FieldDescription } from '@transight-design/ui/components/field'
import { Input } from '@transight-design/ui/components/input'

export const Preview = () => (
  <Field className='w-80'>
    <FieldLabel htmlFor='preview-field'>이메일</FieldLabel>
    <Input id='preview-field' placeholder='you@example.com' />
    <FieldDescription>로그인에 사용되는 이메일입니다.</FieldDescription>
  </Field>
)
