<div align="center">

# Transight Design System

블록체인 트랜잭션 분석 도구를 위해 만들어진 디자인 시스템.
shadcn 방식으로 컴포넌트 소스를 사용자 프로젝트에 **복사**하여 직접 소유·수정합니다.

[![npm](https://img.shields.io/npm/v/@transight-design/cli?label=%40transight-design%2Fcli)](https://www.npmjs.com/package/@transight-design/cli)
[![license](https://img.shields.io/github/license/traverse-corp/transight-design)](LICENSE)
[![CI](https://github.com/traverse-corp/transight-design/actions/workflows/ci.yml/badge.svg)](https://github.com/traverse-corp/transight-design/actions/workflows/ci.yml)

</div>

---

## ✨ 특징

- **66개 컴포넌트** — Base UI 프리미티브 기반 (`@base-ui/react`)
- **shadcn 표준 41개** + **자체 제작 25개**로 분리 배포
- **Tailwind v4 네이티브** — `@theme` 토큰, oklch 없이 hex 그대로
- **다크 모드 지원** (`.dark` 시맨틱 토큰)
- **타이포그래피 38종 프리셋** + **Flex 유틸 31종**
- **SUIT Variable 폰트** 자동 로드
- **shadcn CLI 호환** — `npx shadcn add` 직접 사용 가능

## 🚀 빠른 시작

### 1. 사전 요구사항

Vite + React + TypeScript + Tailwind v4 + shadcn 초기화된 프로젝트.

```bash
# 새 프로젝트 예시
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm install tailwindcss @tailwindcss/vite

# vite.config.ts, tsconfig.json에 @ alias 설정 (아래 §Installation 참조)
npx shadcn@latest init --defaults
```

### 2. Transight CLI로 한 줄 설치

```bash
# 전체 번들 (토큰·폰트·hook·lib·66개 컴포넌트 한 방)
npx @transight-design/cli init

# 또는 개별 컴포넌트
npx @transight-design/cli add button card dialog
```

### 3. 진입 CSS 설정

`src/index.css`를:

```css
@import "./styles/index.css";
```

(설치된 `styles/index.css`가 SUIT 폰트 + Tailwind + 디자인 토큰 모두 import)

### 4. 사용

```tsx
import { Button } from '@/components/base/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/base/card'

export default function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hello Transight</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>클릭</Button>
      </CardContent>
    </Card>
  )
}
```

## 📦 설치 옵션

### Transight CLI (권장)

```bash
npx @transight-design/cli init                 # 전체 번들 한 방
npx @transight-design/cli add <name...>        # 개별
npx @transight-design/cli list                 # 사용 가능한 아이템 목록
npx @transight-design/cli view <name>          # 정보 미리 보기 (설치 안 함)
```

`--dry-run`을 붙이면 호출될 shadcn 명령만 출력합니다.

### shadcn CLI 직접 (CLI 우회)

```bash
npx shadcn@latest add traverse-corp/transight-design/<name>
```

## 🧩 카탈로그

설치 시 자동으로 분류된 폴더에 떨어집니다.

### Base — shadcn 표준 (41개)
`src/components/base/`로 설치

```
accordion · alert · alert-dialog · avatar · badge · button · calendar · card
carousel · checkbox · command · dialog · dropdown-menu · empty · field
hover-card · icon · input · input-group · input-otp · label · pagination
popover · preview-card · radio-group · resizable · scroll-area · select
separator · sheet · sidebar · skeleton · sonner · spinner · switch · table
tabs · textarea · toggle · toggle-group · tooltip
```

### Custom — 자체 제작 (25개)
`src/components/custom/`로 설치

```
AlertDialog · AnimatedAccordion · AnimatedAlertDialog · AnimatedCheckbox
AnimatedPreviewCard · CoinIcon · CopyButton · CopyWrapper · DatePicker
Dropzone · Inputbar · NoItem · Paginations · RadioButton · SearchBar
Stepper · SuspenseFallback · TimePicker · animated-beam · back-button
clickable-addr · clickable-tx · date-time-input · hash-text · shine-border
```

### Styles · Lib · Hooks

| 카테고리 | 항목 |
|---|---|
| Styles | `styles` (진입점), `style-tokens`, `style-theme`, `style-typography`, `style-flex`, `style-font-suit` |
| Lib | `lib-utils` (`cn`), `lib-format` (ellipsis), `lib-get-strict-context`, `lib-pagination-types`, `lib-tokens` (TS 토큰) |
| Hooks | `hook-use-mobile`, `hook-use-controlled-state`, `hook-use-caps-lock`, `hook-use-adaptive-chars` |

## 🎨 토큰 시스템

### 색상

- **Cool Grey** 13단 (`cool-grey-01` ~ `cool-grey-11`, white/black)
- **Primary Blue** + **Skyblue** (각 2단계 + 그래디언트)
- **UI 9색 × 3단계** (red/orange/yellow/olive/green/skyblue/blue/purple/pink × text/base/pale)

### 타이포그래피

- 사이즈 11단 (8px ~ 54px)
- 굵기 5단 (Regular/Medium/Semibold/Bold/ExtraBold)
- 38개 프리셋 (`typo-r12`, `typo-sb14`, `typo-eb32` 등)
- 13개 시맨틱 프리셋 (`text-page-title`, `text-body`, `text-error` 등)

### Shadow / Gradient / Radius / Breakpoint

`@theme`에 정식 등록되어 `shadow-primary`, `bg-primary-blue-gradient-1` 등 Tailwind 유틸로 바로 사용 가능.

전체 hex 값은 [`PHASE_0_INVENTORY.md`](PHASE_0_INVENTORY.md) §5 참조.

## 🛠 수동 셋업 (참고)

Vite 신규 프로젝트에서 shadcn init 통과시키는 최소 셋업:

**vite.config.ts**
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') }
  }
})
```

**tsconfig.json**
```jsonc
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  }
}
```

`tsconfig.app.json`에도 동일한 `baseUrl` + `paths` 추가.

## 📁 모노레포 구조

```
transight-design/
├── packages/
│   ├── ui/          디자인 시스템 핵심 (registry source, 82 items)
│   └── cli/         @transight-design/cli (npm published)
├── apps/
│   └── registry/    Next.js 문서 사이트 (선택 배포)
├── registry.json    shadcn 진입점 (packages/ui/registry.json을 include)
└── .changeset/      버전 관리
```

## 🤝 기여

새 컴포넌트 추가, 토큰 수정, CLI 명령 확장 등은 [CONTRIBUTING.md](CONTRIBUTING.md) 참조.

요약:
1. `packages/ui/src/`에 작성
2. `npm run build`로 registry 재생성
3. changeset 작성 (`npx changeset`)
4. PR 제출

## 📄 라이선스

MIT © Traverse — [LICENSE](LICENSE)

## 🔗 관련 링크

- [shadcn/ui](https://ui.shadcn.com) — 배포 메커니즘 원본
- [Base UI](https://base-ui.com) — 프리미티브 라이브러리
- [Tailwind v4](https://tailwindcss.com) — 스타일 시스템
- [SUIT Font](https://sun-typeface.com/about-suit) — 한글 가변 폰트
