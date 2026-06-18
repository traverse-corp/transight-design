# Phase 0 인벤토리 — transight-v2 감사 결과

> 출처 레포: `C:\Users\송경후\traverse\1-Services\transight-v2`
> 추출 시점: 2026-06-18
> 이 문서는 Phase 2 (토큰 레이어) 및 Phase 3 (컴포넌트 정규화)의 **유일한 원본 값** 소스다. 임의 생성 금지.

---

## 1. 출처 레포 구조

- 패키지 매니저: **npm** (단일 패키지, 모노레포 아님)
- 빌드: Vite 7 + React 19 + TypeScript 5
- 디렉토리: FSD (`app / pages / widgets / features / entities / shared`)
- 토큰·컴포넌트 위치:
  - `src/index.css` — shadcn 시맨틱 별칭, 다크 모드 변수, 그래디언트·shadow 유틸
  - `src/styles/transight-ds.css` — Cool Grey / Primary / UI 9색 / 타이포 프리셋 / Flex 유틸
  - `src/shared/components/*.tsx` — 70개 컴포넌트 (base / custom 혼재)

## 2. 확정 결정사항 (사용자 승인)

| 항목 | 결정 |
|---|---|
| 새 레포 위치 | `C:\Users\송경후\traverse\1-Services\transight-design` |
| 레포·네임스페이스 | `transight-design` (브리프의 `@acme` 치환) |
| UI 프리미티브 | **Base UI** (`@base-ui/react`) 단일화 |
| 색상 표기 | **hex 유지** (oklch 변환 안 함) — Figma와 정합성 |
| 다크 모드 | **지원 필수** |
| 아이콘 | 별도 파일로 추후 전달 받음 (현재 인벤토리 보류) |
| Folder.jsx / Grainient.jsx | 디자인 시스템에서 **제외** (도메인 장식) |

## 3. 컴포넌트 분류

### 3.1 base (shadcn 표준 — 41개)

shadcn/ui 원본 컨벤션을 따르며 Base UI 프리미티브 기반:

accordion, alert, alert-dialog, avatar, badge, button, calendar, card, carousel, checkbox, command, dialog, dropdown-menu, empty, field, hover-card, icon, input, input-group, input-otp, label, pagination, popover, preview-card, radio-group, resizable, scroll-area, select, separator, sheet, sidebar, skeleton, sonner, spinner, switch, table, tabs, textarea, toggle, toggle-group, tooltip

### 3.2 custom (PascalCase 자체 제작 — 27개)

기존 base에 없거나 자체 확장한 컴포넌트:

AlertDialog, AnimatedAccordion, AnimatedAlertDialog, AnimatedCheckbox, AnimatedPreviewCard, CoinIcon, CopyButton, CopyWrapper, DatePicker, Dropzone, Inputbar, Loading, NoItem, Paginations, RadioButton, SearchBar, Stepper, SuspenseFallback, TimePicker, animated-beam, back-button, clickable-addr, clickable-tx, date-time-input, hash-text, loading-overlay, shine-border

### 3.3 제외

Folder.jsx, Grainient.jsx (장식용 SVG / WebGL — 도메인 한정)

### 3.4 Phase 0에서 통합 완료

- `copy-button.tsx` + `CopyButton.tsx` → **CopyButton.tsx** (named export `{ CopyButton }`)
- `Stepper.tsx` (구버전) + `stepper2.tsx` → **Stepper.tsx**

## 4. UI 프리미티브 의존성 — ⚠️ 정규화 필요

**정정 (2026-06-18, npm 설치 시 확인):** `@base-ui-components/react`는 **deprecated**되었고 다시 `@base-ui/react`로 패키지명이 환원됨. 따라서 transight-v2의 혼용 상태는 "구→신 이행 중"이 아니라 "환원 직전 상태"였고, **단일화 대상은 `@base-ui/react`** (현재 `^1.5.0`).

| 패키지 | 상태 | transight-v2 사용 |
|---|---|---|
| `@base-ui/react` | ✅ **canonical** (단일화 대상) | Avatar, Button, Input, Menu, Popover, Radio, ScrollArea, Select, Separator, Tabs, Toggle, Tooltip, useRender, mergeProps |
| `@base-ui-components/react` | ❌ deprecated (제거 대상) | Accordion, AlertDialog, Checkbox, Dialog, PreviewCard |

**Phase 3 작업**: 위 5개 컴포넌트(Accordion, AlertDialog, Checkbox, Dialog, PreviewCard)의 import를 `@base-ui-components/react/*` → `@base-ui/react/*`로 일괄 치환.

**Radix는 사용하지 않음.**

## 5. 토큰 — 실제 추출 값

### 5.1 Cool Grey (13단)

```css
--color-cool-grey-white: #ffffff;
--color-cool-grey-01:    #fbfcfe;
--color-cool-grey-02:    #f8f9fd;
--color-cool-grey-03:    #f3f4f8;
--color-cool-grey-04:    #e4e7ee;
--color-cool-grey-05:    #cfd3de;
--color-cool-grey-06:    #969faf;
--color-cool-grey-07:    #6d7588;
--color-cool-grey-08:    #4e566a;
--color-cool-grey-09:    #30384b;
--color-cool-grey-10:    #212a3b;
--color-cool-grey-11:    #131b2d;
--color-cool-grey-black: #000000;
```

### 5.2 Primary

```css
--color-primary-blue-1:    #155dfc;
--color-primary-blue-2:    #3545d6;
--color-primary-blue-opacity-10: rgb(21 109 252 / 0.1);
--color-primary-blue-opacity-20: rgb(21 109 252 / 0.2);

--color-primary-skyblue-1: #d4e1ff;
--color-primary-skyblue-2: #88adff;
--color-primary-blue2-opacity-20: rgb(136 173 255 / 0.2);
```

### 5.3 UI 색상 (9색 × 3단계: text / base / pale)

| 색 | text | base | pale |
|---|---|---|---|
| Red     | `#cf443d` | `#ff5148` | `#ffe7e5` |
| Orange  | `#ce8038` | `#ff9d42` | `#fff1e4` |
| Yellow  | `#caa00c` | `#f8c50a` | `#fef9e6` |
| Olive   | `#8ead27` | `#b3cf57` | `#f3f7e4` |
| Green   | `#209d59` | `#24c06d` | `#eafbf1` |
| Skyblue | `#128e8d` | `#42a1ff` | `#e3f6ff` |
| Blue    | `#396ad7` | `#286bff` | `#e7efff` |
| Purple  | `#8951d0` | `#a761ff` | `#f2e5ff` |
| Pink    | `#bd5dbf` | `#ea6feb` | `#faecfb` |

### 5.4 Glass / Sidebar / Trace

```css
--color-glass-white:        rgba(255, 255, 255, 0.1);
--color-glass-border:       rgba(255, 255, 255, 0.05);
--color-sidebar-button-bg:  #88adff;

/* Trace 시각화 별칭 (Cool Grey 매핑) */
--color-trace-node-root:   var(--color-cool-grey-11);
--color-trace-node-normal: var(--color-cool-grey-06);
--color-trace-edge-base:   var(--color-cool-grey-02);
--color-trace-edge-flow:   var(--color-cool-grey-05);
--color-trace-edge-arrow:  var(--color-cool-grey-06);
--color-trace-label:       var(--color-cool-grey-08);
```

### 5.5 그래디언트

```css
--image-primary-blue-gradient-1:    linear-gradient(to right, #155dfc, #3545d6);
--image-primary-blue-gradient-2:    linear-gradient(to right, #155dfc, #0d3796);
--image-primary-skyblue-gradient-1: linear-gradient(to right, #d4e1ff, #88adff);
--image-ui-sidebar-gradient:        linear-gradient(to right, #d4e1ff, #88adff);
```

**복합 배경 (utility)**
- `bg-auth-premium`: `#0b0e14` 베이스 + `linear-gradient(135deg, #0f172a 0%, #0b0e14 100%)` + radial 2종 (`rgba(21,93,252,.1)`, `rgba(53,69,214,.1)`)
- `glass-card-true`: `linear-gradient(135deg, rgba(255,255,255,.08), rgba(255,255,255,.02))` + `backdrop-filter: blur(24px) saturate(150%)` + border `rgba(255,255,255,.12)` + 다층 shadow

### 5.6 그림자

```css
/* @theme 등록 */
--shadow-primary: 0 4px 15px 0 #e8ecf4;

/* utility class (Phase 2에서 @theme 정식 등록 권장) */
.search-bar-shadow  { box-shadow: 0 0 6px 2px rgba(122, 137, 196, 0.2); }
.input-shadow       { box-shadow: 0 2px 6px 2px rgba(122, 137, 196, 0.1); }
.shadow-hover       { box-shadow: 0 6px 15px 0 rgba(50, 64, 119, 0.5); }
```

### 5.7 Radius

```css
--radius:    0.625rem;       /* = 10px */
--radius-sm: calc(var(--radius) - 4px);  /* 6px */
--radius-md: calc(var(--radius) - 2px);  /* 8px */
--radius-lg: var(--radius);              /* 10px */
--radius-xl: calc(var(--radius) + 4px);  /* 14px */
```

### 5.8 브레이크포인트 (Tailwind 기본 오버라이드)

```css
--breakpoint-md: 1550px;
--breakpoint-lg: 1660px;
```

## 6. 시맨틱 토큰 매핑

### 6.1 라이트 모드 (`:root`)

| 시맨틱 | 원시 |
|---|---|
| `--background` | `--color-cool-grey-white` |
| `--foreground` | `--color-cool-grey-11` |
| `--card` / `--popover` | `--color-cool-grey-white` |
| `--card-foreground` / `--popover-foreground` | `--color-cool-grey-11` |
| `--primary` / `--ring` | `--color-primary-blue-1` |
| `--primary-foreground` | `--color-cool-grey-white` |
| `--secondary` / `--muted` / `--accent` | `--color-cool-grey-03` |
| `--secondary-foreground` / `--accent-foreground` | `--color-cool-grey-09` |
| `--muted-foreground` | `--color-cool-grey-07` |
| `--destructive` | `--color-ui-red` |
| `--border` / `--input` | `--color-cool-grey-04` |
| `--chart-1..5` | red, green, blue, yellow, orange |
| `--sidebar` | `--color-cool-grey-11` |
| `--sidebar-foreground` / `--sidebar-primary-foreground` / `--sidebar-accent-foreground` | `--color-cool-grey-white` |
| `--sidebar-primary` | `--color-primary-blue-1` |
| `--sidebar-accent` | `--color-sidebar-button-bg` |
| `--sidebar-border` | `rgba(255, 255, 255, 0.1)` |
| `--sidebar-ring` | `--color-cool-grey-08` |

### 6.2 다크 모드 (`.dark`)

| 시맨틱 | 원시 |
|---|---|
| `--background` | `--color-cool-grey-11` |
| `--foreground` | `--color-cool-grey-white` |
| `--card` / `--popover` | `--color-cool-grey-10` |
| `--card-foreground` / `--popover-foreground` | `--color-cool-grey-white` |
| `--primary` / `--primary-foreground` | `--color-primary-blue-1` / `--color-cool-grey-white` |
| `--secondary` / `--muted` / `--accent` | `--color-cool-grey-09` |
| `--secondary-foreground` / `--accent-foreground` | `--color-cool-grey-white` |
| `--muted-foreground` | `--color-cool-grey-06` |
| `--destructive` | `--color-ui-red` |
| `--border` | `rgba(255, 255, 255, 0.1)` |
| `--input` | `rgba(255, 255, 255, 0.15)` |
| `--ring` | `--color-cool-grey-08` |
| `--chart-1..5` | primary-blue, green, orange, purple, red |
| `--sidebar` 계열 | 라이트와 동일 |

## 7. 타이포그래피

### 7.1 폰트 패밀리

```
'SUIT Variable', SUIT,
-apple-system, BlinkMacSystemFont, system-ui,
Roboto, 'Helvetica Neue', 'Segoe UI',
'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic',
'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
sans-serif
```

- 로드: `https://cdn.jsdelivr.net/gh/sunn-us/SUIT/fonts/variable/woff2/SUIT-Variable.css`
- 적용: `:root`, `pre`, `.toaster`

**모노스페이스 스택**
```
ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace
```

### 7.2 사이즈 토큰 (11단)

| 토큰 | px |
|---|---|
| `--text-4xs` | 8 |
| `--text-3xs` | 9 |
| `--text-2xs` | 10 |
| `--text-xs` | 12 |
| `--text-md` | 13 |
| `--text-sm` | 14 |
| `--text-base` | 16 |
| `--text-lg` | 18 |
| `--text-xl` | 24 |
| `--text-2xl` | 32 |
| `--text-3xl` | 54 |

### 7.3 굵기별 프리셋 (~38개)

네이밍: `typo-{weight}{size}` (r=400, m=500, sb=600, b=700, eb=800)

- **Regular (400)**: typo-r8, r9, r10, r11, r12
- **Medium (500)**: typo-m10, m11, m12, m13, m14, m16, m18
- **Semibold (600)**: typo-sb9, sb10, sb11, sb12, sb13, sb14, sb16, sb18
- **Bold (700)**: typo-b14, b16, b18, b24
- **ExtraBold (800)**: typo-eb14, eb32, eb54
- **Monospace**: typo-mono-r10, mono-r11, mono-m12, mono-m14, mono-b14
- **Variant**: typo-sb16-tight, typo-sb10-wider, typo-r12-relaxed, typo-m14-relaxed

기본 line-height: 150~160%, letter-spacing: 0 (일부 -0.005em / 0.02em / 0.05em).

### 7.4 시맨틱 프리셋 (13개)

| 프리셋 | 베이스 |
|---|---|
| `text-page-title` | `typo-eb32 text-cool-grey-11` |
| `text-section-title` | `typo-b24 text-cool-grey-11` |
| `text-modal-title` | `typo-b18 text-cool-grey-10` |
| `text-label` | `typo-sb14 text-cool-grey-11` |
| `text-body` | `typo-m13 text-cool-grey-09` |
| `text-subtitle` | `typo-m14 text-cool-grey-09` |
| `text-caption` | `typo-r12 text-cool-grey-09` |
| `text-description` | `typo-r12 text-cool-grey-07` |
| `text-overline` | `typo-sb9 text-cool-grey-07` |
| `text-disabled` | `typo-r12 text-cool-grey-04` |
| `text-error` | `typo-sb14 text-ui-red` |
| `text-link` | `typo-m14 text-primary-blue-1` |
| `text-on-dark` | `#ffffff` 고정 |

## 8. Flex 유틸리티

`flex-{direction}-{justify}-{align}` 네이밍, 총 31개:

- 단순: `flex-start / center / end`, `flex-col-start / center / end`
- 행: `flex-{start|center|end|around|between}-{start|center|end}` (15개)
- 열: `flex-col-{start|center|end|around|between}-{start|center|end}` (15개)

## 9. 아이콘 (보류)

- 현재 사용: lucide-react 약 **90종** + 자체 JSX 11개 (`CalendarEndIcon`, `CloseIcon`, `DownloadIcon`, `EditIcon`, `MapFitIcon`, `PlusIcon`, `RedoIcon`, `SaveIcon`, `SettingIcon`, `TooltipIcon`, `UndoIcon`)
- 도메인 SVG: 866개 (네트워크 로고 등 — 디자인 시스템 범위 밖)
- **확정 아이콘 셋은 사용자가 별도 파일로 전달 예정.** Phase 2/3에서 받아 반영.

## 10. 의존성 (현 transight-v2 기준)

```
@base-ui/react            ^1.5.0        ← canonical (단일화 대상)
@base-ui-components/react ^1.0.0-rc.0   ← deprecated (제거 예정)
class-variance-authority  ^0.7.1
cmdk                      ^1.1.1
date-fns                  ^4.1.0
embla-carousel-react      ^8.6.0
input-otp                 ^1.4.2
lucide-react              ^0.577.0
next-themes               ^0.4.6
react-day-picker          ^9.13.0
recharts                  ^2.15.2
sonner                    ^2.0.7
tailwind-merge            ^3.2.0
tailwindcss               ^4.1.3
tw-animate-css            ^1.2.5
@tailwindcss/vite         ^4.1.3
prettier-plugin-tailwindcss ^0.6.11
```

## 11. Phase 2 → Phase 3 전달 사항 (체크리스트)

- [ ] `@theme` 블록에 위 5절의 모든 hex 값 그대로 박기 (oklch 변환 금지)
- [ ] `.dark` 시맨틱 매핑 6.2 표 그대로 반영
- [ ] shadow 4종 모두 `@theme`의 `--shadow-*`로 정식 등록 (`primary`, `search-bar`, `input`, `hover`)
- [ ] gradient 4종을 `@theme`의 `--image-*`로 등록 + `@utility bg-gradient-*` 래퍼
- [ ] 복합 배경(`bg-auth-premium`, `glass-card-true`) — Phase 3에서 base 컴포넌트 안에 흡수할지 별도 유틸로 둘지 결정
- [ ] SUIT Variable 폰트 → `registry:font` 항목으로 (CDN URL 보존)
- [ ] Base UI: `@base-ui/react`로 단일화. `@base-ui-components/react/*` import 5개 컴포넌트(Accordion, AlertDialog, Checkbox, Dialog, PreviewCard)를 일괄 치환
- [ ] `Folder.jsx`, `Grainient.jsx`는 마이그레이션 대상에서 제외
- [ ] 통합 컴포넌트(`CopyButton`, `Stepper`) — transight-v2에서 옮겨올 때 PascalCase 파일명 + named export 컨벤션 통일
