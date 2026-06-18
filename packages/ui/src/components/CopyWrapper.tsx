import React, { useState } from 'react'

interface CopyWrapperProps {
  text: string
  children: React.ReactNode
}

export default function CopyWrapper({ text, children }: CopyWrapperProps) {
  const [copied, setCopied] = useState(false)

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // 복사 실패
    }
  }

  return (
    <div onClick={handleClick} style={{ display: 'inline-block', cursor: 'pointer' }}>
      {children}
      {copied && <span className='tooltip'>복사됨!</span>}
    </div>
  )
}
