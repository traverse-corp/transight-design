import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@transight-design/ui/components/tooltip'
import { Button } from '@transight-design/ui/components/button'

interface PreviewProps {
  selections?: Record<string, string>
}

type Color = NonNullable<Parameters<typeof TooltipContent>[0]['color']>
type Theme = NonNullable<Parameters<typeof TooltipContent>[0]['theme']>
type Size = NonNullable<Parameters<typeof TooltipContent>[0]['size']>

export const Preview = ({ selections = {} }: PreviewProps) => (
  <TooltipProvider>
    <Tooltip open>
      <TooltipTrigger render={<Button theme='outline'>마우스 올리기</Button>} />
      <TooltipContent
        color={(selections.color as Color) ?? undefined}
        theme={(selections.theme as Theme) ?? undefined}
        size={(selections.size as Size) ?? undefined}
      >
        도움말 텍스트입니다.
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
)
