import { Skeleton } from '@transight-design/ui/components/skeleton'

interface PreviewProps {
  selections?: Record<string, string>
}

type Variant = NonNullable<Parameters<typeof Skeleton>[0]['variant']>
type Animation = NonNullable<Parameters<typeof Skeleton>[0]['animation']>

export const Preview = ({ selections = {} }: PreviewProps) => {
  const variant: Variant = (selections.variant as Variant) ?? 'rect'
  const animation = (selections.animation as Animation) ?? undefined

  if (variant === 'circle') {
    return (
      <div className='flex items-center gap-3'>
        <Skeleton variant='circle' animation={animation} className='w-12' />
        <div className='flex flex-col gap-2'>
          <Skeleton variant='text' animation={animation} className='w-32' />
          <Skeleton variant='text' animation={animation} className='w-20' />
        </div>
      </div>
    )
  }

  if (variant === 'text') {
    return (
      <div className='flex w-72 flex-col gap-2'>
        <Skeleton variant='text' animation={animation} className='w-3/4' />
        <Skeleton variant='text' animation={animation} className='w-1/2' />
        <Skeleton variant='text' animation={animation} className='w-5/6' />
      </div>
    )
  }

  return (
    <div className='flex w-72 flex-col gap-3'>
      <Skeleton variant='rect' animation={animation} className='h-24 w-full' />
      <Skeleton variant='text' animation={animation} className='w-3/4' />
      <Skeleton variant='text' animation={animation} className='w-1/2' />
    </div>
  )
}
