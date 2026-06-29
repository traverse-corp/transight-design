import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@transight-design/ui/components/hover-card'
import { Button } from '@transight-design/ui/components/button'

interface PreviewProps {
  selections?: Record<string, string>
}

type Shape = NonNullable<Parameters<typeof HoverCardContent>[0]['shape']>
type Size = NonNullable<Parameters<typeof HoverCardContent>[0]['size']>

export const Preview = ({ selections = {} }: PreviewProps) => (
  <HoverCard>
    <HoverCardTrigger
      render={
        <Button
          theme='soft'
          className='h-auto bg-transparent p-0 hover:bg-transparent hover:underline'
        >
          @traverse-corp
        </Button>
      }
    />
    <HoverCardContent
      shape={(selections.shape as Shape) ?? undefined}
      size={(selections.size as Size) ?? undefined}
    >
      <p className='typo-sb14 text-fg-strong'>Traverse Corp</p>
      <p className='typo-m12 text-fg-default'>블록체인 트랜잭션 분석 도구를 만듭니다.</p>
    </HoverCardContent>
  </HoverCard>
)
