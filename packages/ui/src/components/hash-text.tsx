import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { ellipsis } from '@/lib/format'
import { useTranslation } from 'react-i18next'

/**
 * 주소/트랜잭션 해시 표시 컴포넌트
 * - hover 시 밑줄 + 복사 아이콘 표시
 * - alwaysCopy: 복사 아이콘 상시 노출 (메인 주소/TX용)
 */
export const HashText: React.FC<{
  text: string
  chars?: number
  full?: boolean
  alwaysCopy?: boolean
  mono?: boolean
  className?: string
}> = ({ text, chars = 6, full = false, alwaysCopy = false, mono = false, className }) => {
  const [copied, setCopied] = useState(false)
  const { t } = useTranslation()

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success(t('CM_086'))
    setTimeout(() => setCopied(false), 1500)
  }

  const display = full ? text : ellipsis(text, chars)

  return (
    <span
      className={cn(
        'group/hash relative inline-flex max-w-full items-center overflow-visible',
        className
      )}
    >
      <span
        className={cn(
          'truncate transition-all',
          mono && 'font-mono',
          'group-hover/hash:decoration-cool-grey-06 group-hover/hash:underline group-hover/hash:underline-offset-2'
        )}
      >
        {display}
      </span>
      <span
        role='button'
        tabIndex={0}
        onClick={handleCopy}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleCopy(e as any)
        }}
        className={cn(
          'cursor-pointer items-center justify-center rounded-md p-0.5',
          'text-fg-muted hover:text-fg-strong hover:bg-bg-muted/60',
          alwaysCopy
            ? 'ml-1 inline-flex shrink-0'
            : 'pointer-events-none absolute top-1/2 right-0 z-10 inline-flex -translate-y-1/2 opacity-0 transition-opacity group-hover/hash:pointer-events-auto group-hover/hash:opacity-100'
        )}
      >
        {copied ? <Check className='size-3' /> : <Copy className='size-3' />}
      </span>
    </span>
  )
}
