# Transight Design System — AI Agent 지시서

> 이 파일을 가장 먼저 읽고, 아래 규칙에 따라 코드를 작성한다.
> 사용자가 "이 파일을 읽어"라고 명령하면 끝까지 정독한 뒤 작업을 시작한다.

---

## ROLE

당신은 Transight 디자인 시스템(`@transight-design/*`)이 깔린 프로젝트에서 UI 코드를
작성·수정한다. 모든 출력은 다음 규칙을 따라야 한다. 위반은 디자인 시스템 일관성을
깨므로 거부하거나 자가 수정한다.

---

## 1. CSS 진입점 import 확인

설치 직후 1회만. 진입 CSS에 다음이 들어있는지 확인하고, 없으면 추가한다.

```css
/* Vite — src/index.css */
@import "./styles/index.css";

/* Next.js App Router — app/globals.css */
@import "../src/styles/index.css";
```

이 import가 빠지면 모든 컴포넌트의 색/타이포가 깨진다. **첫 작업 시 확인 필수**.

설치된 스타일 폴더 구조 (`~/src/styles/`):

| 파일 | 역할 |
|---|---|
| `index.css` | 진입점 — 아래 5종을 모두 import |
| `tokens.css` | 색상 토큰 (cool-grey, primary-blue, ui-*) — Tailwind v4 @theme |
| `typography.css` | `typo-*` 굵기 프리셋 + `text-*` 시맨틱 프리셋 + `--font-{sans,pretendard,mono}` |
| `flex.css` | `flex-{justify}-{align}` 단축 유틸 |
| `theme.css` | 시맨틱 매핑 (라이트/다크) / Base UI 변수 |
| `fonts.css` | SUIT / Pretendard Variable 폰트 페이스 (외부 CDN, entry 최상단 로드) |

상세 규칙은 동일 위치에 함께 설치된 `~/src/styles/AGENT.md` (스타일 시스템 강제 규칙) 참고.

---

## 1.5 다크 모드 — 시맨틱 토큰 사용 (필독)

`theme.css`는 `:root` (라이트) / `.dark` (다크) 두 셀렉터에 동일한 시맨틱 변수를 정의한다.
**컴포넌트와 페이지 코드는 시맨틱 토큰만 써야** 라이트/다크가 자동으로 스왑된다.
raw 회색 스케일(`bg-cool-grey-*`, `text-white`, `bg-white`)은 라이트 값에 박혀 다크에서 깨진다.

### 시맨틱 토큰 카테고리

| 카테고리 | 토큰 |
|---|---|
| Foreground (텍스트 위계 5단) | `text-fg-strong` / `text-fg-default` / `text-fg-muted` / `text-fg-disabled` / `text-fg-inverse` |
| Surface (배경 위계 5단) | `bg-bg-page` / `bg-bg-card` / `bg-bg-subtle` / `bg-bg-muted` / `bg-bg-inverse` |
| Border 3단 | `border-border-default` / `border-border-subtle` / `border-border-strong` |
| 상태/상호작용 | `ring-ring-focus` / `bg-overlay-backdrop` / `bg-hover-bg` / `bg-active-bg` |
| Shadow 3단 | `shadow-card` / `shadow-popover` / `shadow-dialog` |
| Gradient | `bg-gradient-cta` / `bg-gradient-deep` / `bg-gradient-fade-dark` / `bg-gradient-glow` |
| shadcn 호환 alias | `bg-background` / `text-foreground` / `bg-card` / `border-border` / `ring-ring` 등 |

브랜드/스테이터스 토큰(`text-primary-blue-1`, `bg-ui-red`, `border-ui-green`, …)은 라이트/다크
의미가 같으므로 **그대로 사용 OK**.

### raw → 시맨틱 매핑

| raw (금지) | 시맨틱 (사용) |
|---|---|
| `text-cool-grey-11` | `text-fg-strong` |
| `text-cool-grey-09` | `text-fg-default` |
| `text-cool-grey-07` | `text-fg-muted` |
| `text-cool-grey-05` | `text-fg-disabled` |
| `text-white` (다크 표면 위 영구) | `text-fg-inverse` |
| `bg-white` (페이지) | `bg-bg-page` |
| `bg-white` (카드/팝업) | `bg-bg-card` |
| `bg-cool-grey-01` / `02` | `bg-bg-subtle` / `bg-bg-muted` |
| `bg-cool-grey-11` (어두운 표면) | `bg-bg-inverse` |
| `border-cool-grey-04` | `border-border-default` |
| `border-cool-grey-03` | `border-border-subtle` |
| `border-cool-grey-06+` | `border-border-strong` |

**alpha modulation 예외 (다크 표면 한정)**: `text-white/N`, `border-white/N`, `bg-black/N` 처럼 alpha가
명시된 경우는 **항상 어두운 표면 위에 올라가는 요소에 한해서만** 허용.
라이트 모드를 지원하는 페이지에서는 라이트 흰 배경 위 `text-white/60`은 거의 안 보이므로
시맨틱(`text-fg-default` / `text-fg-muted` / `text-fg-disabled`)으로 치환한다.
허용 예: 비디오/이미지 오버레이, 어두운 배너, sidebar 내부 보조 텍스트.

### `text-fg-inverse`의 의미와 한계 ⚠️

`text-fg-inverse`는 **"현재 표면의 반전"** 이다 — 라이트에서 흰, 다크에서 검정.
따라서 **항상 어두운 표면 위에 영구적으로 흰 텍스트가 필요한 경우** (비디오/이미지 위 자막,
브랜드 그라데이션 위 CTA 라벨 등)에는 `fg-inverse`를 쓰면 다크에서 검정으로 뒤집혀 깨진다.
이때만 **brand-exception**으로 raw `text-white`를 쓰되 한 줄 위 코멘트로 사유 명시:

```tsx
{/* eslint-disable-next-line ds/no-raw-color -- always-dark-surface: video overlay */}
<span className="text-white">2024 Q4 Recap</span>
```

### Theme-invariant 디자인 요소 (시맨틱 변환 금지)

"항상 흰 종이" 같은 시각적 metaphor — A4 mockup, 인쇄 미리보기, 명함/카드 디자인 시안 등 —
은 다크모드에서도 흰색을 유지해야 한다. 이 카테고리는 시맨틱 토큰으로 바꾸면 의미가 깨진다.
brand-exception과 동급으로 명시 코멘트와 함께 raw 색 유지:

```tsx
{/* eslint-disable-next-line ds/no-raw-color -- theme-invariant: A4 paper mockup */}
<div className="bg-white text-black shadow-lg">
  <PrintPreview />
</div>
```

### CSS / @utility / @layer 안에서도 시맨틱 var()만 (필독)

`globals.css` · `index.css` · 컴포넌트 사이드의 `.module.css` · Tailwind v4 `@utility` / `@layer`
블록 — **모든 CSS 파일 내부에서도 색은 시맨틱 변수만** 사용한다.
ESLint `no-restricted-syntax`는 JSX className만 검사하므로 CSS 파일 안 raw 색은
린트에 잡히지 않고, 라이트 모드 reveal·인쇄 등에서 글자가 사라지는 사고로 직결된다.

✅ 허용
```css
.privacy {
  color: var(--fg-default);
  background: var(--bg-card);
  border: 1px solid var(--border-default);
}

@utility text-body-2 {
  color: var(--fg-muted);
  font-size: 14px;
}
```

❌ 금지
```css
.tr-body { color: #fff; }                            /* raw hex */
.privacy-dark { color: rgb(255 255 255 / 0.8); }     /* raw rgb */
@utility text-body-2 { color: white; }               /* raw 키워드 */
.tr { background: #131b2d; }                         /* 라이트 모드에서 깨짐 */
```

### 테마 토글 셋업

#### Option 1 — `next-themes` (Next.js 권장)

1) `next-themes` 설치: `npm i next-themes`
2) Provider 마운트 — `<html>`에 `dark` 클래스를 토글해 `theme.css`의 `.dark` 셀렉터와 정합시킨다.

```tsx
// app/layout.tsx
import { ThemeProvider } from 'next-themes'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

토글 버튼은 `useTheme()`의 `setTheme('light' | 'dark' | 'system')`로 구현.
`<html suppressHydrationWarning>`을 빼면 hydration mismatch 경고가 뜬다.

#### Option 2 — 수동 (zustand + localStorage, next-themes 의존성 없이)

Next.js 외 환경(Vite SPA, 커스텀 SSR)·next-themes를 못 쓰는 상황·이미 zustand 스토어가 있는
프로젝트에선 직접 토글한다. **핵심은 단 하나 — `<html>`에 `dark` 클래스를 토글**하는 것
(`theme.css`의 `.dark` 셀렉터와 정합).

```ts
// stores/theme-store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark' | 'system'

interface ThemeStore {
  theme: Theme
  setTheme: (t: Theme) => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => {
        set({ theme })
        applyTheme(theme)
      }
    }),
    { name: 'theme' }
  )
)

const applyTheme = (theme: Theme) => {
  const resolved =
    theme === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : theme
  document.documentElement.classList.toggle('dark', resolved === 'dark')
}
```

```html
<!-- index.html (FOUC 방지 인라인 스크립트 — body 렌더 전 실행) -->
<script>
  (() => {
    const stored = localStorage.getItem('theme')
    const theme = stored ? JSON.parse(stored).state.theme : 'system'
    const dark =
      theme === 'dark' ||
      (theme === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    if (dark) document.documentElement.classList.add('dark')
  })()
</script>
```

SSR이라면 서버 측에서 쿠키/세션의 테마를 읽어 `<html className="dark">`로 prerender한다.
이 인라인 스크립트는 FOUC(light→dark 깜박임) 방지에 필수.

---

## 1.6 타이포 — `typo-{w}{s}[-{family}]` 강제 (HARD RULE)

**모든 텍스트는 `typo-{weight}{size}[-{family}]` 합성 클래스 하나로만 표현한다.**
Tailwind의 `text-sm`, `font-bold`, `text-[14px]`, `leading-*`, `font-semibold` 같은
원시 클래스로 굵기/크기/line-height를 따로 지정하는 것은 **전면 금지**.

### 형식

`typo-{weight}{size}[-{family}]` — 9 weight × 15 size × 3 family.

| 굵기 약자 | 값 |
|---|---|
| `t` | 100 thin |
| `el` | 200 extralight |
| `l` | 300 light |
| `r` | 400 regular |
| `m` | 500 medium |
| `sb` | 600 semibold |
| `b` | 700 bold |
| `eb` | 800 extrabold |
| `bk` | 900 black |

크기 그리드: `8 / 9 / 10 / 11 / 12 / 13 / 14 / 15 / 16` (1px 간격), `18`, `24 / 32 / 40 / 48 / 56` (8px 간격).
**그리드 밖 임의 숫자 금지** (`typo-m17`, `typo-r25` 같은 건 클래스가 존재하지 않음).

Family suffix: family 생략 시 default **Sans (SUIT)**. 톤 차별이 필요한 영역에선 suffix로 전환.

| 클래스 | family |
|---|---|
| `typo-m14` | Sans (SUIT) — default |
| `typo-m14-pretendard` | Pretendard (자매 family — 약관/디스플레이) |
| `typo-r12-mono` | Mono Regular (코드/표값) |
| `typo-b14-mono` | Mono Bold (letter-spacing -0.005em 자동) |
| `typo-m12-mono` | **특수** — Mono Medium 12px + line-height 150% (가독성 보정) |

**Mono weight 제한** — 시스템 모노 폰트(SF Mono / Menlo / Consolas / ui-monospace)는 실효 weight가 Regular(400)와 Bold(700) 두 개뿐. 풀이 `r/b` 2 weight × 15 size로 한정됨 (+ 특수 `typo-m12-mono` 1개). Mono에 `typo-sb14-mono`, `typo-eb24-mono` 같은 클래스 박지 말 것 — 시스템 폰트가 fake-bold 합성하거나 무시해서 디자인 의도가 안 살아남.

레거시 `typo-mono-{w}{s}` (prefix 형태)는 한 사이클 alias로 유지되지만 신규 코드는 `typo-{w}{s}-mono` (suffix)로.

같은 페이지 안에 family를 섞으면 톤이 흐려지니 디자인 의도가 명확할 때만 사용.

### 색·톤은 별도 클래스로

typo와 색은 항상 두 클래스로 명시한다. (구 `text-page-title` / `text-body` /
`text-label` 등 시맨틱 12종은 제거됨 — typo + 시맨틱 색 두 클래스로 풀어쓸 것.)

| 용도 | 클래스 조합 |
|---|---|
| 페이지 제목 | `typo-eb32 text-fg-strong` |
| 섹션 제목 | `typo-b24 text-fg-strong` |
| 서브타이틀 | `typo-m14 text-fg-default` |
| 본문 | `typo-m13 text-fg-default` |
| 폼 라벨 | `typo-sb14 text-fg-strong` |
| 보조 설명 / 캡션 | `typo-r12 text-fg-muted` |
| 오버라인 | `typo-sb9 text-fg-muted` + 필요 시 `uppercase tracking-wide` |
| 에러 | `typo-sb14 text-ui-red` |
| 링크 | `typo-m14 text-primary-blue-1` |

`text-on-dark`(라이트/다크 무관 영구 흰)만 별도 utility로 남음 — brand-exception 용도.

### ❌ 금지 예시

```tsx
<p className="text-sm font-semibold">…</p>          // ❌ Tailwind 원시
<p className="text-[14px] leading-5">…</p>          // ❌ 임의 픽셀
<p className="typo-14 font-semibold">…</p>          // ❌ 분리 표기
<p className="typo-m17">…</p>                       // ❌ 그리드 밖
<p style={{ fontSize: '14px', fontWeight: 600 }}>   // ❌ inline 고정
```

### ✅ 올바른 예시

```tsx
<h2 className="typo-b24 text-fg-strong">섹션 제목</h2>
<p className="typo-m13 text-fg-default">본문 문장.</p>
<span className="typo-sb14 text-fg-default">강조 14 semibold</span>
<code className="typo-m12-mono text-fg-default">code</code>
<p className="typo-m14-pretendard text-fg-default">약관/디스플레이 본문.</p>
```

---

## 1.7 레이아웃 — flex + gap 강제 (HARD RULE)

**모든 정렬은 flexbox로**, **요소 간 간격은 `margin`이 아니라 `gap`으로** 제어한다.
이는 다음 두 가지를 동시에 강제한다:

1. 정렬에 `block` + `margin: auto`, `display: inline-block`, `float`, `position: absolute(트릭용)` 같은 우회 금지
2. 자식 사이 간격에 `space-x-*`, `space-y-*`, `mt-*`, `ml-*` 같은 margin 누적 금지 — **무조건 부모의 `gap-*`**

### 정렬은 flex 단축 유틸 우선

`flex.css`에 미리 정의된 `flex-{justify}-{align}` 단축 클래스를 사용한다.

| 자주 쓰는 조합 | 클래스 |
|---|---|
| 좌우 split, 세로 중앙 | `flex-between-center` |
| 가로/세로 모두 중앙 | `flex-center` |
| 왼쪽 정렬, 세로 중앙 | `flex-start-center` |
| 오른쪽 정렬, 세로 중앙 | `flex-end-center` |
| 세로 방향, 가로 중앙 | `flex-col-center` |
| 세로 방향, 왼쪽 정렬 | `flex-col-start` |

`flex.css`에 없는 조합만 `flex items-* justify-*`로 풀어쓴다.

### 간격은 항상 `gap-*`

```tsx
// ✅ 올바름 — 부모의 gap 한 줄
<div className="flex-start-center gap-2">
  <Icon src="ic-info" />
  <span className="text-body">설명</span>
</div>

<div className="flex flex-col gap-4">
  <Card />
  <Card />
  <Card />
</div>
```

### ❌ 금지 예시

```tsx
// ❌ space-x / space-y — gap으로
<div className="flex space-x-2">…</div>

// ❌ 자식마다 mt/ml/mr — 부모의 gap으로
<div className="flex flex-col">
  <Card />
  <Card className="mt-4" />
  <Card className="mt-4" />
</div>

// ❌ block + margin auto — flex-center로
<div className="block">
  <div className="mx-auto w-fit">…</div>
</div>

// ❌ inline-block 정렬 트릭 — flex로
<span className="inline-block align-middle">…</span>
```

### `margin` 허용 케이스 (예외)

다음에만 `margin`을 쓴다. 그 외엔 전부 `gap`.

- **컴포넌트 외부와의 간격** (섹션 사이 간격 등 — 부모 컨테이너의 gap으로 표현 불가능할 때)
- **auto margin으로 의미상 한 쪽 끝으로 밀어야 할 때** — 예: flex 자식 중 하나에 `ml-auto`로 right-align
- 그 외 자식 간 누적 간격은 절대 margin 금지

---

## 2. 컴포넌트 사용 — 임포트 경로

설치된 컴포넌트는 카테고리별로 분리되어 떨어진다.

```tsx
// shadcn base 컴포넌트
import { Button } from '@/components/base/button'
import { Badge } from '@/components/base/badge'
import { Input } from '@/components/base/input'
import { Dialog, DialogPopup, DialogTitle } from '@/components/base/dialog'

// traverse 자체 추가 (custom)
import { ClickableTx } from '@/components/custom/clickable-tx'

// 아이콘 시스템 (디렉토리가 따로 분리됨)
import { Icon } from '@/icons/icon'
import { IconSprite } from '@/icons/sprite.gen' // 앱 루트에 1회 마운트
```

**경로 규칙**:
- 임의로 다른 경로 가정 금지 (`@/lib/components/...` 등 ❌). 위 네 import 경로(`@/components/base/*` / `@/components/custom/*` / `@/icons/icon` / `@/icons/sprite.gen`)만 사용.
- 컴포넌트가 어디로 깔렸는지 모르면 `npx @transight-design/cli list`로 확인하거나, 사용자에게 어느 카테고리인지 묻는다.

---

## 3. 모든 컴포넌트의 3가지 prop 카테고리 (STYLE / VARIANT / PROPS)

디자인 시스템 전 컴포넌트는 다음 세 그룹을 따른다.

### A. STYLE props — 시각 4축

| prop | 의미 | 값 |
|---|---|---|
| `color` | 색상 | `gray` / `blue` / `red` / `orange` / `yellow` / `olive` / `green` / `skyblue` / `purple` / `pink` / `amber` / `white` / `gradient-blue` / `gradient-blue-deep` |
| `theme` | 배색 (solid/outline/soft) | `solid` / `outline` / `soft` |
| `shape` | 모서리 형태 | `default` / `pill` / `square` (일부) / `circle` (일부) |
| `size` | 크기 단계 | `xs` / `sm` / `md` / `lg` / `xl` |

**원칙**:
- 색·모양·크기 변경은 **반드시 prop으로**. Tailwind 직접 클래스로 색을 박지 않는다.
- raw hex (`#155dfc`, `text-[#000]`), Tailwind 기본 팔레트 (`text-blue-500`, `bg-gray-200`) **금지**.
- raw 회색 스케일 (`bg-cool-grey-*`, `text-white` / `bg-white` (alpha 없는), `bg-black`) **금지** — 다크모드 깨짐. §1.5의 시맨틱 토큰 사용.
- 컴포넌트가 가진 축은 컴포넌트마다 다름. 없는 prop을 주면 무시되거나 컴파일 에러.

✅ 좋은 예
```tsx
<Button color="red" theme="soft" shape="pill" size="sm">취소</Button>
<Input shape="pill" size="lg" />
<Checkbox color="green" size="md" />
```

❌ 나쁜 예
```tsx
<Button className="bg-red-500 text-white px-3">취소</Button>   // raw Tailwind
<Button color="#ff0000">취소</Button>                          // raw hex
<Input shape="rounded">                                        // 존재하지 않는 값
```

### B. VARIANT — Style 조합 preset

자주 쓰는 Style 조합에 이름을 붙여둔 preset.

```tsx
<Button variant="destructive">삭제</Button>    // color=red
<Button variant="success">완료</Button>        // color=green + theme=soft
<Badge variant="vasp">VASP</Badge>             // 도메인 특화 preset
```

**정책**:
- variant 구성 요소는 Style 4축(color / theme / shape / size)만. **4축 외 임의
  className / 다른 props 추가 금지**.
- 미명시한 축은 cva default로 자동 매핑. 굳이 4개를 다 적을 필요 없음.
- 명시한 Style prop이 **항상 variant preset을 덮어쓴다**.
  ```tsx
  <Button variant="destructive" theme="outline">  // color=red(preset) + theme=outline(명시)
  ```
- 새 variant 추가는 **CLI 명령**으로 (AI 종류 무관, 자동 등록):
  ```bash
  npx @transight-design/cli variant add --component=button --name=my-brand --color=blue --theme=soft
  ```
  CLI가 `~/src/components/{base|custom}/<X>.tsx`의 `<X>VariantPresets` 객체에
  한 줄 (`'my-brand': { color: 'blue', theme: 'soft' }`)을 자동 삽입.
  TypeScript의 variant union이 자동 확장됨.
- 사용자가 카탈로그 사이트에서 Style 토글 → "Variant 추가" 버튼으로 생성된
  CLI 명령을 받으면, 당신은 그 명령을 그대로 실행하면 됨.

### C. PROPS — 그 외 컴포넌트 본질 prop

`color`/`theme`/`shape`/`size`/`variant` 외 prop들. 컴포넌트마다 상이.

| 컴포넌트 | 대표 PROPS |
|---|---|
| Input | `decorator` / `decoDir` / `onDecoratorClick` / `capsLockIndicator` |
| Select | `decorator` |
| Textarea | `maxLength` (자동 counter) |
| Label | `requiredText` / `optionalText` |
| Checkbox/Radio | `checked` / `onCheckedChange` / `indeterminate` |
| Switch | `checked` / `onCheckedChange` |
| Dialog | `from` (등장 방향) |
| Tooltip | `side` / `align` / `sideOffset` |
| 모든 입력 | `aria-invalid` (자동 빨간 border) |

#### ⚠️ Checkbox / Radio / Switch 함정 — `onChange` 안 동작

native `onChange`는 **무시된다**. 반드시 `onCheckedChange`(boolean)를 쓴다.
react-hook-form 등에서 받은 `register()` 객체를 그대로 펴면 onChange가 핸들러로 들어가서
값이 form state에 반영되지 않는 무음 실패가 발생한다. 마이그레이션 중 가장 자주 빠지는 함정.

```tsx
// ❌ 동작 안 함
<Checkbox onChange={(e) => setAgreed(e.target.checked)} />

// ✅ 올바름
<Checkbox checked={agreed} onCheckedChange={setAgreed} />

// ✅ react-hook-form
<Controller
  control={control}
  name="agreed"
  render={({ field }) => (
    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
  )}
/>
```

#### ⚠️ DialogPopup API 함정

`DialogPopup`은 **내부에서 `DialogPortal` + `DialogBackdrop`을 자동 마운트**한다.
호출자가 `Portal` 또는 `Backdrop`을 명시적으로 wrap하면 **이중 마운트**가 일어나 backdrop이
2겹으로 깔리거나 z-index 충돌이 생긴다.

```tsx
// ❌ 중복
<Dialog>
  <DialogPortal>
    <DialogBackdrop />
    <DialogPopup>…</DialogPopup>
  </DialogPortal>
</Dialog>

// ✅ DialogPopup만
<Dialog>
  <DialogTrigger asChild>…</DialogTrigger>
  <DialogPopup size="md">…</DialogPopup>
</Dialog>
```

폭은 `size="sm|md|lg|xl|full"` preset만 지원한다. 디자인이 임의 px을 요구할 때만
`className="sm:max-w-[Xpx]"` (Tailwind responsive prefix 필요 — base가 default size에
풀려있어서 prefix 없이 덮으면 작은 화면에서 깨질 수 있음)로 override:

```tsx
<DialogPopup size="md" className="sm:max-w-[520px]">…</DialogPopup>
```

---

## 4. 컴포넌트별 축 차이 — 빠르게 참고

같은 prop 이름이라도 컴포넌트마다 일부 축이 없을 수 있다.

| 컴포넌트 | color | theme | shape | size | variant |
|---|---|---|---|---|---|
| Button | ✓ | ✓ | ✓ | ✓ | ✓ |
| Badge | ✓ | ✓ | ✓ | ✓ | ✓ |
| Input |  |  | ✓ | ✓ | ✓ |
| Textarea |  |  | ✓ | ✓ |  |
| Label |  |  |  | ✓ | ✓ |
| Checkbox | ✓ |  | ✓ | ✓ |  |
| RadioGroup | ✓ |  | ✓ | ✓ |  |
| Switch | ✓ |  | ✓ | ✓ |  |
| Select | ✓ | ✓ | ✓ | ✓ |  |
| Separator |  |  |  |  |  (별도 축: tone/thickness/orientation) |
| Skeleton |  |  |  |  | ✓ (variant: rect/text/circle, animation) |
| Spinner | ✓ |  |  | ✓ |  |
| Tooltip | ✓ | ✓ |  | ✓ |  (TooltipContent에 적용) |
| Dialog |  |  | ✓ | ✓ |  (DialogPopup에 적용) |

---

## 5. Icon 사용 — 두 시스템 역할 분리

### 자체 Icon — 도메인 / 브랜드 시그니처
traverse 서비스 특화 아이콘 (예: `ic-trace-bridge`, `ic-menu-txmap`, `ic-iaan-*`).
```tsx
import { Icon } from '@/icons/icon'

<Icon src="ic-trace-bridge" color="primary-blue-1" size="md" />
```

규칙:
- `src`는 ICON_NAMES union의 키만 (오타·없는 ID는 컴파일 에러)
- `color`는 IconColor union의 토큰만 (raw hex / Tailwind 색 / 시맨틱 토큰 금지)
- `size`는 `xs/sm/md/lg/xl` (12/14/16/20/24 px)
- 인터랙티브 필요 시 button/a로 감쌈
- `<IconSprite />`는 app/layout.tsx에 단 한 번만 마운트

### lucide-react — 범용 UI 보조
chevron / close (x) / check / arrow / 일반 검색 돋보기 등 어디서든 같은 의미.
```tsx
import { ChevronDown, X, Check, Search } from 'lucide-react'

<ChevronDown className="h-4 w-4 text-fg-muted" />  // 색은 시맨틱 토큰 (다크 자동 스왑)
```

**금지**: heroicons / react-icons / 직접 inline SVG. 자체 Icon 또는 lucide 둘 중 하나만.

상세 규칙: `~/src/icons/AGENT.md` (Icon System 강제 규칙) 참고.

---

## 6. SELF-CHECK — 코드 생성 직전 매번 확인

- [ ] CSS 진입점(`@import "./styles/index.css"`) 들어가 있는가?
- [ ] 임포트 경로가 `@/components/base/*` / `@/components/custom/*` / `@/icons/*` 중 하나인가?
- [ ] 색 변경에 raw hex / Tailwind 기본 팔레트(`text-blue-500`)를 쓰지 않았는가?
- [ ] 회색/배경/테두리에 raw 스케일(`bg-cool-grey-*`, `bg-white`, `text-white`)이 아닌 시맨틱 토큰(`bg-bg-card`, `text-fg-default`, `border-border-default` …)을 썼는가? (다크모드 호환)
- [ ] **CSS / `@utility` / `@layer` 블록 안에서도 색이 `var(--fg-*)` / `var(--bg-*)` / `var(--border-*)` 시맨틱 변수인가?** (raw hex / `rgb()` / `white` / `#fff` 금지 — ESLint 못 잡음)
- [ ] alpha-white(`text-white/N` 등)를 라이트 표면 위에 깔지 않았는가? (다크 표면 한정)
- [ ] 항상 어두운 표면 위 영구 흰 텍스트라면 `fg-inverse`가 아닌 `text-white` + brand-exception 코멘트인가?
- [ ] 다크모드를 쓰는 앱이면 `<html>`에 `dark` 클래스 토글이 셋업돼 있는가? (`next-themes`의 `ThemeProvider attribute="class"` 또는 zustand 수동 토글)
- [ ] Dialog는 `DialogPopup`만 쓰고 `DialogPortal`/`DialogBackdrop`을 명시 wrap하지 않았는가?
- [ ] Checkbox/Radio/Switch에 `onChange`가 아니라 `onCheckedChange`를 썼는가?
- [ ] **모든 텍스트가 `typo-{w}{s}` 또는 `text-*` 시맨틱 프리셋인가?** (`text-sm`, `font-bold`, `text-[14px]`, `leading-*` 같은 Tailwind 원시 금지)
- [ ] **모든 정렬이 flex(`flex-*-*` 단축 우선)이고, 자식 간 간격이 `gap-*`인가?** (`space-x-*`, `space-y-*`, 자식의 `mt-*`/`ml-*` 누적 금지)
- [ ] Style prop이 컴포넌트가 실제로 지원하는 축인가?
- [ ] 새 variant가 필요하면 `<component>VariantPresets` 객체에 한 줄 추가했는가?
- [ ] Icon이 도메인 시그니처면 `<Icon>`, 범용 UI면 `lucide-react`를 썼는가?
- [ ] `<IconSprite />`를 중복 마운트하지 않았는가?

위 16개 중 하나라도 실패하면 출력을 수정한 뒤 다시 self-check.

---

## 7. 추가 / 업데이트

- 새 컴포넌트 설치: `npx @transight-design/cli add <name>`
- Essential 번들 설치: `npx @transight-design/cli add essential`
- 카탈로그(미리보기 + Props docs): https://github.com/traverse-corp/transight-design

레지스트리는 GitHub 메인을 따라가므로 새 컴포넌트·variant는 사용자가 다시 `add`만 호출하면 즉시 반영된다. (이미 설치된 파일은 `--overwrite`로 갱신)

---

문제 / 모호한 케이스는 사용자에게 묻는다. 디자인 시스템에 없는 색·아이콘·variant를 임의로 만들어내지 않는다.
