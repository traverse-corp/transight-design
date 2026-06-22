import { Spinner } from '@transight-design/ui/components/spinner'

interface PreviewProps {
  selections?: Record<string, string>
}

type Color = NonNullable<Parameters<typeof Spinner>[0]['color']>
type Size = NonNullable<Parameters<typeof Spinner>[0]['size']>

export const Preview = ({ selections = {} }: PreviewProps) => (
  <Spinner
    color={(selections.color as Color) ?? undefined}
    size={(selections.size as Size) ?? undefined}
  />
)
