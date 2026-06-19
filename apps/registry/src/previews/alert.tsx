import { Alert, AlertTitle, AlertDescription } from '@transight-design/ui/components/alert'

interface PreviewProps {
  selections?: Record<string, string>
}

type Variant = NonNullable<Parameters<typeof Alert>[0]['variant']>

export const Preview = ({ selections = {} }: PreviewProps) => (
  <Alert variant={(selections.variant as Variant) ?? 'default'} className='max-w-md'>
    <AlertTitle>안내</AlertTitle>
    <AlertDescription>새 버전이 배포되었습니다. 새로고침을 권장합니다.</AlertDescription>
  </Alert>
)
