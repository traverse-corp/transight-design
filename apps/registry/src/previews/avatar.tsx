import { Avatar, AvatarImage, AvatarFallback } from '@transight-design/ui/components/avatar'

export const Preview = () => (
  <Avatar>
    <AvatarImage src='https://github.com/shadcn.png' alt='shadcn' />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
)
