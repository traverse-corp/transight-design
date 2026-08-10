'use client'

import * as React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  type TableSortDirection
} from '@transight-design/ui/components/table'

const rows = [
  { id: 'TX-1', amount: '1.45 BTC', status: '확인됨' },
  { id: 'TX-2', amount: '0.32 ETH', status: '대기' },
  { id: 'TX-3', amount: '250 USDT', status: '실패' }
]

interface PreviewProps {
  selections?: Record<string, string>
}

type Shape = NonNullable<Parameters<typeof Table>[0]['shape']>
type Size = NonNullable<Parameters<typeof Table>[0]['size']>

export const Preview = ({ selections = {} }: PreviewProps) => {
  const [sortDirection, setSortDirection] = React.useState<TableSortDirection>(null)
  const orderedRows = React.useMemo(() => {
    if (sortDirection === null) return rows
    return [...rows].sort((a, b) =>
      sortDirection === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)
    )
  }, [sortDirection])

  const handleSort = () => {
    setSortDirection((current) => (current === null ? 'asc' : current === 'asc' ? 'desc' : null))
  }

  return (
    <Table
      shape={(selections.shape as Shape) ?? undefined}
      size={(selections.size as Size) ?? undefined}
      containerClassName="max-w-2xl"
    >
      <TableCaption>최근 트랜잭션 3건</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead onSort={handleSort} sortDirection={sortDirection}>
            ID
          </TableHead>
          <TableHead align="end">금액</TableHead>
          <TableHead align="center">상태</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orderedRows.map((row) => (
          <TableRow key={row.id} data-state={row.status === '대기' ? 'selected' : undefined}>
            <TableCell className="typo-r12-mono">{row.id}</TableCell>
            <TableCell align="end">{row.amount}</TableCell>
            <TableCell align="center">{row.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
