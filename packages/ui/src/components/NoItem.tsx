import React from 'react'
import { useTranslation } from 'react-i18next'

interface NoItemProps {
  colSpan?: number
}

const NoItem = ({ colSpan }: NoItemProps) => {
  const { t } = useTranslation()

  return (
    <tr>
      <td colSpan={colSpan}>{t('CM_027')}</td>
    </tr>
  )
}

export default NoItem
