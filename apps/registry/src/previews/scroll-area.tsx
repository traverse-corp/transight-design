import { ScrollArea } from '@transight-design/ui/components/scroll-area'

export const Preview = () => (
  <ScrollArea className='border-cool-grey-04 h-48 w-64 rounded-md border p-3'>
    <div className='flex flex-col gap-2'>
      {Array.from({ length: 30 }, (_, i) => (
        <div key={i} className='text-body'>
          항목 #{i + 1}
        </div>
      ))}
    </div>
  </ScrollArea>
)
