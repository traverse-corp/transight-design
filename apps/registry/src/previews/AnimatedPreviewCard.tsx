'use client'

import {
  PreviewCard,
  PreviewCardPanel,
  PreviewCardTrigger
} from '@transight-design/ui/components/AnimatedPreviewCard'
import { Button } from '@transight-design/ui/components/button'

export const Preview = () => (
  <PreviewCard>
    <PreviewCardTrigger
      render={
        <Button
          theme="soft"
          className="h-auto bg-transparent p-0 hover:bg-transparent hover:underline"
        >
          마우스를 올려보세요
        </Button>
      }
    />
    <PreviewCardPanel className="w-64">
      <p className="typo-sb14 text-fg-strong">애니메이션 미리보기</p>
      <p className="text-description mt-1">부드럽게 등장하는 카드입니다.</p>
    </PreviewCardPanel>
  </PreviewCard>
)
