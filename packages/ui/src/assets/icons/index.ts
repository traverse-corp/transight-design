/**
 * 아이콘 스텁 — 사용자 정의 아이콘 파일이 도착하면 이 모듈을 교체한다.
 *
 * 실제 구현 예시:
 *   export const ICON_MAP = { 'ic-map-cluster': '/icons/map-cluster.svg', ... } as const
 *   export type IconName = keyof typeof ICON_MAP
 */
export const ICON_MAP: Record<string, string> = {}
export type IconName = string
