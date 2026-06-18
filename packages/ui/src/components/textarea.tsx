import * as React from 'react'

import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <div className={cn('relative h-full min-h-50', className)}>
      <textarea
        data-slot='textarea'
        className='border-input dark:bg-input/30 focus:border-primary-blue-1 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 placeholder:text-muted-foreground b2g-transparent flex field-sizing-content h-full w-full rounded-md border px-3.5 py-3 text-sm shadow-xs transition-[color,box-shadow] transition-all duration-200 outline-none focus:border-2 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3 md:text-sm'
        {...props}
      />
      {props.maxLength && (
        <span className='text-muted-foreground absolute right-4 bottom-4 text-xs font-medium'>
          {`${String(props.value || '').length}/${props.maxLength}`}
        </span>
      )}
    </div>
  )
}

export { Textarea }
