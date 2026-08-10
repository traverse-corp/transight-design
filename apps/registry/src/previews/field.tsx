import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel
} from '@transight-design/ui/components/field'
import { Input } from '@transight-design/ui/components/input'

export const Preview = () => (
  <Field className="w-80" data-invalid="true">
    <FieldLabel htmlFor="preview-field">이메일</FieldLabel>
    <Input id="preview-field" aria-invalid="true" defaultValue="invalid-email" />
    <FieldDescription>로그인에 사용되는 이메일입니다.</FieldDescription>
    <FieldError>올바른 이메일 주소를 입력해 주세요.</FieldError>
  </Field>
)
