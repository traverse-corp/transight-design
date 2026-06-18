/**
 * 반응형 Ellipsis — 컨테이너 너비 기반 동적 chars 조절
 *
 * BasePanel이 ResizeObserver로 body 너비를 측정하고,
 * AdaptiveCharsProvider를 통해 하위 컴포넌트에 전파합니다.
 * Provider 밖(다이얼로그 등)에서는 fallback으로 기존 chars prop 값을 사용합니다.
 */
import { createContext, useContext, useMemo } from 'react'

// Provider 밖에서도 동작해야 하므로 null 허용 (throw 안 함)
const AdaptiveCharsContext = createContext<number | null>(null)
export const AdaptiveCharsProvider = AdaptiveCharsContext.Provider

/**
 * 순수 함수: 컨테이너 너비 → 단계별 chars 매핑
 * 패널 body 너비 기준으로 주소/해시 표시 글자 수를 결정합니다.
 */
export const calcAdaptiveChars = (width: number): number => {
  if (width < 350) return 4
  if (width < 500) return 6
  if (width < 700) return 8
  return 10
}

/**
 * 훅: Context에서 컨테이너 너비를 읽어 적응형 chars 값을 계산합니다.
 * Provider 밖이면 fallback 값을 그대로 반환합니다.
 */
export const useAdaptiveChars = (fallback: number = 6): number => {
  const containerWidth: number | null = useContext(AdaptiveCharsContext)
  return useMemo(
    () => (containerWidth != null ? calcAdaptiveChars(containerWidth) : fallback),
    [containerWidth, fallback]
  )
}
