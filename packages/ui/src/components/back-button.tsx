import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/button'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface BackButtonProps extends Omit<React.ComponentProps<typeof Button>, 'onClick'> {
  /** 커스텀 뒤로가기 핸들러. 미지정 시 navigate(-1) 사용 */
  onBack?: () => void
  /** 버튼 라벨. 미지정 시 i18n 'CM_047' (뒤로가기) 사용 */
  label?: string
  /** 라벨 숨기고 아이콘만 표시 */
  iconOnly?: boolean
}

const BackButton = ({
  onBack,
  label,
  iconOnly = false,
  variant = 'ghost',
  size = 'sm',
  className,
  ...props
}: BackButtonProps) => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleClick = () => {
    if (onBack) {
      onBack()
    } else {
      navigate(-1)
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={className}
      aria-label={t('CM_047')}
      {...props}
    >
      <ArrowLeft className='h-4 w-4' />
      {!iconOnly && <span>{label || t('CM_047')}</span>}
    </Button>
  )
}

export default BackButton
