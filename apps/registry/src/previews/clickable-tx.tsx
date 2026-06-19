'use client'

import { ClickableTxHash } from '@transight-design/ui/components/clickable-tx'

export const Preview = () => (
  <ClickableTxHash
    txHash='5b8c4f3e1a2d6e7c9b3a8d4f5e1c2b6a9d8c7b3a5e6f1d2c4b8a7e9d3f5c1b6a'
    network='ETH'
    onSelect={() => {}}
  />
)
