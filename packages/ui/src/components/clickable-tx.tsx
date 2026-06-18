/**
 * ClickableTxHash — TX hash 클릭 + 호버 시 복사 아이콘
 *
 * - TX hash 텍스트 클릭 → onSelect 콜백 (예: TX 패널 이동)
 * - 복사 아이콘 클릭 → 클립보드 복사
 */
import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { toast } from 'sonner'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/tooltip'
import { useTranslation } from 'react-i18next'

interface ClickableTxHashProps {
  txHash: string
  network?: string
  chars?: number
  className?: string
  /** true면 앞 chars자만 표시 (패널 축소 시 사용) */
  compact?: boolean
  /** TX 해시 클릭 시 콜백 — (txHash, network) 전달 */
  onSelect?: (txHash: string, network: string | undefined) => void
  /** 복사 성공 시 토스트로 표시할 메시지 (없으면 i18n 키 CM_086 사용) */
  copyMessage?: string
}

export const ClickableTxHash: React.FC<ClickableTxHashProps> = ({
  txHash,
  network,
  chars = 6,
  className = 'text-cool-grey-09',
  compact = false,
  onSelect,
  copyMessage
}) => {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  if (!txHash) return <span className={className}>—</span>
  const short: string = compact
    ? txHash.length > chars
      ? txHash.slice(0, chars)
      : txHash
    : txHash.length > chars * 2 + 2
      ? `${txHash.slice(0, chars)}..${txHash.slice(-chars)}`
      : txHash

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(txHash)
    setCopied(true)
    toast.success(copyMessage ?? t('CM_086'))
    setTimeout(() => setCopied(false), 1500)
  }

  const handleClick = (e: React.MouseEvent) => {
    if (!onSelect) return
    e.stopPropagation()
    onSelect(txHash, network)
  }

  return (
    <span className='group/tx relative inline-flex max-w-full min-w-12 items-center overflow-visible'>
      <Tooltip>
        <TooltipTrigger
          render={<span />}
          className={`hover:text-primary-blue-1 min-w-0 cursor-pointer truncate ${className}`}
          onClick={handleClick}
        >
          {short}
        </TooltipTrigger>
        <TooltipContent side='bottom' className='max-w-md break-all'>
          {txHash}
        </TooltipContent>
      </Tooltip>
      <span
        className='pointer-events-none absolute top-1/2 right-0 z-10 inline-flex -translate-y-1/2 cursor-pointer items-center opacity-0 transition-opacity group-hover/tx:pointer-events-auto group-hover/tx:opacity-100'
        onClick={handleCopy}
      >
        {copied ? (
          <Check className='text-ui-green size-3' />
        ) : (
          <Copy className='text-cool-grey-05 hover:text-cool-grey-09 size-3' />
        )}
      </span>
    </span>
  )
}
