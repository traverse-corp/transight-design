import * as React from 'react'
import { cn } from '@/lib/utils'
import type { IconName } from './icons.gen'

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const SIZE_PX: Record<IconSize, number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24
}

// styles/tokens.css의 팔레트 토큰명. 렌더 시점에 var(--color-<token>)으로 풀리고
// CSS color로 적용되어 sprite의 currentColor를 상속한다.
// 'white' / 'black'은 cool-grey-white / cool-grey-black의 짧은 별칭.
export type IconColor =
  | 'white'
  | 'cool-grey-01'
  | 'cool-grey-02'
  | 'cool-grey-03'
  | 'cool-grey-04'
  | 'cool-grey-05'
  | 'cool-grey-06'
  | 'cool-grey-07'
  | 'cool-grey-08'
  | 'cool-grey-09'
  | 'cool-grey-10'
  | 'cool-grey-11'
  | 'black'
  | 'primary-blue-1'
  | 'primary-blue-2'
  | 'primary-blue-deep'
  | 'primary-skyblue-1'
  | 'primary-skyblue-2'
  | 'ui-red'
  | 'ui-orange'
  | 'ui-yellow'
  | 'ui-olive'
  | 'ui-green'
  | 'ui-skyblue'
  | 'ui-blue'
  | 'ui-purple'
  | 'ui-pink'
  | 'ui-amber'
  | 'ui-text-red'
  | 'ui-text-orange'
  | 'ui-text-yellow'
  | 'ui-text-olive'
  | 'ui-text-green'
  | 'ui-text-skyblue'
  | 'ui-text-blue'
  | 'ui-text-purple'
  | 'ui-text-pink'
  | 'ui-text-amber'
  /** @deprecated ui-amber 사용 권장. tokens.css에서 alias로 한 사이클 유지. */
  | 'accent-amber'

export interface IconProps {
  src: IconName
  color?: IconColor
  size?: IconSize
  className?: string
}

/**
 * 순수 표출용 아이콘. 앱 루트에 한 번 마운트된 <IconSprite />의 <symbol>을 참조한다.
 * 인터랙티브 prop(onClick 등) 없음 — 필요하면 button으로 감쌀 것.
 */
/** 짧은 별칭 → 실제 토큰명 매핑. 매핑이 없는 색은 그대로 사용. */
const COLOR_TOKEN_ALIAS: Partial<Record<IconColor, string>> = {
  white: 'cool-grey-white',
  black: 'cool-grey-black'
}

/** IconColor를 tokens.css의 실제 CSS 변수명으로 변환. 미리보기/swatch 표시 등에 활용. */
export const resolveIconColorToken = (color: IconColor): string =>
  COLOR_TOKEN_ALIAS[color] ?? color

export const Icon = ({ src, color = 'cool-grey-06', size = 'md', className }: IconProps) => {
  const px = SIZE_PX[size]
  const token = resolveIconColorToken(color)
  return (
    <svg
      width={px}
      height={px}
      aria-hidden='true'
      focusable='false'
      style={{ color: `var(--color-${token})` }}
      className={cn('inline-block shrink-0', className)}
    >
      <use href={`#${src}`} />
    </svg>
  )
}
