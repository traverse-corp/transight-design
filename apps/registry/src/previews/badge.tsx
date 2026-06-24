import { Badge } from '@transight-design/ui/components/badge'

interface PreviewProps {
  selections?: Record<string, string>
}

type Color = NonNullable<Parameters<typeof Badge>[0]['color']>
type Theme = NonNullable<Parameters<typeof Badge>[0]['theme']>
type Shape = NonNullable<Parameters<typeof Badge>[0]['shape']>
type Size = NonNullable<Parameters<typeof Badge>[0]['size']>

export const Preview = ({ selections = {} }: PreviewProps) => (
  <Badge
    color={(selections.color as Color) ?? 'gray'}
    theme={(selections.theme as Theme) ?? 'solid'}
    shape={(selections.shape as Shape) ?? 'default'}
    size={(selections.size as Size) ?? 'md'}
  >
    Badge
  </Badge>
)
