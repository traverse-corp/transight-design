import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput
} from '@transight-design/ui/components/input-group'
import { Search } from 'lucide-react'

export const Preview = () => (
  <InputGroup className='w-72'>
    <InputGroupAddon>
      <Search />
    </InputGroupAddon>
    <InputGroupInput placeholder='검색...' />
  </InputGroup>
)
