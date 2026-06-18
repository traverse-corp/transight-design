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
      className='rounded-md border border-[color:var(--color-doc-border)] bg-white px-2.5 py-1 text-xs font-medium hover:border-[color:var(--color-doc-accent)] hover:text-[color:var(--color-doc-accent)]'
    >
      {copied ? '복사됨' : label}
    </button>
  )
}
