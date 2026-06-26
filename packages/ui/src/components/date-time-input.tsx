/**
 * DateTimeInput — 세그먼트 기반 날짜시간 입력 공용 컴포넌트
 *
 * 6개 세그먼트(YYYY, MM, DD, hh, mm, ss)를 독립 input으로 분리하여
 * 세그먼트별 클램핑, 자동 이동, 키보드 네비게이션, 하이라이트를 지원한다.
 *
 * 내부적으로 세그먼트별 state를 유지하고, 부모에게는 포맷된 문자열을 전달한다.
 * (위치 기반 flat string만으로는 비순차 세그먼트 입력 시 위치가 어긋나는 문제 방지)
 */
import React, { useRef, useImperativeHandle, useCallback, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

/* ── 세그먼트 설정 ── */

type SegKey = 'yyyy' | 'mm' | 'dd' | 'hh' | 'min' | 'ss'

const SEGS: SegKey[] = ['yyyy', 'mm', 'dd', 'hh', 'min', 'ss']
const MAX_LEN: Record<SegKey, number> = { yyyy: 4, mm: 2, dd: 2, hh: 2, min: 2, ss: 2 }
const LIMITS: Record<SegKey, [number, number]> = {
  yyyy: [1900, 2100],
  mm: [1, 12],
  dd: [1, 31],
  hh: [0, 23],
  min: [0, 59],
  ss: [0, 59]
}
const PLACEHOLDER: Record<SegKey, string> = {
  yyyy: 'YYYY',
  mm: 'MM',
  dd: 'DD',
  hh: 'hh',
  min: 'mm',
  ss: 'ss'
}
const SEPARATOR: Record<SegKey, string | null> = {
  yyyy: '/',
  mm: '/',
  dd: null,
  hh: ':',
  min: ':',
  ss: null
}

type SegVals = Record<SegKey, string>

/* ── 파싱/조립 유틸 ── */

/** 포맷된 value("2025/01/15 13:30:00") → 세그먼트 값 객체 */
const parseSegments = (value: string): SegVals => {
  const digits: string = value.replace(/\D/g, '')
  return {
    yyyy: digits.slice(0, 4),
    mm: digits.slice(4, 6),
    dd: digits.slice(6, 8),
    hh: digits.slice(8, 10),
    min: digits.slice(10, 12),
    ss: digits.slice(12, 14)
  }
}

/**
 * 세그먼트 값 객체 → 포맷된 문자열
 * 빈 세그먼트 뒤에 값이 있는 세그먼트가 올 경우, 빈 세그먼트를 0 패딩하여
 * positional 형식을 유지한다.
 */
const assembleValue = (vals: SegVals): string => {
  // 마지막으로 값이 있는 세그먼트 인덱스 찾기
  let lastIdx = -1
  for (let i: number = SEGS.length - 1; i >= 0; i--) {
    const k = SEGS[i]
    if (k && vals[k]) {
      lastIdx = i
      break
    }
  }
  if (lastIdx === -1) return ''

  // 마지막 비어있지 않은 세그먼트까지, 빈 세그먼트는 0 패딩하여 위치 보존
  const digits: string = SEGS.slice(0, lastIdx + 1)
    .map((seg: SegKey) => {
      const v: string = vals[seg]
      return v || '0'.repeat(MAX_LEN[seg])
    })
    .join('')

  let result = ''
  for (let i = 0; i < digits.length; i++) {
    if (i === 4 || i === 6) result += '/'
    if (i === 8) result += ' '
    if (i === 10 || i === 12) result += ':'
    result += digits[i]
  }
  return result
}

/** 숫자를 세그먼트 길이만큼 zero-pad */
const pad = (seg: SegKey, v: number): string => String(v).padStart(MAX_LEN[seg], '0')

/* ── Props ── */

interface DateTimeInputProps {
  value: string
  onChange: (formatted: string) => void
  nextRef?: React.RefObject<HTMLInputElement | null>
  inputRef?: React.RefObject<HTMLInputElement | null>
  placeholder?: string
  className?: string
  onBlur?: (e: React.FocusEvent<HTMLElement>) => void
}

/* ── 컴포넌트 ── */

export const DateTimeInput: React.FC<DateTimeInputProps> = ({
  value,
  onChange,
  nextRef,
  inputRef,
  className,
  onBlur
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const refs: Record<SegKey, React.RefObject<HTMLInputElement | null>> = {
    yyyy: useRef<HTMLInputElement>(null),
    mm: useRef<HTMLInputElement>(null),
    dd: useRef<HTMLInputElement>(null),
    hh: useRef<HTMLInputElement>(null),
    min: useRef<HTMLInputElement>(null),
    ss: useRef<HTMLInputElement>(null)
  }
  const advancing = useRef<boolean>(false)
  const [activeSeg, setActiveSeg] = useState<SegKey | null>(null)

  // 내부 세그먼트 state — 부모 value와 동기화하되, 내부 변경 시에는 자체 관리
  const [segVals, setSegVals] = useState<SegVals>(() => parseSegments(value))
  // 내부에서 onChange를 호출했을 때 외부 value 업데이트를 무시하기 위한 ref
  const lastEmitted = useRef<string>(value)

  // 외부 value가 변경되었을 때만 내부 state 동기화
  useEffect(() => {
    if (value !== lastEmitted.current) {
      setSegVals(parseSegments(value))
      lastEmitted.current = value
    }
  }, [value])

  // inputRef → yyyy 세그먼트로 프록시
  useImperativeHandle(
    inputRef,
    () => {
      const yyyyEl: HTMLInputElement | null = refs.yyyy.current
      if (!yyyyEl) return null as unknown as HTMLInputElement
      return {
        ...yyyyEl,
        focus: () => {
          yyyyEl.focus()
          setTimeout(() => yyyyEl.select(), 0)
        },
        select: () => yyyyEl.select(),
        blur: () => yyyyEl.blur()
      } as HTMLInputElement
    },
    []
  )

  /** 세그먼트 값 변경 → 내부 state 업데이트 + 부모에게 onChange 전달 */
  const emitChange = useCallback(
    (seg: SegKey, segValue: string): void => {
      setSegVals((prev: SegVals) => {
        const next: SegVals = { ...prev, [seg]: segValue }
        const assembled: string = assembleValue(next)
        lastEmitted.current = assembled
        onChange(assembled)
        return next
      })
    },
    [onChange]
  )

  /** 다음 세그먼트로 포커스 이동 */
  const moveNext = useCallback(
    (seg: SegKey): void => {
      const idx: number = SEGS.indexOf(seg)
      advancing.current = true
      const nextSeg: SegKey | undefined = SEGS[idx + 1]
      if (idx < SEGS.length - 1 && nextSeg) {
        const el: HTMLInputElement | null = refs[nextSeg].current
        if (el) {
          el.focus()
          setTimeout(() => el.select(), 0)
        }
      } else if (nextRef?.current) {
        nextRef.current.focus()
      }
      setTimeout(() => {
        advancing.current = false
      }, 50)
    },
    [nextRef]
  )

  /** 이전 세그먼트로 포커스 이동 */
  const movePrev = useCallback((seg: SegKey): void => {
    const idx: number = SEGS.indexOf(seg)
    const prevSeg: SegKey | undefined = SEGS[idx - 1]
    if (idx > 0 && prevSeg) {
      advancing.current = true
      const el: HTMLInputElement | null = refs[prevSeg].current
      if (el) {
        el.focus()
        setTimeout(() => el.select(), 0)
      }
      setTimeout(() => {
        advancing.current = false
      }, 50)
    }
  }, [])

  /** 세그먼트 포커스 핸들러 */
  const handleFocus = useCallback((seg: SegKey): void => {
    setActiveSeg(seg)
    setTimeout(() => refs[seg].current?.select(), 0)
  }, [])

  /** 세그먼트 블러 핸들러 — 컨테이너 외부 포커스 시에만 onBlur 호출 */
  const handleBlur = useCallback(
    (seg: SegKey): void => {
      if (advancing.current) return

      // 불완전 값 패딩 (yyyy 제외)
      setSegVals((prev: SegVals) => {
        const v: string = prev[seg]
        if (v && seg !== 'yyyy') {
          const n: number = parseInt(v, 10)
          if (!isNaN(n)) {
            const [lo, hi] = LIMITS[seg]
            const clamped: string = pad(seg, Math.max(lo, Math.min(hi, n)))
            if (clamped !== v) {
              const next: SegVals = { ...prev, [seg]: clamped }
              const assembled: string = assembleValue(next)
              lastEmitted.current = assembled
              onChange(assembled)
              return next
            }
          }
        }
        return prev
      })

      // 컨테이너 외부 포커스 이동 감지
      setTimeout(() => {
        const active: Element | null = document.activeElement
        const isInside: boolean = SEGS.some(
          (s: SegKey) => active === refs[s].current
        )
        if (!isInside) {
          setActiveSeg(null)
          if (onBlur) {
            onBlur({
              currentTarget: containerRef.current
            } as unknown as React.FocusEvent<HTMLElement>)
          }
        }
      }, 0)
    },
    [onChange, onBlur]
  )

  /** 키보드 이벤트 핸들러 */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, seg: SegKey): void => {
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        moveNext(seg)
        return
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        movePrev(seg)
        return
      }
      if (e.key === 'Backspace' && segVals[seg] === '') {
        e.preventDefault()
        movePrev(seg)
        return
      }
      const allowed: boolean =
        /^[0-9]$/.test(e.key) ||
        ['Backspace', 'Delete', 'Tab'].includes(e.key) ||
        ((e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase()))
      if (!allowed) e.preventDefault()
    },
    [segVals, moveNext, movePrev]
  )

  /** 입력 변경 핸들러 — 클램핑 + 자동 이동 */
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, seg: SegKey): void => {
      const raw: string = e.target.value.replace(/\D/g, '').slice(0, MAX_LEN[seg])
      const [lo, hi] = LIMITS[seg]
      const n: number = parseInt(raw, 10)

      if (seg === 'yyyy') {
        emitChange(seg, raw)
        if (raw.length === 4) {
          const clamped: number = Math.max(lo, Math.min(hi, n))
          emitChange(seg, String(clamped))
          moveNext(seg)
        }
      } else {
        if (raw.length === MAX_LEN[seg]) {
          const clamped: string = pad(seg, isNaN(n) ? lo : Math.max(lo, Math.min(hi, n)))
          emitChange(seg, clamped)
          moveNext(seg)
        } else if (raw.length === 1) {
          const first: number = parseInt(raw[0] ?? '0', 10)
          if (first * 10 > hi) {
            emitChange(seg, pad(seg, Math.min(first, hi)))
            moveNext(seg)
          } else {
            emitChange(seg, raw)
          }
        } else {
          emitChange(seg, raw)
        }
      }
    },
    [emitChange, moveNext]
  )

  /** 컨테이너 빈 영역 클릭 시 첫 세그먼트 포커스 */
  const handleContainerMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>): void => {
      if (e.target === e.currentTarget) {
        e.preventDefault()
        refs.yyyy.current?.focus()
      }
    },
    []
  )

  return (
    <div
      ref={containerRef}
      className={cn(
        'border-border-default flex h-8 min-w-0 flex-1 cursor-text items-center rounded-md border bg-bg-card px-1.5',
        activeSeg && 'border-primary-blue-1',
        className
      )}
      onMouseDown={handleContainerMouseDown}
    >
      {SEGS.map((seg: SegKey) => (
        <span key={seg} className='inline-flex items-center'>
          {seg === 'hh' && <span className='w-1.5' />}
          <input
            ref={refs[seg]}
            value={segVals[seg]}
            placeholder={PLACEHOLDER[seg]}
            maxLength={MAX_LEN[seg]}
            inputMode='numeric'
            autoComplete='off'
            className={cn(
              'typo-r12 border-none bg-transparent text-center outline-none',
              'placeholder:text-fg-disabled',
              seg === 'yyyy' ? 'w-9' : 'w-5',
              activeSeg === seg && 'bg-primary-blue-1/10 rounded-sm'
            )}
            style={{ caretColor: 'transparent' }}
            onFocus={() => handleFocus(seg)}
            onBlur={() => handleBlur(seg)}
            onClick={() => {
              setActiveSeg(seg)
              setTimeout(() => refs[seg].current?.select(), 0)
            }}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, seg)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, seg)}
          />
          {SEPARATOR[seg] && (
            <span className='text-fg-disabled typo-r12 pointer-events-none select-none'>
              {SEPARATOR[seg]}
            </span>
          )}
        </span>
      ))}
    </div>
  )
}
