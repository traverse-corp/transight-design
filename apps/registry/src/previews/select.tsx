'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@transight-design/ui/components/select'

export const Preview = () => (
  <Select>
    <SelectTrigger className='w-60'>
      <SelectValue placeholder='네트워크를 선택하세요' />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem value='btc'>Bitcoin (BTC)</SelectItem>
        <SelectItem value='eth'>Ethereum (ETH)</SelectItem>
        <SelectItem value='sol'>Solana (SOL)</SelectItem>
        <SelectItem value='trx'>Tron (TRX)</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
)
