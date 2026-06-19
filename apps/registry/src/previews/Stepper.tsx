'use client'

import { useState } from 'react'
import { Stepper, Step } from '@transight-design/ui/components/Stepper'

export const Preview = () => {
  const [current, setCurrent] = useState(1)

  return (
    <Stepper curStep={current} onStepChange={setCurrent}>
      <Step label='시작'>
        <p className='text-body py-3'>첫 번째 단계입니다.</p>
      </Step>
      <Step label='확인'>
        <p className='text-body py-3'>두 번째 단계입니다.</p>
      </Step>
      <Step label='완료'>
        <p className='text-body py-3'>마지막 단계입니다.</p>
      </Step>
    </Stepper>
  )
}
