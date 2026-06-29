'use client'

import { useState } from 'react'

interface CopyButtonProps {
  text: string
  label?: string
}

export const CopyButton = ({ text, label = '복사' }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // ignore
    }
  }

  return (
    <button
      onClick={handleCopy}
      className='rounded-md border border-border-default bg-bg-card px-2.5 py-1 typo-m12 hover:border-primary-blue-1 hover:text-primary-blue-1'
    >
      {copied ? '복사됨' : label}
    </button>
  )
}
