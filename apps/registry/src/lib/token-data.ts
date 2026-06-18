/**
 * Tokens 페이지 표시용 데이터.
 * packages/ui의 TS 토큰 export를 그룹 메타와 조합하여 swatch 형태로 정렬.
 * 클래스명(`bg-cool-grey-01` 등)은 우리 토큰 컨벤션과 일치한다.
 */

import {
  COOL_GREY,
  PRIMARY,
  ACCENT,
  UI_COLOR,
  GRADIENT,
  SHADOW,
  TEXT_SIZE
} from '@transight-design/ui/tokens'

export interface Swatch {
  /** 토큰 이름 (`color-` prefix 제외, 예: 'cool-grey-01') */
  name: string
  /** 표시용 값 (hex 또는 rgba 또는 gradient 문자열) */
  value: string
  /** Tailwind bg 유틸리티 (배경에 사용) */
  bgClass: string
  /** 텍스트 색상 (밝은 배경에는 cool-grey-11, 어두운 배경에는 white) */
  textClass?: string
}

export interface ColorGroup {
  label: string
  swatches: Swatch[]
}

const isLight = (hex: string): boolean => {
  // 단순 휘도 추정 — 어두운 색이면 흰색 글자, 밝으면 어두운 글자
  if (!hex.startsWith('#')) return true
  const h = hex.length === 4 ? hex.replace(/#(.)(.)(.)/, '#$1$1$2$2$3$3') : hex
  const r = parseInt(h.slice(1, 3), 16)
  const g = parseInt(h.slice(3, 5), 16)
  const b = parseInt(h.slice(5, 7), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 > 160
}

const textFor = (hex: string): string => (isLight(hex) ? 'text-cool-grey-11' : 'text-white')

// ── Cool Grey ──────────────────────────────────
// 명시적 순서 (white → 01~11 → black). Object.entries는 키 순서 보장이 약해서 직접 지정.
const COOL_GREY_ORDER: (keyof typeof COOL_GREY)[] = [
  'white',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  'black'
]
const coolGreySwatches: Swatch[] = COOL_GREY_ORDER.map((key) => {
  const hex: string = COOL_GREY[key]
  return {
    name: `cool-grey-${key}`,
    value: hex,
    bgClass: `bg-cool-grey-${key}`,
    textClass: textFor(hex)
  }
})

// ── Primary Blue ────────────────────────────────
const primaryBlueSwatches: Swatch[] = [
  { name: 'primary-blue-1', value: PRIMARY.blue1, bgClass: 'bg-primary-blue-1', textClass: textFor(PRIMARY.blue1) },
  { name: 'primary-blue-2', value: PRIMARY.blue2, bgClass: 'bg-primary-blue-2', textClass: textFor(PRIMARY.blue2) },
  { name: 'primary-blue-deep', value: PRIMARY.blueDeep, bgClass: 'bg-primary-blue-deep', textClass: textFor(PRIMARY.blueDeep) },
  { name: 'primary-blue-opacity-10', value: 'rgb(21 109 252 / 0.1)', bgClass: 'bg-primary-blue-opacity-10', textClass: 'text-cool-grey-11' },
  { name: 'primary-blue-opacity-20', value: 'rgb(21 109 252 / 0.2)', bgClass: 'bg-primary-blue-opacity-20', textClass: 'text-cool-grey-11' }
]

// ── Primary Skyblue ─────────────────────────────
const primarySkyblueSwatches: Swatch[] = [
  { name: 'primary-skyblue-1', value: PRIMARY.skyblue1, bgClass: 'bg-primary-skyblue-1', textClass: textFor(PRIMARY.skyblue1) },
  { name: 'primary-skyblue-2', value: PRIMARY.skyblue2, bgClass: 'bg-primary-skyblue-2', textClass: textFor(PRIMARY.skyblue2) },
  { name: 'primary-blue2-opacity-20', value: 'rgb(136 173 255 / 0.2)', bgClass: 'bg-primary-blue2-opacity-20', textClass: 'text-cool-grey-11' }
]

// ── Accent ──────────────────────────────────────
const accentSwatches: Swatch[] = [
  { name: 'accent-amber', value: ACCENT.amber, bgClass: 'bg-accent-amber', textClass: textFor(ACCENT.amber) }
]

// ── Glass ────────────────────────────────────────
const glassSwatches: Swatch[] = [
  { name: 'glass-white', value: 'rgba(255,255,255,0.1)', bgClass: 'bg-glass-white', textClass: 'text-cool-grey-11' },
  { name: 'glass-border', value: 'rgba(255,255,255,0.05)', bgClass: 'bg-glass-border', textClass: 'text-cool-grey-11' }
]

// ── Sidebar ──────────────────────────────────────
const sidebarSwatches: Swatch[] = [
  { name: 'sidebar-button-bg', value: '#88adff', bgClass: 'bg-sidebar-button-bg', textClass: textFor('#88adff') }
]

// ── UI 9색 × 3단계 ───────────────────────────────
const UI_KEYS: (keyof typeof UI_COLOR)[] = [
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'skyblue',
  'blue',
  'purple',
  'pink'
]

const buildUiSwatches = (key: keyof typeof UI_COLOR): Swatch[] => {
  const c = UI_COLOR[key]
  return [
    {
      name: `ui-text-${key}`,
      value: c.text,
      bgClass: `bg-ui-text-${key}`,
      textClass: textFor(c.text)
    },
    {
      name: `ui-${key}`,
      value: c.base,
      bgClass: `bg-ui-${key}`,
      textClass: textFor(c.base)
    },
    {
      name: `ui-pale-${key}`,
      value: c.pale,
      bgClass: `bg-ui-pale-${key}`,
      textClass: textFor(c.pale)
    }
  ]
}

// ── 최종 color groups ───────────────────────────
export const COLOR_GROUPS: ColorGroup[] = [
  { label: 'Cool Grey', swatches: coolGreySwatches },
  { label: 'Primary Blue', swatches: primaryBlueSwatches },
  { label: 'Primary Skyblue', swatches: primarySkyblueSwatches },
  { label: 'Accent', swatches: accentSwatches },
  { label: 'Glass', swatches: glassSwatches },
  { label: 'Sidebar', swatches: sidebarSwatches },
  ...UI_KEYS.map((key) => ({
    label: `UI ${key.charAt(0).toUpperCase() + key.slice(1)}`,
    swatches: buildUiSwatches(key)
  }))
]

// ── 그래디언트 ───────────────────────────────────
export interface GradientSwatch {
  name: string
  value: string
  bgClass: string
}

export const GRADIENT_SWATCHES: GradientSwatch[] = [
  {
    name: 'primary-blue-gradient-1',
    value: GRADIENT.primaryBlue1,
    bgClass: 'bg-primary-blue-gradient-1'
  },
  {
    name: 'primary-blue-gradient-2',
    value: GRADIENT.primaryBlue2,
    bgClass: 'bg-primary-blue-gradient-2'
  },
  {
    name: 'primary-skyblue-gradient-1',
    value: GRADIENT.primarySkyblue1,
    bgClass: 'bg-primary-skyblue-gradient-1'
  },
  {
    name: 'ui-sidebar-gradient',
    value: GRADIENT.uiSidebar,
    bgClass: 'bg-ui-sidebar-gradient'
  }
]

// ── 그림자 ───────────────────────────────────────
export interface ShadowSwatch {
  name: string
  value: string
  utilityClass: string
}

export const SHADOW_SWATCHES: ShadowSwatch[] = [
  { name: 'shadow-primary', value: SHADOW.primary, utilityClass: 'shadow-primary' },
  { name: 'shadow-search-bar', value: SHADOW.searchBar, utilityClass: 'shadow-search-bar' },
  { name: 'shadow-input', value: SHADOW.input, utilityClass: 'shadow-input' },
  { name: 'shadow-hover', value: SHADOW.hover, utilityClass: 'shadow-hover' }
]

// ── 타이포그래피 크기 (text-*) ────────────────────
export interface TextSizeSwatch {
  name: string
  value: string
  sizeClass: string
}

export const TEXT_SIZE_SWATCHES: TextSizeSwatch[] = (
  Object.entries(TEXT_SIZE) as [keyof typeof TEXT_SIZE, string][]
).map(([key, value]) => ({
  name: `text-${key}`,
  value,
  sizeClass: `text-${key}`
}))
