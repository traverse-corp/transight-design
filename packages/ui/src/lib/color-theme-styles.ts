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
 *
 * ⚠️ Tailwind v4 scanner는 소스코드의 리터럴 클래스명만 인식한다.
 * 아래 gray0X 항목은 템플릿 리터럴이 아니라 반드시 **리터럴 문자열**로 나열해야
 * 각 arbitrary value 조합 CSS(bg color-mix / text var 등)이 실제로 생성된다.
 */

export type GrayScaleColor =
  | 'gray01'
  | 'gray02'
  | 'gray03'
  | 'gray04'
  | 'gray05'
  | 'gray06'
  | 'gray07'
  | 'gray08'
  | 'gray09'
  | 'gray10'
  | 'gray11'

export type CommonColor =
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
  | GrayScaleColor

export const GRAY_SCALE_COLORS: GrayScaleColor[] = [
  'gray01',
  'gray02',
  'gray03',
  'gray04',
  'gray05',
  'gray06',
  'gray07',
  'gray08',
  'gray09',
  'gray10',
  'gray11'
]

export type ColorTheme = 'solid' | 'outline' | 'soft'

export type ColorThemeStyles = Record<CommonColor, Record<ColorTheme, string>>

/**
 * 공통 outline 정의 — 모든 컴포넌트가 이 정의를 그대로 상속.
 * gray0X는 tone 자체를 border/text로 사용.
 */
export const outlineColorStyles: Record<CommonColor, string> = {
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
    'border border-primary-blue-deep bg-transparent text-primary-blue-deep',
  gray01: 'border border-[var(--color-cool-grey-01)] bg-transparent text-[var(--color-cool-grey-01)]',
  gray02: 'border border-[var(--color-cool-grey-02)] bg-transparent text-[var(--color-cool-grey-02)]',
  gray03: 'border border-[var(--color-cool-grey-03)] bg-transparent text-[var(--color-cool-grey-03)]',
  gray04: 'border border-[var(--color-cool-grey-04)] bg-transparent text-[var(--color-cool-grey-04)]',
  gray05: 'border border-[var(--color-cool-grey-05)] bg-transparent text-[var(--color-cool-grey-05)]',
  gray06: 'border border-[var(--color-cool-grey-06)] bg-transparent text-[var(--color-cool-grey-06)]',
  gray07: 'border border-[var(--color-cool-grey-07)] bg-transparent text-[var(--color-cool-grey-07)]',
  gray08: 'border border-[var(--color-cool-grey-08)] bg-transparent text-[var(--color-cool-grey-08)]',
  gray09: 'border border-[var(--color-cool-grey-09)] bg-transparent text-[var(--color-cool-grey-09)]',
  gray10: 'border border-[var(--color-cool-grey-10)] bg-transparent text-[var(--color-cool-grey-10)]',
  gray11: 'border border-[var(--color-cool-grey-11)] bg-transparent text-[var(--color-cool-grey-11)]'
}

/**
 * inline 계열 (Button, Badge, Select) — solid / soft 정본.
 * gray0X:
 *   - solid: 톤 그대로 배경 + 밝은 톤(01-05)은 짙은 텍스트, 어두운 톤(06-11)은 on-dark
 *   - soft:  `color-mix()`로 톤과 bg-card를 섞어 라이트/다크 모두에서 tinted 배경 유지.
 *            텍스트는 시맨틱 fg-default로 자동 반전.
 */
export const inlineColorThemeStyles: ColorThemeStyles = {
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
  },
  gray01: {
    solid: 'bg-[var(--color-cool-grey-01)] text-[var(--color-cool-grey-11)]',
    outline: outlineColorStyles.gray01,
    soft: 'bg-[color-mix(in_oklab,var(--color-cool-grey-01)_25%,var(--color-bg-card))] text-fg-default'
  },
  gray02: {
    solid: 'bg-[var(--color-cool-grey-02)] text-[var(--color-cool-grey-11)]',
    outline: outlineColorStyles.gray02,
    soft: 'bg-[color-mix(in_oklab,var(--color-cool-grey-02)_25%,var(--color-bg-card))] text-fg-default'
  },
  gray03: {
    solid: 'bg-[var(--color-cool-grey-03)] text-[var(--color-cool-grey-11)]',
    outline: outlineColorStyles.gray03,
    soft: 'bg-[color-mix(in_oklab,var(--color-cool-grey-03)_25%,var(--color-bg-card))] text-fg-default'
  },
  gray04: {
    solid: 'bg-[var(--color-cool-grey-04)] text-[var(--color-cool-grey-11)]',
    outline: outlineColorStyles.gray04,
    soft: 'bg-[color-mix(in_oklab,var(--color-cool-grey-04)_25%,var(--color-bg-card))] text-fg-default'
  },
  gray05: {
    solid: 'bg-[var(--color-cool-grey-05)] text-[var(--color-cool-grey-11)]',
    outline: outlineColorStyles.gray05,
    soft: 'bg-[color-mix(in_oklab,var(--color-cool-grey-05)_25%,var(--color-bg-card))] text-fg-default'
  },
  gray06: {
    solid: 'bg-[var(--color-cool-grey-06)] text-on-dark',
    outline: outlineColorStyles.gray06,
    soft: 'bg-[color-mix(in_oklab,var(--color-cool-grey-06)_25%,var(--color-bg-card))] text-fg-default'
  },
  gray07: {
    solid: 'bg-[var(--color-cool-grey-07)] text-on-dark',
    outline: outlineColorStyles.gray07,
    soft: 'bg-[color-mix(in_oklab,var(--color-cool-grey-07)_25%,var(--color-bg-card))] text-fg-default'
  },
  gray08: {
    solid: 'bg-[var(--color-cool-grey-08)] text-on-dark',
    outline: outlineColorStyles.gray08,
    soft: 'bg-[color-mix(in_oklab,var(--color-cool-grey-08)_25%,var(--color-bg-card))] text-fg-default'
  },
  gray09: {
    solid: 'bg-[var(--color-cool-grey-09)] text-on-dark',
    outline: outlineColorStyles.gray09,
    soft: 'bg-[color-mix(in_oklab,var(--color-cool-grey-09)_25%,var(--color-bg-card))] text-fg-default'
  },
  gray10: {
    solid: 'bg-[var(--color-cool-grey-10)] text-on-dark',
    outline: outlineColorStyles.gray10,
    soft: 'bg-[color-mix(in_oklab,var(--color-cool-grey-10)_25%,var(--color-bg-card))] text-fg-default'
  },
  gray11: {
    solid: 'bg-[var(--color-cool-grey-11)] text-on-dark',
    outline: outlineColorStyles.gray11,
    soft: 'bg-[color-mix(in_oklab,var(--color-cool-grey-11)_25%,var(--color-bg-card))] text-fg-default'
  }
}

/**
 * surface 계열 (Card, Alert, Tooltip) — inline과 동일하게 상속.
 */
export const surfaceColorThemeStyles: ColorThemeStyles = {
  ...inlineColorThemeStyles
}
