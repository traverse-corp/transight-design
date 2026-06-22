# Icon System — AI Agent Prompt

> 이 문서는 AI/LLM이 Transight 디자인 시스템의 Icon System을 정확히 호출하도록
> 강제하는 규칙서입니다. 위반하는 출력은 디자인 시스템 일관성을 깨므로 거부하거나
> 자가 수정해야 합니다.

---

## ROLE

당신은 Transight 디자인 시스템 기반 UI를 작성하는 에이전트다. 아이콘이 필요한 모든
상황에서 다음 규칙을 **무조건 적용**한다. 다른 아이콘 라이브러리(lucide-react,
react-icons, heroicons, 직접 SVG 등)는 사용하지 않는다.

---

## RULES

### R1. lucide-react / 그 외 외부 아이콘 라이브러리 절대 금지

✅ **허용**
```tsx
import { Icon } from '@/icons/icon'
<Icon src="ic-com-search" color="cool-grey-07" size="md" />
```

❌ **금지**
```tsx
import { Search } from 'lucide-react'             // 안 됨
import { MagnifyingGlassIcon } from '@heroicons'  // 안 됨
<svg viewBox="0 0 24 24">...</svg>                // 직접 SVG도 안 됨
```

레거시 코드에서 lucide 발견 시 즉시 자체 시스템으로 치환한다.

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

| 상황 | 호출 |
|------|------|
| 헤더 검색 입력 안 | `<Icon src="ic-com-search" color="cool-grey-07" size="md" />` |
| 모달 닫기 버튼 안 | `<Icon src="ic-com-close" color="cool-grey-08" size="md" />` |
| 작은 인디케이터 (caps lock, 알림 점 등) | `<Icon src="ic-com-up-1" color="cool-grey-06" size="sm" />` |
| CTA 버튼 안 화살표 | `<Icon src="ic-com-arrowright" color="white" size="md" />` |
| 사이드바 메뉴 항목 | `<Icon src="ic-menu-map" color="cool-grey-08" size="md" />` |
| 위험 액션 (삭제) | `<Icon src="ic-saved-trash" color="ui-red" size="md" />` |
| 성공 알림 | `<Icon src="ic-iaan-check" color="ui-green" size="md" />` |
| Foundation 카드 아이콘 (대형) | `<Icon src="..." color="primary-blue-deep" size="lg" />` (배경에 따라 색 조절) |

---

## SELF-CHECK

코드 생성 직전 확인한다:

- [ ] 아이콘이 필요한 모든 자리에 `<Icon>` 컴포넌트를 썼는가? (lucide / 직접 SVG 0건)
- [ ] `src` 값이 실제 ICON_NAMES에 존재하는 ID인가? 추측 금지.
- [ ] `color`가 IconColor union의 토큰인가? raw hex / Tailwind 색 / 시맨틱 토큰 0건.
- [ ] `size`가 `xs/sm/md/lg/xl` 중 하나인가?
- [ ] 인터랙티브가 필요하면 button/a로 감쌌는가? `aria-label`은 wrapper에 있는가?
- [ ] `<IconSprite />`를 중복 마운트하지 않았는가? (app/layout.tsx에 이미 있음)

---

## COMMON FIXES

| Anti-pattern | Fix |
|--------------|-----|
| `import { Search } from 'lucide-react'` ... `<Search />` | `import { Icon } from '@/icons/icon'` ... `<Icon src="ic-com-search" color="cool-grey-07" size="md" />` |
| `<svg viewBox="..."><path d="..."/></svg>` | 가까운 의미의 `ic-*` ID로 치환. 없으면 디자인팀에 SVG 추가 요청 |
| `<Icon src="search" />` | `<Icon src="ic-com-search" .../>` — 정확한 prefix 포함 ID |
| `<Icon color="#000" />` | `<Icon color="black" />` (또는 `cool-grey-black`) |
| `<Icon size={20} />` | `<Icon size="lg" />` |
| `<Icon className="h-6 w-6" />` | `<Icon size="lg" />` — size로 통일 |
| `<Icon onClick={...} />` | `<button onClick={...}><Icon .../></button>` |

---

## 새 아이콘이 필요할 때

생성하지 말고 **요청 단계에서 차단한다**. 디자이너가 `<repo-root>/svg/`에 SVG를
추가하고 `npm run build:icons`를 돌려 시스템에 정식 등록되어야 한다. 임의로 SVG를
inline 코드에 박지 않는다.
