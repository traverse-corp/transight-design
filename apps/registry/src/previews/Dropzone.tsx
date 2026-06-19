'use client'

import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState
} from '@transight-design/ui/components/Dropzone'

export const Preview = () => (
  <Dropzone onDrop={() => {}} className='w-80'>
    <DropzoneEmptyState />
    <DropzoneContent />
  </Dropzone>
)
