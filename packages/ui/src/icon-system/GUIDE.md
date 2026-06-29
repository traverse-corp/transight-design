# Icon System — 가이드

자체 58개 SVG를 빌드 타임에 단일 sprite로 합치고, `src`/`color`/`size`/`className`
4개 prop만 받는 순수 표출용 `<Icon>` 컴포넌트로 노출한다.

---

## 설계 원칙

- **strict typing** — `src` / `color` / `size`는 모두 union 타입. 토큰 외 값은 컴파일 에러.
- **palette token만 허용** — `color`는 `tokens.css`의 cool-grey / primary / accent / ui 토큰
  union. 시맨틱 토큰(`background`, `foreground` 등) 안 받음.
- **고정 크기** — `xs/sm/md/lg/xl` = 12/14/16/20/24 px. 임의 px 안 받음.
- **decorative only** — 항상 `aria-hidden="true"`. `onClick` 등 인터랙티브 prop
  없음. 클릭 가능한 아이콘이 필요하면 `<button>` 또는 `<a>`로 감싼다.
- **sprite 1회 마운트** — 모든 `<Icon>`은 `<IconSprite />`의 `<symbol>`을 참조.
  앱 루트에 한 번만 마운트.

---

## 파일

| 파일 | 종류 | 역할 |
|------|------|------|
| `icon.tsx` | 소스 | `<Icon>` 컴포넌트 + `IconColor`/`IconSize` 타입 + `resolveIconColorToken` helper |
| `sprite.gen.tsx` | 생성 | `<IconSprite />` — 앱 루트에 한 번 마운트 |
| `icons.gen.ts` | 생성 | `IconName` union + `ICON_NAMES` const array |

원본 SVG는 `<repo-root>/svg/`. 빌드 스크립트가 fill/stroke 정규화, ID 충돌 방지,
viewBox/fill 보존을 처리한다. `*.gen.*`은 절대 손대지 않는다.

---

## 설치

### Transight CLI
```bash
npx @transight-design/cli add icon
```

### shadcn
```bash
npx shadcn@latest add traverse-corp/transight-design/icon
```

`icon` 단독 설치 시 `styles`만 prerequisite으로 동반된다. 다른 컴포넌트는 깔리지 않는다.

---

## 사용 (3단계)

### 1. sprite 빌드 (개발 환경 진입 전 1회)
`predev` / `prebuild` 훅에 자동 연결돼 있다. 수동으로 돌리려면:
```bash
node packages/ui/scripts/build-icons.mjs   # 또는 npm run build:icons
```

### 2. 앱 루트에 `<IconSprite />` 마운트

```tsx
// app/layout.tsx (Next.js)
import { IconSprite } from '@/icons/sprite.gen'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <IconSprite />
        {children}
      </body>
    </html>
  )
}
```

마운트 안 하면 모든 `<Icon>`이 빈 svg를 그린다.

### 3. 컴포넌트 사용

```tsx
import { Icon } from '@/icons/icon'

<Icon src="ic-com-search" color="cool-grey-07" size="md" />
```

---

## API

```ts
interface IconProps {
  src: IconName         // ICON_NAMES union — 58개 ID 중 하나
  color?: IconColor     // 팔레트 토큰 union (기본 'cool-grey-06')
  size?: IconSize       // 'xs' | 'sm' | 'md' | 'lg' | 'xl' (기본 'md')
  className?: string    // Tailwind class — 추가 스타일 (위치/마진 등)
}
```

### `IconColor`

cool-grey 13단 + primary-blue 5 + ui 10 + ui-text 10 = 총 38색.
`white` / `black`은 `cool-grey-white` / `cool-grey-black`의 짧은 별칭.
`accent-amber`는 `ui-amber`로 이전됨 (한 사이클 호환 alias로 유지, `@deprecated`).

```ts
type IconColor =
  | 'white' | 'cool-grey-01' | ... | 'cool-grey-11' | 'black'
  | 'primary-blue-1' | 'primary-blue-2' | 'primary-blue-deep'
  | 'primary-skyblue-1' | 'primary-skyblue-2'
  | 'ui-red' | 'ui-orange' | ... | 'ui-pink' | 'ui-amber'
  | 'ui-text-red' | ... | 'ui-text-pink' | 'ui-text-amber'
  | 'accent-amber'   // @deprecated — ui-amber 사용
```

### `IconSize`

| size | px |
|------|-----|
| `xs` | 12 |
| `sm` | 14 |
| `md` | 16 (기본) |
| `lg` | 20 |
| `xl` | 24 |

### `resolveIconColorToken(color)`

별칭(`white`/`black`)을 실제 토큰 이름(`cool-grey-white`/`cool-grey-black`)으로
풀어주는 헬퍼. swatch / preview 등 외부에서 같은 매핑이 필요할 때 사용.

```ts
import { resolveIconColorToken } from '@/icons/icon'

const cssVar = `var(--color-${resolveIconColorToken(color)})`
```

---

## 아이콘 카탈로그

전체 58개 SVG. 인터랙티브 미리보기와 코드 스니펫 복사는 `/icon-system/browse`에서.

ID 그룹별 prefix:
- `ic-com-*` — common (화살표, 닫기, 검색, 설정 등)
- `ic-com-*-1` — `-1` 접미사는 stroke-only(linear) 버전, 접미사 없는 쪽은 fill-only(solid)
- `ic-iaan-*` — IAAN(자체 액션) — check, edit, upload
- `ic-map-*` — 지도 / 데이터 관련
- `ic-menu-*` — 사이드바 / 네비 메뉴
- `ic-report-*`, `ic-saved-*` — 도메인 특화
- `bell`, `folder`, `share`, `mail-forward-1` — 단순 명사

---

## 인터랙티브 아이콘이 필요할 때

`<Icon>`은 decorative 전용. 클릭/포커스/링이 필요하면 button으로 감싼다.

```tsx
<button
  type="button"
  onClick={...}
  className="hover:bg-cool-grey-02 rounded-md p-2 transition-colors"
  aria-label="검색"
>
  <Icon src="ic-com-search" color="cool-grey-08" size="md" />
</button>
```

`aria-label`을 button에 두면 `<Icon>`의 `aria-hidden`은 그대로 유지돼 보조 기술이
중복 발음하지 않는다.

---

## 디버깅

| 증상 | 원인 / 해결 |
|------|------|
| Icon이 빈 svg로 보임 | `<IconSprite />` 미마운트. 루트 레이아웃 확인 |
| `src` 자동완성 안 됨 / 컴파일 에러 | `sprite.gen.tsx`, `icons.gen.ts` 미생성. `npm run build:icons` |
| color="white"인데 검게 보임 | 옛 빌드 결과. `npm run build:icons` 재실행 (루트 `fill="none"` 보존 fix 적용본) |
| 다른 아이콘과 색 충돌 | sprite ID 충돌 검사 — `build-icons.mjs`에 자동 충돌 감지가 있어 안전 |

---

## 관련 문서

- `AGENT.md` — AI/LLM이 Icon System을 정확히 호출하기 위한 규칙
- 카탈로그: `/icon-system/browse`
- 설치 가이드 페이지: `/icon-system`
