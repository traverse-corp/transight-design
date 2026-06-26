import * as React from 'react'
import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// 자식(Image / Fallback / Badge)이 부모 size/shape를 group selector로 읽도록 root에 data-* 부여.
const avatarRootClassVariants = cva(
  'group/avatar relative flex shrink-0 select-none overflow-hidden',
  {
    variants: {
      size: {
        xs: 'size-5',
        sm: 'size-6',
        md: 'size-8',
        lg: 'size-10',
        xl: 'size-12'
      },
      shape: {
        circle: 'rounded-full',
        square: 'rounded-md'
      }
    },
    defaultVariants: {
      size: 'md',
      shape: 'circle'
    }
  }
)

type AvatarRootVariantProps = VariantProps<typeof avatarRootClassVariants>
export type AvatarSize = NonNullable<AvatarRootVariantProps['size']>
export type AvatarShape = NonNullable<AvatarRootVariantProps['shape']>

export type AvatarProps = AvatarPrimitive.Root.Props & AvatarRootVariantProps

const Avatar = ({ className, size, shape, ...props }: AvatarProps) => (
  <AvatarPrimitive.Root
    data-slot='avatar'
    data-size={size ?? 'md'}
    data-shape={shape ?? 'circle'}
    className={cn(avatarRootClassVariants({ size, shape, className }))}
    {...props}
  />
)

// 자식 element는 부모 shape를 group-data attribute로 따라간다.
const childShape =
  'group-data-[shape=circle]/avatar:rounded-full group-data-[shape=square]/avatar:rounded-md'

const AvatarImage = ({ className, ...props }: AvatarPrimitive.Image.Props) => (
  <AvatarPrimitive.Image
    data-slot='avatar-image'
    className={cn('aspect-square size-full object-cover', childShape, className)}
    {...props}
  />
)

const AvatarFallback = ({ className, ...props }: AvatarPrimitive.Fallback.Props) => (
  <AvatarPrimitive.Fallback
    data-slot='avatar-fallback'
    className={cn(
      'bg-bg-muted text-fg-default flex size-full items-center justify-center',
      // size별 font 자동 스케일
      'group-data-[size=xs]/avatar:typo-sb10',
      'group-data-[size=sm]/avatar:typo-sb11',
      'group-data-[size=md]/avatar:typo-sb13',
      'group-data-[size=lg]/avatar:typo-sb14',
      'group-data-[size=xl]/avatar:typo-sb16',
      childShape,
      className
    )}
    {...props}
  />
)

const AvatarBadge = ({ className, ...props }: React.ComponentProps<'span'>) => (
  <span
    data-slot='avatar-badge'
    className={cn(
      'bg-ui-green ring-white absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full ring-2 select-none',
      'group-data-[size=xs]/avatar:size-1.5',
      'group-data-[size=sm]/avatar:size-2',
      'group-data-[size=md]/avatar:size-2.5',
      'group-data-[size=lg]/avatar:size-3',
      'group-data-[size=xl]/avatar:size-3.5',
      className
    )}
    {...props}
  />
)

const AvatarGroup = ({ className, ...props }: React.ComponentProps<'div'>) => (
  <div
    data-slot='avatar-group'
    className={cn(
      'group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-white',
      className
    )}
    {...props}
  />
)

// AvatarGroup 내부 +N 카운터. 부모 group/avatar의 data-size를 못 읽으므로 자체 size prop.
export interface AvatarGroupCountProps
  extends React.ComponentProps<'div'>,
    Pick<AvatarRootVariantProps, 'size' | 'shape'> {}

const AvatarGroupCount = ({
  className,
  size = 'md',
  shape = 'circle',
  ...props
}: AvatarGroupCountProps) => (
  <div
    data-slot='avatar-group-count'
    className={cn(
      'bg-bg-muted text-fg-default ring-white relative flex shrink-0 items-center justify-center ring-2',
      avatarRootClassVariants({ size, shape }).replace('group/avatar', '').trim(),
      shape === 'square' ? 'rounded-md' : 'rounded-full',
      className
    )}
    {...props}
  />
)

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
  avatarRootClassVariants
}
