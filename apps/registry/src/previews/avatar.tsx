import { Avatar, AvatarImage, AvatarFallback } from '@transight-design/ui/components/avatar'

export const Preview = () => (
  <div className='flex items-center gap-3'>
    <Avatar>
      <AvatarImage src='https://github.com/shadcn.png' alt='shadcn' />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarFallback>송</AvatarFallback>
    </Avatar>
    <Avatar className='size-12'>
      <AvatarFallback>TS</AvatarFallback>
    </Avatar>
  </div>
)
