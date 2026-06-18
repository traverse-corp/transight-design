#!/usr/bin/env node
/**
 * registry.json 생성기 — packages/ui/src를 introspection하여 shadcn 표준 스키마로 export.
 *
 * 출력: packages/ui/registry.json
 *
 * 분류 규칙:
 *   - src/styles/*.css        → registry:style
 *   - src/styles/typography.css 안의 @import 'SUIT' → 별도 registry:font 아이템
 *   - src/tokens/index.ts     → registry:lib
 *   - src/lib/*.ts(x)         → registry:lib
 *   - src/lib/hooks/*.ts(x)   → registry:hook
 *   - src/components/*.tsx    → registry:ui
 *   - 'transight-design'      → registry:item (전체 번들, 모든 아이템 registryDependencies)
 *
 * 의존성 추출:
 *   - import ... from '@/components/X' → registryDependencies: ['X']
 *   - import ... from '@/lib/X'        → registryDependencies: ['lib-X']
 *   - import ... from '@/lib/hooks/X'  → registryDependencies: ['hook-X']
 *   - import ... from 'pkg' (외부)     → dependencies: ['pkg']
 */

import { readFileSync, readdirSync, writeFileSync, existsSync, statSync } from 'node:fs'
import { join, dirname, basename, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const UI_ROOT = join(__dirname, '..')
const SRC = join(UI_ROOT, 'src')
const OUT = join(UI_ROOT, 'registry.json')

const REGISTRY_NAME = 'transight-design'
const REGISTRY_HOMEPAGE = 'https://github.com/traverse-corp/transight-design'

// 외부 의존성 화이트리스트 — package.json의 runtime + optional peer
const EXTERNAL_DEPS = new Set([
  '@base-ui/react',
  'class-variance-authority',
  'clsx',
  'cmdk',
  'date-fns',
  'embla-carousel-react',
  'input-otp',
  'lucide-react',
  'motion',
  'react-day-picker',
  'react-dropzone',
  'react-resizable-panels',
  'react-spinners',
  'sonner',
  'tailwind-merge',
  'tw-animate-css',
  'react-i18next',
  'next-themes',
  'react-router-dom',
  '@tanstack/react-query',
  '@lottiefiles/dotlottie-react'
])

// React / react-dom는 peerDependency라 dependencies에 포함하지 않음
const IGNORED_DEPS = new Set(['react', 'react-dom'])

const walk = (dir) => {
  const out = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) out.push(...walk(full))
    else out.push(full)
  }
  return out
}

const parseImports = (content) => {
  const importRe = /^\s*import\s+(?:[^'"]+\s+from\s+)?['"]([^'"]+)['"]/gm
  const out = new Set()
  let m
  while ((m = importRe.exec(content)) !== null) out.add(m[1])
  return [...out]
}

const classifyImport = (spec) => {
  if (spec.startsWith('@/components/')) {
    return { kind: 'component', name: spec.slice('@/components/'.length) }
  }
  if (spec.startsWith('@/lib/hooks/')) {
    return { kind: 'hook', name: spec.slice('@/lib/hooks/'.length) }
  }
  if (spec.startsWith('@/lib/')) {
    return { kind: 'lib', name: spec.slice('@/lib/'.length) }
  }
  if (spec.startsWith('@/tokens')) {
    return { kind: 'lib', name: 'tokens' }
  }
  if (spec.startsWith('@/assets/')) {
    // assets는 별도 아이템 없음 (사용자 환경에서 채워 넣음)
    return { kind: 'asset' }
  }
  if (spec.startsWith('.') || spec.startsWith('@/')) {
    return { kind: 'internal-other' }
  }
  // 외부 패키지: scoped (@org/pkg) 또는 일반 (pkg)
  const pkg = spec.startsWith('@') ? spec.split('/').slice(0, 2).join('/') : spec.split('/')[0]
  return { kind: 'external', name: pkg }
}

const collectDeps = (filePath) => {
  const content = readFileSync(filePath, 'utf-8')
  const imports = parseImports(content)
  const npmDeps = new Set()
  const registryDeps = new Set()
  for (const spec of imports) {
    const cls = classifyImport(spec)
    if (cls.kind === 'component') registryDeps.add(cls.name)
    else if (cls.kind === 'lib') registryDeps.add(`lib-${cls.name}`)
    else if (cls.kind === 'hook') registryDeps.add(`hook-${cls.name}`)
    else if (cls.kind === 'external') {
      if (!IGNORED_DEPS.has(cls.name) && EXTERNAL_DEPS.has(cls.name)) {
        npmDeps.add(cls.name)
      } else if (!IGNORED_DEPS.has(cls.name)) {
        // 화이트리스트 외 외부 패키지 — 경고 (코어 lib 등)
        console.warn(`[warn] ${basename(filePath)} imports unknown external '${cls.name}'`)
      }
    }
  }
  return {
    dependencies: [...npmDeps].sort(),
    registryDependencies: [...registryDeps].sort()
  }
}

const relativeFrom = (from, to) => relative(dirname(from), to).split('\\').join('/')

const main = () => {
  const items = []

  // ── 1. Styles (registry:style) ─────────────────
  const stylesDir = join(SRC, 'styles')
  for (const f of readdirSync(stylesDir).filter((x) => x.endsWith('.css'))) {
    const base = f.replace(/\.css$/, '')
    const name = base === 'index' ? 'styles' : `style-${base}`
    items.push({
      name,
      type: 'registry:style',
      title: `Style: ${base}`,
      description: `${base}.css — 디자인 시스템 ${base === 'index' ? '진입점' : base} 스타일`,
      files: [
        {
          path: relativeFrom(OUT, join(stylesDir, f)),
          type: 'registry:style'
        }
      ]
    })
  }

  // ── 2. Font ───────────────────────────────────
  // registry:font는 Google Fonts(provider: 'google') 전용. SUIT는 자체 CDN이라
  // 별도 항목 없이 typography.css의 @import url(...)로 통합 유지.

  // ── 3. Lib (registry:lib) ──────────────────────
  const libFiles = []
  for (const f of readdirSync(join(SRC, 'lib'))) {
    const full = join(SRC, 'lib', f)
    if (statSync(full).isFile() && /\.(ts|tsx)$/.test(f)) libFiles.push(full)
  }
  // tokens/index.ts도 lib로 분류
  const tokensFile = join(SRC, 'tokens', 'index.ts')
  if (existsSync(tokensFile)) libFiles.push(tokensFile)

  for (const full of libFiles) {
    const base = basename(full).replace(/\.(ts|tsx)$/, '')
    const itemName = full.includes(`${join('tokens', 'index.ts')}`)
      ? 'lib-tokens'
      : `lib-${base}`
    const deps = collectDeps(full)
    items.push({
      name: itemName,
      type: 'registry:lib',
      title: `Lib: ${base}`,
      description: `${base} — 디자인 시스템 lib`,
      ...(deps.dependencies.length ? { dependencies: deps.dependencies } : {}),
      ...(deps.registryDependencies.length
        ? { registryDependencies: deps.registryDependencies }
        : {}),
      files: [
        {
          path: relativeFrom(OUT, full),
          type: 'registry:lib'
        }
      ]
    })
  }

  // ── 4. Hooks (registry:hook) ───────────────────
  const hooksDir = join(SRC, 'lib', 'hooks')
  if (existsSync(hooksDir)) {
    for (const f of readdirSync(hooksDir).filter((x) => /\.(ts|tsx)$/.test(x))) {
      const full = join(hooksDir, f)
      const base = f.replace(/\.(ts|tsx)$/, '')
      const deps = collectDeps(full)
      items.push({
        name: `hook-${base}`,
        type: 'registry:hook',
        title: `Hook: ${base}`,
        description: `${base} — React 커스텀 훅`,
        ...(deps.dependencies.length ? { dependencies: deps.dependencies } : {}),
        ...(deps.registryDependencies.length
          ? { registryDependencies: deps.registryDependencies }
          : {}),
        files: [
          {
            path: relativeFrom(OUT, full),
            type: 'registry:hook'
          }
        ]
      })
    }
  }

  // ── 5. Components (registry:ui) ────────────────
  const componentsDir = join(SRC, 'components')
  for (const f of readdirSync(componentsDir).filter((x) => /\.(ts|tsx)$/.test(x))) {
    const full = join(componentsDir, f)
    const base = f.replace(/\.(ts|tsx)$/, '')
    const deps = collectDeps(full)
    items.push({
      name: base,
      type: 'registry:ui',
      title: base,
      description: `${base} 컴포넌트`,
      ...(deps.dependencies.length ? { dependencies: deps.dependencies } : {}),
      ...(deps.registryDependencies.length
        ? { registryDependencies: deps.registryDependencies }
        : {}),
      files: [
        {
          path: relativeFrom(OUT, full),
          type: 'registry:ui'
        }
      ]
    })
  }

  // ── 6. 전체 번들 (registry:item) ───────────────
  const allRegistryDeps = items.map((i) => i.name).sort()
  items.push({
    name: REGISTRY_NAME,
    type: 'registry:item',
    title: 'Transight Design System (전체)',
    description: '디자인 시스템 전체 번들 — 토큰, 폰트, lib, hook, 컴포넌트 전체 설치',
    registryDependencies: allRegistryDeps
  })

  const registry = {
    $schema: 'https://ui.shadcn.com/schema/registry.json',
    name: REGISTRY_NAME,
    homepage: REGISTRY_HOMEPAGE,
    items
  }

  writeFileSync(OUT, JSON.stringify(registry, null, 2) + '\n', 'utf-8')
  console.log(`registry.json: ${items.length} items → ${OUT}`)
}

main()
