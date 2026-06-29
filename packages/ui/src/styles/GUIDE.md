# Styles — 가이드

Transight 디자인 시스템의 **기반 스타일 레이어**. SUIT 폰트 + Tailwind v4 토큰 +
타이포 프리셋 + flex 유틸리티가 하나의 진입점 `styles`(`index.css`)로 묶여 있다.

---

## 구성

| 파일 | 역할 |
|------|------|
| `index.css` | 진입점. 아래 5종을 순서대로 `@import` |
| `fonts.css` | SUIT / Pretendard Variable 폰트 페이스 등록 (외부 CDN) |
| `tokens.css` | 원시 색상 토큰 (`--color-*`) — Tailwind v4 `@theme` |
| `theme.css` | 시맨틱 매핑 / Base UI 변수 / 다크 모드 등 |
| `typography.css` | `typo-*` 굵기 프리셋 + `text-*` 시맨틱 프리셋 |
| `flex.css` | `flex-{justify}-{align}` / `flex-between-center` 등 정렬 유틸 |

진입점 하나만 import하면 5종이 함께 들어온다. 개별 import는 권장하지 않는다.

---

## 설치

### Transight CLI
```bash
npx @transight-design/cli add styles
```

### shadcn
```bash
npx shadcn@latest add traverse-corp/transight-design/styles
```

설치 후 사용자 프로젝트의 진입 CSS에 import:

```css
/* Vite — src/index.css */
@import "./styles/index.css";

/* Next.js App Router — app/globals.css */
@import "../src/styles/index.css";
```

---

## 토큰 시스템 (`tokens.css`)

### 색상 팔레트

| 그룹 | 토큰 | 용도 |
|------|------|------|
| **Cool Grey** | `cool-grey-white`, `cool-grey-01`~`11`, `cool-grey-black` | 기본 회색 13단. UI 베이스 |
| **Primary Blue** | `primary-blue-1`, `primary-blue-2`, `primary-blue-deep` | 주 액션 / 강조 (알파는 `/10`, `/20` 등 modifier로) |
| **Primary Skyblue** | `primary-skyblue-1`, `primary-skyblue-2` | 보조 강조 / 배경 |
| **UI** | `ui-{red\|orange\|yellow\|olive\|green\|skyblue\|blue\|purple\|pink\|amber}` | 상태/카테고리 (3단계: `text` / 기본 / `pale`) |

사용 예:
```tsx
// Tailwind utility
<div className="bg-primary-blue-1 text-cool-grey-white">

// CSS var (Tailwind 클래스로 못 푸는 동적 값)
<div style={{ background: 'var(--color-primary-blue-1)' }}>
```

### 폰트 family (`typography.css`의 `@theme`)

| 토큰 | Tailwind | 용도 |
|---|---|---|
| `--font-sans` | `font-sans` | 본문/UI 기본 — SUIT Variable (CDN) |
| `--font-pretendard` | `font-pretendard` | SUIT 자매 family — 디스플레이/약관/광고 톤 차별 |
| `--font-mono` | `font-mono` | 코드/표값/hex (`typo-mono-{w}{s}` 프리셋에 묶임) |

전역 default는 `font-sans` (SUIT). 다른 family가 필요한 영역에서만 `font-pretendard` / `font-mono`를 명시.

### 시맨틱 매핑 (`theme.css`)

`tokens.css`의 raw 값은 직접 의미를 갖지 않는다. `theme.css`가 다음 두 종류의
시맨틱 변수를 정의한다. 컴포넌트/페이지 코드는 시맨틱을 통해 색을 받아야
라이트/다크 전환이 자동.

| 카테고리 | 토큰 |
|---|---|
| Foreground (텍스트 위계) | `fg-strong` / `fg-default` / `fg-muted` / `fg-disabled` / `fg-inverse` |
| Surface (배경 위계) | `bg-page` / `bg-card` / `bg-subtle` / `bg-muted` / `bg-inverse` |
| Border 3단 | `border-default` / `border-subtle` / `border-strong` |
| 상태/상호작용 | `ring-focus` / `overlay-backdrop` / `hover-bg` / `active-bg` |
| Shadow 3단 | `shadow-card` / `shadow-popover` / `shadow-dialog` |
| Gradient | `gradient-cta` / `gradient-deep` / `gradient-fade-dark` / `gradient-glow` |
| shadcn 호환 alias | `background` / `foreground` / `card` / `border` / `ring` 등 |

알파가 필요하면 색 토큰에 modifier로 (`bg-primary-blue-1/10`, `text-fg-default/60`).

### 추가 utility (`theme.css`)

| 클래스 | 용도 |
|---|---|
| `hide-scrollbar` | 스크롤바 완전 숨김 (가로 캐러셀 등) |
| `custom-scrollbar` | 얇고 은은한 커스텀 스크롤바 |

`prefers-reduced-motion: reduce` 사용자에게는 transition/animation이 자동으로 0에
가깝게 축소된다 (`@layer base`에서 글로벌 적용).

---

## 타이포그래피 (`typography.css`)

### 굵기 × 사이즈 프리셋

네이밍: `typo-{weight}{size}`
- weight: `r`(400) / `m`(500) / `sb`(600) / `b`(700) / `eb`(800)
- size: 폰트 크기 (px)

| 클래스 | 의미 |
|--------|------|
| `typo-r12` | Regular 12px |
| `typo-m14` | Medium 14px (본문 기본) |
| `typo-sb14` | Semibold 14px (라벨/버튼) |
| `typo-b16` | Bold 16px |
| `typo-eb32` | ExtraBold 32px (헤딩) |
| `typo-eb54` | ExtraBold 54px (히어로) |
| `typo-mono-m12` | 모노스페이스 Medium 12px |

49개 utility를 제공. 자세한 목록은 `typography.css`의 `@utility` 정의 참고.

### 시맨틱 프리셋

| 클래스 | 용도 |
|--------|------|
| `text-page-title` | 페이지 최상단 H1 |
| `text-section-title` | 섹션 헤더 H2 |
| `text-label` | 폼 라벨, 작은 헤딩 |
| `text-body` | 본문 |
| `text-subtitle` | 부제 |
| `text-description` | 보조 설명 (cool-grey-07 톤) |
| `text-overline` | 상단 카테고리 라벨 (uppercase, 작은 글씨) |

시맨틱 프리셋은 적절한 색상 톤까지 포함한다. 가능하면 `typo-*` 대신 `text-*` 우선.

---

## Flex 유틸리티 (`flex.css`)

네이밍: `flex-{justify}-{align}` (간결한 단축형)

| 클래스 | 풀이 |
|--------|------|
| `flex-start` | `flex items-start justify-start` |
| `flex-center` | `flex items-center justify-center` |
| `flex-end` | `flex items-end justify-end` |
| `flex-col-center` | `flex flex-col items-center justify-center` |
| `flex-start-center` | `flex items-center justify-start` |
| `flex-between-center` | `flex items-center justify-between` |
| `flex-end-center` | `flex items-center justify-end` |

전체 목록은 `flex.css`의 `@layer utilities` 블록 참고.

---

## 사용 원칙

1. **inline style 금지** — 모든 스타일은 Tailwind utility로 작성. 토큰 값이 동적일
   때만 `style={{ color: 'var(--color-...)' }}` 같은 형태 허용.
2. **임의 hex/rgb 금지** — 색은 반드시 토큰 이름으로. `#155dfc` 같은 raw 값을 직접
   쓰면 다크 모드 / 리브랜딩에 깨진다.
3. **typo-* 우선, 의미가 더 명확하면 text-*** — 본문은 `text-body`, 라벨은
   `text-label`, 작은 헤딩은 `typo-sb14`.
4. **flex-* 단축형 활용** — `flex items-center justify-between` 대신
   `flex-between-center`로 간결화.
5. **다크 모드는 시맨틱 변수가 처리** — 컴포넌트가 `bg-cool-grey-white` 같은 raw
   토큰을 직접 쓰면 다크 모드에서 잘못된 색이 나올 수 있다. Base UI / shadcn 호환
   시맨틱 변수가 있으면 그쪽을 우선.

---

## 관련 문서

- `AGENT.md` — AI/LLM이 이 스타일 시스템을 코드 생성에 적용하기 위한 규칙 모음
- 인터랙티브 미리보기: `/styles/browse/tokens`, `/styles/browse/typography`, `/styles/browse/flex`
