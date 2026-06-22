'use client'

import * as React from 'react'
import { Select as SelectPrimitive } from '@base-ui/react/select'
import { cva, type VariantProps } from 'class-variance-authority'
import { ChevronDownIcon, CheckIcon, ChevronUpIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const Select = SelectPrimitive.Root

const SelectGroup = ({ className, ...props }: SelectPrimitive.Group.Props) => (
  <SelectPrimitive.Group
    data-slot='select-group'
    className={cn('scroll-my-1 p-1', className)}
    {...props}
  />
)

const SelectValue = ({ className, ...props }: SelectPrimitive.Value.Props) => (
  <SelectPrimitive.Value
    data-slot='select-value'
    className={cn('flex flex-1 text-left', className)}
    {...props}
  />
)

// Trigger 자체 톤 — Button의 outline 패턴 미러링. idle/focus border + text를 함께 결정.
// chevron 색도 같은 톤을 따라간다.
const selectTriggerColorStyles = {
  gray: 'border-cool-grey-04 text-cool-grey-09 focus-within:border-primary-blue-1',
  blue: 'border-primary-blue-1 text-primary-blue-1 focus-within:border-primary-blue-2',
  red: 'border-ui-red text-ui-red focus-within:border-ui-red',
  orange: 'border-ui-orange text-ui-orange focus-within:border-ui-orange',
  yellow: 'border-ui-yellow text-ui-yellow focus-within:border-ui-yellow',
  olive: 'border-ui-olive text-ui-olive focus-within:border-ui-olive',
  green: 'border-ui-green text-ui-green focus-within:border-ui-green',
  skyblue: 'border-ui-skyblue text-ui-skyblue focus-within:border-ui-skyblue',
  purple: 'border-ui-purple text-ui-purple focus-within:border-ui-purple',
  pink: 'border-ui-pink text-ui-pink focus-within:border-ui-pink',
  white: 'border-cool-grey-04 text-cool-grey-09 focus-within:border-primary-blue-1',
  'gradient-blue':
    'border-primary-blue-1 text-primary-blue-1 focus-within:border-primary-blue-deep'
} as const

// Input과 동일한 shape/size 매핑. aria-invalid 자동 에러 표시도 동일 패턴.
// color variants의 값은 컴포넌트 안에서 selectTriggerColorStyles로 적용되므로
// cva.variants에는 키만 노출해 extract-variants가 카탈로그 컨트롤을 생성하게 한다.
const selectTriggerVariants = cva(
  'flex w-full items-center justify-between gap-1.5 border bg-white shadow-sm transition-colors outline-none data-placeholder:text-cool-grey-07 aria-invalid:border-ui-red aria-invalid:focus-within:border-ui-red aria-invalid:shadow-[0_0_0_1px_rgba(239,68,68,0.1)] disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      color: {
        gray: '',
        blue: '',
        red: '',
        orange: '',
        yellow: '',
        olive: '',
        green: '',
        skyblue: '',
        purple: '',
        pink: '',
        white: '',
        'gradient-blue': ''
      },
      shape: {
        default: 'rounded-lg',
        pill: 'rounded-full',
        square: 'rounded-none'
      },
      size: {
        xs: 'h-7 px-2 typo-m12',
        sm: 'h-9 px-3 typo-m13',
        md: 'h-10 px-3 typo-m14',
        lg: 'h-12 px-4 typo-m16',
        xl: 'h-14 px-5 typo-m18'
      }
    },
    defaultVariants: {
      color: 'gray',
      shape: 'default',
      size: 'md'
    }
  }
)

type SelectTriggerVariantProps = VariantProps<typeof selectTriggerVariants>
export type SelectTriggerColor = NonNullable<SelectTriggerVariantProps['color']>
export type SelectTriggerProps = SelectPrimitive.Trigger.Props & SelectTriggerVariantProps

const SelectTrigger = ({
  className,
  color,
  shape,
  size,
  children,
  ...props
}: SelectTriggerProps) => {
  const resolvedColor: SelectTriggerColor = color ?? 'gray'
  return (
    <SelectPrimitive.Trigger
      data-slot='select-trigger'
      className={cn(
        selectTriggerVariants({ color: resolvedColor, shape, size }),
        selectTriggerColorStyles[resolvedColor],
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon
        render={<ChevronDownIcon className='pointer-events-none size-4 opacity-70' />}
      />
    </SelectPrimitive.Trigger>
  )
}

const SelectContent = ({
  className,
  children,
  side = 'bottom',
  sideOffset = 4,
  align = 'center',
  alignOffset = 0,
  alignItemWithTrigger = false,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    'align' | 'alignOffset' | 'side' | 'sideOffset' | 'alignItemWithTrigger'
  >) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Positioner
      side={side}
      sideOffset={sideOffset}
      align={align}
      alignOffset={alignOffset}
      alignItemWithTrigger={alignItemWithTrigger}
      className='isolate z-50'
    >
      <SelectPrimitive.Popup
        data-slot='select-content'
        data-align-trigger={alignItemWithTrigger}
        className={cn(
          'bg-white text-cool-grey-09 border-cool-grey-04 data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative isolate z-50 max-h-(--available-height) w-(--anchor-width) min-w-36 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md duration-100 data-[align-trigger=true]:animate-none',
          className
        )}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.List>{children}</SelectPrimitive.List>
        <SelectScrollDownButton />
      </SelectPrimitive.Popup>
    </SelectPrimitive.Positioner>
  </SelectPrimitive.Portal>
)

const SelectLabel = ({ className, ...props }: SelectPrimitive.GroupLabel.Props) => (
  <SelectPrimitive.GroupLabel
    data-slot='select-label'
    className={cn('text-cool-grey-07 typo-sb11 px-2 py-1.5 uppercase tracking-wide', className)}
    {...props}
  />
)

const SelectItem = ({ className, children, ...props }: SelectPrimitive.Item.Props) => (
  <SelectPrimitive.Item
    data-slot='select-item'
    className={cn(
      "typo-m14 text-cool-grey-09 focus:bg-primary-blue-opacity-10 focus:text-primary-blue-1 data-disabled:opacity-50 relative flex w-full cursor-default items-center gap-2 rounded-md py-1.5 pr-8 pl-2 outline-hidden select-none data-disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      className
    )}
    {...props}
  >
    <SelectPrimitive.ItemText className='flex flex-1 shrink-0 gap-2 whitespace-nowrap'>
      {children}
    </SelectPrimitive.ItemText>
    <SelectPrimitive.ItemIndicator
      render={
        <span className='text-primary-blue-1 pointer-events-none absolute right-2 flex size-4 items-center justify-center' />
      }
    >
      <CheckIcon className='pointer-events-none' />
    </SelectPrimitive.ItemIndicator>
  </SelectPrimitive.Item>
)

const SelectSeparator = ({ className, ...props }: SelectPrimitive.Separator.Props) => (
  <SelectPrimitive.Separator
    data-slot='select-separator'
    className={cn('bg-cool-grey-04 pointer-events-none -mx-1 my-1 h-px', className)}
    {...props}
  />
)

const SelectScrollUpButton = ({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) => (
  <SelectPrimitive.ScrollUpArrow
    data-slot='select-scroll-up-button'
    className={cn(
      "bg-white top-0 z-10 flex w-full cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4",
      className
    )}
    {...props}
  >
    <ChevronUpIcon />
  </SelectPrimitive.ScrollUpArrow>
)

const SelectScrollDownButton = ({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) => (
  <SelectPrimitive.ScrollDownArrow
    data-slot='select-scroll-down-button'
    className={cn(
      "bg-white bottom-0 z-10 flex w-full cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4",
      className
    )}
    {...props}
  >
    <ChevronDownIcon />
  </SelectPrimitive.ScrollDownArrow>
)

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  selectTriggerVariants,
  selectTriggerColorStyles
}
