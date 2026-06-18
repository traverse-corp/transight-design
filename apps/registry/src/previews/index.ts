import type { ComponentType } from 'react'
import { Preview as AccordionPreview } from './accordion'
import { Preview as AlertPreview } from './alert'
import { Preview as AlertDialogLowerPreview } from './alert-dialog'
import { Preview as AlertDialogPreview } from './AlertDialog'
import { Preview as AnimatedAlertDialogPreview } from './AnimatedAlertDialog'
import { Preview as AnimatedBeamPreview } from './animated-beam'
import { Preview as AnimatedAccordionPreview } from './AnimatedAccordion'
import { Preview as AnimatedCheckboxPreview } from './AnimatedCheckbox'
import { Preview as AnimatedPreviewCardPreview } from './AnimatedPreviewCard'
import { Preview as AvatarPreview } from './avatar'
import { Preview as BackButtonPreview } from './back-button'
import { Preview as BadgePreview } from './badge'
import { Preview as ButtonPreview } from './button'
import { Preview as CalendarPreview } from './calendar'
import { Preview as CardPreview } from './card'
import { Preview as CarouselPreview } from './carousel'
import { Preview as CheckboxPreview } from './checkbox'
import { Preview as ClickableAddrPreview } from './clickable-addr'
import { Preview as ClickableTxPreview } from './clickable-tx'
import { Preview as CoinIconPreview } from './CoinIcon'
import { Preview as CommandPreview } from './command'
import { Preview as CopyButtonPreview } from './CopyButton'
import { Preview as CopyWrapperPreview } from './CopyWrapper'
import { Preview as DateTimeInputPreview } from './date-time-input'
import { Preview as DatePickerPreview } from './DatePicker'
import { Preview as DialogPreview } from './dialog'
import { Preview as DropdownMenuPreview } from './dropdown-menu'
import { Preview as DropzonePreview } from './Dropzone'
import { Preview as EmptyPreview } from './empty'
import { Preview as FieldPreview } from './field'
import { Preview as HashTextPreview } from './hash-text'
import { Preview as HoverCardPreview } from './hover-card'
import { Preview as IconPreview } from './icon'
import { Preview as InputPreview } from './input'
import { Preview as InputGroupPreview } from './input-group'
import { Preview as InputOtpPreview } from './input-otp'
import { Preview as InputbarPreview } from './Inputbar'
import { Preview as LabelPreview } from './label'
import { Preview as NoItemPreview } from './NoItem'
import { Preview as PaginationPreview } from './pagination'
import { Preview as PaginationsPreview } from './Paginations'
import { Preview as PopoverPreview } from './popover'
import { Preview as PreviewCardPreview } from './preview-card'
import { Preview as RadioGroupPreview } from './radio-group'
import { Preview as RadioButtonPreview } from './RadioButton'
import { Preview as ResizablePreview } from './resizable'
import { Preview as ScrollAreaPreview } from './scroll-area'
import { Preview as SearchBarPreview } from './SearchBar'
import { Preview as SelectPreview } from './select'
import { Preview as SeparatorPreview } from './separator'
import { Preview as SheetPreview } from './sheet'
import { Preview as ShineBorderPreview } from './shine-border'
import { Preview as SidebarPreview } from './sidebar'
import { Preview as SkeletonPreview } from './skeleton'
import { Preview as SonnerPreview } from './sonner'
import { Preview as SpinnerPreview } from './spinner'
import { Preview as StepperPreview } from './Stepper'
import { Preview as SuspenseFallbackPreview } from './SuspenseFallback'
import { Preview as SwitchPreview } from './switch'
import { Preview as TablePreview } from './table'
import { Preview as TabsPreview } from './tabs'
import { Preview as TextareaPreview } from './textarea'
import { Preview as TimePickerPreview } from './TimePicker'
import { Preview as ToggleGroupPreview } from './toggle-group'
import { Preview as TogglePreview } from './toggle'
import { Preview as TooltipPreview } from './tooltip'

export interface PreviewProps {
  selections?: Record<string, string>
}

export type PreviewComponent = ComponentType<PreviewProps>

export const PREVIEWS: Record<string, PreviewComponent> = {
  accordion: AccordionPreview,
  alert: AlertPreview,
  'alert-dialog': AlertDialogLowerPreview,
  AlertDialog: AlertDialogPreview,
  AnimatedAlertDialog: AnimatedAlertDialogPreview,
  'animated-beam': AnimatedBeamPreview,
  AnimatedAccordion: AnimatedAccordionPreview,
  AnimatedCheckbox: AnimatedCheckboxPreview,
  AnimatedPreviewCard: AnimatedPreviewCardPreview,
  avatar: AvatarPreview,
  'back-button': BackButtonPreview,
  badge: BadgePreview,
  button: ButtonPreview,
  calendar: CalendarPreview,
  card: CardPreview,
  carousel: CarouselPreview,
  checkbox: CheckboxPreview,
  'clickable-addr': ClickableAddrPreview,
  'clickable-tx': ClickableTxPreview,
  CoinIcon: CoinIconPreview,
  command: CommandPreview,
  CopyButton: CopyButtonPreview,
  CopyWrapper: CopyWrapperPreview,
  'date-time-input': DateTimeInputPreview,
  DatePicker: DatePickerPreview,
  dialog: DialogPreview,
  'dropdown-menu': DropdownMenuPreview,
  Dropzone: DropzonePreview,
  empty: EmptyPreview,
  field: FieldPreview,
  'hash-text': HashTextPreview,
  'hover-card': HoverCardPreview,
  icon: IconPreview,
  input: InputPreview,
  'input-group': InputGroupPreview,
  'input-otp': InputOtpPreview,
  Inputbar: InputbarPreview,
  label: LabelPreview,
  NoItem: NoItemPreview,
  pagination: PaginationPreview,
  Paginations: PaginationsPreview,
  popover: PopoverPreview,
  'preview-card': PreviewCardPreview,
  'radio-group': RadioGroupPreview,
  RadioButton: RadioButtonPreview,
  resizable: ResizablePreview,
  'scroll-area': ScrollAreaPreview,
  SearchBar: SearchBarPreview,
  select: SelectPreview,
  separator: SeparatorPreview,
  sheet: SheetPreview,
  'shine-border': ShineBorderPreview,
  sidebar: SidebarPreview,
  skeleton: SkeletonPreview,
  sonner: SonnerPreview,
  spinner: SpinnerPreview,
  Stepper: StepperPreview,
  SuspenseFallback: SuspenseFallbackPreview,
  switch: SwitchPreview,
  table: TablePreview,
  tabs: TabsPreview,
  textarea: TextareaPreview,
  TimePicker: TimePickerPreview,
  'toggle-group': ToggleGroupPreview,
  toggle: TogglePreview,
  tooltip: TooltipPreview
}

export const hasPreview = (name: string): boolean => name in PREVIEWS
