import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@transight-design/ui/components/resizable'

export const Preview = () => (
  <ResizablePanelGroup
    direction='horizontal'
    className='border-border-default max-w-md rounded-lg border'
  >
    <ResizablePanel defaultSize={50}>
      <div className='flex h-32 items-center justify-center p-4'>
        <span className='typo-sb14 text-fg-default'>좌</span>
      </div>
    </ResizablePanel>
    <ResizableHandle />
    <ResizablePanel defaultSize={50}>
      <div className='flex h-32 items-center justify-center p-4'>
        <span className='typo-sb14 text-fg-default'>우</span>
      </div>
    </ResizablePanel>
  </ResizablePanelGroup>
)
