'use client'

import * as React from 'react'
import { Select as SelectPrimitive } from '@base-ui/react/select'
import { cva, type VariantProps } from 'class-variance-authority'
import { ChevronDownIcon, CheckIcon, ChevronUpIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

// shape / color / size는 Select root에서 받아 Trigger와 Content/Item이 동일 값을 자동으로 따른다.
// Trigger에 shape/color/size prop을 따로 줘서 override 가능.
export type SelectShape = 'default' | 'pill' | 'square'
export type SelectSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface SelectContextValue {
  shape: SelectShape
  color: SelectTriggerColor
  size: SelectSize
}

const SelectContext = React.createContext<SelectContextValue>({
  shape: 'default',
  color: 'gray06',
  size: 'md'
})

// SelectItem 폰트 크기 매핑 — Trigger의 size와 동일 스케일.
const itemTypoBySize: Record<SelectSize, string> = {
  xs: 'typo-m10',
  sm: 'typo-m12',
  md: 'typo-m13',
  lg: 'typo-m15',
  xl: 'typo-m16'
}

// SelectPrimitive.Root는 generic (Root<T>)이라 React.ComponentProps로 받아 모든 prop 노출.
export type SelectProps = React.ComponentProps<typeof SelectPrimitive.Root> & {
  /** Trigger와 Content의 모서리 형태를 함께 결정. 기본 'default'. */
  shape?: SelectShape
  /** Trigger 톤 + Content/Item 활성 색을 함께 결정. 기본 'gray06'. */
  color?: SelectTriggerColor
  /** Trigger 높이/폰트 + Content Item 폰트 크기를 함께 결정. 기본 'md'. */
  size?: SelectSize
}

const Select = ({
  shape = 'default',
  color = 'gray06',
  size = 'md',
  children,
  ...props
}: SelectProps) => (
  <SelectContext.Provider value={{ shape, color, size }}>
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

import {
  inlineColorThemeStyles,
  GRAY_SCALE_COLORS,
  type ColorTheme,
  type CommonColor,
  type GrayScaleColor
} from '@/lib/color-theme-styles'

const grayScaleSelectFocus = Object.fromEntries(
  GRAY_SCALE_COLORS.map((c) => [c, 'focus-within:border-primary-blue-1'])
) as Record<GrayScaleColor, string>

// Tailwind scanner용 리터럴 나열 필수.
const grayScaleSelectItem: Record<GrayScaleColor, { focus: string; check: string }> = {
  gray01: { focus: 'focus:bg-[var(--color-cool-grey-01)]/15 focus:text-[var(--color-cool-grey-01)]', check: 'text-[var(--color-cool-grey-01)]' },
  gray02: { focus: 'focus:bg-[var(--color-cool-grey-02)]/15 focus:text-[var(--color-cool-grey-02)]', check: 'text-[var(--color-cool-grey-02)]' },
  gray03: { focus: 'focus:bg-[var(--color-cool-grey-03)]/15 focus:text-[var(--color-cool-grey-03)]', check: 'text-[var(--color-cool-grey-03)]' },
  gray04: { focus: 'focus:bg-[var(--color-cool-grey-04)]/15 focus:text-[var(--color-cool-grey-04)]', check: 'text-[var(--color-cool-grey-04)]' },
  gray05: { focus: 'focus:bg-[var(--color-cool-grey-05)]/15 focus:text-[var(--color-cool-grey-05)]', check: 'text-[var(--color-cool-grey-05)]' },
  gray06: { focus: 'focus:bg-[var(--color-cool-grey-06)]/15 focus:text-[var(--color-cool-grey-06)]', check: 'text-[var(--color-cool-grey-06)]' },
  gray07: { focus: 'focus:bg-[var(--color-cool-grey-07)]/15 focus:text-[var(--color-cool-grey-07)]', check: 'text-[var(--color-cool-grey-07)]' },
  gray08: { focus: 'focus:bg-[var(--color-cool-grey-08)]/15 focus:text-[var(--color-cool-grey-08)]', check: 'text-[var(--color-cool-grey-08)]' },
  gray09: { focus: 'focus:bg-[var(--color-cool-grey-09)]/15 focus:text-[var(--color-cool-grey-09)]', check: 'text-[var(--color-cool-grey-09)]' },
  gray10: { focus: 'focus:bg-[var(--color-cool-grey-10)]/15 focus:text-[var(--color-cool-grey-10)]', check: 'text-[var(--color-cool-grey-10)]' },
  gray11: { focus: 'focus:bg-[var(--color-cool-grey-11)]/15 focus:text-[var(--color-cool-grey-11)]', check: 'text-[var(--color-cool-grey-11)]' }
}

// Select 고유 인터랙션 레이어 — focus-within (필드 활성 시 primary-blue-1 하이라이트).
// 색·테마 identity는 inlineColorThemeStyles(정본)에서 상속.
const selectFocusStyles: Record<CommonColor, string> = {
  blue: 'focus-within:border-primary-blue-2',
  red: 'focus-within:border-ui-red',
  orange: 'focus-within:border-ui-orange',
  yellow: 'focus-within:border-ui-yellow',
  olive: 'focus-within:border-ui-olive',
  green: 'focus-within:border-ui-green',
  skyblue: 'focus-within:border-ui-skyblue',
  purple: 'focus-within:border-ui-purple',
  pink: 'focus-within:border-ui-pink',
  amber: 'focus-within:border-ui-amber',
  white: 'focus-within:border-primary-blue-1',
  'gradient-blue': 'focus-within:border-primary-blue-deep',
  'gradient-blue-deep': 'focus-within:border-primary-blue-deep',
  ...grayScaleSelectFocus
}

// Select에서 노출하는 색 — gradient-blue-deep, amber 제외 (기존 API 유지).
type SelectColor = Exclude<CommonColor, 'gradient-blue-deep' | 'amber'>

const SELECT_COLORS: SelectColor[] = [
  ...GRAY_SCALE_COLORS,
  'blue',
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'skyblue',
  'purple',
  'pink',
  'white',
  'gradient-blue'
]

const selectTriggerColorStyles = Object.fromEntries(
  SELECT_COLORS.map((c) => [
    c,
    {
      solid: `${inlineColorThemeStyles[c].solid} border-transparent ${selectFocusStyles[c]}`,
      outline: `${inlineColorThemeStyles[c].outline} ${selectFocusStyles[c]}`,
      soft: `${inlineColorThemeStyles[c].soft} border-transparent ${selectFocusStyles[c]}`
    }
  ])
) as Record<SelectColor, Record<ColorTheme, string>>

const selectTriggerVariants = cva(
  'flex w-full items-center justify-between gap-1.5 border bg-bg-card shadow-sm transition-colors outline-none [&[data-placeholder]_[data-slot=select-value]]:opacity-60 aria-invalid:border-ui-red aria-invalid:focus-within:border-ui-red aria-invalid:shadow-[0_0_0_1px_rgba(239,68,68,0.1)] disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      color: {
        gray01: '',
        gray02: '',
        gray03: '',
        gray04: '',
        gray05: '',
        gray06: '',
        gray07: '',
        gray08: '',
        gray09: '',
        gray10: '',
        gray11: '',
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
        xs: 'h-7 px-2 typo-m10',
        sm: 'h-[37px] px-3 typo-m12',
        md: 'h-10 px-3 typo-m13',
        lg: 'h-12 px-4 typo-m15',
        xl: 'h-14 px-5 typo-m16'
      }
    },
    defaultVariants: {
      color: 'gray06',
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
  const resolvedSize: SelectSize = size ?? ctx.size

  return (
    <SelectPrimitive.Trigger
      data-slot='select-trigger'
      className={cn(
        selectTriggerVariants({
          color: resolvedColor,
          theme: resolvedTheme,
          shape: resolvedShape,
          size: resolvedSize
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
  blue: {
    focus: 'focus:bg-primary-blue-1/10 focus:text-primary-blue-1',
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
    focus:
      'focus:bg-[var(--color-cool-grey-white)]/10 focus:text-[var(--color-cool-grey-white)]',
    check: 'text-[var(--color-cool-grey-white)]'
  },
  'gradient-blue': {
    focus: 'focus:bg-primary-blue-1/10 focus:text-primary-blue-1',
    check: 'text-primary-blue-1'
  },
  ...grayScaleSelectItem
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
  const { color, size } = React.useContext(SelectContext)
  const colorClasses = selectItemColorStyles[color]

  return (
    <SelectPrimitive.Item
      data-slot='select-item'
      className={cn(
        "text-fg-default data-disabled:opacity-50 relative flex w-full cursor-default items-center gap-2 rounded-md py-1.5 pr-8 pl-2 outline-hidden select-none data-disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        itemTypoBySize[size],
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
