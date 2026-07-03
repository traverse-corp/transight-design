<div align="center">

# Transight Design System

Traverse/Transight 제품군의 브랜드 경험을 일관되게 만들기 위한 디자인 시스템 레포.
토큰, 스타일, 아이콘, React 컴포넌트, 문서 사이트, 설치용 CLI를 한 모노레포에서 관리합니다.

[![npm](https://img.shields.io/npm/v/@transight-design/cli?label=%40transight-design%2Fcli)](https://www.npmjs.com/package/@transight-design/cli)
[![license](https://img.shields.io/github/license/traverse-corp/transight-design)](LICENSE)
[![CI](https://github.com/traverse-corp/transight-design/actions/workflows/ci.yml/badge.svg)](https://github.com/traverse-corp/transight-design/actions/workflows/ci.yml)

[문서 사이트](https://transight-design.netlify.app)

</div>

---

## 이 레포가 하는 일

Transight Design System은 블록체인 트랜잭션 분석 도구를 위한 브랜드/제품 UI 기반입니다.
shadcn 방식처럼 컴포넌트 소스를 사용자 프로젝트에 복사해 각 제품이 직접 소유하고 수정할 수 있게 배포합니다.

주요 산출물:

- `@transight-design/ui`: 디자인 토큰, CSS 스타일, 아이콘 시스템, 컴포넌트 소스
- `@transight-design/cli`: shadcn registry 설치를 감싼 CLI
- `apps/registry`: 컴포넌트/스타일/아이콘을 확인하는 Next.js 문서 사이트
- `registry.json` 및 `packages/ui/public/r`: shadcn 호환 registry 산출물

## 처음 왔다면

1. [GETTING_STARTED.md](GETTING_STARTED.md)를 먼저 읽고 로컬 문서 사이트를 실행합니다.
2. UI 코드를 작성하는 사람 또는 에이전트라면 [AGENT.md](AGENT.md)를 작업 전에 읽습니다.
3. 컴포넌트 추가/수정 절차는 [CONTRIBUTING.md](CONTRIBUTING.md)를 따릅니다.
4. 스타일 규칙은 [packages/ui/src/styles/GUIDE.md](packages/ui/src/styles/GUIDE.md), 아이콘 규칙은 [packages/ui/src/icon-system/GUIDE.md](packages/ui/src/icon-system/GUIDE.md)를 확인합니다.

## 빠른 로컬 실행

사전 요구사항:

- Node.js 20 이상
- npm 11 계열 권장

```bash
npm install
npm run dev
```

문서 사이트는 기본적으로 `http://localhost:3002`에서 실행됩니다. `npm run dev`는 아이콘 sprite 생성, registry 동기화, variant 추출을 사전 실행합니다.

자주 쓰는 명령:

```bash
npm run dev              # registry 문서 사이트 실행
npm run lint             # 디자인 가이드 위반 증가 여부 + workspace lint 확인
npm run typecheck        # 모든 workspace 타입 체크
npm run build            # ui registry + registry app + cli 빌드
npm run registry:build   # 생성된 registry.json 기준 public/r/*.json 재생성
npm run changeset        # 배포 변경 기록 작성
```

## 모노레포 구조

```text
transight-design/
├── packages/
│   ├── ui/          디자인 시스템 핵심: styles, tokens, icons, components, registry
│   └── cli/         @transight-design/cli: shadcn 위임 래퍼
├── apps/
│   └── registry/    Next.js 문서 사이트 및 registry 정적 호스팅
├── svg/             아이콘 시스템 원본 SVG
├── scripts/         디자인 가이드 검증 등 루트 자동화 스크립트
├── patches/         변경 단위별 전달/적용 문서
├── registry.json    shadcn registry 루트 진입점
└── .changeset/      패키지 버전/릴리즈 관리
```

## 디자인 시스템 구성

### Styles

`packages/ui/src/styles/index.css`가 스타일 진입점입니다. 다음 레이어가 포함됩니다.

- `fonts.css`: SUIT / Pretendard Variable 폰트 로드
- `tokens.css`: Tailwind v4 `@theme` 기반 원시 토큰
- `theme.css`: shadcn/Base UI 호환 시맨틱 토큰과 다크 모드
- `typography.css`: `typo-*`, `text-*` 타이포 프리셋
- `flex.css`: `flex-between-center` 같은 정렬 유틸

자세한 규칙: [Styles Guide](packages/ui/src/styles/GUIDE.md)

### Icon System

`svg/`의 원본 SVG를 빌드 타임에 sprite로 생성하고, `Icon` 컴포넌트가 strict typed API로 노출합니다.

- 도메인/브랜드/서비스 아이콘: 자체 `Icon`
- 범용 UI 액션 아이콘: `lucide-react`
- `Icon`의 `src`, `color`, `size`는 union 타입으로 제한

자세한 규칙: [Icon System Guide](packages/ui/src/icon-system/GUIDE.md)

### Components

컴포넌트는 `packages/ui/src/components/`에 있습니다.

- Base: shadcn 표준 컴포넌트 계열
- Custom: Transight 도메인과 제품 요구에 맞춘 자체 컴포넌트
- Preview: `apps/registry/src/previews/`에서 문서 사이트 미리보기 제공
- Manifest: `packages/ui/src/registry/component-manifest.json`에서 설치 위치, 문서 노출, 번들 포함 여부 관리

컴포넌트 추가/수정 절차: [CONTRIBUTING.md](CONTRIBUTING.md)

## 사용자 프로젝트에 설치

React + TypeScript + Tailwind v4 + shadcn이 초기화된 프로젝트를 기준으로 합니다.
`@transight-design/cli init`은 Transight registry 설정과 설치 흐름을 돕지만,
앱 생성이나 Tailwind/shadcn 기본 초기화를 대신하지 않습니다.

```bash
# 전체 번들
npx @transight-design/cli init

# 개별 컴포넌트
npx @transight-design/cli add button card dialog

# 이미 설치된 컴포넌트 파일만 업데이트
npx @transight-design/cli update button

# 목록 확인
npx @transight-design/cli list
```

설치 후 사용자 프로젝트의 진입 CSS에 styles를 import합니다.

```css
/* Vite: src/index.css */
@import "./styles/index.css";

/* Next.js App Router: app/globals.css */
@import "../src/styles/index.css";
```

사용 예:

```tsx
import { Button } from "@/components/base/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/base/card"

export default function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transight</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>확인</Button>
      </CardContent>
    </Card>
  )
}
```

shadcn CLI로 직접 설치할 수도 있습니다.

```bash
npx shadcn@latest add traverse-corp/transight-design/button
```

## 작업 원칙

- 색상은 토큰으로만 표현합니다. 임의 hex/rgb와 Tailwind 기본 팔레트 사용을 피합니다.
- 타이포는 `typo-*` 또는 `text-*` 프리셋을 우선합니다.
- 도메인 아이콘은 자체 `Icon`, 범용 UI 아이콘은 `lucide-react`를 사용합니다.
- 컴포넌트 변경 후 registry 산출물을 재생성합니다.
- `npm run lint`는 디자인 가이드 위반 수가 baseline보다 증가하면 실패합니다. 레거시 위반은 점진 정리하고, 정리 후에는 baseline을 낮춥니다.
- 패키지 배포 영향이 있는 변경은 changeset을 포함합니다.

## 디자인 가이드 검증

`scripts/check-design-guidelines.mjs`는 UI/문서 소스에서 다음 항목을 검사합니다.

- raw hex/rgb 및 Tailwind 기본 팔레트 색상
- `text-sm`, `font-medium`, `leading-*` 같은 원시 타이포 클래스
- 고정 inline style
- cva `variants` 안의 `variant` 시각 축

기존 레거시 부채는 `scripts/design-guideline-baseline.json`에 기록되어 있습니다. 새 코드가 위반 수를 늘리면 CI의 `npm run lint` 단계에서 실패합니다. 레거시를 정리한 뒤에는 다음 명령으로 baseline을 낮춥니다.

```bash
node scripts/check-design-guidelines.mjs --update-baseline
```

## 더 읽을 문서

- [GETTING_STARTED.md](GETTING_STARTED.md): 최초 시작 가이드
- [AGENT.md](AGENT.md): AI 에이전트 작업 지침
- [CONTRIBUTING.md](CONTRIBUTING.md): 기여, 컴포넌트 추가, 릴리즈 절차
- [packages/ui/src/styles/GUIDE.md](packages/ui/src/styles/GUIDE.md): 스타일 시스템 가이드
- [packages/ui/src/styles/AGENT.md](packages/ui/src/styles/AGENT.md): 스타일 코드 생성 규칙
- [packages/ui/src/icon-system/GUIDE.md](packages/ui/src/icon-system/GUIDE.md): 아이콘 시스템 가이드
- [packages/ui/src/icon-system/AGENT.md](packages/ui/src/icon-system/AGENT.md): 아이콘 코드 생성 규칙

## 라이선스

MIT © Traverse - [LICENSE](LICENSE)
