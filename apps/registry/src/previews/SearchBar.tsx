'use client'

import { useState } from 'react'
import SearchBar from '@transight-design/ui/components/SearchBar'

export const Preview = () => {
  const [value, setValue] = useState('')

  return (
    <SearchBar
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
      onSearch={setValue}
      placeholder='검색어를 입력하세요'
      className='w-96'
    />
  )
}
