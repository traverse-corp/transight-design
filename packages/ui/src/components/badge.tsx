import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-md px-2 py-1 text-[13px] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        // ── 기본 (Utility) ──
        default: 'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        outline: 'text-foreground',
        dark: 'bg-cool-grey-09 text-white shadow-md',

        // ── 색상 (Color System) ──
        // Blue (primary-blue-1)
        'badge-blue': 'bg-primary-blue-1 text-white',
        'badge-blue-outline': 'border border-primary-blue-1 bg-white text-primary-blue-1',
        'badge-gradient-blue': 'bg-gradient-to-r from-primary-blue-1 to-primary-blue-2 text-white',

        // Red
        'badge-red': 'bg-ui-red text-white',
        'badge-red-outline': 'border border-ui-red bg-white text-ui-red',

        // Orange
        'badge-orange': 'bg-ui-orange text-white',
        'badge-orange-outline': 'border border-ui-orange bg-white text-ui-orange',

        // Yellow
        'badge-yellow': 'bg-ui-yellow text-white',
        'badge-yellow-outline': 'border border-ui-yellow bg-white text-ui-yellow',

        // Olive
        'badge-olive': 'bg-ui-olive text-white',
        'badge-olive-outline': 'border border-ui-olive bg-white text-ui-olive',

        // Green
        'badge-green': 'bg-ui-green text-white',
        'badge-green-outline': 'border border-ui-green bg-white text-ui-green',

        // Skyblue
        'badge-skyblue': 'bg-ui-skyblue text-white',
        'badge-skyblue-outline': 'border border-ui-skyblue bg-white text-ui-skyblue',

        // Purple
        'badge-purple': 'bg-ui-purple text-white',
        'badge-purple-outline': 'border border-ui-purple bg-white text-ui-purple',

        // Pink
        'badge-pink': 'bg-ui-pink text-white',
        'badge-pink-outline': 'border border-ui-pink bg-white text-ui-pink',

        // Gray (특수: cool-grey 계열)
        'badge-gray': 'bg-cool-grey-04 text-cool-grey-09',
        'badge-gray-outline': 'border border-cool-grey-06 bg-white text-cool-grey-07',

        // ── 도메인 특화 (IAAN 프로토콜 상태) ──
        request: 'text-ui-text-green bg-ui-pale-green',
        progressing: 'text-ui-text-blue bg-ui-pale-blue',
        end: 'text-cool-grey-07 bg-cool-grey-04',
        reject: 'text-ui-red bg-ui-pale-red',
        temporary: 'text-ui-text-purple bg-ui-pale-purple',
        release: 'text-ui-pink bg-ui-pale-pink',
        releaserequest: 'text-ui-orange bg-ui-pale-orange',

        // ── 도메인 특화 (파일) ──
        file: 'w-10 h-10 px-2 py-3 text-white flex items-center justify-center rounded-md border-none !text-xs',

        // ── 도메인 특화 (Trace) ──
        trusted:
          'border-primary-blue-Opacity-20 bg-primary-blue-opacity-10 text-primary-blue-1 hover:bg-primary-blue-opacity-20',
        scam: 'border-ui-red/20 bg-ui-pale-red text-ui-red hover:bg-ui-pale-red/80',
        in: 'border-ui-green/20 bg-ui-pale-green text-ui-green',
        out: 'border-ui-red/20 bg-ui-pale-red text-ui-red',
        swap: 'border-ui-orange/20 bg-ui-pale-orange text-ui-orange',
        status: 'rounded-full p-0 size-1.5 border-none',

        // ── 도메인 특화 (기관 라벨) ──
        lea: 'bg-ui-pale-blue text-ui-blue typo-r12',
        vasp: 'bg-ui-pale-yellow text-ui-yellow typo-r12',
        system: 'bg-cool-grey-04 text-cool-grey-09 typo-r12',
        unknown: 'bg-cool-grey-04 text-cool-grey-09 typo-r12',
        // TX 타입 (TransactionListPanel)
        'tx-swap': 'border-ui-orange/20 bg-ui-pale-orange text-ui-orange',
        'tx-bridge': 'border-ui-purple/20 bg-ui-pale-purple text-ui-purple',
        'tx-native': 'bg-cool-grey-04 text-cool-grey-09',
        'tx-token': 'border-primary-blue-1/20 bg-primary-blue-opacity-10 text-primary-blue-1',
        'tx-internal': 'border-cool-grey-05 bg-cool-grey-02 text-cool-grey-07',
        'tx-contract': 'border-ui-text-purple/20 bg-ui-pale-purple text-ui-text-purple'
      },
      size: {
        default: 'px-3 py-1',
        sm: 'px-2 py-0.5',
        mini: 'px-2 py-1 text-[11px] leading-none'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div data-slot='badge' className={cn(badgeVariants({ variant, size, className }))} {...props} />
  )
}

export { Badge, badgeVariants }
