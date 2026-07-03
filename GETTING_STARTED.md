# 최초 시작 가이드

이 문서는 Transight Design System 레포를 처음 받은 사람이 로컬에서 구조를 파악하고 첫 작업을 시작하기 위한 안내입니다.

## 1. 준비

필요한 환경:

- Node.js 20 이상
- npm 11 계열 권장
- Git

설치:

```bash
npm install
```

## 2. 문서 사이트 실행

```bash
npm run dev
```

기본 주소는 `http://localhost:3002`입니다.

`npm run dev`는 `apps/registry` workspace의 Next.js 앱을 실행합니다. 실행 전에 아이콘 sprite 생성, registry 동기화, variant 추출이 자동으로 수행됩니다.

## 3. 10분 구조 파악

처음에는 다음 순서로 보면 됩니다.

1. `README.md`: 레포 전체 목적과 구성
2. `apps/registry`: 실제로 보이는 문서 사이트
3. `packages/ui/src/styles`: 토큰, 테마, 타이포, flex 유틸
4. `packages/ui/src/components`: 설치 대상 컴포넌트
5. `packages/ui/src/icon-system`: 자체 아이콘 컴포넌트와 sprite 시스템
6. `packages/cli`: 사용자 프로젝트에 설치하는 CLI

## 4. 자주 하는 작업

### 컴포넌트 보기

문서 사이트에서 `/components`로 이동합니다.

소스 위치:

```text
packages/ui/src/components/<name>.tsx
apps/registry/src/previews/<name>.tsx
```

### 스타일 토큰 보기

문서 사이트에서 `/styles` 또는 `/styles/browse/*`를 확인합니다.

소스 위치:

```text
packages/ui/src/styles/tokens.css
packages/ui/src/styles/theme.css
packages/ui/src/styles/typography.css
packages/ui/src/styles/flex.css
```

### 아이콘 보기

문서 사이트에서 `/icon-system` 또는 `/icon-system/browse`를 확인합니다.

원본/소스 위치:

```text
svg/
packages/ui/src/icon-system/icon.tsx
packages/ui/src/icon-system/*.gen.*
```

`*.gen.*` 파일은 생성 파일이므로 직접 수정하지 않습니다.

## 5. 변경 후 검증

일반적인 검증:

```bash
npm run typecheck
npm run build
```

컴포넌트, 스타일, 아이콘 registry 산출물을 모두 갱신해야 할 때:

```bash
npm run build --workspace=@transight-design/ui
```

이미 생성된 `registry.json`을 기준으로 `public/r/*.json`만 다시 만들 때:

```bash
npm run registry:build
```

아이콘 원본 SVG를 변경했다면:

```bash
npm run build:icons --workspace=@transight-design/ui
npm run registry:build
```

## 6. 첫 작업별 체크

### 문서만 수정

1. `README.md`, `GETTING_STARTED.md`, `CONTRIBUTING.md` 중 목적에 맞는 문서를 수정합니다.
2. 링크가 실제 파일을 가리키는지 확인합니다.
3. 코드 변경이 없으면 build는 필수가 아니지만, 명령/경로는 실제 package script와 맞춰야 합니다.

### 컴포넌트 수정

1. `packages/ui/src/components/<name>.tsx`를 수정합니다.
2. preview가 있으면 `apps/registry/src/previews/<name>.tsx`도 맞춥니다.
3. 노출/번들 상태를 바꿔야 하면 `packages/ui/src/registry/component-manifest.json`을 수정합니다.
4. `npm run build --workspace=@transight-design/ui`를 실행합니다.
5. `npm run typecheck`를 실행합니다.
6. 문서 사이트에서 시각적으로 확인합니다.

### 새 컴포넌트 추가

1. 기존 유사 컴포넌트를 먼저 찾습니다.
2. `packages/ui/src/components/<name>.tsx`를 추가합니다.
3. preview를 추가하고 `apps/registry/src/previews/index.ts`에 등록합니다.
4. `packages/ui/src/registry/component-manifest.json`에 컴포넌트를 등록합니다.
   - `category`: 설치 위치 (`base` 또는 `custom`)
   - `ready`: 문서 사이드바/번들 포함 여부
   - `essential`: Essential Pack 포함 여부
5. `npm run build --workspace=@transight-design/ui`를 실행합니다.
6. `npm run typecheck`를 실행합니다.

### 토큰/스타일 수정

1. `packages/ui/src/styles/GUIDE.md`를 읽습니다.
2. 필요한 CSS 파일만 수정합니다.
3. raw hex 추가가 필요한 경우 브랜드 결정 사항인지 확인합니다.
4. `npm run build --workspace=@transight-design/ui`와 `npm run typecheck`를 실행합니다.

### 아이콘 추가

1. SVG를 `svg/`에 추가합니다.
2. `npm run build:icons --workspace=@transight-design/ui`를 실행합니다.
3. 생성 파일을 확인합니다.
4. 필요하면 문서 사이트 preview를 갱신합니다.
5. `npm run build --workspace=@transight-design/ui`를 실행합니다.

## 7. 사용자 프로젝트 설치 흐름

사용자 프로젝트는 React + TypeScript + Tailwind v4 + shadcn 초기화가 되어 있어야 합니다.
`@transight-design/cli init`은 Transight registry 설정과 기본 설치 흐름을 돕지만,
프로젝트 생성, React/Next/Vite 설정, Tailwind v4 설치 자체를 대신하지는 않습니다.

```bash
npx @transight-design/cli init
npx @transight-design/cli add button card dialog
npx @transight-design/cli update button
npx @transight-design/cli list
```

설치 후 진입 CSS에서:

```css
@import "./styles/index.css";
```

Next.js App Router에서 경로가 `app/globals.css`라면 보통 다음처럼 상대 경로를 맞춥니다.

```css
@import "../src/styles/index.css";
```

## 8. 막히기 쉬운 지점

- `Icon`이 빈 SVG로 보이면 앱 루트에 `IconSprite`가 마운트됐는지 확인합니다.
- 새 SVG가 타입에 안 잡히면 `build:icons`가 실행됐는지 확인합니다.
- 컴포넌트 설치 결과가 오래된 것 같으면 `npm run build --workspace=@transight-design/ui`를 다시 실행합니다.
- 색상/타이포가 애매하면 새 값을 만들지 말고 기존 토큰에서 가장 가까운 의미를 고릅니다.
- breaking change 가능성이 있으면 API를 바꾸기 전에 사용자와 확인합니다.

## 9. 다음 문서

- `README.md`: 레포 전체 가이드
- `AGENT.md`: AI 에이전트 작업 규칙
- `CONTRIBUTING.md`: 기여/PR/릴리즈 절차
- `packages/ui/src/styles/GUIDE.md`: 스타일 시스템 상세
- `packages/ui/src/icon-system/GUIDE.md`: 아이콘 시스템 상세
