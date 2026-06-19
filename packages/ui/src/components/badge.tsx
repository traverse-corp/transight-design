import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeColorStyles = {
  gray: {
    solid: 'bg-cool-grey-04 text-cool-grey-09',
    outline: 'border border-cool-grey-06 bg-white text-cool-grey-07',
    soft: 'bg-cool-grey-02 text-cool-grey-09'
  },
  blue: {
    solid: 'bg-primary-blue-1 text-white',
    outline: 'border border-primary-blue-1 bg-white text-primary-blue-1',
    soft: 'bg-primary-blue-opacity-10 text-primary-blue-1'
  },
  red: {
    solid: 'bg-ui-red text-white',
    outline: 'border border-ui-red bg-white text-ui-red',
    soft: 'bg-ui-pale-red text-ui-red'
  },
  orange: {
    solid: 'bg-ui-orange text-white',
    outline: 'border border-ui-orange bg-white text-ui-orange',
    soft: 'bg-ui-pale-orange text-ui-orange'
  },
  yellow: {
    solid: 'bg-ui-yellow text-white',
    outline: 'border border-ui-yellow bg-white text-ui-yellow',
    soft: 'bg-ui-pale-yellow text-ui-yellow'
  },
  olive: {
    solid: 'bg-ui-olive text-white',
    outline: 'border border-ui-olive bg-white text-ui-olive',
    soft: 'bg-ui-olive/10 text-ui-olive'
  },
  green: {
    solid: 'bg-ui-green text-white',
    outline: 'border border-ui-green bg-white text-ui-green',
    soft: 'bg-ui-pale-green text-ui-green'
  },
  skyblue: {
    solid: 'bg-ui-skyblue text-white',
    outline: 'border border-ui-skyblue bg-white text-ui-skyblue',
    soft: 'bg-ui-skyblue/10 text-ui-skyblue'
  },
  purple: {
    solid: 'bg-ui-purple text-white',
    outline: 'border border-ui-purple bg-white text-ui-purple',
    soft: 'bg-ui-pale-purple text-ui-purple'
  },
  pink: {
    solid: 'bg-ui-pink text-white',
    outline: 'border border-ui-pink bg-white text-ui-pink',
    soft: 'bg-ui-pale-pink text-ui-pink'
  },
  white: {
    solid: 'bg-white text-cool-grey-07',
    outline: 'border border-cool-grey-04 bg-white text-cool-grey-07',
    soft: 'bg-white/80 text-cool-grey-07'
  },
  'gradient-blue': {
    solid: 'bg-gradient-to-r from-primary-blue-1 to-primary-blue-2 text-white',
    outline: 'border border-primary-blue-1 bg-white text-primary-blue-1',
    soft: 'bg-primary-blue-opacity-10 text-primary-blue-1'
  }
} as const

type BadgeColor = keyof typeof badgeColorStyles
type BadgeAppearance = keyof (typeof badgeColorStyles)['gray']

const badgeCompoundVariants = Object.entries(badgeColorStyles).flatMap(([color, styles]) =>
  Object.entries(styles).map(([appearance, className]) => ({
    color: color as BadgeColor,
    appearance: appearance as BadgeAppearance,
    className
  }))
)

const badgeClassVariants = cva(
  'inline-flex items-center font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        lea: '',
        vasp: '',
        'tx-swap': '',
        'tx-bridge': ''
      },
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
      appearance: {
        solid: '',
        outline: '',
        soft: ''
      },
      shape: {
        default: 'rounded-md',
        pill: 'rounded-full',
        square: 'rounded-none'
      },
      size: {
        xs: 'px-1.5 py-0.5 text-[11px] leading-none',
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-[13px]',
        lg: 'px-3.5 py-1.5 text-sm',
        xl: 'px-4 py-2 text-base'
      }
    },
    compoundVariants: badgeCompoundVariants,
    defaultVariants: {
      color: 'gray',
      appearance: 'solid',
      shape: 'default',
      size: 'md'
    }
  }
)

type BadgeVariantProps = VariantProps<typeof badgeClassVariants>
type BadgeDesignColor = NonNullable<BadgeVariantProps['color']>
type BadgePresetVariant = NonNullable<BadgeVariantProps['variant']>

const badgeVariantPresets: Record<
  BadgePresetVariant,
  Pick<BadgeVariantProps, 'color' | 'appearance' | 'shape' | 'size'> & { className?: string }
> = {
  lea: {
    color: 'blue',
    appearance: 'soft',
    shape: 'default',
    size: 'md',
    className: 'bg-ui-pale-blue text-ui-blue typo-r12'
  },
  vasp: {
    color: 'yellow',
    appearance: 'soft',
    shape: 'default',
    size: 'md',
    className: 'bg-ui-pale-yellow text-ui-yellow typo-r12'
  },
  'tx-swap': {
    color: 'orange',
    appearance: 'soft',
    shape: 'default',
    size: 'md',
    className: 'border-ui-orange/20 bg-ui-pale-orange text-ui-orange'
  },
  'tx-bridge': {
    color: 'purple',
    appearance: 'soft',
    shape: 'default',
    size: 'md',
    className: 'border-ui-purple/20 bg-ui-pale-purple text-ui-purple'
  }
}

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>, Omit<BadgeVariantProps, 'color'> {
  color?: BadgeDesignColor | (string & {})
}

const isBadgeColor = (color: BadgeProps['color']): color is BadgeDesignColor =>
  typeof color === 'string' && color in badgeColorStyles

type BadgeVariantOptions = Omit<BadgeVariantProps, 'color'> & {
  color?: BadgeProps['color']
  className?: string
}

function badgeVariants({
  className,
  variant,
  color,
  appearance,
  shape,
  size
}: BadgeVariantOptions = {}) {
  const preset = variant ? badgeVariantPresets[variant] : undefined

  return cn(
    badgeClassVariants({
      variant,
      color: isBadgeColor(color) ? color : preset?.color,
      appearance: appearance ?? preset?.appearance,
      shape: shape ?? preset?.shape,
      size: size ?? preset?.size
    }),
    variant && !color && !appearance && preset?.className,
    className
  )
}

function Badge({ className, variant, color, appearance, shape, size, ...props }: BadgeProps) {
  return (
    <div
      data-slot="badge"
      className={badgeVariants({ variant, color, appearance, shape, size, className })}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
