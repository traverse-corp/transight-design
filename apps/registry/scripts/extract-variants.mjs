#!/usr/bin/env node
/**
 * packages/ui/src/components/*.tsx 안의 cva variant를 추출하여
 * apps/registry/src/data/variants.json 으로 출력.
 *
 * 컴포넌트 페이지에서 variant 목록 + 기본값을 보여주기 위함.
 *
 * 추출 패턴 (우리 코드 컨벤션 기반):
 *   cva('base classes', {
 *     variants: {
 *       variant: { default: '...', outline: '...' },
 *       size: { sm: '...', lg: '...' }
 *     },
 *     defaultVariants: { variant: 'default', size: 'sm' }
 *   })
 */

import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const COMPONENTS_DIR = join(__dirname, '..', '..', '..', 'packages', 'ui', 'src', 'components')
const OUT_FILE = join(__dirname, '..', 'src', 'data', 'variants.json')

/** 균형 잡힌 중괄호 블록 추출 — `prefix` 뒤의 `{...}` 안 내용을 반환 */
const extractBlock = (source, prefix) => {
  const m = prefix.exec(source)
  if (!m) return null
  let i = m.index + m[0].length
  if (source[i - 1] !== '{') return null
  let depth = 1
  let inString = null
  while (depth > 0 && i < source.length) {
    const c = source[i]
    if (inString) {
      if (c === inString && source[i - 1] !== '\\') inString = null
    } else if (c === "'" || c === '"' || c === '`') {
      inString = c
    } else if (c === '{') {
      depth++
    } else if (c === '}') {
      depth--
    }
    i++
  }
  return source.slice(m.index + m[0].length, i - 1)
}

/** 블록 안의 1-depth 키 목록 추출 (문자열/식별자 키 모두) */
const extractKeys = (block) => {
  const keys = []
  let depth = 0
  let pos = 0
  let inString = null
  let bufStart = -1

  while (pos < block.length) {
    const c = block[pos]

    if (inString) {
      if (c === inString && block[pos - 1] !== '\\') inString = null
      pos++
      continue
    }

    if (c === '"' || c === "'" || c === '`') {
      if (depth === 0) {
        // 키 후보 — 따옴표 안 내용 추출
        let j = pos + 1
        while (j < block.length && (block[j] !== c || block[j - 1] === '\\')) j++
        const candidate = block.slice(pos + 1, j)
        // 뒤에 콜론이 와야 키
        let k = j + 1
        while (k < block.length && /\s/.test(block[k])) k++
        if (block[k] === ':') {
          keys.push(candidate)
        }
        pos = j + 1
        continue
      }
      inString = c
      pos++
      continue
    }

    if (c === '{') depth++
    else if (c === '}') depth--

    if (depth === 0 && /[a-zA-Z_$]/.test(c) && (pos === 0 || /[\s,{]/.test(block[pos - 1]))) {
      // 식별자 키 후보
      let j = pos
      while (j < block.length && /[\w$-]/.test(block[j])) j++
      const id = block.slice(pos, j)
      let k = j
      while (k < block.length && /\s/.test(block[k])) k++
      if (block[k] === ':') {
        keys.push(id)
      }
      pos = j
      continue
    }

    pos++
  }

  return keys
}

/** defaultVariants 객체에서 키별 기본값 추출 (문자열 리터럴만) */
const extractDefaults = (block) => {
  const defaults = {}
  const re = /(?:^|[\s,])([a-zA-Z_$][\w$-]*)\s*:\s*['"`]([^'"`]+)['"`]/g
  let m
  while ((m = re.exec(block)) !== null) {
    defaults[m[1]] = m[2]
  }
  return defaults
}

const extractCvaVariants = (source) => {
  // cva( 호출 찾기
  const cvaIdx = source.indexOf('cva(')
  if (cvaIdx === -1) return null

  // cva 호출 범위 내에서 variants:, defaultVariants: 찾기
  // variants 블록
  const variantsRe = /variants\s*:\s*\{/g
  variantsRe.lastIndex = cvaIdx
  const variantsBlock = extractBlock(source, variantsRe)
  if (!variantsBlock) return null

  // 각 그룹 (variant, size, ...) 안의 키 추출
  const groups = {}
  let pos = 0
  let depth = 0
  let inString = null
  while (pos < variantsBlock.length) {
    const c = variantsBlock[pos]
    if (inString) {
      if (c === inString && variantsBlock[pos - 1] !== '\\') inString = null
      pos++
      continue
    }
    if (c === '"' || c === "'" || c === '`') {
      inString = c
      pos++
      continue
    }
    if (c === '{') depth++
    else if (c === '}') depth--

    if (depth === 0 && /[a-zA-Z_$]/.test(c) && (pos === 0 || /[\s,]/.test(variantsBlock[pos - 1]))) {
      let j = pos
      while (j < variantsBlock.length && /[\w$-]/.test(variantsBlock[j])) j++
      const groupName = variantsBlock.slice(pos, j)
      let k = j
      while (k < variantsBlock.length && /\s/.test(variantsBlock[k])) k++
      if (variantsBlock[k] === ':') {
        // 그 다음 { 찾기
        let l = k + 1
        while (l < variantsBlock.length && /\s/.test(variantsBlock[l])) l++
        if (variantsBlock[l] === '{') {
          // 그룹 블록 추출
          let dep = 1
          let inStr = null
          let m = l + 1
          while (dep > 0 && m < variantsBlock.length) {
            const ch = variantsBlock[m]
            if (inStr) {
              if (ch === inStr && variantsBlock[m - 1] !== '\\') inStr = null
            } else if (ch === '"' || ch === "'" || ch === '`') {
              inStr = ch
            } else if (ch === '{') dep++
            else if (ch === '}') dep--
            m++
          }
          const groupBlock = variantsBlock.slice(l + 1, m - 1)
          groups[groupName] = extractKeys(groupBlock)
          pos = m
          continue
        }
      }
      pos = j
      continue
    }
    pos++
  }

  // defaultVariants
  const defaultsRe = /defaultVariants\s*:\s*\{/g
  defaultsRe.lastIndex = cvaIdx
  const defaultsBlock = extractBlock(source, defaultsRe)
  const defaults = defaultsBlock ? extractDefaults(defaultsBlock) : {}

  if (Object.keys(groups).length === 0) return null
  return { groups, defaults }
}

const main = () => {
  const files = readdirSync(COMPONENTS_DIR).filter((f) => /\.(ts|tsx)$/.test(f))
  const result = {}

  for (const f of files) {
    const name = f.replace(/\.(ts|tsx)$/, '')
    const full = join(COMPONENTS_DIR, f)
    const source = readFileSync(full, 'utf-8')
    const variants = extractCvaVariants(source)
    if (variants) result[name] = variants
  }

  if (!existsSync(dirname(OUT_FILE))) mkdirSync(dirname(OUT_FILE), { recursive: true })
  writeFileSync(OUT_FILE, JSON.stringify(result, null, 2) + '\n', 'utf-8')
  console.log(
    `[extract-variants] ${Object.keys(result).length}개 컴포넌트 variant → ${OUT_FILE}`
  )
}

main()
