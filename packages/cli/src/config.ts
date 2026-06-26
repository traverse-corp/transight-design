/**
 * Transight Design System CLI 설정값
 *
 * 컴포넌트는 GitHub 레포에서 직접 가져온다 (shadcn의 GitHub source registry 지원).
 * 호스팅된 URL은 Phase 6 (apps/registry 배포) 이후 옵션으로 추가.
 */

/** GitHub 소스 레지스트리 — `owner/repo` 형태 */
export const GITHUB_REPO: string = 'traverse-corp/transight-design'

/** 전체 번들 아이템 이름 (registry.json의 마지막 item) */
export const BUNDLE_ITEM: string = 'transight-design'

/** init 단계에서 선택 가능한 번들 — base / essential / all */
export const BUNDLE_ITEMS = {
  base: 'base',
  essential: 'essential',
  all: BUNDLE_ITEM
} as const

export type BundleKey = keyof typeof BUNDLE_ITEMS

/** GitHub 주소 빌더 — `traverse-corp/transight-design/button[#ref]` 형태 */
export const githubAddress = (item: string, ref?: string): string => {
  const base: string = `${GITHUB_REPO}/${item}`
  return ref ? `${base}#${ref}` : base
}
