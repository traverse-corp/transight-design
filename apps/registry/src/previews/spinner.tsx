import { Spinner } from '@transight-design/ui/components/spinner'

export const Preview = () => (
  <div className='flex items-center gap-4'>
    <Spinner />
    <Spinner className='text-primary-blue-1' />
    <Spinner className='text-ui-red size-6' />
  </div>
)
