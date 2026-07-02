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

// 활성(open) 항목 액센트 색은 --accordion-active CSS 변수로 주입, trigger className이 var() 참조.
const ACCORDION_COLOR_TOKEN: Record<string, string> = {
  gray: 'var(--color-cool-grey-09)',
  blue: 'var(--color-primary-blue-1)',
  red: 'var(--color-ui-red)',
  orange: 'var(--color-ui-orange)',
  yellow: 'var(--color-ui-yellow)',
  olive: 'var(--color-ui-olive)',
  green: 'var(--color-ui-green)',
  skyblue: 'var(--color-ui-skyblue)',
  purple: 'var(--color-ui-purple)',
  pink: 'var(--color-ui-pink)',
  amber: 'var(--color-ui-amber)',
  white: 'var(--color-cool-grey-white)',
  'gradient-blue': 'var(--color-primary-blue-1)'
}

// shape는 시각 구조, color는 활성(open) trigger의 액센트.
//   - shape=default: 가로 divide만
//   - shape=contained: 외곽 border + rounded, 내부 divide
//   - shape=separated: 각 item 독립 카드 (border + shadow + gap)
const accordionRootClassVariants = cva('group/accordion flex flex-col', {
  variants: {
    shape: {
      // divide/border 색은 --accordion-active를 30% 섞은 색으로 — 액센트는 유지하되 라인이 시끄럽지 않게
      default:
        'divide-[color:color-mix(in_oklab,var(--accordion-active)_30%,transparent)] divide-y',
      contained:
        'border-[color:color-mix(in_oklab,var(--accordion-active)_30%,transparent)] divide-[color:color-mix(in_oklab,var(--accordion-active)_30%,transparent)] divide-y overflow-hidden rounded-lg border',
      separated: 'gap-3'
    },
    size: {
      sm: '',
      md: '',
      lg: ''
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
      amber: '',
      white: '',
      'gradient-blue': ''
    }
  },
  defaultVariants: {
    shape: 'default',
    size: 'md',
    color: 'blue'
  }
})

type AccordionVariantProps = VariantProps<typeof accordionRootClassVariants>
type AccordionColor = NonNullable<AccordionVariantProps['color']>

type AccordionProps = React.ComponentProps<typeof AccordionPrimitive.Root> & AccordionVariantProps

const Accordion = ({
  className,
  shape,
  size,
  color,
  style,
  ...props
}: AccordionProps) => {
  const [value, setValue] = useControlledState<string | string[] | undefined>({
    value: props?.value as string | string[] | undefined,
    defaultValue: props?.defaultValue as string | string[] | undefined,
    onChange: props?.onValueChange as unknown as (
      value: string | string[] | undefined
    ) => void
  })
  const resolvedColor: AccordionColor = color ?? 'blue'

  return (
    <AccordionProvider value={{ value, setValue }}>
      <AccordionPrimitive.Root
        data-slot='accordion'
        data-shape={shape ?? 'default'}
        data-size={size ?? 'md'}
        style={{
          ['--accordion-active' as string]:
            ACCORDION_COLOR_TOKEN[resolvedColor] ?? ACCORDION_COLOR_TOKEN.blue,
          ...style
        }}
        className={cn(accordionRootClassVariants({ shape, size, color }), className)}
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
          // shape=separated일 때만 각 item이 자체 border/rounded 카드 (border 색은 --accordion-active 30%)
          'group-data-[shape=separated]/accordion:border-[color:color-mix(in_oklab,var(--accordion-active)_30%,transparent)] group-data-[shape=separated]/accordion:rounded-lg group-data-[shape=separated]/accordion:bg-bg-card group-data-[shape=separated]/accordion:border group-data-[shape=separated]/accordion:shadow-sm',
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
        'group/accordion-trigger flex w-full items-center justify-between gap-2 text-left transition-colors focus-visible:outline-none text-fg-strong',
        // size별 padding + typo (root group/accordion의 data-size를 group-data로 추적)
        'group-data-[size=sm]/accordion:px-4 group-data-[size=sm]/accordion:py-2 group-data-[size=sm]/accordion:typo-sb13',
        'group-data-[size=md]/accordion:px-5 group-data-[size=md]/accordion:py-3 group-data-[size=md]/accordion:typo-sb14',
        'group-data-[size=lg]/accordion:px-6 group-data-[size=lg]/accordion:py-4 group-data-[size=lg]/accordion:typo-sb16',
        // 활성(open) trigger 텍스트/chevron만 --accordion-active 색으로 강조
        'data-[panel-open]:text-[var(--accordion-active)]',
        className
      )}
      {...props}
    >
      <span className='flex-1'>{children}</span>
      <ChevronDown
        className='text-[var(--accordion-active)] h-4 w-4 shrink-0 transition-transform duration-200 group-data-[panel-open]/accordion-trigger:rotate-180'
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
    'text-fg-default typo-m13',
    'group-data-[size=sm]/accordion:px-4 group-data-[size=sm]/accordion:pb-2',
    'group-data-[size=md]/accordion:px-5 group-data-[size=md]/accordion:pb-3',
    'group-data-[size=lg]/accordion:px-6 group-data-[size=lg]/accordion:pb-4',
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
