import * as React from 'react'
import { ChevronsUpDown, ChevronUp, ChevronDown } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

/* Table 컨테이너 variant */
const tableContainerVariants = cva(
  'scrollbar-custom relative flex h-fit w-full flex-col overflow-x-auto',
  {
    variants: {
      variant: {
        default: 'border-cool-grey-04 gap-12 rounded-lg border shadow-md',
        /* 패널 내부 삽입용 — border/shadow/gap/rounded 없음 */
        embedded: 'gap-0 border-0 shadow-none rounded-none p-0'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

function Table({
  className,
  containerClassName,
  variant,
  ...props
}: React.ComponentProps<'table'> &
  VariantProps<typeof tableContainerVariants> & {
    containerClassName?: string
  }) {
  return (
    <div
      data-slot='table-container'
      className={cn(tableContainerVariants({ variant }), containerClassName)}
    >
      <table
        data-slot='table'
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
  return (
    <thead
      data-slot='table-header'
      className={cn('text-body [&_tr]:border-b', className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
  return (
    <tbody
      data-slot='table-body'
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
  return (
    <tfoot
      data-slot='table-footer'
      className={cn('bg-muted/50 border-t font-medium [&>tr]:last:border-b-0', className)}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  return (
    <tr
      data-slot='table-row'
      className={cn(
        'hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors',
        className
      )}
      {...props}
    />
  )
}

// Table List들의 Group을 구성합니다.
function TableGroup({ ...props }: React.ComponentProps<'tr'>) {
  return <React.Fragment>{props.children}</React.Fragment>
}

/* TableHead 높이 variant */
const tableHeadVariants = cva(
  'text-foreground border-b-cool-grey-06 border-b p-2 text-center align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0',
  {
    variants: {
      size: {
        default: 'h-12',
        /* compact — !h-7 오버라이드 대체용 */
        compact: 'h-7'
      }
    },
    defaultVariants: {
      size: 'default'
    }
  }
)

/** 정렬 방향에 따른 아이콘 렌더링 */
const sortIcons: Record<string, React.ReactNode> = {
  asc: <ChevronUp className='text-cool-grey-09 h-4 w-4' />,
  desc: <ChevronDown className='text-cool-grey-09 h-4 w-4' />,
  none: <ChevronsUpDown className='text-cool-grey-07 h-4 w-4' />
}

function TableHead({
  className,
  size,
  onSort,
  sortDirection,
  ...props
}: React.ComponentProps<'th'> &
  VariantProps<typeof tableHeadVariants> & {
    onSort?: () => void
    /** 정렬 방향: 'asc' | 'desc' | null (미정렬) */
    sortDirection?: 'asc' | 'desc' | null
  }) {
  return (
    <th data-slot='table-head' className={cn(tableHeadVariants({ size }), className)} {...props}>
      <div
        className={cn(
          'flex items-center justify-center gap-0.5',
          className?.includes('text-left') && 'justify-start',
          className?.includes('text-right') && 'justify-end'
        )}
      >
        {props.children}
        {/* 정렬 기능을 필요로 하는 경우 정렬 로직을 수행하는 정렬 버튼을 렌더링합니다 */}
        {onSort && (
          <button className='cursor-pointer' onClick={onSort}>
            {sortIcons[sortDirection ?? 'none']}
          </button>
        )}
      </div>
    </th>
  )
}

function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
  return (
    <td
      data-slot='table-cell'
      className={cn(
        'text-body p-1.5 text-center align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0',
        className
      )}
      {...props}
    />
  )
}

function TableCaption({ className, ...props }: React.ComponentProps<'caption'>) {
  return (
    <caption
      data-slot='table-caption'
      className={cn('text-muted-foreground mt-4 text-sm', className)}
      {...props}
    />
  )
}

export {
  Table,
  tableContainerVariants,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  tableHeadVariants,
  TableGroup,
  TableRow,
  TableCell,
  TableCaption
}
