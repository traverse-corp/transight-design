'use client'

import * as React from 'react'
import { Search } from 'lucide-react'
import { Input, type InputProps } from '@/components/input'

export interface SearchInputProps extends Omit<InputProps, 'type' | 'decoDir'> {
  /**
   * 검색 액션. decorator 아이콘 클릭 또는 Enter 입력 시 호출.
   * 단순 검색 트리거용. controlled value는 호출자가 관리.
   */
  onSearch?: (value: string) => void
}

/**
 * 검색 전용 Input — pill shape + 시작 위치 Search 아이콘 decorator 기본 적용.
 * shape/size 등 Input의 Style props는 모두 override 가능.
 */
const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ shape = 'pill', placeholder = 'Search', onSearch, onKeyDown, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null)
    const setRefs = (node: HTMLInputElement | null) => {
      inputRef.current = node
      if (typeof ref === 'function') ref(node)
      else if (ref) ref.current = node
    }

    const trigger = () => onSearch?.(inputRef.current?.value ?? '')

    // base-ui Input의 onKeyDown은 BaseUIEvent로 augmented되어 KeyboardEventHandler를
    // 직접 못 받음 — InputProps의 시그니처 그대로 받아 위임한다.
    const handleKeyDown: NonNullable<InputProps['onKeyDown']> = (event) => {
      if (event.key === 'Enter') trigger()
      onKeyDown?.(event)
    }

    return (
      <Input
        ref={setRefs}
        type='search'
        shape={shape}
        decoDir='start'
        decorator={<Search className='h-4 w-4' />}
        onDecoratorClick={onSearch ? trigger : undefined}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        {...props}
      />
    )
  }
)
SearchInput.displayName = 'SearchInput'

export { SearchInput }
