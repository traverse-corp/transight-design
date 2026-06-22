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
/**
 * 같은 레포 내 다른 아이템 참조 시 사용하는 풀 GitHub 주소 prefix.
 * shadcn은 bare 이름(예: 'lib-utils')을 항상 공식 shadcn 아이템으로 해석하므로,
 * 같은 레지스트리 안에서도 'owner/repo/item' 형태로 풀 명시가 필요.
 */
const REGISTRY_DEP_PREFIX = 'traverse-corp/transight-design'
const ESSENTIAL_COMPONENTS = [
  'button',
  'badge',
  'input',
  'label',
  'textarea',
  'checkbox',
  'radio-group',
  'select',
  'switch',
  'dialog',
  'tooltip',
  'separator',
  'skeleton',
  'spinner'
]

/**
 * shadcn 표준 base 컴포넌트 화이트리스트 (PHASE_0_INVENTORY.md §3.1).
 * apps/registry/src/lib/registry.ts의 BASE_COMPONENTS와 동일하게 유지할 것.
 * 이 목록에 속하면 'base' 폴더, 그 외 registry:ui 아이템은 'custom' 폴더로 설치된다.
 */
export const BASE_COMPONENTS = new Set([
  'accordion',
  'alert',
  'alert-dialog',
  'avatar',
  'badge',
  'button',
  'calendar',
  'card',
  'carousel',
  'checkbox',
  'command',
  'dialog',
  'dropdown-menu',
  'empty',
  'field',
  'hover-card',
  'input',
  'input-group',
  'input-otp',
  'label',
  'pagination',
  'popover',
  'preview-card',
  'radio-group',
  'resizable',
  'scroll-area',
  'select',
  'separator',
  'sheet',
  'sidebar',
  'skeleton',
  'sonner',
  'spinner',
  'switch',
  'table',
  'tabs',
  'textarea',
  'toggle',
  'toggle-group',
  'tooltip'
])

/** 컴포넌트 이름 → 'base' | 'custom' */
export const categoryFor = (name) => (BASE_COMPONENTS.has(name) ? 'base' : 'custom')

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
    registryDependencies: [...registryDeps].map((name) => `${REGISTRY_DEP_PREFIX}/${name}`).sort()
  }
}

const relativeFrom = (from, to) => relative(dirname(from), to).split('\\').join('/')

const main = () => {
  const items = []

  // ── 1. Styles (registry:style) ─────────────────
  // 사용자 프로젝트의 ./src/styles/*.css에 설치 (target 명시).
  // styles(index.css)는 다른 4개 스타일을 import하므로 의존성 명시.
  const stylesDir = join(SRC, 'styles')
  const styleFiles = readdirSync(stylesDir).filter((x) => x.endsWith('.css'))
  for (const f of styleFiles) {
    const base = f.replace(/\.css$/, '')
    const name = base === 'index' ? 'styles' : `style-${base}`
    const isIndex = name === 'styles'
    // index.css가 의존하는 4개 스타일 — 동일 레포의 다른 아이템
    const indexDeps = isIndex
      ? styleFiles
          .filter((x) => x !== 'index.css')
          .map((x) => `${REGISTRY_DEP_PREFIX}/style-${x.replace(/\.css$/, '')}`)
          .sort()
      : []
    items.push({
      name,
      type: 'registry:style',
      title: `Style: ${base}`,
      description: `${base}.css — 디자인 시스템 ${isIndex ? '진입점' : base} 스타일`,
      ...(indexDeps.length ? { registryDependencies: indexDeps } : {}),
      files: [
        {
          path: relativeFrom(OUT, join(stylesDir, f)),
          type: 'registry:style',
          target: `~/src/styles/${f}`
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
    const fileName = basename(full)
    const base = fileName.replace(/\.(ts|tsx)$/, '')
    const isTokens = full.includes(`${join('tokens', 'index.ts')}`)
    const itemName = isTokens ? 'lib-tokens' : `lib-${base}`
    // tokens는 이름 충돌 방지를 위해 별도 파일명으로 (사용자 lib/에 tokens.ts로 설치)
    const targetFileName = isTokens ? 'tokens.ts' : fileName
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
          type: 'registry:lib',
          target: `@lib/${targetFileName}`
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
            type: 'registry:hook',
            target: `@hooks/${f}`
          }
        ]
      })
    }
  }

  // ── 5. Components (registry:ui) ────────────────
  // 모든 컴포넌트는 'styles' 진입점을 transitive 의존성으로 갖는다.
  // shadcn이 'styles' → 4개 sub-styles 체인을 자동 따라가므로 토큰이 누락되지 않는다.
  // 이미 설치된 아이템은 shadcn이 자동 skip.
  const componentsDir = join(SRC, 'components')
  const STYLES_DEP = `${REGISTRY_DEP_PREFIX}/styles`
  for (const f of readdirSync(componentsDir).filter((x) => /\.(ts|tsx)$/.test(x))) {
    const full = join(componentsDir, f)
    const base = f.replace(/\.(ts|tsx)$/, '')
    const deps = collectDeps(full)
    const allRegistryDeps = [...new Set([...deps.registryDependencies, STYLES_DEP])].sort()
    items.push({
      name: base,
      type: 'registry:ui',
      title: base,
      description: `${base} 컴포넌트`,
      ...(deps.dependencies.length ? { dependencies: deps.dependencies } : {}),
      registryDependencies: allRegistryDeps,
      files: [
        {
          path: relativeFrom(OUT, full),
          type: 'registry:ui',
          target: `~/src/components/${categoryFor(base)}/${f}`
        }
      ]
    })
  }

  // ── 5b. Icon System (registry:ui) ──────────────
  // 컴포넌트 디렉토리에서 분리된 단독 아이콘 시스템.
  // - src/icon-system/icon.tsx + sprite.gen.tsx + icons.gen.ts 3개 파일을 한 item으로 묶음
  // - 사용자 측 설치 위치: ~/src/icons/<file>
  // - styles만 prerequisite — 컴포넌트 의존 없음
  // - `npx ... add icon` 단독 호출로 아이콘만 따로 설치 가능
  const iconSystemDir = join(SRC, 'icon-system')
  if (existsSync(iconSystemDir)) {
    const iconFiles = readdirSync(iconSystemDir)
      .filter((f) => /\.(tsx|ts)$/.test(f))
      .sort()
    if (iconFiles.length > 0) {
      const iconDeps = collectDeps(join(iconSystemDir, 'icon.tsx'))
      const allRegistryDeps = [...new Set([...iconDeps.registryDependencies, STYLES_DEP])].sort()
      items.push({
        name: 'icon',
        type: 'registry:ui',
        title: 'Icon System',
        description: 'SVG sprite 기반 아이콘 시스템 — palette 토큰 색상 × 5단계 크기',
        ...(iconDeps.dependencies.length ? { dependencies: iconDeps.dependencies } : {}),
        registryDependencies: allRegistryDeps,
        files: iconFiles.map((f) => ({
          path: relativeFrom(OUT, join(iconSystemDir, f)),
          type: 'registry:ui',
          target: `~/src/icons/${f}`
        }))
      })
    }
  }

  // ── 6. 필수 번들 (registry:item) ───────────────
  items.push({
    name: 'essential',
    type: 'registry:item',
    title: 'Essential Pack',
    description: '서비스 초기 구성에 필요한 핵심 UI 컴포넌트 묶음',
    registryDependencies: ESSENTIAL_COMPONENTS.map(
      (name) => `${REGISTRY_DEP_PREFIX}/${name}`
    ).sort()
  })

  // ── 7. 전체 번들 (registry:item) ───────────────
  const allRegistryDeps = items.map((i) => `${REGISTRY_DEP_PREFIX}/${i.name}`).sort()
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
