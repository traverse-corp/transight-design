import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionPanel
} from '@transight-design/ui/components/accordion'

interface PreviewProps {
  selections?: Record<string, string>
}

type Variant = NonNullable<Parameters<typeof Accordion>[0]['variant']>
type Shape = NonNullable<Parameters<typeof Accordion>[0]['shape']>
type Size = NonNullable<Parameters<typeof Accordion>[0]['size']>

export const Preview = ({ selections = {} }: PreviewProps) => (
  <Accordion
    className='w-1/2 min-w-72'
    defaultValue={['item-1']}
    variant={(selections.variant as Variant) ?? undefined}
    shape={(selections.shape as Shape) ?? undefined}
    size={(selections.size as Size) ?? undefined}
  >
    <AccordionItem value='item-1'>
      <AccordionHeader>
        <AccordionTrigger>첫 번째 항목</AccordionTrigger>
      </AccordionHeader>
      <AccordionPanel>첫 번째 항목의 내용입니다.</AccordionPanel>
    </AccordionItem>
    <AccordionItem value='item-2'>
      <AccordionHeader>
        <AccordionTrigger>두 번째 항목</AccordionTrigger>
      </AccordionHeader>
      <AccordionPanel>두 번째 항목의 내용입니다.</AccordionPanel>
    </AccordionItem>
    <AccordionItem value='item-3'>
      <AccordionHeader>
        <AccordionTrigger>세 번째 항목</AccordionTrigger>
      </AccordionHeader>
      <AccordionPanel>세 번째 항목의 내용입니다.</AccordionPanel>
    </AccordionItem>
  </Accordion>
)
