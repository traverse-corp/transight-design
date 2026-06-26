import React, { forwardRef } from 'react'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from './input-group'
import { Search } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

interface SearchBarProps extends React.ComponentProps<typeof InputGroupInput> {
  className?: string
  onSearch: (value: string) => void
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ onSearch, className, ...props }, ref) => {
    const handleEnterSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onSearch(String(props.value || ''))
      }
    }

    return (
      <InputGroup className={twMerge('h-10 w-150 bg-bg-card', className)}>
        <InputGroupInput ref={ref} {...props} onKeyDown={handleEnterSearch} />
        <InputGroupAddon align='inline-end'>
          <InputGroupButton onClick={() => onSearch(String(props.value || ''))}>
            <Search className='text-fg-default' />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    )
  }
)

export default SearchBar
