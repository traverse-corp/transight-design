import { Avatar, AvatarFallback, AvatarImage } from '@transight-design/ui/components/avatar'

interface PreviewProps {
  selections?: Record<string, string>
}

type Shape = NonNullable<Parameters<typeof Avatar>[0]['shape']>
type Size = NonNullable<Parameters<typeof Avatar>[0]['size']>

export const Preview = ({ selections = {} }: PreviewProps) => (
  <Avatar
    shape={(selections.shape as Shape) ?? undefined}
    size={(selections.size as Size) ?? undefined}
  >
    <AvatarImage src='https://github.com/shadcn.png' alt='shadcn' />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
)
