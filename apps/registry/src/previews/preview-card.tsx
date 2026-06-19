'use client'

import {
  PreviewCard,
  PreviewCardPopup,
  PreviewCardPortal,
  PreviewCardPositioner,
  PreviewCardTrigger
} from '@transight-design/ui/components/preview-card'
import { Button } from '@transight-design/ui/components/button'

export const Preview = () => (
  <PreviewCard>
    <PreviewCardTrigger
      render={
        <Button
          appearance="soft"
          className="h-auto bg-transparent p-0 hover:bg-transparent hover:underline"
        >
          마우스를 올려보세요
        </Button>
      }
    />
    <PreviewCardPortal>
      <PreviewCardPositioner sideOffset={4}>
        <PreviewCardPopup className="bg-popover text-popover-foreground w-64 rounded-md border p-4 shadow-md">
          <p className="typo-sb14 text-cool-grey-11">미리보기 카드</p>
          <p className="text-description mt-1">지연 후 표시되는 미리보기 콘텐츠입니다.</p>
        </PreviewCardPopup>
      </PreviewCardPositioner>
    </PreviewCardPortal>
  </PreviewCard>
)
