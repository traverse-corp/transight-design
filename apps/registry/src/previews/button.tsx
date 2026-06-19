import { Button } from '@transight-design/ui/components/button'

interface PreviewProps {
  selections?: Record<string, string>
}

type Color = NonNullable<Parameters<typeof Button>[0]['color']>
type Appearance = NonNullable<Parameters<typeof Button>[0]['appearance']>
type Shape = NonNullable<Parameters<typeof Button>[0]['shape']>
type Size = NonNullable<Parameters<typeof Button>[0]['size']>

export const Preview = ({ selections = {} }: PreviewProps) => (
  <Button
    color={(selections.color as Color) ?? 'gray'}
    appearance={(selections.appearance as Appearance) ?? 'solid'}
    shape={(selections.shape as Shape) ?? 'default'}
    size={(selections.size as Size) ?? 'md'}
  >
    Button
  </Button>
)
