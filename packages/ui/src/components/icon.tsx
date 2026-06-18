import { type CSSProperties, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { ICON_MAP, type IconName } from '@/assets/icons'

interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  /** 아이콘 이름 (ICON_MAP에 등록된 키) */
  src: IconName
  /** 크기 — size × 4 = px (기본값 4 = 16px) */
  size?: number
  /** 접근성 라벨 — 지정 시 role="img", 미지정 시 role="presentation" */
  label?: string
}

/**
 * mask-image 기반 SVG 아이콘 컴포넌트
 * 색상은 Tailwind text-* 클래스로 제어 (currentColor 사용)
 * hover:, group-hover: 등 모든 variant 지원
 *
 * @example
 * <Icon src="ic-map-cluster" size={4} className="text-cool-grey-09 hover:text-primary-blue-1" />
 */
const Icon = ({ src, size = 4, label, className, ...rest }: IconProps) => {
  const iconUrl: string = ICON_MAP[src] ?? ''
  const pixelSize: number = size * 4

  const cssVars: CSSProperties & Record<string, string> = {
    '--icon-url': `url(${iconUrl})`,
    '--icon-size': `${pixelSize}px`
  }

  return (
    <span
      role={label ? 'img' : 'presentation'}
      aria-label={label}
      aria-hidden={!label}
      className={cn('icon-mask', className)}
      style={cssVars}
      {...rest}
    />
  )
}

export { Icon, type IconProps, type IconName }
