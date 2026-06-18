import { Badge } from '@transight-design/ui/components/badge'

export const Preview = () => (
  <div className='flex flex-wrap items-center gap-3'>
    <Badge>Default</Badge>
    <Badge variant='secondary'>Secondary</Badge>
    <Badge variant='outline'>Outline</Badge>
    <Badge variant='badge-red'>Red</Badge>
    <Badge variant='badge-green'>Green</Badge>
    <Badge variant='dark'>Dark</Badge>
  </div>
)
