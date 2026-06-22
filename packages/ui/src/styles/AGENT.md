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

### R1. 색상은 토큰으로만 표현한다

✅ **허용**
- Tailwind 클래스: `bg-cool-grey-02`, `text-primary-blue-1`, `border-ui-red`, …
- CSS var: `style={{ color: 'var(--color-ui-purple)' }}` (값이 런타임에 결정될 때만)

❌ **금지**
- raw hex: `#155dfc`, `text-[#131b2d]`, `bg-[rgb(...)]`
- Tailwind 기본 팔레트: `bg-blue-500`, `text-gray-700` (Transight 토큰이 아님)
- inline style로 고정 색상: `style={{ color: '#000' }}`

토큰 목록은 `tokens.css` 또는 `GUIDE.md` 참고. 모르는 색은 묻지 말고 가까운
의미를 가진 토큰을 선택한다. (예: 위험은 `ui-red`, 정보는 `primary-blue-1`)

### R2. 타이포는 typo-*/text-* 프리셋만 사용한다

✅ **허용**
- 굵기 × 크기: `typo-m14`, `typo-sb12`, `typo-eb32`, `typo-mono-m12`
- 시맨틱: `text-page-title`, `text-section-title`, `text-body`, `text-label`, `text-description`, `text-overline`, `text-subtitle`

❌ **금지**
- Tailwind 원시 조합: `text-sm font-semibold`, `text-[14px]`, `font-bold`
- 임의 크기: `text-[15px] leading-[1.4]`

**우선순위**: 의미가 명확하면 `text-*` 시맨틱 → 그 외 `typo-*` 굵기·크기.

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
| 메인 본문 텍스트 | `<p className="text-body">` |
| 작은 보조 설명 | `<p className="text-description">` |
| 섹션 헤더 | `<h2 className="text-section-title">` |
| 폼 라벨 | `<label className="text-label">` |
| 코드 스니펫 | `<code className="typo-mono-m12 text-cool-grey-09">` |
| 카드 배경 (밝음) | `bg-cool-grey-white` 또는 `bg-white` |
| 카드 배경 (옅은 회색) | `bg-cool-grey-02` |
| 카드 테두리 | `border border-cool-grey-04` |
| hover 배경 | `hover:bg-cool-grey-01` 또는 `hover:bg-primary-blue-opacity-10` |
| 위험 액션 | `text-ui-red`, `bg-ui-red`, `border-ui-red` |
| 성공 액션 | `text-ui-green`, `bg-ui-pale-green` |
| 주 액션 (CTA) | `bg-primary-blue-1 text-cool-grey-white` |
| 좌우 split 정렬 | `flex-between-center` |
| 가운데 정렬 | `flex-center` |
| 세로 중앙 | `flex-col-center` |

---

## SELF-CHECK

코드 생성 직전 다음을 확인한다:

- [ ] 모든 색이 토큰 이름으로 표현됐는가? (`bg-cool-grey-*`, `text-ui-*`, `border-primary-*`)
- [ ] 모든 텍스트에 `typo-*` 또는 `text-*` 프리셋이 적용됐는가?
- [ ] inline `style` 사용처가 동적 값으로 정당화되는가?
- [ ] Tailwind 원시 클래스(`text-blue-500`, `font-bold` 등) 누락 없는가?
- [ ] `flex items-center justify-between` 같이 풀어쓴 게 `flex-between-center`로 대체 가능한가?

위 5개 중 하나라도 실패하면 출력을 수정한 뒤 다시 self-check.

---

## COMMON FIXES

| Anti-pattern | Fix |
|--------------|-----|
| `text-sm text-gray-600` | `text-description` 또는 `typo-m13 text-cool-grey-07` |
| `text-xs font-semibold uppercase` | `text-overline` |
| `text-2xl font-bold` | `typo-eb24` 또는 `text-section-title` |
| `bg-white border border-gray-200` | `bg-white border border-cool-grey-04` |
| `text-red-500` | `text-ui-red` |
| `bg-blue-50 text-blue-700` | `bg-primary-blue-opacity-10 text-primary-blue-1` |
| `flex items-center justify-center` | `flex-center` |
| `style={{ color: '#131b2d' }}` | `className="text-cool-grey-11"` |
