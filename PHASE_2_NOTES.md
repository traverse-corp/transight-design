# Phase 2 — 토큰 레이어 (완료)

## 생성된 파일

```
packages/ui/src/
├── styles/
│   ├── tokens.css        # 원시 토큰 (@theme): 색상, gradient, shadow, font-size, breakpoint
│   ├── theme.css         # 시맨틱 매핑 (:root + .dark + @theme inline)
│   ├── typography.css    # SUIT 폰트 + typo-* / text-* 프리셋
│   ├── flex.css          # flex-* 유틸 31종
│   └── index.css         # 진입점 (@import tailwindcss + 위 4개)
├── tokens/
│   └── index.ts          # TS 토큰 export (COOL_GREY, PRIMARY, UI_COLOR, GRADIENT, SHADOW, …)
└── index.ts              # public surface: tokens + cn
```

## Tailwind v4 3단 패턴 적용

브리프 §Phase 2 명시:

1. **`tokens.css`** — `@theme` 블록에 **모든 hex 원시값** (Cool Grey 13, Primary, UI 9×3, Glass, Sidebar, Gradient, Shadow, Font-size, Breakpoint)
2. **`theme.css`** — `:root`/`.dark`에 shadcn 시맨틱 별칭 + `@theme inline`으로 유틸리티 연결
3. **컴포넌트**는 `bg-primary`, `text-foreground`, `shadow-primary` 등 시맨틱 유틸만 사용

## 변경 사항 (transight-v2 대비)

| 항목 | transight-v2 | 새 레포 |
|---|---|---|
| `--shadow-primary` | `@theme` 등록 | 동일 |
| `search-bar-shadow`, `input-shadow`, `shadow-hover` | `@layer utilities`의 클래스 | **`@theme`의 `--shadow-search-bar`, `--shadow-input`, `--shadow-hover`로 승격** → `shadow-search-bar`, `shadow-input`, `shadow-hover` 유틸 자동 생성 |
| Gradient 4종 | `@theme`의 `--image-*` | 동일 (변경 없음) |
| `--font-sans`, `--font-mono` | 미등록, `font-family` 직접 선언 | **`@theme`에 등록** → `font-sans` / `font-mono` 유틸 자동 생성 |
| `flex-*` 유틸 | `transight-ds.css` 하단에 혼재 | `flex.css`로 분리 |
| `typo-*` / `text-*` 프리셋 | `transight-ds.css`에 혼재 | `typography.css`로 분리 |

## 의도적으로 제외한 것 (app 한정)

다음은 app(transight-v2)의 도메인·페이지 전용이라 디자인 시스템에서 **제외**. app은 자체 CSS로 유지:

- `--color-trace-*` (Trace 시각화 별칭)
- `.bg-auth-premium` (로그인 페이지 배경)
- `.glass-card-true` (유리 카드 효과)
- `.skeleton`, `.skeleton-sub` (스켈레톤 base — Phase 3 Skeleton 컴포넌트로 흡수 예정)
- `.sidebar-highlight` (AppSidebar 그래디언트 텍스트 — app 한정)
- `.scrollbar-custom`, `.scrollbar-hide` (필요 시 추후 별도 utility 패키지 항목)
- `@keyframes shake`, `@keyframes shimmer`, `@keyframes shine` (애니메이션 — Phase 3 모션 패키지에서 검토)
- `input:-webkit-autofill` 오버라이드 (Input 컴포넌트 내부로 흡수 예정)
- `@media print` 블록 (리포트 페이지 한정)

## TS 토큰 (`tokens/index.ts`)

CSS와 같은 값을 TS에서 import 가능:

```ts
import { COOL_GREY, UI_COLOR, GRADIENT, SHADOW } from '@transight-design/ui'

COOL_GREY['11']         // '#131b2d'
UI_COLOR.red.base       // '#ff5148'
GRADIENT.primaryBlue1   // 'linear-gradient(to right, #155dfc, #3545d6)'
SHADOW.searchBar        // '0 0 6px 2px rgba(122, 137, 196, 0.2)'
```

차트 라이브러리, 디자인 도구 연동, 이메일 템플릿 등 CSS 변수가 안 닿는 곳에서 사용.

## 검증

- TypeScript 타입체크: ✅ (`npx tsc -p packages/ui/tsconfig.json --noEmit` 무오류)
- CSS 빌드 검증: ⏸ Tailwind v4 빌드는 Phase 3에서 첫 컴포넌트가 추가될 때 통합 검증

## 브리프 §Phase 2 항목 대응

- [x] 색상: 시맨틱(shadcn 컨벤션) + 브랜드 스케일
- [x] hex 유지 (oklch 변환 안 함 — 사용자 결정)
- [x] shadow `@theme`에 정식 등록 → `shadow-*` 유틸 자동 생성
- [x] gradient `--image-*` 등록 → `bg-primary-blue-gradient-1` 등 유틸 자동 생성
- [x] 플레이스홀더 없이 Phase 0 실제 값 사용
- [x] 다크 모드 시맨틱 토큰 (`.dark` 블록)
- [ ] **SUIT Variable을 `registry:font` 항목으로 정의** — Phase 4 (레지스트리) 진입 시 처리. 현재는 typography.css에서 `@import url(...)` 방식.

## 다음 (Phase 3 — 컴포넌트 정규화)

목록 (`PHASE_0_INVENTORY.md` §3 참조):

1. **Base UI 단일화**: 모든 컴포넌트 import를 `@base-ui/react/*`로 통일 (5개 컴포넌트의 `@base-ui-components/react/*` 치환)
2. **base 41개** 컴포넌트를 `packages/ui/src/components/`로 이전, shadcn 컨벤션 적용 (`cn` 유틸, `cva` variant, `@/` alias)
3. **custom 27개**도 같은 컨벤션으로 정규화 후 이전
4. **내부 import → `@/` 치환 빌드 스크립트** 작성 (브리프 Phase 1 명시 항목, 컴포넌트 등장 시점에 작성)
5. 컴포넌트별 `dependencies` / `registryDependencies` 정확히 명시 (Phase 4 레지스트리 준비)
