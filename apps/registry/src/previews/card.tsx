import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@transight-design/ui/components/card'
import { Button } from '@transight-design/ui/components/button'

export const Preview = () => (
  <Card className="max-w-md">
    <CardHeader>
      <CardTitle>주소 동결 신청</CardTitle>
      <CardDescription>네트워크와 대상 주소를 선택해 동결을 신청합니다.</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-cool-grey-08 text-sm">
        승인까지 평균 5분 이내 처리됩니다. 처리 결과는 알림으로 전달됩니다.
      </p>
    </CardContent>
    <CardFooter className="justify-end gap-2">
      <Button theme="outline" size="sm">
        취소
      </Button>
      <Button size="sm">신청</Button>
    </CardFooter>
  </Card>
)
