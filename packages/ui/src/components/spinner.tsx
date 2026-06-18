import { cn } from '@/lib/utils'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const Spinner = ({ size = 'sm', className }: SpinnerProps) => (
  <div
    className={cn(
      'animate-spin rounded-full border-2 border-current border-t-transparent',
      size === 'sm' && 'size-4',
      size === 'md' && 'size-6',
      size === 'lg' && 'size-8',
      className
    )}
  />
)
