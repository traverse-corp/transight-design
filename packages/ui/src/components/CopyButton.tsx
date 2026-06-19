import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/button'
import { useTranslation } from 'react-i18next'

/** 클립보드 복사 버튼 (인라인 아이콘) */
export const CopyButton: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  const [copied, setCopied] = useState(false)
  const { t } = useTranslation()
  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success(t('CM_086'))
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <Button appearance="soft" size="xs" className={className} onClick={handleCopy}>
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
    </Button>
  )
}
