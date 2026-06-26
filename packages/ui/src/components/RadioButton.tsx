import React, { forwardRef } from 'react'

interface RadioButtonProps extends React.ComponentProps<'input'> {
  children?: React.ReactNode
}

/**
 * 동결 프로토콜 공통 라디오 버튼 컴포넌트
 */
const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <label className='flex items-center gap-2'>
        <input
          ref={ref}
          type='radio'
          className='accent-primary-blue-1 border-border-default h-5 w-5 disabled:opacity-40'
          {...props}
        />
        {children && <span className='text-md'>{children}</span>}
      </label>
    )
  }
)

RadioButton.displayName = 'RadioButton'

export default RadioButton
