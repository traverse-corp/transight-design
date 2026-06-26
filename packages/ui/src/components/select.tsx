'use client'

import * as React from 'react'
import { Select as SelectPrimitive } from '@base-ui/react/select'
import { cva, type VariantProps } from 'class-variance-authority'
import { ChevronDownIcon, CheckIcon, ChevronUpIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

// shape와 color는 Select root에서 받아 Trigger와 Content/Item이 동일 값을 자동으로 따른다.
// Trigger에 shape/color prop을 따로 줘서 override 가능.
export type SelectShape = 'default' | 'pill' | 'square'

interface SelectContextValue {
  shape: SelectShape
  color: SelectTriggerColor
}

const SelectContext = React.createContext<SelectContextValue>({
  shape: 'default',
  color: 'gray'
})

// SelectPrimitive.Root는 generic (Root<T>)이라 React.ComponentProps로 받아 모든 prop 노출.
export type SelectProps = React.ComponentProps<typeof SelectPrimitive.Root> & {
  /** Trigger와 Content의 모서리 형태를 함께 결정. 기본 'default'. */
  shape?: SelectShape
  /** Trigger 톤 + Content/Item 활성 색을 함께 결정. 기본 'gray'. */
  color?: SelectTriggerColor
}

const Select = ({
  shape = 'default',
  color = 'gray',
  children,
  ...props
}: SelectProps) => (
  <SelectContext.Provider value={{ shape, color }}>
    <SelectPrimitive.Root {...props}>{children}</SelectPrimitive.Root>
  </SelectContext.Provider>
)

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

// ── Trigger 자체 톤 — Button의 color × theme 패턴 미러링 ──
// solid: 채움 (배경 + 흰 글씨)
// outline: 흰 배경 + 색 border + 색 글씨 (기본)
// soft: 옅은 색 배경 + 색 글씨
const selectTriggerColorStyles = {
  gray: {
    solid: 'bg-fg-strong border-border-strong text-on-dark focus-within:border-border-strong',
    outline: 'border-border-default text-fg-default focus-within:border-primary-blue-1',
    soft: 'bg-bg-muted border-border-subtle text-fg-default focus-within:border-border-strong'
  },
  blue: {
    solid: 'bg-primary-blue-1 border-primary-blue-1 text-on-dark focus-within:border-primary-blue-2',
    outline: 'border-primary-blue-1 text-primary-blue-1 focus-within:border-primary-blue-2',
    soft: 'bg-primary-blue-opacity-10 border-primary-blue-opacity-10 text-primary-blue-1 focus-within:border-primary-blue-1'
  },
  red: {
    solid: 'bg-ui-red border-ui-red text-on-dark focus-within:border-ui-red',
    outline: 'border-ui-red text-ui-red focus-within:border-ui-red',
    soft: 'bg-ui-pale-red border-ui-pale-red text-ui-red focus-within:border-ui-red'
  },
  orange: {
    solid: 'bg-ui-orange border-ui-orange text-on-dark focus-within:border-ui-orange',
    outline: 'border-ui-orange text-ui-orange focus-within:border-ui-orange',
    soft: 'bg-ui-pale-orange border-ui-pale-orange text-ui-orange focus-within:border-ui-orange'
  },
  yellow: {
    solid: 'bg-ui-yellow border-ui-yellow text-on-dark focus-within:border-ui-yellow',
    outline: 'border-ui-yellow text-ui-yellow focus-within:border-ui-yellow',
    soft: 'bg-ui-pale-yellow border-ui-pale-yellow text-ui-yellow focus-within:border-ui-yellow'
  },
  olive: {
    solid: 'bg-ui-olive border-ui-olive text-on-dark focus-within:border-ui-olive',
    outline: 'border-ui-olive text-ui-olive focus-within:border-ui-olive',
    soft: 'bg-ui-olive/10 border-ui-olive/10 text-ui-olive focus-within:border-ui-olive'
  },
  green: {
    solid: 'bg-ui-green border-ui-green text-on-dark focus-within:border-ui-green',
    outline: 'border-ui-green text-ui-green focus-within:border-ui-green',
    soft: 'bg-ui-pale-green border-ui-pale-green text-ui-green focus-within:border-ui-green'
  },
  skyblue: {
    solid: 'bg-ui-skyblue border-ui-skyblue text-on-dark focus-within:border-ui-skyblue',
    outline: 'border-ui-skyblue text-ui-skyblue focus-within:border-ui-skyblue',
    soft: 'bg-ui-skyblue/10 border-ui-skyblue/10 text-ui-skyblue focus-within:border-ui-skyblue'
  },
  purple: {
    solid: 'bg-ui-purple border-ui-purple text-on-dark focus-within:border-ui-purple',
    outline: 'border-ui-purple text-ui-purple focus-within:border-ui-purple',
    soft: 'bg-ui-pale-purple border-ui-pale-purple text-ui-purple focus-within:border-ui-purple'
  },
  pink: {
    solid: 'bg-ui-pink border-ui-pink text-on-dark focus-within:border-ui-pink',
    outline: 'border-ui-pink text-ui-pink focus-within:border-ui-pink',
    soft: 'bg-ui-pale-pink border-ui-pale-pink text-ui-pink focus-within:border-ui-pink'
  },
  white: {
    solid: 'bg-bg-card border-border-default text-fg-default focus-within:border-primary-blue-1',
    outline: 'border-border-default text-fg-default focus-within:border-primary-blue-1',
    soft: 'bg-bg-card/80 border-border-default text-fg-default focus-within:border-primary-blue-1'
  },
  'gradient-blue': {
    solid:
      'bg-gradient-to-r from-primary-blue-1 to-primary-blue-2 border-primary-blue-1 text-on-dark focus-within:border-primary-blue-deep',
    outline: 'border-primary-blue-1 text-primary-blue-1 focus-within:border-primary-blue-deep',
    soft: 'bg-primary-blue-opacity-10 border-primary-blue-opacity-10 text-primary-blue-1 focus-within:border-primary-blue-1'
  }
} as const

// data-[placeholder]:opacity-60 — placeholder는 trigger text 색을 그대로 따르되 옅게 표시.
const selectTriggerVariants = cva(
  'flex w-full items-center justify-between gap-1.5 border bg-bg-card shadow-sm transition-colors outline-none [&[data-placeholder]]:opacity-90 [&[data-placeholder]_[data-slot=select-value]]:opacity-60 aria-invalid:border-ui-red aria-invalid:focus-within:border-ui-red aria-invalid:shadow-[0_0_0_1px_rgba(239,68,68,0.1)] disabled:cursor-not-allowed disabled:opacity-50',
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
      theme: {
        solid: '',
        outline: '',
        soft: ''
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
      theme: 'outline',
      shape: 'default',
      size: 'md'
    }
  }
)

type SelectTriggerVariantProps = VariantProps<typeof selectTriggerVariants>
export type SelectTriggerColor = NonNullable<SelectTriggerVariantProps['color']>
export type SelectTriggerTheme = NonNullable<SelectTriggerVariantProps['theme']>
export type SelectTriggerProps = SelectPrimitive.Trigger.Props &
  SelectTriggerVariantProps & {
    /**
     * trigger 시작 위치(왼쪽)에 표시할 데코레이터. 보통 아이콘.
     * 위치는 항상 start로 고정 (chevron이 항상 end를 차지).
     */
    decorator?: React.ReactNode
  }

const SelectTrigger = ({
  className,
  color,
  theme,
  shape,
  size,
  decorator,
  children,
  ...props
}: SelectTriggerProps) => {
  const ctx = React.useContext(SelectContext)
  const resolvedColor: SelectTriggerColor = color ?? ctx.color
  const resolvedTheme: SelectTriggerTheme = theme ?? 'outline'
  const resolvedShape: SelectShape = shape ?? ctx.shape

  return (
    <SelectPrimitive.Trigger
      data-slot='select-trigger'
      className={cn(
        selectTriggerVariants({
          color: resolvedColor,
          theme: resolvedTheme,
          shape: resolvedShape,
          size
        }),
        selectTriggerColorStyles[resolvedColor][resolvedTheme],
        className
      )}
      {...props}
    >
      {decorator && (
        <span className='mr-1 flex shrink-0 items-center opacity-70'>{decorator}</span>
      )}
      {children}
      <SelectPrimitive.Icon
        render={<ChevronDownIcon className='pointer-events-none size-4 opacity-70' />}
      />
    </SelectPrimitive.Trigger>
  )
}

// SelectContent 모서리는 SelectContext의 shape에서 자동 결정.
// pill 트리거에는 더 둥근 popup, square 트리거에는 모서리 살린 popup이 자연.
const contentRadiusForShape: Record<SelectShape, string> = {
  default: 'rounded-md',
  pill: 'rounded-lg',
  square: 'rounded-none'
}

// SelectItem의 hover/focus 배경 + 텍스트 색, ItemIndicator(체크) 색을 color별로 매핑.
const selectItemColorStyles: Record<SelectTriggerColor, { focus: string; check: string }> = {
  gray: {
    focus: 'focus:bg-bg-muted focus:text-fg-strong',
    check: 'text-fg-default'
  },
  blue: {
    focus: 'focus:bg-primary-blue-opacity-10 focus:text-primary-blue-1',
    check: 'text-primary-blue-1'
  },
  red: { focus: 'focus:bg-ui-pale-red focus:text-ui-red', check: 'text-ui-red' },
  orange: { focus: 'focus:bg-ui-pale-orange focus:text-ui-orange', check: 'text-ui-orange' },
  yellow: { focus: 'focus:bg-ui-pale-yellow focus:text-ui-yellow', check: 'text-ui-yellow' },
  olive: { focus: 'focus:bg-ui-olive/10 focus:text-ui-olive', check: 'text-ui-olive' },
  green: { focus: 'focus:bg-ui-pale-green focus:text-ui-green', check: 'text-ui-green' },
  skyblue: { focus: 'focus:bg-ui-skyblue/10 focus:text-ui-skyblue', check: 'text-ui-skyblue' },
  purple: { focus: 'focus:bg-ui-pale-purple focus:text-ui-purple', check: 'text-ui-purple' },
  pink: { focus: 'focus:bg-ui-pale-pink focus:text-ui-pink', check: 'text-ui-pink' },
  white: {
    focus: 'focus:bg-bg-muted focus:text-fg-strong',
    check: 'text-fg-default'
  },
  'gradient-blue': {
    focus: 'focus:bg-primary-blue-opacity-10 focus:text-primary-blue-1',
    check: 'text-primary-blue-1'
  }
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
  >) => {
  const { shape } = React.useContext(SelectContext)
  const radius = contentRadiusForShape[shape]

  return (
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
            'bg-bg-card text-fg-default border-border-default data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative isolate z-50 max-h-(--available-height) w-(--anchor-width) min-w-36 origin-(--transform-origin) overflow-x-hidden overflow-y-auto border shadow-popover duration-100 data-[align-trigger=true]:animate-none',
            radius,
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
}

const SelectLabel = ({ className, ...props }: SelectPrimitive.GroupLabel.Props) => (
  <SelectPrimitive.GroupLabel
    data-slot='select-label'
    className={cn('text-fg-muted typo-sb11 px-2 py-1.5 uppercase tracking-wide', className)}
    {...props}
  />
)

const SelectItem = ({ className, children, ...props }: SelectPrimitive.Item.Props) => {
  const { color } = React.useContext(SelectContext)
  const colorClasses = selectItemColorStyles[color]

  return (
    <SelectPrimitive.Item
      data-slot='select-item'
      className={cn(
        "typo-m14 text-fg-default data-disabled:opacity-50 relative flex w-full cursor-default items-center gap-2 rounded-md py-1.5 pr-8 pl-2 outline-hidden select-none data-disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        colorClasses.focus,
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className='flex flex-1 shrink-0 gap-2 whitespace-nowrap'>
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator
        render={
          <span
            className={cn(
              'pointer-events-none absolute right-2 flex size-4 items-center justify-center',
              colorClasses.check
            )}
          />
        }
      >
        <CheckIcon className='pointer-events-none' />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

const SelectSeparator = ({ className, ...props }: SelectPrimitive.Separator.Props) => (
  <SelectPrimitive.Separator
    data-slot='select-separator'
    className={cn('bg-bg-muted pointer-events-none -mx-1 my-1 h-px', className)}
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
      "bg-bg-card top-0 z-10 flex w-full cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4",
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
      "bg-bg-card bottom-0 z-10 flex w-full cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4",
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
