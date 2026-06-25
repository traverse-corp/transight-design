'use client'

import * as React from 'react'
import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion'
import { AnimatePresence, motion, type HTMLMotionProps } from 'motion/react'
import { cva, type VariantProps } from 'class-variance-authority'
import { ChevronDown } from 'lucide-react'
import { getStrictContext } from '@/lib/get-strict-context'
import { useControlledState } from '@/lib/hooks/use-controlled-state'
import { cn } from '@/lib/utils'

type AccordionContextType = {
  value: string | string[] | undefined
  setValue: (value: string | string[] | undefined) => void
}

type AccordionItemContextType = {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const [AccordionProvider, useAccordion] = getStrictContext<AccordionContextType>('AccordionContext')

const [AccordionItemProvider, useAccordionItem] =
  getStrictContext<AccordionItemContextType>('AccordionItemContext')

// Root variant 시각 구조 (preset alias 아님, 구조 enum).
//   - default: 각 item 사이 가로 구분선
//   - contained: 전체 wrapping border + rounded
//   - separated: 각 item이 독립 카드 (border + spacing)
const accordionRootClassVariants = cva('flex flex-col', {
  variants: {
    variant: {
      default: 'divide-cool-grey-04 divide-y',
      contained: 'border-cool-grey-04 divide-cool-grey-04 divide-y overflow-hidden border',
      separated: 'gap-2'
    },
    shape: {
      default: 'rounded-lg',
      square: 'rounded-none'
    },
    size: {
      sm: '',
      md: '',
      lg: ''
    }
  },
  compoundVariants: [
    // contained일 때만 root에 rounded 효과가 의미 있음 (divide 위에 wrapping)
    { variant: 'default', className: 'rounded-none' },
    { variant: 'separated', className: 'rounded-none' }
  ],
  defaultVariants: {
    variant: 'default',
    shape: 'default',
    size: 'md'
  }
})

type AccordionVariantProps = VariantProps<typeof accordionRootClassVariants>

type AccordionProps = React.ComponentProps<typeof AccordionPrimitive.Root> & AccordionVariantProps

const Accordion = ({
  className,
  variant,
  shape,
  size,
  ...props
}: AccordionProps) => {
  const [value, setValue] = useControlledState<string | string[] | undefined>({
    value: props?.value as string | string[] | undefined,
    defaultValue: props?.defaultValue as string | string[] | undefined,
    onChange: props?.onValueChange as unknown as (
      value: string | string[] | undefined
    ) => void
  })

  return (
    <AccordionProvider value={{ value, setValue }}>
      <AccordionPrimitive.Root
        data-slot='accordion'
        data-variant={variant ?? 'default'}
        data-size={size ?? 'md'}
        className={cn(accordionRootClassVariants({ variant, shape, size }), className)}
        {...props}
        onValueChange={setValue as unknown as AccordionProps['onValueChange']}
      />
    </AccordionProvider>
  )
}

type AccordionItemProps = React.ComponentProps<typeof AccordionPrimitive.Item>

const AccordionItem = ({ className, ...props }: AccordionItemProps) => {
  const { value } = useAccordion()
  const itemValue = props?.value as string
  const [isOpen, setIsOpen] = React.useState(value?.includes(itemValue) ?? false)

  React.useEffect(() => {
    setIsOpen(value?.includes(itemValue) ?? false)
  }, [value, itemValue])

  return (
    <AccordionItemProvider value={{ isOpen, setIsOpen }}>
      <AccordionPrimitive.Item
        data-slot='accordion-item'
        className={cn(
          // separated variant일 때만 각 item이 자체 border/rounded 카드
          'group-data-[variant=separated]/accordion:border-cool-grey-04 group-data-[variant=separated]/accordion:rounded-lg group-data-[variant=separated]/accordion:border',
          className
        )}
        {...props}
      />
    </AccordionItemProvider>
  )
}

type AccordionHeaderProps = React.ComponentProps<typeof AccordionPrimitive.Header>

const AccordionHeader = (props: AccordionHeaderProps) => (
  <AccordionPrimitive.Header data-slot='accordion-header' {...props} />
)

type AccordionTriggerProps = React.ComponentProps<typeof AccordionPrimitive.Trigger>

const AccordionTrigger = ({ nativeButton, className, children, ...props }: AccordionTriggerProps) => {
  const isNative = nativeButton ?? props.render == null
  return (
    <AccordionPrimitive.Trigger
      data-slot='accordion-trigger'
      nativeButton={isNative}
      className={cn(
        'group/accordion-trigger flex w-full items-center justify-between gap-2 text-left transition-colors hover:text-primary-blue-1 focus-visible:outline-none',
        // size별 padding + typo
        'data-[size=sm]:px-3 data-[size=sm]:py-2 data-[size=sm]:typo-sb13',
        'data-[size=md]:px-4 data-[size=md]:py-3 data-[size=md]:typo-sb14',
        'data-[size=lg]:px-5 data-[size=lg]:py-4 data-[size=lg]:typo-sb16',
        'text-cool-grey-11',
        className
      )}
      {...props}
    >
      <span className='flex-1'>{children}</span>
      <ChevronDown
        className='text-cool-grey-07 h-4 w-4 shrink-0 transition-transform duration-200 group-data-[panel-open]/accordion-trigger:rotate-180'
        aria-hidden
      />
    </AccordionPrimitive.Trigger>
  )
}

type AccordionPanelProps = Omit<
  React.ComponentProps<typeof AccordionPrimitive.Panel>,
  'keepMounted' | 'render'
> &
  HTMLMotionProps<'div'> & {
    keepRendered?: boolean
  }

const AccordionPanel = ({
  transition = { duration: 0.35, ease: 'easeInOut' },
  hiddenUntilFound,
  keepRendered = false,
  className,
  ...props
}: AccordionPanelProps) => {
  const { isOpen } = useAccordionItem()
  const panelClass = cn(
    'text-cool-grey-09 typo-m13',
    'data-[size=sm]:px-3 data-[size=sm]:pb-2',
    'data-[size=md]:px-4 data-[size=md]:pb-3',
    'data-[size=lg]:px-5 data-[size=lg]:pb-4',
    className
  )

  return (
    <AnimatePresence>
      {keepRendered ? (
        <AccordionPrimitive.Panel
          hidden={false}
          hiddenUntilFound={hiddenUntilFound}
          keepMounted
          render={
            <motion.div
              key='accordion-panel'
              data-slot='accordion-panel'
              initial={{ height: 0, opacity: 0, '--mask-stop': '0%', y: 20 }}
              animate={
                isOpen
                  ? { height: 'auto', opacity: 1, '--mask-stop': '100%', y: 0 }
                  : { height: 0, opacity: 0, '--mask-stop': '0%', y: 20 }
              }
              transition={transition}
              className={panelClass}
              style={{
                maskImage: 'linear-gradient(black var(--mask-stop), transparent var(--mask-stop))',
                WebkitMaskImage:
                  'linear-gradient(black var(--mask-stop), transparent var(--mask-stop))',
                overflow: 'hidden'
              }}
              {...props}
            />
          }
        />
      ) : (
        isOpen && (
          <AccordionPrimitive.Panel
            hidden={false}
            hiddenUntilFound={hiddenUntilFound}
            keepMounted
            render={
              <motion.div
                key='accordion-panel'
                data-slot='accordion-panel'
                initial={{ height: 0, opacity: 0, '--mask-stop': '0%', y: 20 }}
                animate={{
                  height: 'auto',
                  opacity: 1,
                  '--mask-stop': '100%',
                  y: 0
                }}
                exit={{ height: 0, opacity: 0, '--mask-stop': '0%', y: 20 }}
                transition={transition}
                className={panelClass}
                style={{
                  maskImage:
                    'linear-gradient(black var(--mask-stop), transparent var(--mask-stop))',
                  WebkitMaskImage:
                    'linear-gradient(black var(--mask-stop), transparent var(--mask-stop))',
                  overflow: 'hidden'
                }}
                {...props}
              />
            }
          />
        )
      )}
    </AnimatePresence>
  )
}

export {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionPanel,
  useAccordionItem,
  accordionRootClassVariants,
  type AccordionProps,
  type AccordionItemProps,
  type AccordionHeaderProps,
  type AccordionTriggerProps,
  type AccordionPanelProps,
  type AccordionItemContextType
}
