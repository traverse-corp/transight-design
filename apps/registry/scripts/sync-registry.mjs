#!/usr/bin/env node
/**
 * packages/ui/public/r/*.json → apps/registry/public/r/*.json 동기화.
 *
 * 문서 사이트가 ui 패키지의 빌드 산출물을 정적 호스팅한다. 빌드/개발 시작 전에
 * 항상 최신본을 가져온다.
 */

import { readdirSync, mkdirSync, copyFileSync, existsSync, rmSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SRC = join(__dirname, '..', '..', '..', 'packages', 'ui', 'public', 'r')
const DST = join(__dirname, '..', 'public', 'r')

if (!existsSync(SRC)) {
  console.error(
    `[sync-registry] ${SRC} 없음. 먼저 packages/ui에서 'npm run build'를 실행하세요.`
  )
  process.exit(1)
}

// 깔끔하게 다시 복사
rmSync(DST, { recursive: true, force: true })
mkdirSync(DST, { recursive: true })

let copied = 0
for (const entry of readdirSync(SRC)) {
  if (!entry.endsWith('.json')) continue
  copyFileSync(join(SRC, entry), join(DST, entry))
  copied += 1
}

console.log(`[sync-registry] ${copied}개 파일 동기화 → ${DST}`)
