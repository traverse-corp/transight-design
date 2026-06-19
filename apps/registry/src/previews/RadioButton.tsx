'use client'

import { useState } from 'react'
import RadioButton from '@transight-design/ui/components/RadioButton'

export const Preview = () => {
  const [selected, setSelected] = useState('option-1')

  return (
    <div className='flex flex-col gap-2'>
      {['option-1', 'option-2', 'option-3'].map((value, index) => (
        <RadioButton
          key={value}
          name='preview-radio'
          value={value}
          checked={selected === value}
          onChange={() => setSelected(value)}
        >
          {`옵션 ${index + 1}`}
        </RadioButton>
      ))}
    </div>
  )
}
