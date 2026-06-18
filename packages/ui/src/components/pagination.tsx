import * as React from 'react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/button'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  MoreHorizontalIcon
} from 'lucide-react'

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      role='navigation'
      aria-label='pagination'
      data-slot='pagination'
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  )
}

function PaginationContent({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot='pagination-content'
      className={cn('flex items-center gap-1', className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
  return <li data-slot='pagination-item' {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, 'size'> &
  React.ComponentProps<'a'> &
  React.ComponentProps<'button'>

function PaginationLink({ className, isActive, size = 'icon', ...props }: PaginationLinkProps) {
  const Comp = props.href ? 'a' : 'button'

  return (
    <Button
      variant={isActive ? 'outline' : 'ghost'}
      size={size}
      className={cn(className)}
      nativeButton={!props.href}
      render={
        <Comp
          aria-current={isActive ? 'page' : undefined}
          data-slot='pagination-link'
          data-active={isActive}
          {...props}
        />
      }
    />
  )
}

function PaginationPrevious({
  className,
  text = 'Previous',
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label='Go to previous page'
      size='default'
      className={cn('', className)}
      {...props}
    >
      <ChevronLeftIcon data-icon='inline-start' />
      {text && <span className='hidden sm:block'>{text}</span>}
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  text = 'Next',
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label='Go to next page'
      size='default'
      className={cn('', className)}
      {...props}
    >
      {text && <span className='hidden sm:block'>{text}</span>}
      <ChevronRightIcon data-icon='inline-end' />
    </PaginationLink>
  )
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      aria-hidden
      data-slot='pagination-ellipsis'
      className={cn(
        "flex size-9 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <MoreHorizontalIcon />
      <span className='sr-only'>More pages</span>
    </span>
  )
}

/** 페이지 번호 버튼 */
function PaginationButton({
  isActive,
  className,
  children,
  ...props
}: React.ComponentProps<'button'> & { isActive?: boolean }) {
  return (
    <button
      data-slot='pagination-button'
      data-active={isActive}
      className={cn(
        'flex size-9 cursor-pointer items-center justify-center rounded-md text-sm',
        isActive
          ? 'bg-primary text-primary-foreground font-medium'
          : 'hover:bg-accent hover:text-accent-foreground',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

/** 네비게이션 버튼 (처음/이전/다음/마지막) */
type PaginationNavigateRole = 'FIRST' | 'PREV' | 'NEXT' | 'LAST'

const navigateIcons: Record<PaginationNavigateRole, React.ReactNode> = {
  FIRST: <ChevronsLeftIcon className='size-4' />,
  PREV: <ChevronLeftIcon className='size-4' />,
  NEXT: <ChevronRightIcon className='size-4' />,
  LAST: <ChevronsRightIcon className='size-4' />
}

function PaginationNavigate({
  role,
  isFirst,
  isLast,
  className,
  ...props
}: React.ComponentProps<'button'> & {
  role: PaginationNavigateRole
  isFirst?: boolean
  isLast?: boolean
}) {
  const disabled =
    role === 'FIRST' || role === 'PREV'
      ? isFirst
      : role === 'NEXT' || role === 'LAST'
        ? isLast
        : false

  return (
    <button
      data-slot='pagination-navigate'
      disabled={disabled}
      className={cn(
        'flex size-9 cursor-pointer items-center justify-center rounded-md',
        'hover:bg-accent hover:text-accent-foreground',
        'disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      {...props}
    >
      {navigateIcons[role]}
    </button>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationButton,
  PaginationNavigate
}
