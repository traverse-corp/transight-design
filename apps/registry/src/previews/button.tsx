import { Button } from '@transight-design/ui/components/button'

export const Preview = () => (
  <div className='flex flex-wrap items-center gap-3'>
    <Button>Default</Button>
    <Button variant='outline'>Outline</Button>
    <Button variant='ghost'>Ghost</Button>
    <Button variant='destructive'>Destructive</Button>
    <Button variant='dark'>Dark</Button>
    <Button variant='link'>Link</Button>
    <Button size='sm'>Small</Button>
    <Button size='lg'>Large</Button>
    <Button disabled>Disabled</Button>
  </div>
)
