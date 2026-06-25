import { PreviewCard as PreviewCardPrimitive } from '@base-ui/react/preview-card'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const HoverCard = ({ ...props }: PreviewCardPrimitive.Root.Props) => (
  <PreviewCardPrimitive.Root data-slot='hover-card' {...props} />
)

const HoverCardTrigger = ({ ...props }: PreviewCardPrimitive.Trigger.Props) => (
  <PreviewCardPrimitive.Trigger data-slot='hover-card-trigger' {...props} />
)

const hoverCardContentClassVariants = cva(
  'z-50 flex origin-(--transform-origin) flex-col gap-2 border-cool-grey-04 typo-m13 text-cool-grey-11 border bg-white shadow-md outline-hidden duration-100 data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
  {
    variants: {
      shape: {
        default: 'rounded-lg',
        square: 'rounded-none'
      },
      size: {
        sm: 'w-56 p-3',
        md: 'w-64 p-4',
        lg: 'w-80 p-5'
      }
    },
    defaultVariants: {
      shape: 'default',
      size: 'md'
    }
  }
)

type HoverCardContentVariantProps = VariantProps<typeof hoverCardContentClassVariants>

type HoverCardContentProps = PreviewCardPrimitive.Popup.Props &
  Pick<PreviewCardPrimitive.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'> &
  HoverCardContentVariantProps

const HoverCardContent = ({
  className,
  side = 'bottom',
  sideOffset = 4,
  align = 'center',
  alignOffset = 4,
  shape,
  size,
  ...props
}: HoverCardContentProps) => (
  <PreviewCardPrimitive.Portal data-slot='hover-card-portal'>
    <PreviewCardPrimitive.Positioner
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      className='isolate z-50'
    >
      <PreviewCardPrimitive.Popup
        data-slot='hover-card-content'
        className={cn(hoverCardContentClassVariants({ shape, size }), className)}
        {...props}
      />
    </PreviewCardPrimitive.Positioner>
  </PreviewCardPrimitive.Portal>
)

export { HoverCard, HoverCardTrigger, HoverCardContent, hoverCardContentClassVariants }
