'use client'

import * as React from 'react'
import { Toggle as TogglePrimitive } from '@base-ui/react/toggle'
import { ToggleGroup as ToggleGroupPrimitive } from '@base-ui/react/toggle-group'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { toggleVariants } from '@/components/toggle'

// ToggleGroupItem 전용 variant (pill, filter, chip 등)
const toggleGroupItemVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        pill: 'h-5 rounded-full px-2 text-xs font-semibold aria-pressed:bg-white aria-pressed:text-cool-grey-10 aria-pressed:shadow-sm text-cool-grey-07 hover:text-cool-grey-09',
        filter:
          'h-6 rounded-md px-2 text-sm font-medium aria-pressed:bg-primary-blue-1 aria-pressed:text-white text-cool-grey-07 hover:bg-cool-grey-03',
        chip: 'rounded-full border px-4 py-2.5 h-auto aria-pressed:border-primary-blue-1 aria-pressed:bg-primary-blue-1/8 border-cool-grey-04 bg-white hover:border-cool-grey-06',
        toolbar:
          'h-7 rounded-full px-3 typo-sb12 aria-pressed:bg-cool-grey-09 aria-pressed:text-white text-cool-grey-07 hover:text-cool-grey-09 transition-colors',
        card: 'h-8 rounded-md border px-4 text-sm font-medium cursor-pointer'
      }
    }
  }
)

// ToggleGroup 컨테이너 variant별 스타일
const groupContainerStyles: Record<string, string> = {
  pill: 'bg-cool-grey-03 h-6 rounded-full p-0.5',
  toolbar: 'bg-cool-grey-03 h-8 rounded-full p-0.5 shadow-sm backdrop-blur-md'
}

type SpecialVariant = 'pill' | 'filter' | 'chip' | 'toolbar' | 'card'
const specialVariants: SpecialVariant[] = ['pill', 'filter', 'chip', 'toolbar', 'card']

type AllVariants = VariantProps<typeof toggleVariants>['variant'] | SpecialVariant

const ToggleGroupContext = React.createContext<{
  size?: VariantProps<typeof toggleVariants>['size']
  variant?: AllVariants
  spacing?: number
  orientation?: 'horizontal' | 'vertical'
}>({
  size: 'default',
  variant: 'default',
  spacing: 0,
  orientation: 'horizontal'
})

function ToggleGroup({
  className,
  variant,
  size,
  spacing = 0,
  orientation = 'horizontal',
  children,
  ...props
}: ToggleGroupPrimitive.Props & {
  variant?: AllVariants
  size?: VariantProps<typeof toggleVariants>['size']
  spacing?: number
  orientation?: 'horizontal' | 'vertical'
}) {
  const containerStyle = variant && groupContainerStyles[variant as string]

  return (
    <ToggleGroupPrimitive
      data-slot='toggle-group'
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      data-orientation={orientation}
      style={{ '--gap': spacing } as React.CSSProperties}
      className={cn(
        'group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] rounded-md data-vertical:flex-col data-vertical:items-stretch data-[spacing=0]:data-[variant=outline]:shadow-xs',
        containerStyle,
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size, spacing, orientation }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  )
}

function ToggleGroupItem({
  className,
  children,
  variant = 'default',
  size = 'default',
  ...props
}: TogglePrimitive.Props & {
  variant?: AllVariants
  size?: VariantProps<typeof toggleVariants>['size']
}) {
  const context = React.useContext(ToggleGroupContext)
  const effectiveVariant = context.variant || variant
  const effectiveSize = context.size || size
  const isSpecial = specialVariants.includes(effectiveVariant as SpecialVariant)

  return (
    <TogglePrimitive
      data-slot='toggle-group-item'
      data-variant={effectiveVariant}
      data-size={effectiveSize}
      data-spacing={context.spacing}
      className={
        isSpecial
          ? cn(
              toggleGroupItemVariants({
                variant: effectiveVariant as SpecialVariant
              }),
              className
            )
          : cn(
              'data-[state=on]:bg-muted shrink-0 group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-2 group-data-[spacing=0]/toggle-group:shadow-none focus:z-10 focus-visible:z-10 group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-l-md group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-md group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-r-md group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-md group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t',
              toggleVariants({
                variant: effectiveVariant as VariantProps<typeof toggleVariants>['variant'],
                size: effectiveSize
              }),
              className
            )
      }
      {...props}
    >
      {children}
    </TogglePrimitive>
  )
}

export { ToggleGroup, ToggleGroupItem, toggleGroupItemVariants }
