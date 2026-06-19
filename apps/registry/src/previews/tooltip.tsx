import { Tooltip, TooltipContent, TooltipTrigger } from '@transight-design/ui/components/tooltip'
import { Button } from '@transight-design/ui/components/button'

export const Preview = () => (
  <Tooltip>
    <TooltipTrigger render={<Button appearance="outline">마우스 올리기</Button>} />
    <TooltipContent>도움말 텍스트입니다.</TooltipContent>
  </Tooltip>
)
