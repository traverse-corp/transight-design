import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** shadcn 표준 cn — Tailwind 클래스 충돌 머지 */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs))
