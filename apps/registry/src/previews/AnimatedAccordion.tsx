import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel
} from '@transight-design/ui/components/AnimatedAccordion'

export const Preview = () => (
  <Accordion className='w-80' defaultValue={['item-1']}>
    <AccordionItem value='item-1'>
      <AccordionTrigger>모션 포함 항목 1</AccordionTrigger>
      <AccordionPanel>
        <p className='typo-m13 text-fg-default py-2'>패널이 부드럽게 펼쳐집니다.</p>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem value='item-2'>
      <AccordionTrigger>모션 포함 항목 2</AccordionTrigger>
      <AccordionPanel>
        <p className='typo-m13 text-fg-default py-2'>두 번째 패널.</p>
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
)
