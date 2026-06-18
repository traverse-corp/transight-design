import React, { forwardRef, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { InputGroup, InputGroupInput, InputGroupAddon } from './input-group'
import { type InputProps } from './input'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { useCapsLock } from '@/lib/hooks/use-caps-lock'
import { ArrowBigUpDash } from 'lucide-react'

// base-ui Input이 이벤트를 BaseUIEvent로 래핑하므로, InputProps에서 정확한 이벤트 타입 추출
type InputChangeEvent = Parameters<NonNullable<InputProps['onChange']>>[0]
type InputCompositionEvent = Parameters<NonNullable<InputProps['onCompositionStart']>>[0]

interface InputbarProps extends React.ComponentProps<typeof InputGroupInput> {
  className?: string
  isAlphanumericOnly?: boolean
}

const Inputbar = forwardRef<HTMLInputElement, InputbarProps>(
  ({ className, isAlphanumericOnly, variant, ...props }, ref) => {
    const { t } = useTranslation()
    const isCapsLockOn = useCapsLock()
    const showCapsLock = props.type === 'password' && isCapsLockOn
    // IME 조합(한국어, 일본어 등) 진행 중 여부 추적
    const isComposingRef = useRef(false)

    /** 영숫자가 아닌 문자를 제거하고, 변경이 있으면 toast 표시 */
    const filterAlphanumeric = (input: HTMLInputElement): boolean => {
      const originalValue = input.value
      const sanitizedValue = originalValue.replace(/[^a-zA-Z0-9]/g, '')

      if (originalValue !== sanitizedValue) {
        toast.error(t('FZ_345'), { id: 'invalid-input' })
        input.value = sanitizedValue
        return true
      }
      return false
    }

    const handleChange = (e: InputChangeEvent) => {
      // IME 조합 중에는 필터링하지 않음 — 조합이 깨져서 기존 입력값이 사라지는 현상 방지
      if (isAlphanumericOnly && !isComposingRef.current) {
        filterAlphanumeric(e.target as HTMLInputElement)
      }

      // maxLength 제한 — base-ui Input이 native maxLength를 전달하지 않을 수 있으므로 직접 제한
      if (props.maxLength && !isComposingRef.current) {
        const input = e.target as HTMLInputElement
        if (input.value.length > props.maxLength) {
          input.value = input.value.slice(0, props.maxLength)
        }
      }

      props.onChange?.(e)
    }

    const handleCompositionStart = (e: InputCompositionEvent) => {
      isComposingRef.current = true
      props.onCompositionStart?.(e)
    }

    const handleCompositionEnd = (e: InputCompositionEvent) => {
      isComposingRef.current = false
      const input = e.target as HTMLInputElement

      // IME 조합 완료 후 영숫자 필터링 적용
      if (isAlphanumericOnly) {
        if (filterAlphanumeric(input)) {
          // 필터링된 값을 react-hook-form 등 부모에게 전달
          const syntheticEvent = {
            ...e,
            target: input,
            type: 'change'
          } as InputChangeEvent
          props.onChange?.(syntheticEvent)
        }
      }

      // IME 조합 완료 후 maxLength 제한 적용
      if (props.maxLength && input.value.length > props.maxLength) {
        input.value = input.value.slice(0, props.maxLength)
        const syntheticEvent = {
          ...e,
          target: input,
          type: 'change'
        } as InputChangeEvent
        props.onChange?.(syntheticEvent)
      }

      props.onCompositionEnd?.(e)
    }

    return (
      <InputGroup className={twMerge('h-10 w-full bg-white', className)}>
        <InputGroupInput
          ref={ref}
          variant={variant}
          {...props}
          onChange={handleChange}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
        />
        <InputGroupAddon align='inline-end'>
          {showCapsLock && (
            <div
              className='text-cool-grey-07 absolute top-1/2 right-3 -translate-y-1/2'
              title='Caps Lock is Activated'
            >
              <ArrowBigUpDash className='h-5 w-5' />
            </div>
          )}
          {props.maxLength && props.value !== undefined && props.value !== null
            ? `${String(props.value).length}/${props.maxLength}`
            : null}
        </InputGroupAddon>
      </InputGroup>
    )
  }
)

export default Inputbar
