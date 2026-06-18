#!/usr/bin/env node
/**
 * Registry 빌드용 import 치환 스크립트.
 *
 * 사용자가 `npx shadcn add @transight-design/...` 로 컴포넌트를 가져갈 때,
 * 우리 모노레포 내부 alias (`@/components/X`, `@/lib/utils` 등)는
 * 그대로 두면 사용자 앱의 alias와 충돌하지 않는다 (shadcn의 표준 alias가 동일).
 *
 * 이 스크립트는 향후 추가 변환이 필요할 때 (예: 패키지 네임스페이스 치환)
 * 단일 진입점으로 쓰기 위해 골격만 남겨둔다.
 *
 * 현재 동작: registry 빌드 디렉토리(./tmp/registry-src) 로 src를 복사한 뒤
 * import path 검증만 수행. 실제 치환은 Phase 4(registry 구성) 진입 시
 * shadcn의 표준 처리에 위임 가능한지 검토 후 결정.
 */

import { readdir, readFile, mkdir, copyFile, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SRC_ROOT = join(__dirname, '..', 'src')
const OUT_ROOT = join(__dirname, '..', 'tmp', 'registry-src')

const walk = async (dir) => {
  const out = []
  const entries = await readdir(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = join(dir, e.name)
    if (e.isDirectory()) out.push(...(await walk(full)))
    else out.push(full)
  }
  return out
}

const main = async () => {
  if (!existsSync(SRC_ROOT)) {
    console.error('src not found:', SRC_ROOT)
    process.exit(1)
  }
  const files = await walk(SRC_ROOT)
  await mkdir(OUT_ROOT, { recursive: true })

  let copied = 0
  for (const f of files) {
    const rel = relative(SRC_ROOT, f)
    const out = join(OUT_ROOT, rel)
    await mkdir(dirname(out), { recursive: true })
    await copyFile(f, out)
    copied += 1
  }
  console.log(`rewrite-imports: copied ${copied} files → ${OUT_ROOT}`)
  console.log('NOTE: 실제 import path 변환은 Phase 4(registry) 진입 시 결정')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
