# Icon System — AI Agent Prompt

> 이 문서는 AI/LLM이 Transight 디자인 시스템의 Icon System을 정확히 호출하도록
> 강제하는 규칙서입니다. 위반하는 출력은 디자인 시스템 일관성을 깨므로 거부하거나
> 자가 수정해야 합니다.

---

## ROLE

당신은 Transight 디자인 시스템 기반 UI를 작성하는 에이전트다. 아이콘이 필요할 때는
**자체 `<Icon>`과 `lucide-react`를 역할에 따라 분리해서** 사용한다. 두 시스템을
섞어쓰는 게 아니라 **어느 카테고리의 아이콘인지로 선택**한다.

---

## RULES

### R1. 자체 Icon vs lucide 선택 기준

| 카테고리 | 시스템 | 예시 |
|---|---|---|
| **도메인 / 브랜드 / 디자이너 시그니처** | 자체 `<Icon>` | `ic-trace-bridge`, `ic-menu-txmap`, `ic-iaan-crime-type` 등 — traverse 서비스에 특화된 의미를 가진 아이콘 |
| **범용 UI 액션 / 인디케이터** | `lucide-react` | chevron / close (x) / check / search 돋보기 / arrow / 외부링크 / 햄버거 / dot 등 어디서든 같은 의미 |

**판단 기준**: "이 아이콘이 traverse 서비스 도메인 어휘인가, 아니면 일반 UI 보조인가?"
- traverse 도메인이면 → `<Icon>` (디자이너가 정한 시그니처)
- 일반 UI 보조면 → `lucide-react` (검증된 풍부한 풀)

❌ **여전히 금지**
```tsx
import { Search } from '@heroicons'    // heroicons / react-icons 등 다른 라이브러리는 안 됨
<svg viewBox="0 0 24 24">...</svg>     // 직접 inline SVG도 안 됨 (디자인 시스템에 등록되지 않은 시그니처)
```

자체 풀 또는 lucide 둘 중 하나에만 한정.

### R1-1. 자체 `<Icon>` 사용 형식

```tsx
import { Icon } from '@/icons/icon'
<Icon src="ic-trace-bridge" color="cool-grey-07" size="md" />
```

상세 규칙은 R2 ~ R6 참고.

### R1-2. lucide 사용 형식

```tsx
import { Search, ChevronDown, X, Check } from 'lucide-react'

<Search className="h-4 w-4 text-cool-grey-07" />
<ChevronDown className="h-4 w-4" />
```

lucide 아이콘은 일반 SVG component라 색은 `text-*` 토큰으로, 크기는 `h-* w-*`로
지정한다 (자체 Icon의 `color`/`size` prop과 다른 API). 색은 **반드시 토큰 클래스로
지정** — raw hex나 Tailwind 기본 팔레트(`text-gray-500`) 금지.

### R2. `src`는 ICON_NAMES union의 키만

❌ **금지**: 아이콘 이름 추측. ICON_NAMES에 없으면 컴파일 에러.

✅ **허용**: `ICON_NAMES` 또는 `/icon-system/browse`에서 확인한 실제 ID만 사용.

대표 ID:
```
ic-com-add | ic-com-close | ic-com-search | ic-com-set | ic-com-filter
ic-com-sort | ic-com-swap | ic-com-information | ic-com-copy | ic-com-download
ic-com-arrowleft | ic-com-arrowright | ic-com-arrowdown | ic-com-arrowopen
ic-com-up | ic-com-down | ic-com-left | ic-com-right
ic-com-up-1 | ic-com-down-1 | ic-com-left-1 | ic-com-right-1   ← -1 접미사 = linear(stroke)
ic-iaan-check | ic-iaan-edit | ic-iaan-upload
ic-menu-account | ic-menu-archives | ic-menu-guide | ic-menu-live
ic-menu-map | ic-menu-requests | ic-menu-translate
ic-saved-folder | ic-saved-trash | ic-saved-dots
bell | folder | share | mail-forward-1
```

**linear vs solid**:
- 접미사 없음 (`ic-com-left`) → fill 기반 굵은 솔리드
- `-1` 접미사 (`ic-com-left-1`) → stroke 기반 가는 라인

UI 톤에 맞게 선택. 일반적으로 본문/네비에는 linear(`-1`), 액션 버튼에는 solid.

### R3. `color`는 IconColor union의 토큰만

✅ **허용**
- `white`, `black` (별칭 — cool-grey-white/black로 풀림)
- `cool-grey-01` ~ `cool-grey-11`
- `primary-blue-1` / `-2` / `-deep`
- `primary-skyblue-1` / `-2`
- `accent-amber`
- `ui-{red|orange|yellow|olive|green|skyblue|blue|purple|pink}`
- `ui-text-{red|orange|...|pink}` (더 어두운 텍스트 톤)

❌ **금지**
- raw hex: `color="#000000"` (타입 에러)
- Tailwind: `color="gray-500"`, `color="blue-600"`
- 시맨틱: `color="foreground"`, `color="primary"` (시맨틱 토큰은 Icon에 안 들어옴)

기본값: `cool-grey-06`. 명시 안 하면 중간 회색.

### R4. `size`는 5단계 union만

✅ **허용**: `'xs' | 'sm' | 'md' | 'lg' | 'xl'` = 12/14/16/20/24 px

❌ **금지**
- 임의 px: `size={20}` (타입 에러)
- Tailwind h-w 오버라이드: `className="h-6 w-6"` (Icon의 size로 통일)

기본값: `md` (16px).

### R5. `<Icon>`은 decorative — 인터랙티브 prop 없음

❌ `<Icon onClick={...} />` — 타입 에러. 인터랙티브가 필요하면 button/a로 감싼다.

✅ 패턴:
```tsx
<button
  type="button"
  onClick={handleClick}
  aria-label="검색"
  className="hover:bg-cool-grey-02 rounded-md p-2 transition-colors"
>
  <Icon src="ic-com-search" color="cool-grey-08" size="md" />
</button>
```

`aria-label`은 wrapper에. `<Icon>`은 항상 `aria-hidden="true"`라 보조 기술이 중복
발음 안 한다.

### R6. `<IconSprite />`는 한 번만 마운트

페이지마다 마운트하지 않는다. 앱 루트(`app/layout.tsx`의 `<body>` 안)에 단 1회만.
이미 마운트돼 있는 프로젝트에서는 추가 마운트 코드 작성 금지.

---

## DECISION TABLE

| 상황 | 시스템 | 호출 |
|------|------|------|
| 헤더 검색 입력 안 돋보기 | lucide | `<Search className="h-4 w-4 text-cool-grey-07" />` |
| 모달 닫기 (x) 버튼 안 | lucide | `<X className="h-4 w-4" />` |
| Dropdown / Select chevron | lucide | `<ChevronDown className="h-4 w-4" />` |
| 체크 표시 (radio/checkbox) | lucide | `<Check className="h-4 w-4" />` |
| Caps Lock 등 키보드 인디케이터 | lucide | `<ArrowBigUpDash className="h-4 w-4 text-ui-orange" />` |
| 사이드바: traverse 서비스 메뉴 | **자체 Icon** | `<Icon src="ic-menu-txmap" color="cool-grey-08" size="md" />` |
| Trace / IAAN / Crime / Freeze 등 도메인 액션 | **자체 Icon** | `<Icon src="ic-iaan-freeze-request" color="primary-blue-1" size="md" />` |
| Foundation 카드 아이콘 (대형 브랜드용) | **자체 Icon** | `<Icon src="..." color="primary-blue-deep" size="lg" />` |
| CTA 버튼 안 일반 화살표 | lucide | `<ArrowRight className="h-4 w-4" />` |
| 외부 링크 표시 | lucide | `<ExternalLink className="h-3.5 w-3.5" />` |

---

## SELF-CHECK

코드 생성 직전 확인한다:

- [ ] **아이콘이 traverse 도메인 시그니처면 `<Icon>`, 범용 UI 보조면 `lucide-react`를 썼는가?** 카테고리 혼동 0건.
- [ ] heroicons / react-icons / 직접 SVG 0건.
- [ ] 자체 `<Icon>` 사용 시: `src`가 실제 ICON_NAMES에 존재하는 ID인가? 추측 금지.
- [ ] 자체 `<Icon>` 사용 시: `color`가 IconColor union의 토큰인가?
- [ ] 자체 `<Icon>` 사용 시: `size`가 `xs/sm/md/lg/xl` 중 하나인가?
- [ ] lucide 사용 시: 색이 `text-*` 토큰 클래스로 지정됐는가? (raw hex / `text-gray-*` 0건)
- [ ] 인터랙티브가 필요하면 button/a로 감쌌는가? `aria-label`은 wrapper에 있는가?
- [ ] `<IconSprite />`를 중복 마운트하지 않았는가? (app/layout.tsx에 이미 있음)

---

## COMMON FIXES

| Anti-pattern | Fix |
|--------------|-----|
| 도메인 아이콘에 lucide 씀 (예: trace bridge를 `<Bridge from lucide>`로) | 자체 `<Icon src="ic-trace-bridge" ... />` |
| 범용 chevron/close/check을 자체 sprite에 굳이 추가 | `lucide-react`에서 `ChevronDown` / `X` / `Check` 사용 |
| `<svg viewBox="..."><path d="..."/></svg>` (직접 SVG) | lucide에 있으면 lucide, 도메인이면 svg/에 등록 요청 |
| `import { Search } from '@heroicons/react'` | `lucide-react`만 허용 |
| `<Icon color="#000" />` | `<Icon color="black" />` (또는 `cool-grey-black`) |
| `<Icon size={20} />` | `<Icon size="lg" />` |
| `<Search className="h-4 w-4 text-gray-500" />` | `<Search className="h-4 w-4 text-cool-grey-07" />` (lucide도 색은 토큰만) |
| `<Icon onClick={...} />` / `<X onClick={...} />` | wrapper button으로 감쌈 |

---

## 새 아이콘이 필요할 때

**범용 UI 보조**(arrow, chevron, x, check 등)는 lucide-react에서 import. svg/에
추가 요청 불필요.

**traverse 도메인 시그니처**(서비스 메뉴, 기능 액션 등)면 디자이너가
`<repo-root>/svg/`에 SVG를 추가하고 `npm run build:icons`로 시스템에 정식 등록. 임의로
SVG를 inline 코드에 박지 않는다.
