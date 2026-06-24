import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@transight-design/ui/components/card'

interface PreviewProps {
  selections?: Record<string, string>
}

type Color = NonNullable<Parameters<typeof Card>[0]['color']>
type Theme = NonNullable<Parameters<typeof Card>[0]['theme']>
type Shape = NonNullable<Parameters<typeof Card>[0]['shape']>
type Size = NonNullable<Parameters<typeof Card>[0]['size']>

export const Preview = ({ selections = {} }: PreviewProps) => (
  <Card
    color={(selections.color as Color) ?? undefined}
    theme={(selections.theme as Theme) ?? undefined}
    shape={(selections.shape as Shape) ?? undefined}
    size={(selections.size as Size) ?? undefined}
    className='max-w-md'
  >
    <CardHeader>
      <CardTitle>주소 동결 신청</CardTitle>
      <CardDescription>네트워크와 대상 주소를 선택해 동결을 신청합니다.</CardDescription>
    </CardHeader>
    <CardContent>
      <p className='typo-m13 opacity-80'>
        승인까지 평균 5분 이내 처리됩니다. 처리 결과는 알림으로 전달됩니다.
      </p>
    </CardContent>
  </Card>
)
