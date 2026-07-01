# Transight Design System — Agent Guide

이 문서는 AI 에이전트가 이 레포에서 바로 작업하기 위한 실행 규칙입니다.
작업 전 이 파일을 먼저 읽고, 스타일/아이콘을 다루면 하위 `AGENT.md`도 함께 읽습니다.

## 1. 레포 목적

이 레포는 Traverse/Transight 제품군의 디자인 시스템입니다.
브랜드 토큰, Tailwind v4 스타일, 아이콘 시스템, React 컴포넌트, shadcn registry, 설치 CLI, 문서 사이트를 함께 관리합니다.

핵심 원칙:

- 제품 UI는 토큰과 컴포넌트로 일관되게 만든다.
- 컴포넌트는 shadcn 방식으로 사용자 프로젝트에 복사 설치된다.
- registry 산출물은 소스 변경 후 반드시 재생성한다.

## 2. 먼저 볼 파일

작업 종류별로 다음 문서를 확인합니다.

| 작업 | 먼저 읽을 문서 |
|---|---|
| 레포 온보딩 | `GETTING_STARTED.md`, `README.md` |
| 컴포넌트 추가/수정 | `CONTRIBUTING.md`, 이 파일 |
| 스타일/토큰 수정 | `packages/ui/src/styles/GUIDE.md`, `packages/ui/src/styles/AGENT.md` |
| 아이콘 사용/추가 | `packages/ui/src/icon-system/GUIDE.md`, `packages/ui/src/icon-system/AGENT.md` |
| CLI 수정 | `CONTRIBUTING.md`, `packages/cli/src/*` |
| 문서 사이트 수정 | `apps/registry/src/*`, `apps/registry/README.md` |

## 3. 디렉터리 역할

```text
packages/ui/src/styles/       토큰, 테마, 타이포, flex 유틸, 폰트
packages/ui/src/icon-system/  Icon 컴포넌트와 생성된 sprite/type 파일
packages/ui/src/components/   설치 대상 React 컴포넌트
packages/ui/src/lib/          공용 유틸과 hooks
packages/ui/scripts/          아이콘/registry 빌드 스크립트
apps/registry/src/            문서 사이트, preview, variant 문서
packages/cli/src/             @transight-design/cli 구현
scripts/                      루트 검증/자동화 스크립트
svg/                          아이콘 시스템 원본 SVG
```

## 4. 코드 작성 규칙

### 스타일

- 색상은 Transight 토큰만 사용합니다.
- raw hex, rgb, Tailwind 기본 팔레트(`gray-*`, `blue-*` 등)를 새 코드에 넣지 않습니다.
- 회색·배경·테두리는 **시맨틱 토큰**(`text-fg-*`, `bg-bg-*`, `border-border-*`)을 사용합니다. raw 회색 스케일(`bg-cool-grey-*`, `bg-white`, `text-white`)은 다크모드에서 깨지므로 금지합니다. 브랜드/스테이터스 토큰(`primary-blue-*`, `ui-*`)은 그대로 사용 OK.
- 타이포는 `typo-*` 또는 `text-*` 프리셋을 사용합니다.
- 정렬은 가능하면 `flex-between-center`, `flex-center` 같은 flex 유틸을 사용합니다.
- inline style은 런타임 동적 값처럼 Tailwind로 표현하기 어려운 경우에만 사용합니다.
- `npm run lint`가 디자인 가이드 위반 증가를 잡습니다. 새 raw 색상/원시 타이포/inline style/cva `variant` 축을 추가하지 않습니다.

상세 규칙은 `packages/ui/src/styles/AGENT.md`를 따릅니다.

### 아이콘

- Transight 도메인/브랜드/서비스 아이콘은 자체 `Icon`을 사용합니다.
- 검색, 닫기, 체크, chevron 같은 범용 UI 아이콘은 `lucide-react`를 사용합니다.
- 직접 inline SVG, heroicons, react-icons를 추가하지 않습니다.
- `Icon`은 decorative 전용입니다. 클릭이 필요하면 `button` 또는 `a`로 감쌉니다.

상세 규칙은 `packages/ui/src/icon-system/AGENT.md`를 따릅니다.

### 컴포넌트

- `packages/ui/src/components/<name>.tsx`에 작성합니다.
- `cn`은 `@/lib/utils`를 사용합니다.
- variant가 필요하면 기존 컴포넌트 패턴에 맞춰 `class-variance-authority`를 사용합니다.
- hook, 이벤트 핸들러, 브라우저 API를 쓰는 컴포넌트만 `'use client'`를 선언합니다.
- Base UI primitive가 이미 쓰이는 영역이면 기존 방식에 맞춥니다.
- 새 컴포넌트는 가능하면 `apps/registry/src/previews/`에도 preview를 추가합니다.

## 5. 컴포넌트 Props 정책 (필독)

모든 디자인 시스템 컴포넌트는 props를 **STYLE / VARIANT / PROPS** 3개 분류로 명확히 나눠 설계·구현·문서화합니다. 분류를 섞으면 안 됩니다.

### 5.1 STYLE props

컴포넌트의 시각 외형을 결정하는 4축. 이 4개 이외의 이름을 STYLE 자리(=cva `variants` 객체)에 절대 넣지 않습니다.

| 이름 | 역할 |
|---|---|
| `color` | 컬러 토큰 enum (UI 10색 + gray/white + gradient-blue/gradient-blue-deep). CSS 변수로 주입해 자식이 `var(--<comp>-active)` 등으로 참조하는 패턴을 권장합니다. |
| `theme` | 색을 어떻게 적용할지의 변형 (예: `solid` / `outline` / `soft`). 색 axis와 직교합니다. |
| `shape` | 시각 구조/모양 (예: `default` / `square`, `pill` / `line`, `default` / `contained` / `separated`). |
| `size` | 크기 enum (예: `sm` / `md` / `lg`). 자식이 root의 `data-size`를 `group-data-[size=...]/<comp>:` selector로 추적해 padding/typo를 자동 스케일하는 패턴을 권장합니다. |

규칙:

- 4축을 모두 채울 필요는 없습니다. 의미 없는 axis는 정의하지 마세요 (예: avatar에 `theme` 없음, accordion에 `theme` 없음).
- `color` 적용은 가급적 CSS 변수 + `color-mix()` 패턴으로 합니다. 12색 × N theme × M shape의 cva 매트릭스 폭발을 피합니다.
- 자식 컴포넌트가 부모 STYLE을 따라야 하면 root에 `data-<axis>`를 부여하고 자식이 `group-data-[<axis>=<value>]/<comp>:` selector로 읽습니다 (`React.useContext` 대신).

### 5.2 VARIANT (preset alias)

미리 만들어 둔 STYLE 조합에 이름을 붙인 preset. **STYLE 4축의 부분 집합으로만** 구성하며, 그 외 prop 이름은 절대 포함하지 않습니다.

```ts
export const ButtonVariantPresets = {
  primary:   { color: 'blue',  theme: 'solid'   },
  secondary: { color: 'gray',  theme: 'outline' },
  danger:    { color: 'red',   theme: 'solid'   }
} satisfies Record<string, Partial<Pick<ButtonProps, 'color' | 'theme' | 'shape' | 'size'>>>
```

규칙:

- 타입은 `Partial<Pick<ComponentProps, 'color' | 'theme' | 'shape' | 'size'>>` 고정. 다른 키 허용 금지.
- preset 객체에 `className`을 넣지 않습니다. 임의 className으로 시각을 덮으면 디자인 시스템의 일관성이 깨집니다.
- variant union type은 cva가 아니라 preset 객체의 키에서 파생: `keyof typeof XxxVariantPresets`. 새 variant 추가는 preset에 한 줄 추가하는 것으로 끝나야 합니다.
- 사용자가 STYLE prop을 명시하면 preset 값은 그것에 덮입니다 (preset이 baseline, prop이 override).
- variant 이름을 시각 구조 enum으로 쓰지 않습니다 (예: tabs의 `variant: pill/line`은 잘못, `shape: pill/line`이 맞음).

### 5.3 PROPS (그 외 모두)

STYLE 4축이 아닌 컴포넌트 고유 prop은 모두 PROPS 분류로 정리합니다. cva `variants`에 넣지 않고, 컴포넌트 함수 시그니처에서 일반 prop으로 받습니다.

예시:

- `decorator`, `decoDir` (Input)
- `keepRendered`, `from`, `transition` (Accordion/Dialog 등)
- `side`, `align`, `sideOffset` (Popover/DropdownMenu 등)
- `inset`, `nativeButton`, `showCloseButton`
- `onValueChange`, `onOpenChange` 등 이벤트 핸들러

문서 사이트(`apps/registry/src/components/component-props-docs.tsx`)는 STYLE 4축(`color`/`theme`/`shape`/`size`/`variant`)을 PROPS 표에서 자동 필터링합니다. 표준 form prop(`checked`/`value`/`disabled`/`open`/`aria-invalid` 등)도 자동 제외됩니다.

### 5.4 자주 보이는 위반 사례 (재발 방지)

| 위반 | 올바른 형태 |
|---|---|
| `variant: pill / line` (시각 구조) | `shape: pill / line` |
| `variant: default / contained / separated` | `shape: default / contained / separated` |
| preset에 `className` 포함 | className 제거, STYLE 4축 조합으로만 정의 |
| `theme: rounded / square` | `shape: rounded / square` (theme은 색 적용 방식) |
| STYLE 토글에 `side`, `decorator`, `keepRendered` 노출 | PROPS 분류로 이동 |
| 10+색 × N × M cva 매트릭스 정의 | `--<comp>-active` CSS 변수 + `color-mix()` 한 줄 |

### 5.5 새 컴포넌트 작성 시 체크리스트

- [ ] 4축 중 의미 있는 것만 골라 cva `variants`에 정의했는가? (불필요한 axis 만들지 않음)
- [ ] cva variants 키가 정확히 `color` / `theme` / `shape` / `size` 중 하나인가?
- [ ] variant preset이 있다면 `Partial<Pick<...>>` 타입이고 className이 없는가?
- [ ] 그 외 모든 prop은 cva 바깥, 컴포넌트 함수 시그니처에 있는가?
- [ ] 10+색 지원이 필요하면 CSS 변수 방식으로 갔는가?
- [ ] 자식이 부모 STYLE을 따라야 하면 `data-<axis>` + `group-data-[..]/<comp>:` 패턴인가?

## 6. 변경 후 실행할 명령

변경 범위에 따라 필요한 명령만 실행합니다.

```bash
npm run lint             # 디자인 가이드 위반 증가 + workspace lint 확인
npm run typecheck        # 전체 타입 체크
npm run build            # 전체 빌드
npm run registry:build   # ui registry 산출물 재생성
npm run dev              # 문서 사이트 확인
```

아이콘 SVG를 추가/수정했다면:

```bash
npm run build:icons --workspace=@transight-design/ui
npm run registry:build
```

컴포넌트/스타일/아이콘 설치 산출물이 바뀌면 `packages/ui/registry.json`, `packages/ui/public/r`, `apps/registry/src/data/variants.json` 같은 생성 산출물이 함께 바뀔 수 있습니다.

### 디자인 가이드 lint baseline

`scripts/check-design-guidelines.mjs`는 다음 항목을 검사하고 `scripts/design-guideline-baseline.json`보다 수가 늘어나면 실패합니다.

- raw hex/rgb 및 Tailwind 기본 팔레트 색상
- `text-sm`, `font-medium`, `leading-*` 같은 원시 타이포 클래스
- 고정 inline style
- cva `variants` 안의 `variant` 시각 축

레거시 위반을 정리한 경우에만 baseline을 낮춥니다.

```bash
node scripts/check-design-guidelines.mjs --update-baseline
```

## 7. 작업 체크리스트

작업 전:

- [ ] 기존 변경사항을 확인하고 관련 없는 변경을 되돌리지 않는다.
- [ ] 변경할 영역의 `GUIDE.md` 또는 `AGENT.md`를 읽는다.
- [ ] 기존 컴포넌트/preview/스크립트 패턴을 먼저 확인한다.

작업 중:

- [ ] 토큰, 타이포, 아이콘 규칙을 지킨다.
- [ ] 새 추상화는 기존 패턴으로 해결하기 어려울 때만 만든다.
- [ ] 소스와 registry/문서 사이트 산출물의 관계를 유지한다.

완료 전:

- [ ] `npm run lint`로 디자인 가이드 위반이 증가하지 않았는지 확인한다.
- [ ] 변경 범위에 맞는 typecheck/build를 실행한다.
- [ ] 생성 파일이 필요한 변경인지 확인한다.
- [ ] 사용자 변경으로 보이는 unrelated diff를 건드리지 않는다.
- [ ] 배포 영향이 있으면 changeset 필요 여부를 언급한다.

## 8. 새 컴포넌트 기본 흐름

1. `packages/ui/src/components/<name>.tsx` 작성
2. 필요 시 `packages/ui/src/lib` 또는 hooks 재사용
3. `apps/registry/src/previews/<name>.tsx` 작성
4. `apps/registry/src/previews/index.ts`에 preview 등록
5. `npm run registry:build`
6. `npm run typecheck`
7. 문서 사이트에서 `/components/<name>` 확인

## 9. 새 아이콘 기본 흐름

1. 원본 SVG를 `svg/`에 추가
2. `npm run build:icons --workspace=@transight-design/ui`
3. 생성된 `IconName`에 새 ID가 들어갔는지 확인
4. 필요한 preview 또는 문서 반영
5. `npm run registry:build`

## 10. 판단이 애매할 때

다음은 임의로 결정하지 말고 사용자에게 확인합니다.

- 새로운 브랜드 색상, 타이포 스케일, radius, shadow 추가
- Transight 도메인 의미가 불명확한 아이콘 이름
- 기존 컴포넌트 API의 breaking change
- 배포 버전 정책 또는 package publish 범위
- 문서에 남길 회사 내부 정책/브랜드 문구

그 외 구현 세부사항은 기존 패턴을 우선해 보수적으로 결정합니다.
