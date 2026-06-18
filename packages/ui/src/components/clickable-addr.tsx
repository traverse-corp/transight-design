/**
 * ClickableAddr — 주소 클릭 + 호버 시 복사 아이콘
 *
 * - 주소 텍스트 클릭 → onSelect 콜백 (예: 패널 이동)
 * - 복사 아이콘 클릭 → 클립보드 복사
 *
 * entity/role은 외부에서 prop으로 주입 (도메인 store 결합 없음).
 */
import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { toast } from 'sonner'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/tooltip'
import { useTranslation } from 'react-i18next'

interface ClickableAddrProps {
  addr: string
  chars?: number
  className?: string
  /** true면 항상 복사만 (클릭 콜백 안 함) */
  copyOnly?: boolean
  /** true면 앞 chars자만 표시 (패널 축소 시 사용) */
  compact?: boolean
  /** 현재 하이라이트할 주소 — addr과 일치하면 파란색 강조 */
  highlightAddr?: string | null
  /** 주소 호버 시 콜백 (enter: addr, leave: null) */
  onHoverAddr?: (addr: string | null) => void
  /** 주소 클릭 시 콜백 (copyOnly가 false일 때만 호출) */
  onSelect?: (addr: string) => void
  /** true면 entity명 대신 항상 축약 주소만 표시 */
  hideEntity?: boolean
  /** 주소 라벨로 표시할 entity명 */
  entity?: string
  /** 주소 라벨에 함께 표시할 role */
  role?: string
  /** 복사 성공 시 토스트로 표시할 메시지 (없으면 i18n 키 CM_086 사용) */
  copyMessage?: string
}

export const ClickableAddr: React.FC<ClickableAddrProps> = ({
  addr,
  chars = 6,
  className = 'text-cool-grey-09',
  copyOnly = false,
  compact = false,
  highlightAddr,
  onHoverAddr,
  onSelect,
  hideEntity = false,
  entity,
  role,
  copyMessage
}) => {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  if (!addr || addr === '—') return <span className={className}>—</span>
  const short: string = compact
    ? addr.length > chars
      ? addr.slice(0, chars)
      : addr
    : addr.length > chars * 2 + 2
      ? `${addr.slice(0, chars)}..${addr.slice(-chars)}`
      : addr

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(addr)
    setCopied(true)
    toast.success(copyMessage ?? t('CM_086'))
    setTimeout(() => setCopied(false), 1500)
  }

  const handleClick = (e: React.MouseEvent) => {
    if (copyOnly || !onSelect) return
    e.stopPropagation()
    onSelect(addr)
  }

  const isHighlighted: boolean =
    !!highlightAddr && !!addr && addr.toLowerCase() === highlightAddr.toLowerCase()
  const displayLabel: string = entity ? `${entity}${role ? `: ${role}` : ''}` : short

  return (
    <span
      className='group/addr relative inline-flex max-w-full min-w-12 items-center overflow-visible'
      onMouseEnter={onHoverAddr ? () => onHoverAddr(addr) : undefined}
      onMouseLeave={onHoverAddr ? () => onHoverAddr(null) : undefined}
    >
      <Tooltip>
        <TooltipTrigger
          render={<span />}
          className={`hover:text-primary-blue-1 min-w-0 cursor-pointer truncate ${isHighlighted ? 'text-primary-blue-1' : className}`}
          onClick={handleClick}
        >
          {hideEntity ? short : displayLabel}
        </TooltipTrigger>
        <TooltipContent side='bottom' className='max-w-md break-all'>
          {addr}
        </TooltipContent>
      </Tooltip>
      <span
        className='pointer-events-none absolute top-1/2 right-0 z-10 inline-flex -translate-y-1/2 cursor-pointer items-center opacity-0 transition-opacity group-hover/addr:pointer-events-auto group-hover/addr:opacity-100'
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
