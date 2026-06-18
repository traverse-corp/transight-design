'use client'

import * as React from 'react'
import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion'
import { AnimatePresence, motion, type HTMLMotionProps } from 'motion/react'

import { getStrictContext } from '@/lib/get-strict-context'
import { useControlledState } from '@/lib/hooks/use-controlled-state'

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

type AccordionProps = React.ComponentProps<typeof AccordionPrimitive.Root>

function Accordion(props: AccordionProps) {
  // Base UI 1.5는 AccordionValue<unknown> 제네릭이라 우리는 string 키만 사용하도록 좁힘
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
        {...props}
        onValueChange={setValue as unknown as AccordionProps['onValueChange']}
      />
    </AccordionProvider>
  )
}

type AccordionItemProps = React.ComponentProps<typeof AccordionPrimitive.Item>

function AccordionItem(props: AccordionItemProps) {
  const { value } = useAccordion()
  const itemValue = props?.value as string
  const [isOpen, setIsOpen] = React.useState(value?.includes(itemValue) ?? false)

  React.useEffect(() => {
    setIsOpen(value?.includes(itemValue) ?? false)
  }, [value, itemValue])

  return (
    <AccordionItemProvider value={{ isOpen, setIsOpen }}>
      <AccordionPrimitive.Item data-slot='accordion-item' {...props} />
    </AccordionItemProvider>
  )
}

type AccordionHeaderProps = React.ComponentProps<typeof AccordionPrimitive.Header>

function AccordionHeader(props: AccordionHeaderProps) {
  return <AccordionPrimitive.Header data-slot='accordion-header' {...props} />
}

type AccordionTriggerProps = React.ComponentProps<typeof AccordionPrimitive.Trigger>

function AccordionTrigger({ nativeButton, ...props }: AccordionTriggerProps) {
  // render prop으로 non-button 요소가 전달되면 nativeButton=false 자동 설정
  const isNative = nativeButton ?? props.render == null
  return (
    <AccordionPrimitive.Trigger data-slot='accordion-trigger' nativeButton={isNative} {...props} />
  )
}

type AccordionPanelProps = Omit<
  React.ComponentProps<typeof AccordionPrimitive.Panel>,
  'keepMounted' | 'render'
> &
  HTMLMotionProps<'div'> & {
    keepRendered?: boolean
  }

function AccordionPanel({
  transition = { duration: 0.35, ease: 'easeInOut' },
  hiddenUntilFound,
  keepRendered = false,
  ...props
}: AccordionPanelProps) {
  const { isOpen } = useAccordionItem()

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
  type AccordionProps,
  type AccordionItemProps,
  type AccordionHeaderProps,
  type AccordionTriggerProps,
  type AccordionPanelProps,
  type AccordionItemContextType
}
