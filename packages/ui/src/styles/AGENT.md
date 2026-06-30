# Styles — AI Agent Prompt

> 이 문서는 AI/LLM이 컴포넌트·페이지·UI 코드를 생성할 때 Transight 디자인 시스템의
> 스타일 레이어를 정확히 따르도록 강제하는 규칙서입니다. 이 규칙을 어기는 출력은
> 디자인 시스템 일관성을 깨므로 거부하거나 자가 수정해야 합니다.

---

## ROLE

당신은 Transight 디자인 시스템 기반 코드를 작성하는 에이전트다. 다음 규칙을
**모든 출력에 적용**한다.

---

## RULES

### R1. 색상은 시맨틱 토큰으로만 표현한다 (라이트/다크 모드 대응)

✅ **허용 (시맨틱)** — `theme.css`의 시맨틱 토큰. 라이트/다크 자동 스왑.
- **Foreground**: `text-fg-strong` / `text-fg-default` / `text-fg-muted` / `text-fg-disabled` / `text-fg-inverse`
- **Surface**: `bg-bg-page` / `bg-bg-card` / `bg-bg-subtle` / `bg-bg-muted` / `bg-bg-inverse`
- **Border**: `border-border-default` / `border-border-subtle` / `border-border-strong`
- **상태/상호작용**: `ring-ring-focus`, `bg-overlay-backdrop`, `bg-hover-bg`, `bg-active-bg`
- **Shadow**: `shadow-card` / `shadow-popover` / `shadow-dialog`
- **Gradient**: `bg-gradient-cta` / `bg-gradient-deep` / `bg-gradient-fade-dark` / `bg-gradient-glow`
- **shadcn 호환 alias**: `bg-background` / `text-foreground` / `bg-card` / `border-border` 등 (기존 코드 호환)

✅ **허용 (브랜드/스테이터스 토큰)** — 의미가 라이트/다크 동일한 색
- `text-primary-blue-1`, `bg-ui-red`, `border-ui-green`, `bg-primary-skyblue-1` …

✅ **허용 (alpha modulation 예외)** — 다크 표면 위 trick
- `text-white/N`, `border-white/N`, `bg-black/N` — alpha가 명시된 modulation만 OK

❌ **금지**
- **raw cool-grey 스케일**: `bg-cool-grey-02`, `text-cool-grey-09`, `border-cool-grey-04` — 모두 시맨틱으로 치환 (라이트값에 박혀 다크모드 깨짐)
- **raw white/black**: `bg-white`, `text-white` (alpha 없는), `bg-black`, `text-black` — 시맨틱으로
- **raw hex**: `#155dfc`, `text-[#131b2d]`, `bg-[rgb(...)]`
- **Tailwind 기본 팔레트**: `bg-blue-500`, `text-gray-700`, `bg-grey-14` 등
- **inline style 고정 색**: `style={{ color: '#000' }}`

**매핑 가이드 (raw → semantic)**
| raw | semantic |
|---|---|
| `text-cool-grey-11` | `text-fg-strong` |
| `text-cool-grey-09` | `text-fg-default` |
| `text-cool-grey-07` | `text-fg-muted` |
| `text-cool-grey-05` | `text-fg-disabled` |
| `text-white` (다크 표면 위 영구) | `text-fg-inverse` 또는 `text-fg-strong` (다크모드 자동 흰색) |
| `bg-white` (페이지) | `bg-bg-page` |
| `bg-white` (카드/팝업) | `bg-bg-card` |
| `bg-cool-grey-01/02` | `bg-bg-subtle` / `bg-bg-muted` |
| `bg-cool-grey-11`/`bg-grey-14` (어두운 표면) | `bg-bg-inverse` 또는 그대로 (sidebar류) |
| `border-cool-grey-04` | `border-border-default` |
| `border-cool-grey-03` | `border-border-subtle` |
| `border-cool-grey-06+` | `border-border-strong` |

### R2. 타이포는 typo-{w}{s}[-{family}] 단일 클래스만 사용한다

✅ **허용**
- 합성 유틸: `typo-{w}{s}[-{family}]` 형태로만. 9 weight × 15 size × 3 family 전 조합 지원.
  - 굵기 약자: `t`(100) / `el`(200) / `l`(300) / `r`(400) / `m`(500) / `sb`(600) / `b`(700) / `eb`(800) / `bk`(900)
  - 크기 그리드: 8/9/10/11/12/13/14/15/16 (1px), 18, 24/32/40/48/56 (8px)
  - family: 생략 시 **Sans (SUIT)** default. `-pretendard` / `-mono` suffix로 family 전환.
  - 예: `typo-sb14`, `typo-eb32`, `typo-m14-pretendard`, `typo-r12-mono`, `typo-m12-mono`(특수 보정), `typo-b14-mono`
- **Mono는 weight가 r/b만 실효** (시스템 모노 폰트 제한). `typo-sb14-mono` / `typo-eb24-mono` 같은 조합은 fake-bold 합성되거나 무시되니 박지 말 것. 가독성 보정이 들어간 `typo-m12-mono`(line-height 150%) 한 개만 예외.
- 색은 별도 시맨틱 색 클래스로 (`text-fg-strong` / `text-fg-default` / `text-fg-muted` / `text-ui-red` 등). typo와 색은 두 클래스로 명시.

❌ **금지**
- 굵기/크기 분리: `typo-14 font-semibold` (단일 합성 클래스 사용)
- Tailwind 원시 클래스: `text-sm`, `text-base`, `font-bold`, `text-[14px]`
- 그리드 밖 임의 크기 (예: `typo-m17`, `typo-r25`)
- 옛 시맨틱 프리셋(`text-page-title` / `text-body` / `text-label` 등 12종) — 제거됨. typo + 색 두 클래스로 풀어쓸 것.
- 옛 mono prefix(`typo-mono-{w}{s}`) — 한 사이클 alias로 동작은 하지만 신규 코드는 suffix(`typo-{w}{s}-mono`) 사용.

### R3. 정렬은 flex-* 단축형 우선

✅ **선호**
```tsx
<div className="flex-between-center">…</div>
<div className="flex-col-center gap-4">…</div>
<div className="flex-start-center gap-2">…</div>
```

`flex items-center justify-between`처럼 풀어쓰는 것보다 단축형이 일관됨.
단, `flex.css`에 없는 조합은 풀어써도 된다.

### R4. inline style은 동적 값에만

✅ **허용**
- 토큰을 런타임에 선택: `style={{ background: 'var(--color-${token})' }}`
- 차트/그라데이션 등 Tailwind 클래스로 못 표현하는 케이스

❌ **금지**
- 고정 값: `style={{ padding: '12px' }}` → `className="p-3"`
- 색상 raw: `style={{ color: '#155dfc' }}` → `className="text-primary-blue-1"`

### R5. 시맨틱 변수가 있으면 그쪽 우선

다크 모드 호환을 위해 `theme.css`의 시맨틱 변수(`--background`, `--foreground`,
`--border`, `--ring` 등)가 우선. 컴포넌트 단에서 `bg-cool-grey-white`를 직접 박지
말고, Base UI / shadcn 호환 시맨틱 클래스(`bg-background` 등)가 있으면 그걸 쓴다.

### R6. 토큰을 새로 만들지 않는다

새 색·새 타이포가 필요하면 **요청 단계에서 확인하라**. 임의로 raw hex나 새 utility를
만들지 않는다. 디자인 시스템에 없는 값은 디자인 회의로 가야 한다.

---

## DECISION TABLE

| 상황 | 코드 |
|------|------|
| 메인 본문 텍스트 | `<p className="typo-m13 text-fg-default">` |
| 작은 보조 설명 | `<p className="typo-r12 text-fg-muted">` |
| 섹션 헤더 | `<h2 className="typo-b24 text-fg-strong">` |
| 페이지 제목 | `<h1 className="typo-eb32 text-fg-strong">` |
| 폼 라벨 | `<label className="typo-sb14 text-fg-strong">` |
| 코드 스니펫 | `<code className="typo-m12-mono text-fg-default">` |
| 약관/디스플레이 본문 | `<p className="typo-m14-pretendard text-fg-default">` |
| 임의 크기·굵기 조합 | `<span className="typo-l15 text-fg-default">` |
| 페이지 배경 | `bg-bg-page` |
| 카드/팝업/dialog 배경 | `bg-bg-card` |
| 더 옅은 면 (stripe 등) | `bg-bg-subtle` |
| hover/소프트 강조 배경 | `bg-bg-muted` 또는 `hover:bg-hover-bg` |
| 어두운 표면 (sidebar, tooltip) | `bg-bg-inverse text-fg-inverse` |
| 카드 테두리 (기본) | `border border-border-default` |
| 옅은 테두리 (구분선) | `border border-border-subtle` |
| 강조 테두리 | `border border-border-strong` |
| 위험 액션 | `text-ui-red`, `bg-ui-red`, `border-ui-red` |
| 성공 액션 | `text-ui-green`, `bg-ui-pale-green` |
| 주 액션 (CTA) | `bg-primary-blue-1 text-fg-inverse` |
| 포커스 링 | `ring-2 ring-ring-focus` |
| 그림자 (카드/팝업/dialog) | `shadow-card` / `shadow-popover` / `shadow-dialog` |
| 좌우 split 정렬 | `flex-between-center` |
| 가운데 정렬 | `flex-center` |
| 세로 중앙 | `flex-col-center` |

---

## SELF-CHECK

코드 생성 직전 다음을 확인한다:

- [ ] 회색/배경/테두리에 raw 스케일(`bg-cool-grey-*`, `bg-white`, `text-white`)이 아닌 시맨틱 토큰(`bg-bg-card`, `text-fg-default`, `border-border-default` …)을 썼는가?
- [ ] 브랜드/스테이터스 토큰(`text-primary-blue-1`, `bg-ui-red` …)으로만 색을 표현했는가? (Tailwind 기본 팔레트·raw hex 없음)
- [ ] 모든 텍스트에 `typo-*` 또는 `text-*` 프리셋이 적용됐는가?
- [ ] inline `style` 사용처가 동적 값으로 정당화되는가?
- [ ] `flex items-center justify-between` 같이 풀어쓴 게 `flex-between-center`로 대체 가능한가?

위 5개 중 하나라도 실패하면 출력을 수정한 뒤 다시 self-check.

---

## COMMON FIXES

| Anti-pattern | Fix |
|--------------|-----|
| `text-sm text-gray-600` | `typo-m13 text-fg-muted` |
| `text-xs font-semibold uppercase` | `typo-sb9 text-fg-muted uppercase tracking-wide` |
| `text-2xl font-bold` | `typo-b24 text-fg-strong` |
| `bg-white border border-gray-200` | `bg-bg-card border border-border-default` |
| `text-cool-grey-09` | `text-fg-default` |
| `text-cool-grey-11` | `text-fg-strong` |
| `text-cool-grey-07` | `text-fg-muted` |
| `border-cool-grey-04` | `border-border-default` |
| `bg-cool-grey-02` | `bg-bg-muted` |
| `text-red-500` | `text-ui-red` |
| `bg-blue-50 text-blue-700` | `bg-primary-blue-1/10 text-primary-blue-1` |
| `flex items-center justify-center` | `flex-center` |
| `style={{ color: '#131b2d' }}` | `className="text-fg-strong"` |
