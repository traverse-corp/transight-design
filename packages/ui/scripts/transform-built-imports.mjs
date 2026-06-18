#!/usr/bin/env node
/**
 * shadcn build 산출물(public/r/*.json) 후처리.
 *
 * 컴포넌트 install 경로는 base/custom 폴더로 분리되지만, 소스 코드 안의
 * import path는 그대로 '@/components/X' 형태다. 사용자 프로젝트에 깔린
 * 후 서로를 찾을 수 있게 import path를 '@/components/{base|custom}/X'로
 * 일괄 rewrite한다.
 *
 * 실행: shadcn build → 이 스크립트
 */

import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { BASE_COMPONENTS, categoryFor } from './build-registry.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC_R = join(__dirname, '..', 'public', 'r')

/** content 안의 @/components/X import를 base/custom 경로로 치환 */
const rewriteImports = (content) => {
  // 매칭: from '@/components/foo' 또는 from "@/components/foo"
  // 그룹 1: 컴포넌트 이름 (foo)
  // base 또는 custom 하위 경로는 이미 변환된 것이므로 건너뜀
  return content.replace(
    /from\s+(['"])@\/components\/(?!base\/|custom\/)([^'"\/]+)\1/g,
    (_match, quote, name) => `from ${quote}@/components/${categoryFor(name)}/${name}${quote}`
  )
}

const main = () => {
  const files = readdirSync(PUBLIC_R).filter((f) => f.endsWith('.json'))
  let transformedFiles = 0
  let transformedItems = 0

  for (const file of files) {
    const full = join(PUBLIC_R, file)
    const raw = readFileSync(full, 'utf-8')
    const item = JSON.parse(raw)

    if (!Array.isArray(item.files)) continue

    let touched = false
    for (const f of item.files) {
      if (typeof f.content !== 'string') continue
      const rewritten = rewriteImports(f.content)
      if (rewritten !== f.content) {
        f.content = rewritten
        touched = true
        transformedItems += 1
      }
    }

    if (touched) {
      writeFileSync(full, JSON.stringify(item, null, 2) + '\n', 'utf-8')
      transformedFiles += 1
    }
  }

  console.log(
    `[transform-built-imports] ${transformedFiles}개 파일 (${transformedItems}개 file 항목) import 경로 rewrite 완료`
  )
}

main()
