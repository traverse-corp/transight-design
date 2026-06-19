import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from '@transight-design/ui/components/empty'
import { FolderOpen } from 'lucide-react'

export const Preview = () => (
  <Empty className='w-80'>
    <EmptyHeader>
      <EmptyMedia variant='icon'>
        <FolderOpen />
      </EmptyMedia>
      <EmptyTitle>비어있음</EmptyTitle>
      <EmptyDescription>아직 추가된 항목이 없습니다.</EmptyDescription>
    </EmptyHeader>
  </Empty>
)
