'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@transight-design/ui/components/select'
import { Coins } from 'lucide-react'

interface PreviewProps {
  selections?: Record<string, string>
}

type Color = NonNullable<Parameters<typeof SelectTrigger>[0]['color']>
type Theme = NonNullable<Parameters<typeof SelectTrigger>[0]['theme']>
type Shape = NonNullable<Parameters<typeof Select>[0]['shape']>
type Size = NonNullable<Parameters<typeof SelectTrigger>[0]['size']>

export const Preview = ({ selections = {} }: PreviewProps) => {
  const decorator = selections.decorator === 'on' ? <Coins className='h-4 w-4' /> : undefined

  return (
    <Select
      shape={(selections.shape as Shape) ?? undefined}
      color={(selections.color as Color) ?? undefined}
      size={(selections.size as Size) ?? undefined}
    >
      <SelectTrigger
        theme={(selections.theme as Theme) ?? undefined}
        decorator={decorator}
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
}
