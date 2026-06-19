import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionPanel
} from '@transight-design/ui/components/accordion'

export const Preview = () => (
  <Accordion className='w-80' defaultValue={['item-1']}>
    <AccordionItem value='item-1'>
      <AccordionHeader>
        <AccordionTrigger className='typo-sb14 text-cool-grey-11 w-full text-left'>
          첫 번째 항목
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionPanel>
        <p className='text-body py-2'>첫 번째 항목의 내용입니다.</p>
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem value='item-2'>
      <AccordionHeader>
        <AccordionTrigger className='typo-sb14 text-cool-grey-11 w-full text-left'>
          두 번째 항목
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionPanel>
        <p className='text-body py-2'>두 번째 항목의 내용입니다.</p>
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
)
