import { Textarea } from '@transight-design/ui/components/textarea'

interface PreviewProps {
  selections?: Record<string, string>
}

type Shape = NonNullable<Parameters<typeof Textarea>[0]['shape']>
type Size = NonNullable<Parameters<typeof Textarea>[0]['size']>
type Color = NonNullable<Parameters<typeof Textarea>[0]['color']>
type Theme = NonNullable<Parameters<typeof Textarea>[0]['theme']>

export const Preview = ({ selections = {} }: PreviewProps) => (
  <Textarea
    color={(selections.color as Color) ?? undefined}
    theme={(selections.theme as Theme) ?? undefined}
    shape={(selections.shape as Shape) ?? undefined}
    size={(selections.size as Size) ?? undefined}
    maxLength={120}
    placeholder="메시지를 입력하세요..."
    containerClassName="w-80"
  />
)
