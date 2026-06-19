import { Badge } from '@transight-design/ui/components/badge'

interface PreviewProps {
  selections?: Record<string, string>
}

type Color = NonNullable<Parameters<typeof Badge>[0]['color']>
type Appearance = NonNullable<Parameters<typeof Badge>[0]['appearance']>
type Shape = NonNullable<Parameters<typeof Badge>[0]['shape']>
type Size = NonNullable<Parameters<typeof Badge>[0]['size']>

export const Preview = ({ selections = {} }: PreviewProps) => (
  <Badge
    color={(selections.color as Color) ?? 'gray'}
    appearance={(selections.appearance as Appearance) ?? 'solid'}
    shape={(selections.shape as Shape) ?? 'default'}
    size={(selections.size as Size) ?? 'md'}
  >
    Badge
  </Badge>
)
