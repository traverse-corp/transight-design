'use client'

import { useRef } from 'react'
import { AnimatedBeam } from '@transight-design/ui/components/animated-beam'

export const Preview = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const fromRef = useRef<HTMLDivElement>(null)
  const toRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className='border-cool-grey-04 relative flex h-32 w-80 items-center justify-between rounded-lg border bg-white px-8'
    >
      <div
        ref={fromRef}
        className='bg-primary-blue-1 z-10 size-10 rounded-full shadow-md'
      />
      <div
        ref={toRef}
        className='bg-primary-blue-deep z-10 size-10 rounded-full shadow-md'
      />
      <AnimatedBeam
        containerRef={containerRef as React.RefObject<HTMLElement>}
        fromRef={fromRef as React.RefObject<HTMLElement>}
        toRef={toRef as React.RefObject<HTMLElement>}
      />
    </div>
  )
}
