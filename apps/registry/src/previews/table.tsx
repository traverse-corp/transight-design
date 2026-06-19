import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@transight-design/ui/components/table'

const rows = [
  { id: 'TX-1', amount: '1.45 BTC', status: '확인됨' },
  { id: 'TX-2', amount: '0.32 ETH', status: '대기' },
  { id: 'TX-3', amount: '250 USDT', status: '실패' }
]

export const Preview = () => (
  <Table className='border-cool-grey-04 max-w-md rounded-md border'>
    <TableCaption>최근 트랜잭션</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead>금액</TableHead>
        <TableHead>상태</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {rows.map((r) => (
        <TableRow key={r.id}>
          <TableCell className='typo-mono-m12'>{r.id}</TableCell>
          <TableCell>{r.amount}</TableCell>
          <TableCell>{r.status}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)
