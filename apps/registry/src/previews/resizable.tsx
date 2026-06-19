import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@transight-design/ui/components/resizable'

export const Preview = () => (
  <ResizablePanelGroup
    direction='horizontal'
    className='border-cool-grey-04 max-w-md rounded-lg border'
  >
    <ResizablePanel defaultSize={50}>
      <div className='flex h-32 items-center justify-center p-4'>
        <span className='typo-sb14 text-cool-grey-09'>좌</span>
      </div>
    </ResizablePanel>
    <ResizableHandle />
    <ResizablePanel defaultSize={50}>
      <div className='flex h-32 items-center justify-center p-4'>
        <span className='typo-sb14 text-cool-grey-09'>우</span>
      </div>
    </ResizablePanel>
  </ResizablePanelGroup>
)
