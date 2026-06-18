/* ================================================================
 * Transight Design System — TS 토큰 export
 * CSS 토큰의 프로그래매틱 접근용 (Storybook, 디자인 도구, JS 차트 라이브러리 등)
 * 원본은 styles/tokens.css. 이 파일은 동일 값을 TS로 재선언.
 * ================================================================ */

export const COOL_GREY = {
  white: '#ffffff',
  '01': '#fbfcfe',
  '02': '#f8f9fd',
  '03': '#f3f4f8',
  '04': '#e4e7ee',
  '05': '#cfd3de',
  '06': '#969faf',
  '07': '#6d7588',
  '08': '#4e566a',
  '09': '#30384b',
  '10': '#212a3b',
  '11': '#131b2d',
  black: '#000000'
} as const

export const PRIMARY = {
  blue1: '#155dfc',
  blue2: '#3545d6',
  blueDeep: '#0d3796',
  skyblue1: '#d4e1ff',
  skyblue2: '#88adff'
} as const

export const ACCENT = {
  amber: '#c9a45a'
} as const

export const UI_COLOR = {
  red: { text: '#cf443d', base: '#ff5148', pale: '#ffe7e5' },
  orange: { text: '#ce8038', base: '#ff9d42', pale: '#fff1e4' },
  yellow: { text: '#caa00c', base: '#f8c50a', pale: '#fef9e6' },
  olive: { text: '#8ead27', base: '#b3cf57', pale: '#f3f7e4' },
  green: { text: '#209d59', base: '#24c06d', pale: '#eafbf1' },
  skyblue: { text: '#128e8d', base: '#42a1ff', pale: '#e3f6ff' },
  blue: { text: '#396ad7', base: '#286bff', pale: '#e7efff' },
  purple: { text: '#8951d0', base: '#a761ff', pale: '#f2e5ff' },
  pink: { text: '#bd5dbf', base: '#ea6feb', pale: '#faecfb' }
} as const

export const GRADIENT = {
  primaryBlue1: 'linear-gradient(to right, #155dfc, #3545d6)',
  primaryBlue2: 'linear-gradient(to right, #155dfc, #0d3796)',
  primarySkyblue1: 'linear-gradient(to right, #d4e1ff, #88adff)',
  uiSidebar: 'linear-gradient(to right, #d4e1ff, #88adff)'
} as const

export const SHADOW = {
  primary: '0 4px 15px 0 #e8ecf4',
  searchBar: '0 0 6px 2px rgba(122, 137, 196, 0.2)',
  input: '0 2px 6px 2px rgba(122, 137, 196, 0.1)',
  hover: '0 6px 15px 0 rgba(50, 64, 119, 0.5)'
} as const

export const TEXT_SIZE = {
  '4xs': '8px',
  '3xs': '9px',
  '2xs': '10px',
  xs: '12px',
  md: '13px',
  sm: '14px',
  base: '16px',
  lg: '18px',
  xl: '24px',
  '2xl': '32px',
  '3xl': '54px'
} as const

export const RADIUS = {
  base: '0.625rem' /* 10px */
} as const

export const BREAKPOINT = {
  md: '1550px',
  lg: '1660px'
} as const

export const FONT_FAMILY = {
  sans:
    "'SUIT Variable', SUIT, -apple-system, BlinkMacSystemFont, system-ui, Roboto, " +
    "'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', " +
    "'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif",
  mono:
    "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace"
} as const

export const FONT_FACE_URL =
  'https://cdn.jsdelivr.net/gh/sunn-us/SUIT/fonts/variable/woff2/SUIT-Variable.css'
