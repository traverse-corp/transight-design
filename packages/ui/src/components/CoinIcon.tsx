import React from 'react'
import tokenIcon from '@/assets/token.svg'

interface CoinIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  coinType?: string
  size?: number
}

export default function CoinIcon({ coinType, size = 24, className = '', ...props }: CoinIconProps) {
  const getImage = (type?: string) => {
    const filename = `${type?.toLowerCase() || 'icons/token'}.svg`
    return `/images/${filename}`
  }
  const src = getImage(coinType)

  return (
    <img
      src={src || tokenIcon}
      alt={coinType || 'icon'}
      width={size}
      height={size}
      className={className}
      onError={(e) => {
        // 없으면 default.svg 로 대체
        e.currentTarget.src = new URL(`/images/icons/token.svg`, import.meta.url).href
      }}
      {...props}
    />
  )
}
