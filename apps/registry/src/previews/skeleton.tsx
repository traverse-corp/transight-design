import { Skeleton } from '@transight-design/ui/components/skeleton'

export const Preview = () => (
  <div className='flex w-72 flex-col gap-3'>
    <Skeleton className='h-4 w-3/4' />
    <Skeleton className='h-4 w-1/2' />
    <Skeleton className='h-24 w-full' />
  </div>
)
