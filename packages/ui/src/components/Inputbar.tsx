import * as React from 'react'
import { Input, type InputProps } from '@/components/input'

interface InputbarProps extends InputProps {
  isAlphanumericOnly?: boolean
}

const Inputbar = React.forwardRef<HTMLInputElement, InputbarProps>(
  ({ isAlphanumericOnly: _isAlphanumericOnly, className, ...props }, ref) => {
    return <Input ref={ref} className={className} {...props} />
  }
)

Inputbar.displayName = 'Inputbar'

export default Inputbar
