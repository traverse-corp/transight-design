/** 문자열 앞/뒤만 남기고 중간을 .. 으로 축약 (예: 0x3d2a..93e4ab) */
export const ellipsis = (str: string, len: number = 6): string => {
  if (str.length <= len * 2 + 2) return str
  return `${str.slice(0, len)}..${str.slice(-len)}`
}
