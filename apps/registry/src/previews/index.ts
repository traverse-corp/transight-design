import type { ComponentType } from 'react'
import { Preview as ButtonPreview } from './button'
import { Preview as BadgePreview } from './badge'
import { Preview as AlertPreview } from './alert'
import { Preview as CardPreview } from './card'
import { Preview as SeparatorPreview } from './separator'
import { Preview as SkeletonPreview } from './skeleton'
import { Preview as SpinnerPreview } from './spinner'
import { Preview as AvatarPreview } from './avatar'
import { Preview as InputPreview } from './input'
import { Preview as LabelPreview } from './label'

/**
 * 이름 → 프리뷰 컴포넌트 매핑.
 * 6b는 base 컴포넌트 10개만. 나머지는 "Preview pending" placeholder.
 * 6c+에서 점진적으로 추가.
 */
export const PREVIEWS: Record<string, ComponentType> = {
  button: ButtonPreview,
  badge: BadgePreview,
  alert: AlertPreview,
  card: CardPreview,
  separator: SeparatorPreview,
  skeleton: SkeletonPreview,
  spinner: SpinnerPreview,
  avatar: AvatarPreview,
  input: InputPreview,
  label: LabelPreview
}

export const hasPreview = (name: string): boolean => name in PREVIEWS
