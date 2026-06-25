import * as React from 'react'
import { Menu as MenuPrimitive } from '@base-ui/react/menu'
import { cva, type VariantProps } from 'class-variance-authority'
import { ChevronRightIcon, CheckIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const DropdownMenu = ({ ...props }: MenuPrimitive.Root.Props) => (
  <MenuPrimitive.Root data-slot='dropdown-menu' {...props} />
)

const DropdownMenuPortal = ({ ...props }: MenuPrimitive.Portal.Props) => (
  <MenuPrimitive.Portal data-slot='dropdown-menu-portal' {...props} />
)

const DropdownMenuTrigger = ({ ...props }: MenuPrimitive.Trigger.Props) => (
  <MenuPrimitive.Trigger data-slot='dropdown-menu-trigger' {...props} />
)

// size로 popup padding + 자식 item 크기 자동 스케일 (group/dropdown-menu 자식이 group-data-[size=...] 추적).
const dropdownContentClassVariants = cva(
  'group/dropdown-menu border-cool-grey-04 isolate z-50 max-h-(--available-height) w-(--anchor-width) min-w-32 origin-(--transform-origin) scrollbar-custom overflow-x-hidden overflow-y-auto rounded-md border bg-white shadow-md duration-100 outline-none data-closed:overflow-hidden data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
  {
    variants: {
      size: {
        sm: 'p-0.5',
        md: 'p-1',
        lg: 'p-1.5'
      }
    },
    defaultVariants: {
      size: 'md'
    }
  }
)

type DropdownContentVariantProps = VariantProps<typeof dropdownContentClassVariants>
type DropdownSize = NonNullable<DropdownContentVariantProps['size']>

type DropdownMenuContentProps = MenuPrimitive.Popup.Props &
  Pick<MenuPrimitive.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'> &
  DropdownContentVariantProps

const DropdownMenuContent = ({
  align = 'start',
  alignOffset = 0,
  side = 'bottom',
  sideOffset = 4,
  size,
  className,
  ...props
}: DropdownMenuContentProps) => (
  <MenuPrimitive.Portal>
    <MenuPrimitive.Positioner
      className='isolate z-50 outline-none'
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
    >
      <MenuPrimitive.Popup
        data-slot='dropdown-menu-content'
        data-size={size ?? 'md'}
        className={cn(dropdownContentClassVariants({ size }), className)}
        {...props}
      />
    </MenuPrimitive.Positioner>
  </MenuPrimitive.Portal>
)

const DropdownMenuGroup = ({ ...props }: MenuPrimitive.Group.Props) => (
  <MenuPrimitive.Group data-slot='dropdown-menu-group' {...props} />
)

const DropdownMenuLabel = ({
  className,
  inset,
  ...props
}: MenuPrimitive.GroupLabel.Props & { inset?: boolean }) => (
  <MenuPrimitive.GroupLabel
    data-slot='dropdown-menu-label'
    data-inset={inset}
    className={cn(
      'text-cool-grey-07 typo-sb11 px-2 py-1.5 uppercase tracking-wide data-inset:pl-8',
      className
    )}
    {...props}
  />
)

// 자식 item은 group/dropdown-menu(부모 Popup)의 data-size를 group-data-[size=...]로 자동 추적해 padding/typo 조정.
const itemBaseClass = cn(
  'relative flex cursor-default items-center gap-2 rounded-sm outline-hidden select-none transition-colors',
  'group-data-[size=sm]/dropdown-menu:typo-m12 group-data-[size=sm]/dropdown-menu:px-1.5 group-data-[size=sm]/dropdown-menu:py-1',
  'group-data-[size=md]/dropdown-menu:typo-m13 group-data-[size=md]/dropdown-menu:px-2 group-data-[size=md]/dropdown-menu:py-1.5',
  'group-data-[size=lg]/dropdown-menu:typo-m14 group-data-[size=lg]/dropdown-menu:px-2.5 group-data-[size=lg]/dropdown-menu:py-2',
  'text-cool-grey-11 hover:bg-cool-grey-02 focus:bg-cool-grey-02 data-highlighted:bg-cool-grey-02',
  'data-disabled:pointer-events-none data-disabled:opacity-50',
  'data-inset:pl-8',
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
)

interface DropdownMenuItemProps extends MenuPrimitive.Item.Props {
  inset?: boolean
  variant?: 'default' | 'destructive'
}

const DropdownMenuItem = ({
  className,
  inset,
  variant = 'default',
  ...props
}: DropdownMenuItemProps) => (
  <MenuPrimitive.Item
    data-slot='dropdown-menu-item'
    data-inset={inset}
    data-variant={variant}
    className={cn(
      itemBaseClass,
      'group/dropdown-menu-item',
      'data-[variant=destructive]:text-ui-red data-[variant=destructive]:hover:bg-ui-red/10 data-[variant=destructive]:focus:bg-ui-red/10 data-[variant=destructive]:*:[svg]:text-ui-red',
      className
    )}
    {...props}
  />
)

const DropdownMenuSub = ({ ...props }: MenuPrimitive.SubmenuRoot.Props) => (
  <MenuPrimitive.SubmenuRoot data-slot='dropdown-menu-sub' {...props} />
)

const DropdownMenuSubTrigger = ({
  className,
  inset,
  children,
  ...props
}: MenuPrimitive.SubmenuTrigger.Props & { inset?: boolean }) => (
  <MenuPrimitive.SubmenuTrigger
    data-slot='dropdown-menu-sub-trigger'
    data-inset={inset}
    className={cn(
      itemBaseClass,
      'data-popup-open:bg-cool-grey-02 data-open:bg-cool-grey-02',
      className
    )}
    {...props}
  >
    {children}
    <ChevronRightIcon className='text-cool-grey-07 ml-auto' />
  </MenuPrimitive.SubmenuTrigger>
)

const DropdownMenuSubContent = ({
  align = 'start',
  alignOffset = -3,
  side = 'right',
  sideOffset = 0,
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) => (
  <DropdownMenuContent
    data-slot='dropdown-menu-sub-content'
    className={cn('w-auto min-w-[96px] shadow-lg', className)}
    align={align}
    alignOffset={alignOffset}
    side={side}
    sideOffset={sideOffset}
    {...props}
  />
)

const DropdownMenuCheckboxItem = ({
  className,
  children,
  checked,
  inset,
  ...props
}: MenuPrimitive.CheckboxItem.Props & { inset?: boolean }) => (
  <MenuPrimitive.CheckboxItem
    data-slot='dropdown-menu-checkbox-item'
    data-inset={inset}
    checked={checked}
    className={cn(itemBaseClass, 'pr-8', className)}
    {...props}
  >
    <span
      className='pointer-events-none absolute right-2 flex items-center justify-center'
      data-slot='dropdown-menu-checkbox-item-indicator'
    >
      <MenuPrimitive.CheckboxItemIndicator>
        <CheckIcon className='text-primary-blue-1' />
      </MenuPrimitive.CheckboxItemIndicator>
    </span>
    {children}
  </MenuPrimitive.CheckboxItem>
)

const DropdownMenuRadioGroup = ({ ...props }: MenuPrimitive.RadioGroup.Props) => (
  <MenuPrimitive.RadioGroup data-slot='dropdown-menu-radio-group' {...props} />
)

const DropdownMenuRadioItem = ({
  className,
  children,
  inset,
  ...props
}: MenuPrimitive.RadioItem.Props & { inset?: boolean }) => (
  <MenuPrimitive.RadioItem
    data-slot='dropdown-menu-radio-item'
    data-inset={inset}
    className={cn(itemBaseClass, 'pr-8', className)}
    {...props}
  >
    <span
      className='pointer-events-none absolute right-2 flex items-center justify-center'
      data-slot='dropdown-menu-radio-item-indicator'
    >
      <MenuPrimitive.RadioItemIndicator>
        <CheckIcon className='text-primary-blue-1' />
      </MenuPrimitive.RadioItemIndicator>
    </span>
    {children}
  </MenuPrimitive.RadioItem>
)

const DropdownMenuSeparator = ({ className, ...props }: MenuPrimitive.Separator.Props) => (
  <MenuPrimitive.Separator
    data-slot='dropdown-menu-separator'
    className={cn('bg-cool-grey-04 -mx-1 my-1 h-px', className)}
    {...props}
  />
)

const DropdownMenuShortcut = ({ className, ...props }: React.ComponentProps<'span'>) => (
  <span
    data-slot='dropdown-menu-shortcut'
    className={cn('text-cool-grey-07 typo-m11 ml-auto tracking-widest', className)}
    {...props}
  />
)

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  dropdownContentClassVariants,
  type DropdownSize
}
