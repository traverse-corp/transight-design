'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@transight-design/ui/components/select'

interface PreviewProps {
  selections?: Record<string, string>
}

type Color = NonNullable<Parameters<typeof SelectTrigger>[0]['color']>
type Shape = NonNullable<Parameters<typeof SelectTrigger>[0]['shape']>
type Size = NonNullable<Parameters<typeof SelectTrigger>[0]['size']>

export const Preview = ({ selections = {} }: PreviewProps) => (
  <Select>
    <SelectTrigger
      color={(selections.color as Color) ?? undefined}
      shape={(selections.shape as Shape) ?? undefined}
      size={(selections.size as Size) ?? undefined}
      className='w-60'
    >
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
