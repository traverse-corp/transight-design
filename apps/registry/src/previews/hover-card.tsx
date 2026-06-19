import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@transight-design/ui/components/hover-card'
import { Button } from '@transight-design/ui/components/button'

export const Preview = () => (
  <HoverCard>
    <HoverCardTrigger
      render={
        <Button
          appearance="soft"
          className="h-auto bg-transparent p-0 hover:bg-transparent hover:underline"
        >
          @traverse-corp
        </Button>
      }
    />
    <HoverCardContent className="w-64">
      <p className="typo-sb14 text-cool-grey-11">Traverse Corp</p>
      <p className="text-description mt-1">블록체인 트랜잭션 분석 도구를 만듭니다.</p>
    </HoverCardContent>
  </HoverCard>
)
