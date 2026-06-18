# Contributing to Transight Design System

기여 환영합니다. 본 문서는 개발 환경 셋업, 컴포넌트 추가·수정 절차, PR/릴리즈 흐름을 다룹니다.

## 사전 요구사항

- Node.js >= 20
- npm (Workspaces 사용)
- Git

## 셋업

```bash
git clone https://github.com/traverse-corp/transight-design.git
cd transight-design
npm install
```

## 모노레포 구조

```
packages/ui/       디자인 시스템 핵심 — 토큰·hook·lib·컴포넌트 + registry.json
packages/cli/      @transight-design/cli — shadcn 위임 래퍼
apps/registry/     문서 사이트 + 빌드된 레지스트리 정적 호스팅 (Next.js)
```

## 자주 쓰는 스크립트

```bash
# 루트
npm run typecheck            # 전 패키지 타입체크
npm run build                # 전 패키지 빌드

# packages/ui
npm run registry:generate    # src/ → registry.json
npm run registry:validate    # shadcn 스키마 검증
npm run registry:build       # registry.json → public/r/*.json
npm run build                # generate + build

# apps/registry
npm run dev                  # 문서 사이트 localhost:3000
npm run build                # prebuild로 sync 후 next build

# packages/cli
npm run build                # tsup 번들
npm run dev                  # tsx로 직접 실행
```

## 컴포넌트 추가 절차

### 1. 컴포넌트 작성

`packages/ui/src/components/<name>.tsx`에 작성. shadcn 컨벤션 준수:

- `cn` 유틸 사용 (`@/lib/utils`)
- variant는 `cva` 사용 (`class-variance-authority`)
- Base UI 프리미티브 사용 (`@base-ui/react/*`)
- 색상은 토큰 (`bg-primary`, `text-cool-grey-09`, `text-ui-red` 등) — 임의 hex 금지
- 'use client'는 hook·이벤트 핸들러·브라우저 API 사용 시만

분류:
- shadcn 표준 컴포넌트 → kebab-case (`my-component.tsx`)
- 자체 제작 → PascalCase (`MyComponent.tsx`)

자체 제작인 경우 PHASE_0_INVENTORY.md §3.2 / `apps/registry/src/lib/registry.ts`의 `BASE_COMPONENTS`는 **수정 안 함** — kebab-case라도 base 목록에 없으면 자동으로 Custom 분류됨.

### 2. 레지스트리 재생성

```bash
cd packages/ui
npm run build   # registry:generate + registry:build
```

`scripts/build-registry.mjs`가 import를 자동 파싱하여:
- 외부 npm 패키지 → `dependencies`
- 같은 레지스트리 다른 아이템 (`@/components/X`, `@/lib/X`, `@/lib/hooks/X`) → `registryDependencies`

→ 화이트리스트(`EXTERNAL_DEPS`)에 없는 외부 패키지는 경고 출력. 필요 시 스크립트 화이트리스트 갱신.

### 3. 검증

```bash
npm run registry:validate   # shadcn 스키마 통과 확인
npm run typecheck           # 컴포넌트 자체 타입체크
```

### 4. 라이브 프리뷰 추가 (선택)

`apps/registry/src/previews/<name>.tsx` 작성 후 `index.ts`에 등록:

```ts
// previews/my-component.tsx
import { MyComponent } from '@transight-design/ui/components/my-component'

export const Preview = () => (
  <MyComponent>...</MyComponent>
)

// previews/index.ts
import { Preview as MyComponentPreview } from './my-component'
export const PREVIEWS: Record<string, ComponentType> = {
  // ...
  'my-component': MyComponentPreview
}
```

Provider가 필요한 컴포넌트(Tooltip, Sonner 등)는 프리뷰 안에서 직접 래핑.

### 5. 문서 사이트로 확인

```bash
cd apps/registry
npm run dev
# http://localhost:3000/components/my-component
```

## 토큰 / 스타일 수정

`packages/ui/src/styles/` 안의 4개 파일을 직접 편집:

| 파일 | 역할 |
|---|---|
| `tokens.css` | 원시 토큰 (`@theme` 직접 등록) |
| `theme.css` | shadcn 시맨틱 라이트/다크 (`:root`/`.dark` + `@theme inline`) |
| `typography.css` | typo-* / text-* 프리셋 |
| `flex.css` | flex-* 유틸 |
| `font-suit.css` | SUIT Variable 폰트 페이스 (`@import url(...)`만) |

색상은 **hex 유지** (Phase 0 결정). oklch 변환 금지.

수정 후 `npm run build`로 registry 갱신.

## CLI 수정

`packages/cli/src/`에서 작업. 새 명령 추가 절차:

1. `src/commands/<name>.ts`에 commander Command 생성
2. `src/index.ts`에서 `program.addCommand(...)` 등록
3. `npm run build`로 tsup 번들 → `dist/index.js`
4. `node dist/index.js <name> --dry-run` 검증

shadcn 위임 원칙: 무거운 로직은 `runShadcn(...)`로 위임. 직접 구현은 자체 UX/브랜딩 부분만.

## 커밋 컨벤션 (Conventional Commits)

```
type(scope): subject

body (선택)

footer (선택)
```

type:
- `feat` 새 기능 (컴포넌트, 유틸, CLI 명령)
- `fix` 버그 수정
- `docs` 문서만 변경
- `style` 포매팅·세미콜론 등 (기능 영향 없음)
- `refactor` 리팩토링
- `chore` 빌드, 의존성, 설정

scope (선택):
- `ui`, `cli`, `registry`, `tokens`, `docs`

예시:
- `feat(ui): add HashText component with adaptive ellipsis`
- `fix(cli): handle missing GITHUB_REPO env`
- `chore(deps): bump @base-ui/react to 1.5.1`

## PR 절차

1. 브랜치 생성: `feat/<name>` 또는 `fix/<name>`
2. 변경 후 `npm run typecheck && npm run build`로 사전 검증
3. **changeset 작성** (아래)
4. PR 생성 — 템플릿 따라 작성
5. CI 통과 + 1인 이상 리뷰 승인
6. main에 squash merge

## 릴리즈 (changesets)

버전 관리는 [changesets](https://github.com/changesets/changesets)로 한다.

### 변경 기록

기능/버그/문서 변경마다 changeset 작성:

```bash
npx changeset
```

→ 대화형으로 영향받는 패키지 + 변경 타입(patch/minor/major) + 설명 입력. `.changeset/<random-name>.md` 생성됨. **이 파일을 PR에 포함**.

### 릴리즈 (메인테이너)

```bash
npx changeset version   # 패키지 버전 + CHANGELOG.md 자동 갱신
git commit -am "chore: version packages"
git push                # 태그·릴리즈는 별도 워크플로우에서
```

`@transight-design/registry`는 문서 사이트 — `private: true`라 publish 대상 아님. changesets 설정의 `ignore`에 포함됨.

## CI

`.github/workflows/ci.yml`이 PR/푸시마다 다음 실행:

1. Node 20, npm install
2. 전 패키지 typecheck
3. `packages/ui` registry validate + build
4. `apps/registry` build
5. `packages/cli` build

빨간 줄이 나오면 머지 금지.

## 알려진 한계 / 향후

- 라이브 프리뷰는 10개 base 컴포넌트만 — 나머지는 점진 추가
- 다크 모드 토글 UI 미구현 (토큰은 있음 — `.dark` 클래스만 토글하면 됨)
- 코드 신택스 하이라이팅 없음 (shiki 도입 검토 가능)
- MCP 서버 없음 (AI 에이전트 직접 설치 — 선택 사항)
