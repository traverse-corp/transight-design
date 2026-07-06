import { Button } from '@transight-design/ui/components/button'

interface PreviewProps {
  selections?: Record<string, string>
}

type Color = NonNullable<Parameters<typeof Button>[0]['color']>
type Theme = NonNullable<Parameters<typeof Button>[0]['theme']>
type Shape = NonNullable<Parameters<typeof Button>[0]['shape']>
type Size = NonNullable<Parameters<typeof Button>[0]['size']>

export const Preview = ({ selections = {} }: PreviewProps) => (
  <Button
    color={(selections.color as Color) ?? 'gray06'}
    theme={(selections.theme as Theme) ?? 'solid'}
    shape={(selections.shape as Shape) ?? 'default'}
    size={(selections.size as Size) ?? 'md'}
  >
    Button
  </Button>
)
