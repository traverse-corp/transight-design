'use client'

import * as React from 'react'
import { ArrowBigUpDash } from 'lucide-react'
import { Input, type InputProps } from '@/components/input'
import { useCapsLock } from '@/lib/hooks/use-caps-lock'

export type PasswordInputProps = Omit<InputProps, 'type'>

/**
 * 비밀번호 입력 전용 Input — type='password' + Caps Lock 인디케이터 자동.
 *
 * Caps Lock이 켜져있는 동안 우측 decorator 슬롯에 Caps Lock 아이콘이 자동 표시된다.
 * 호출자가 명시한 decorator/decoDir이 있어도 그 자리는 Caps Lock 아이콘이 우선한다.
 */
const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    { placeholder = '비밀번호를 입력하세요', decorator, decoDir, onDecoratorClick, ...props },
    ref
  ) => {
    const capsLockOn = useCapsLock()

    if (capsLockOn) {
      return (
        <Input
          ref={ref}
          type='password'
          placeholder={placeholder}
          decoDir='end'
          decorator={
            <span title='Caps Lock is Activated' className='flex items-center'>
              <ArrowBigUpDash className='text-cool-grey-05 h-4 w-4' />
            </span>
          }
          {...props}
        />
      )
    }

    return (
      <Input
        ref={ref}
        type='password'
        placeholder={placeholder}
        decoDir={decoDir}
        decorator={decorator}
        onDecoratorClick={onDecoratorClick}
        {...props}
      />
    )
  }
)
PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }
