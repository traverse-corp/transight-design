import { Alert, AlertTitle, AlertDescription } from '@transight-design/ui/components/alert'

interface PreviewProps {
  selections?: Record<string, string>
}

type Variant = NonNullable<Parameters<typeof Alert>[0]['variant']>
type Color = NonNullable<Parameters<typeof Alert>[0]['color']>
type Theme = NonNullable<Parameters<typeof Alert>[0]['theme']>
type Shape = NonNullable<Parameters<typeof Alert>[0]['shape']>
type Size = NonNullable<Parameters<typeof Alert>[0]['size']>

export const Preview = ({ selections = {} }: PreviewProps) => (
  <Alert
    variant={(selections.variant as Variant) ?? undefined}
    color={(selections.color as Color) ?? undefined}
    theme={(selections.theme as Theme) ?? undefined}
    shape={(selections.shape as Shape) ?? undefined}
    size={(selections.size as Size) ?? undefined}
    className='max-w-md'
  >
    <AlertTitle>안내</AlertTitle>
    <AlertDescription>새 버전이 배포되었습니다. 새로고침을 권장합니다.</AlertDescription>
  </Alert>
)
