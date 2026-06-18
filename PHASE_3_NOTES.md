# Phase 3 — 컴포넌트 정규화 (완료, typecheck 0건)

## 2차 정리 결과 (사용자 권장안 적용)

| 처리 | 내용 |
|---|---|
| Loading.tsx, loading-overlay.tsx | **삭제** — app 전용 (lottie + react-query + zustand store) |
| clickable-addr.tsx | `useTraceStore` 결합 제거, `entity`/`role`/`onSelect`/`copyMessage` prop으로 외부화 |
| clickable-tx.tsx | `useTraceStore` 결합 제거, `onSelect`/`copyMessage` prop으로 외부화 |
| CoinIcon.tsx | `@assets/images/icons/token.svg` → `@/assets/token.svg` (stub, 사용자 아이콘 도착 시 교체) |
| icon.tsx | `@assets/images/icons` → `@/assets/icons` (stub) |
| accordion.tsx | Base UI 1.5 `AccordionValue<unknown>` 제네릭 대응 (string 키 캐스팅) |
| command.tsx | `DialogPopup`의 `showCloseButton` prop 제거 (Base UI 1.5 API 변경) |
| date-time-input.tsx | `noUncheckedIndexedAccess` null guard 5곳 추가 |
| animated-beam / Stepper / Paginations | type-only import 3곳 정리 |
| `tsconfig.base.json` | `verbatimModuleSyntax: true` **복원** |
| `packages/ui/src/assets/` | 아이콘 stub 디렉토리 신설 (사용자 아이콘 파일 도착 시 교체 대기) |

## 최종 컴포넌트 수

- 이전 시점: 68개
- 삭제: 2개 (Loading, loading-overlay)
- **최종: 66개**

## 검증

```
$ npx tsc -p packages/ui/tsconfig.json --noEmit
exit: 0
```

---

# Phase 3 — 컴포넌트 정규화 (1차 완료)

## 결과

| 항목 | 수치 |
|---|---|
| 이전한 컴포넌트 | **68개** (Folder.jsx / Grainient.jsx 제외) |
| 포팅한 헬퍼 lib | 6개 (get-strict-context, use-caps-lock, use-controlled-state, use-mobile, use-adaptive-chars, format/pagination-types) |
| 추가한 외부 의존성 (runtime) | 8개 (cmdk, date-fns, embla-carousel-react, input-otp, lucide-react, motion, react-day-picker, react-dropzone, react-resizable-panels, react-spinners, sonner, tw-animate-css) |
| 추가한 peer dep (optional) | 5개 (react-i18next, next-themes, react-router-dom, @tanstack/react-query, @lottiefiles/dotlottie-react) |
| 일괄 변환한 import 경로 | 11종 (`@base-ui-components/react/*` → `@base-ui/react/*`, `@/shared/components/*` → `@/components/*`, lib 경로 등) |
| 잔여 typecheck 에러 | **17건** (아래 분류) |

## Phase 0 결정사항 반영

- ✅ Base UI 단일화: `@base-ui-components/react/*` → `@base-ui/react/*` 일괄 치환
- ✅ `CopyButton`(통합본), `Stepper`(stepper2 기반) 포함
- ✅ `Folder.jsx`, `Grainient.jsx` 제외
- ✅ `@/` alias = `./src/*` (packages/ui/tsconfig.json)

## 잔여 에러 17건 (PHASE 3 후속)

### A. Base UI 1.5 API 변경 (4건) — 코드 수정 필요

- `accordion.tsx` (3건): `AccordionValue<unknown>` 제네릭이 추가됨. value/defaultValue/onValueChange 타입을 제네릭 적용해 갱신
- `command.tsx` (1건): Dialog.Popup에서 `showCloseButton` prop 제거됨. 자체 close 버튼 렌더링으로 변경

### B. `noUncheckedIndexedAccess: true` 위반 (5건) — 코드 수정 필요

- `date-time-input.tsx` (line 70, 184, 205, 257, 312): `SegKey` 배열 인덱싱이 `T | undefined`를 반환하게 됨. null guard 추가 필요.

### C. 도메인 결합 (8건) — **이 패키지에서 제외 결정 필요**

다음 6개 컴포넌트는 transight-v2 도메인(entities / assets / stores)에 의존. 처리 방향 3가지:

| 컴포넌트 | 도메인 결합 | 처리 옵션 |
|---|---|---|
| `clickable-addr.tsx` | `@/entities/trace`의 `useTraceStore` | (1) `entity`/`role` 외부 prop으로 받게 리팩터링 → 도메인 제거 후 base 유지 |
| `clickable-tx.tsx` | 동일 | (1)과 동일 |
| `hash-text.tsx` | `useTranslation`만 (해소됨) | ✅ 정상 (peer dep) |
| `CoinIcon.tsx` | `@assets/images/icons/token.svg` | (2) 아이콘 파일 별도 전달 받으면 해결 (사용자 보류 중) |
| `icon.tsx` | `@assets/images/icons`의 ICON_MAP | (2)와 동일 |
| `Loading.tsx` | `loadingStore`, `react-query`, lottie | (3) **이 패키지에서 제외** — app 전용 |
| `loading-overlay.tsx` | lottie asset | (3)과 동일 |
| `back-button.tsx` | `react-router-dom`만 (해소됨) | ✅ 정상 (peer dep optional) |

권장:
- `Loading.tsx`, `loading-overlay.tsx` → **디자인 시스템에서 제외** (transight-v2가 자체 보유)
- `clickable-addr`, `clickable-tx` → 도메인 의존 제거 후 base로 유지 (Phase 3 후속)
- `CoinIcon`, `icon` → 아이콘 파일 도착 시 정리

### D. `verbatimModuleSyntax: true`를 `false`로 일시 변경

`tsconfig.base.json`에서 `verbatimModuleSyntax: false`로 일시 조정. 원본 transight-v2 코드가 type-only import를 일부 누락한 상태 (`import { RefObject } from 'react'` 등).

후속 정리 항목:
- [ ] 전 파일을 `import type { … }` 패턴으로 정리 후 `verbatimModuleSyntax: true` 복원

## 일괄 변환된 import 규칙

| 변환 전 | 변환 후 |
|---|---|
| `@base-ui-components/react/*` | `@base-ui/react/*` |
| `from '@/shared/components/X'` | `from '@/components/X'` |
| `from '@shared/components/X'` | `from '@/components/X'` |
| `from '@components/X'` | `from '@/components/X'` |
| `from '@/shared/lib/utils'` | `from '@/lib/utils'` |
| `from '@shared/lib/utils'` | `from '@/lib/utils'` |
| `from '@/shared/lib/get-strict-context'` | `from '@/lib/get-strict-context'` |
| `from '@shared/lib/get-strict-context'` | `from '@/lib/get-strict-context'` |
| `from '@/shared/lib/hooks/X'` | `from '@/lib/hooks/X'` |
| `from '@shared/lib/hooks/X'` | `from '@/lib/hooks/X'` |
| `from '../lib/hooks/X'` | `from '@/lib/hooks/X'` |
| `from '@/shared/lib/format'` (hash-text) | `from '@/lib/format'` (ellipsis만 사용) |
| `from '@shared/lib/pagination/type/pagination-types'` (Paginations) | `from '@/lib/pagination-types'` |

## 추가된 의존성

### runtime (`dependencies`)

```
@base-ui/react              ^1.5.0   (canonical Base UI)
class-variance-authority    ^0.7.1
clsx                        ^2.1.1
cmdk                        ^1.1.1
date-fns                    ^4.1.0
embla-carousel-react        ^8.6.0
input-otp                   ^1.4.2
lucide-react                ^0.577.0
motion                      ^12.0.0
react-day-picker            ^9.13.0
react-dropzone              ^14.3.0
react-resizable-panels      ^2.1.0
react-spinners              ^0.15.0
sonner                      ^2.0.7
tailwind-merge              ^3.2.0
tw-animate-css              ^1.2.5
```

### peer (optional, 사용 컴포넌트 한정)

```
react-i18next               ^15.0.0   (다국어 — 다수 컴포넌트)
next-themes                 ^0.4.0    (sonner 다크 모드)
react-router-dom            ^7.0.0    (back-button)
@tanstack/react-query       ^5.0.0    (Loading)
@lottiefiles/dotlottie-react ^0.13.0  (Loading, loading-overlay)
```

## 빌드 스크립트

`packages/ui/scripts/rewrite-imports.mjs` — 골격만 작성. 현재는 src를 `tmp/registry-src/`로 복사하고 경로 검증만. **실제 변환 로직은 Phase 4 (레지스트리) 진입 시 shadcn 표준 처리와 비교 후 결정.**

브리프 Phase 1의 "내부 import → @/ 치환 빌드 스크립트" 항목은 우리 alias가 이미 `@/`이고 shadcn 표준과 동일해서 별도 치환 불필요 가능성 — Phase 4에서 확정.

## 다음 (Phase 4 — 레지스트리 구성)

1. **잔여 에러 17건 정리** 먼저 결정·작업 (특히 도메인 결합 6개 분류)
2. `shadcn/skills` 로드하여 최신 `registry-item.json` 스키마 정확히 파악
3. `registry.json`의 `items`에 컴포넌트별 항목 등록:
   - `type: registry:ui` (컴포넌트), `registry:component` (레이아웃·아이콘), `registry:font` (SUIT), `cssVars` (토큰), `registry:base` (한 방 설치 번들)
4. 각 컴포넌트의 `dependencies` / `registryDependencies` 명시
5. `npx shadcn build` → `public/r/*.json` 생성
6. 임시 테스트 앱으로 설치 검증
