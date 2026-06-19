'use client'

import { useState } from 'react'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@transight-design/ui/components/input-otp'

export const Preview = () => {
  const [value, setValue] = useState('')
  return (
    <InputOTP maxLength={6} value={value} onChange={setValue}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}
