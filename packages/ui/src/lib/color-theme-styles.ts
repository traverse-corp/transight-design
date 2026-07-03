/**
 * 디자인 시스템 color × theme 정본 정의.
 *
 * 모든 컴포넌트가 이 토큰을 참조해야 하며, 값을 로컬에서 재정의하지 않는다.
 *
 * - **outline**은 계열(inline/surface)과 무관하게 모든 컴포넌트가 동일한 정의를 공유한다.
 *   `border {color-border} bg-transparent text-{color-text}` — 표면 없음.
 * - **solid / soft**는 두 계열로 분화:
 *   - inline (Button, Badge, Select) — 채움이 은은한 UI 톤
 *   - surface (Card, Alert, Tooltip) — 카드 표면·다크 반전 등 컨테이너 톤
 * - **다크모드 대응은 soft 테마만** — solid / outline은 라이트/다크와 무관하게 동일한 색상
 *   (raw `--color-*` 토큰 사용). soft만 시맨틱 토큰(`bg-bg-*` 등)으로 자동 반전.
 * - hover / focus / shadow 등 인터랙션 레이어는 컴포넌트 파일에서 별도로 얹는다.
 *   여기 토큰은 색 identity (border / bg / text)만 담는다.
 */

export type CommonColor =
  | 'gray'
  | 'blue'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'olive'
  | 'green'
  | 'skyblue'
  | 'purple'
  | 'pink'
  | 'amber'
  | 'white'
  | 'gradient-blue'
  | 'gradient-blue-deep'

export type ColorTheme = 'solid' | 'outline' | 'soft'

export type ColorThemeStyles = Record<CommonColor, Record<ColorTheme, string>>

/**
 * 공통 outline 정의 — 모든 컴포넌트가 이 정의를 그대로 상속.
 * 예외 없음.
 */
export const outlineColorStyles: Record<CommonColor, string> = {
  gray: 'border border-cool-grey-06 bg-transparent text-cool-grey-06',
  blue: 'border border-primary-blue-1 bg-transparent text-primary-blue-1',
  red: 'border border-ui-red bg-transparent text-ui-red',
  orange: 'border border-ui-orange bg-transparent text-ui-orange',
  yellow: 'border border-ui-yellow bg-transparent text-ui-yellow',
  olive: 'border border-ui-olive bg-transparent text-ui-olive',
  green: 'border border-ui-green bg-transparent text-ui-green',
  skyblue: 'border border-ui-skyblue bg-transparent text-ui-skyblue',
  purple: 'border border-ui-purple bg-transparent text-ui-purple',
  pink: 'border border-ui-pink bg-transparent text-ui-pink',
  amber: 'border border-ui-amber bg-transparent text-ui-text-amber',
  white: 'border border-white bg-transparent text-white',
  'gradient-blue': 'border border-primary-blue-1 bg-transparent text-primary-blue-1',
  'gradient-blue-deep':
    'border border-primary-blue-deep bg-transparent text-primary-blue-deep'
}

/**
 * inline 계열 (Button, Badge, Select) — solid / soft 정본.
 * outline은 outlineColorStyles를 그대로 조합해서 사용.
 */
export const inlineColorThemeStyles: ColorThemeStyles = {
  gray: {
    solid: 'bg-cool-grey-06 text-white',
    outline: outlineColorStyles.gray,
    soft: 'bg-bg-muted text-fg-default'
  },
  blue: {
    solid: 'bg-primary-blue-1 text-on-dark',
    outline: outlineColorStyles.blue,
    soft: 'bg-primary-blue-1/10 text-primary-blue-1'
  },
  red: {
    solid: 'bg-ui-red text-on-dark',
    outline: outlineColorStyles.red,
    soft: 'bg-ui-pale-red text-ui-red'
  },
  orange: {
    solid: 'bg-ui-orange text-on-dark',
    outline: outlineColorStyles.orange,
    soft: 'bg-ui-pale-orange text-ui-orange'
  },
  yellow: {
    solid: 'bg-ui-yellow text-on-dark',
    outline: outlineColorStyles.yellow,
    soft: 'bg-ui-pale-yellow text-ui-yellow'
  },
  olive: {
    solid: 'bg-ui-olive text-on-dark',
    outline: outlineColorStyles.olive,
    soft: 'bg-ui-olive/10 text-ui-olive'
  },
  green: {
    solid: 'bg-ui-green text-on-dark',
    outline: outlineColorStyles.green,
    soft: 'bg-ui-pale-green text-ui-green'
  },
  skyblue: {
    solid: 'bg-ui-skyblue text-on-dark',
    outline: outlineColorStyles.skyblue,
    soft: 'bg-ui-skyblue/10 text-ui-skyblue'
  },
  purple: {
    solid: 'bg-ui-purple text-on-dark',
    outline: outlineColorStyles.purple,
    soft: 'bg-ui-pale-purple text-ui-purple'
  },
  pink: {
    solid: 'bg-ui-pink text-on-dark',
    outline: outlineColorStyles.pink,
    soft: 'bg-ui-pale-pink text-ui-pink'
  },
  amber: {
    solid: 'bg-ui-amber text-on-dark',
    outline: outlineColorStyles.amber,
    soft: 'bg-ui-pale-amber text-ui-text-amber'
  },
  white: {
    solid: 'bg-[var(--color-cool-grey-white)] text-[var(--color-cool-grey-07)]',
    outline: outlineColorStyles.white,
    soft: 'bg-[var(--color-cool-grey-01)] text-[var(--color-cool-grey-07)]'
  },
  'gradient-blue': {
    solid: 'bg-primary-blue-gradient-1 text-on-dark',
    outline: outlineColorStyles['gradient-blue'],
    soft: 'bg-primary-blue-1/10 text-primary-blue-1'
  },
  'gradient-blue-deep': {
    solid: 'bg-primary-blue-gradient-2 text-on-dark',
    outline: outlineColorStyles['gradient-blue-deep'],
    soft: 'bg-primary-blue-1/10 text-primary-blue-1'
  }
}

/**
 * surface 계열 (Card, Alert, Tooltip) — solid / soft 정본.
 * outline은 inline과 완전 동일 (outlineColorStyles).
 * 차이점: gray solid가 dark 반전 표면(bg-bg-inverse), gray soft에 border-transparent 명시.
 */
export const surfaceColorThemeStyles: ColorThemeStyles = {
  ...inlineColorThemeStyles,
  gray: {
    solid: 'bg-cool-grey-06 text-white',
    outline: outlineColorStyles.gray,
    soft: 'bg-bg-muted text-fg-default border-transparent'
  }
}
