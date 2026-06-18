import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 select-none shadow-md active:scale-95",
  {
    variants: {
      variant: {
        // ── 기본 (Utility) ──
        default: 'bg-primary-blue-1 text-white hover:bg-primary-blue-1/90 shadow-sm',
        destructive: 'bg-destructive text-white hover:bg-destructive/90',
        outline:
          'border border-cool-grey-08 bg-white shadow-sm hover:bg-cool-grey-02 hover:text-accent-foreground',
        ghost: 'hover:bg-cool-grey-03 hover:text-accent-foreground shadow-none',
        'ghost-danger':
          'text-destructive hover:bg-destructive/10 hover:text-destructive active:scale-95',
        link: 'text-primary underline-offset-4 hover:underline shadow-none',
        dark: 'bg-cool-grey-09 text-white hover:bg-cool-grey-10 shadow-md',
        auth: 'h-12 w-full text-base font-semibold bg-primary-blue-1 text-white hover:bg-primary-blue-1/90 shadow-md',

        // ── 색상 (Color System) ──
        // Blue (primary-blue-1)
        'button-blue': 'bg-primary-blue-1 text-white hover:bg-primary-blue-1/90 shadow-sm',
        'button-blue-outline':
          'border border-primary-blue-1 bg-white text-primary-blue-1 hover:bg-cool-grey-01',
        'button-gradient-blue':
          'bg-gradient-to-r from-primary-blue-1 to-primary-blue-2 text-white hover:bg-primary-blue-1/90 shadow-sm',

        // Red
        'button-red': 'bg-ui-red text-white hover:bg-ui-red/90 shadow-sm',
        'button-red-outline': 'border border-ui-red bg-white text-ui-red hover:bg-cool-grey-01',

        // Orange
        'button-orange': 'bg-ui-orange text-white hover:bg-ui-orange/90 shadow-sm',
        'button-orange-outline':
          'border border-ui-orange bg-white text-ui-orange hover:bg-cool-grey-01',

        // Yellow
        'button-yellow': 'bg-ui-yellow text-white hover:bg-ui-yellow/90 shadow-sm',
        'button-yellow-outline':
          'border border-ui-yellow bg-white text-ui-yellow hover:bg-cool-grey-01',

        // Olive
        'button-olive': 'bg-ui-olive text-white hover:bg-ui-olive/90 shadow-sm',
        'button-olive-outline':
          'border border-ui-olive bg-white text-ui-olive hover:bg-cool-grey-01',

        // Green
        'button-green': 'bg-ui-green text-white hover:bg-ui-green/90 shadow-sm',
        'button-green-outline':
          'border border-ui-green bg-white text-ui-green hover:bg-cool-grey-01',

        // Skyblue
        'button-skyblue': 'bg-ui-skyblue text-white hover:bg-ui-skyblue/90 shadow-sm',
        'button-skyblue-outline':
          'border border-ui-skyblue bg-white text-ui-skyblue hover:bg-cool-grey-01',

        // Purple
        'button-purple': 'bg-ui-purple text-white hover:bg-ui-purple/90 shadow-sm',
        'button-purple-outline':
          'border border-ui-purple bg-white text-ui-purple hover:bg-cool-grey-01',

        // Pink
        'button-pink': 'bg-ui-pink text-white hover:bg-ui-pink/90 shadow-sm',
        'button-pink-outline': 'border border-ui-pink bg-white text-ui-pink hover:bg-cool-grey-01',

        // Gray (특수: cool-grey 계열)
        'button-gray': 'bg-cool-grey-04 text-cool-grey-09 hover:bg-cool-grey-04/90 shadow-md',
        'button-gray-outline':
          'border border-cool-grey-06 bg-white text-cool-grey-07 hover:bg-cool-grey-01',

        // White(색상 없음)
        'button-white': 'bg-white text-cool-grey-07 hover:bg-cool-grey-01 shadow-none',

        // ── 그룹 컨테이너 내부 아이템 (배경은 부모에서 제어) ──
        'group-item-on-dark':
          'h-full rounded-none bg-transparent text-white shadow-none hover:bg-white/10 active:bg-white/20',

        // ── 탭 바 전용 (TraceTabBar / TraceControlBar) ──
        'tab-nav': 'h-full rounded-none px-2 text-cool-grey-10 shadow-none disabled:opacity-30',
        'tab-success': 'text-ui-text-green shadow-none hover:bg-ui-pale-green',
        'tab-danger': 'text-cool-grey-07 shadow-none hover:bg-ui-pale-red hover:text-ui-text-red'
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3 text-sm',
        lg: 'h-11 px-8 text-base',
        mini: 'h-7 px-2 text-xs',
        icon: 'size-10',
        'icon-xs': 'size-6',
        'icon-sm': 'size-8',
        'icon-lg': 'size-12',
        action: 'h-auto flex-col gap-0.5 px-2 py-1.5',
        'group-item': 'h-full rounded-none'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

function Button({
  className,
  variant,
  size,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot='button'
      className={cn('cursor-pointer', buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
