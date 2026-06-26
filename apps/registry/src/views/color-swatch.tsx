'use client'

import { useState } from 'react'
import type { Swatch } from '@/lib/token-data'

interface ColorSwatchProps {
  swatch: Swatch
}

export const ColorSwatch = ({ swatch }: ColorSwatchProps) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(swatch.value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // ignore
    }
  }

  return (
    <button
      type='button'
      onClick={handleCopy}
      className='group/swatch border-border-default flex w-full flex-col overflow-hidden rounded-md border bg-bg-card text-left transition-shadow hover:shadow-md'
      title={`${swatch.name} — 클릭 복사`}
    >
      {/* 색상 박스 — globals.css의 @source inline()로 safelist됨 */}
      <div className={`${swatch.bgClass} relative flex h-16 items-center justify-center`}>
        <span
          className={`${swatch.textClass ?? 'text-fg-strong'} typo-mono-m12 opacity-0 transition-opacity group-hover/swatch:opacity-100`}
        >
          {copied ? '복사됨' : swatch.value}
        </span>
      </div>
      <div className='px-2 py-1.5'>
        <span className='typo-mono-r11 text-fg-default block truncate'>{swatch.name}</span>
      </div>
    </button>
  )
}
