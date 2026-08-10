import * as React from 'react'
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const tableClassVariants = cva(
  'group/table scrollbar-subtle border-border-default bg-bg-card relative w-full overflow-x-auto border shadow-card',
  {
    variants: {
      shape: {
        default: 'rounded-lg',
        square: 'rounded-none'
      },
      size: {
        sm: '',
        md: '',
        lg: ''
      }
    },
    defaultVariants: {
      shape: 'default',
      size: 'md'
    }
  }
)

type TableVariantProps = VariantProps<typeof tableClassVariants>

export type TableProps = Omit<React.ComponentProps<'table'>, 'size'> &
  TableVariantProps & {
    /** table을 감싸는 scroll container의 className. */
    containerClassName?: string
    /** 패널 안에 삽입할 때 외곽 border, radius, shadow, background를 제거한다. */
    embedded?: boolean
  }

function Table({
  className,
  containerClassName,
  shape,
  size,
  embedded = false,
  ...props
}: TableProps) {
  return (
    <div
      data-slot="table-container"
      data-shape={shape ?? 'default'}
      data-size={size ?? 'md'}
      data-embedded={embedded || undefined}
      className={cn(
        tableClassVariants({ shape, size }),
        embedded && 'rounded-none border-0 bg-transparent shadow-none',
        containerClassName
      )}
    >
      <table
        data-slot="table"
        className={cn('text-fg-default w-full caption-bottom border-collapse', className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
  return (
    <thead
      data-slot="table-header"
      className={cn('bg-bg-subtle [&_tr]:border-b', className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
  return (
    <tbody
      data-slot="table-body"
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn('typo-sb13 bg-bg-subtle border-border-default border-t', className)}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        'border-border-subtle hover:bg-hover-bg data-[state=selected]:bg-active-bg border-b transition-colors aria-disabled:pointer-events-none aria-disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
}

export type TableAlign = 'start' | 'center' | 'end'
export type TableSortDirection = 'asc' | 'desc' | null

const tableAlignmentStyles: Record<TableAlign, { cell: string; content: string }> = {
  start: { cell: 'text-left', content: 'flex-start-center' },
  center: { cell: 'text-center', content: 'flex-center' },
  end: { cell: 'text-right', content: 'flex-end-center' }
}

const sortAriaValue: Record<Exclude<TableSortDirection, null>, 'ascending' | 'descending'> = {
  asc: 'ascending',
  desc: 'descending'
}

const SortIcon = ({ direction }: { direction: TableSortDirection }) => {
  const Icon = direction === 'asc' ? ChevronUp : direction === 'desc' ? ChevronDown : ChevronsUpDown

  return (
    <Icon
      aria-hidden
      className={cn('size-4 shrink-0', direction === null ? 'text-fg-muted' : 'text-fg-default')}
    />
  )
}

export type TableHeadProps = Omit<React.ComponentProps<'th'>, 'align'> & {
  align?: TableAlign
  /** 지정하면 header 전체가 정렬 button으로 동작한다. */
  onSort?: React.MouseEventHandler<HTMLButtonElement>
  /** 현재 정렬 방향. null은 정렬되지 않은 상태. */
  sortDirection?: TableSortDirection
  /** 정렬 button에 별도 접근성 이름이 필요할 때 사용한다. */
  sortLabel?: string
}

function TableHead({
  className,
  align = 'start',
  onSort,
  sortDirection = null,
  sortLabel,
  scope = 'col',
  children,
  'aria-sort': ariaSortProp,
  ...props
}: TableHeadProps) {
  const ariaSort = onSort ? (sortDirection ? sortAriaValue[sortDirection] : 'none') : ariaSortProp

  return (
    <th
      data-slot="table-head"
      data-align={align}
      scope={scope}
      aria-sort={ariaSort}
      className={cn(
        'text-fg-strong group-data-[size=sm]/table:typo-sb12 group-data-[size=md]/table:typo-sb13 group-data-[size=lg]/table:typo-sb14 align-middle whitespace-nowrap group-data-[size=lg]/table:h-12 group-data-[size=lg]/table:px-5 group-data-[size=md]/table:h-10 group-data-[size=md]/table:px-4 group-data-[size=sm]/table:h-8 group-data-[size=sm]/table:px-3 [&:has([role=checkbox])]:pr-0',
        tableAlignmentStyles[align].cell,
        className
      )}
      {...props}
    >
      {onSort ? (
        <button
          type="button"
          onClick={onSort}
          aria-label={sortLabel}
          className={cn(
            'focus-visible:ring-ring-focus h-full w-full cursor-pointer gap-1.5 rounded-sm focus-visible:ring-2 focus-visible:outline-none',
            tableAlignmentStyles[align].content
          )}
        >
          <span>{children}</span>
          <SortIcon direction={sortDirection} />
        </button>
      ) : (
        children
      )}
    </th>
  )
}

export type TableCellProps = Omit<React.ComponentProps<'td'>, 'align'> & {
  align?: TableAlign
}

function TableCell({ className, align = 'start', ...props }: TableCellProps) {
  return (
    <td
      data-slot="table-cell"
      data-align={align}
      className={cn(
        'text-fg-default group-data-[size=sm]/table:typo-m12 group-data-[size=md]/table:typo-m13 group-data-[size=lg]/table:typo-m14 align-middle whitespace-nowrap group-data-[size=lg]/table:px-5 group-data-[size=lg]/table:py-4 group-data-[size=md]/table:px-4 group-data-[size=md]/table:py-3 group-data-[size=sm]/table:px-3 group-data-[size=sm]/table:py-2 [&:has([role=checkbox])]:pr-0',
        tableAlignmentStyles[align].cell,
        className
      )}
      {...props}
    />
  )
}

export type TableEmptyProps = Omit<React.ComponentProps<'td'>, 'align' | 'colSpan'> & {
  colSpan: number
  children: React.ReactNode
}

function TableEmpty({ className, colSpan, children, ...props }: TableEmptyProps) {
  return (
    <tr data-slot="table-empty-row">
      <td
        data-slot="table-empty"
        colSpan={colSpan}
        className={cn(
          'typo-m13 text-fg-muted h-32 px-4 text-center align-middle whitespace-normal',
          className
        )}
        {...props}
      >
        {children}
      </td>
    </tr>
  )
}

function TableCaption({ className, ...props }: React.ComponentProps<'caption'>) {
  return (
    <caption
      data-slot="table-caption"
      className={cn(
        'text-fg-muted group-data-[size=sm]/table:typo-r11 group-data-[size=md]/table:typo-r12 group-data-[size=lg]/table:typo-r13 caption-bottom text-left group-data-[size=lg]/table:px-5 group-data-[size=lg]/table:py-4 group-data-[size=md]/table:px-4 group-data-[size=md]/table:py-3 group-data-[size=sm]/table:px-3 group-data-[size=sm]/table:py-2',
        className
      )}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableEmpty,
  TableCaption,
  tableClassVariants,
  tableAlignmentStyles
}
