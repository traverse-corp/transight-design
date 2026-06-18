import { Alert, AlertTitle, AlertDescription } from '@transight-design/ui/components/alert'

export const Preview = () => (
  <div className='flex flex-col gap-3'>
    <Alert>
      <AlertTitle>안내</AlertTitle>
      <AlertDescription>새 버전이 배포되었습니다. 새로고침을 권장합니다.</AlertDescription>
    </Alert>
    <Alert variant='destructive'>
      <AlertTitle>오류</AlertTitle>
      <AlertDescription>저장에 실패했습니다. 잠시 후 다시 시도해주세요.</AlertDescription>
    </Alert>
  </div>
)
