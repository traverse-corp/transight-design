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
svg/                          아이콘 시스템 원본 SVG
```

## 4. 코드 작성 규칙

### 스타일

- 색상은 Transight 토큰만 사용합니다.
- raw hex, rgb, Tailwind 기본 팔레트(`gray-*`, `blue-*` 등)를 새 코드에 넣지 않습니다.
- 타이포는 `typo-*` 또는 `text-*` 프리셋을 사용합니다.
- 정렬은 가능하면 `flex-between-center`, `flex-center` 같은 flex 유틸을 사용합니다.
- inline style은 런타임 동적 값처럼 Tailwind로 표현하기 어려운 경우에만 사용합니다.

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

## 5. 변경 후 실행할 명령

변경 범위에 따라 필요한 명령만 실행합니다.

```bash
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

## 6. 작업 체크리스트

작업 전:

- [ ] 기존 변경사항을 확인하고 관련 없는 변경을 되돌리지 않는다.
- [ ] 변경할 영역의 `GUIDE.md` 또는 `AGENT.md`를 읽는다.
- [ ] 기존 컴포넌트/preview/스크립트 패턴을 먼저 확인한다.

작업 중:

- [ ] 토큰, 타이포, 아이콘 규칙을 지킨다.
- [ ] 새 추상화는 기존 패턴으로 해결하기 어려울 때만 만든다.
- [ ] 소스와 registry/문서 사이트 산출물의 관계를 유지한다.

완료 전:

- [ ] 변경 범위에 맞는 typecheck/build를 실행한다.
- [ ] 생성 파일이 필요한 변경인지 확인한다.
- [ ] 사용자 변경으로 보이는 unrelated diff를 건드리지 않는다.
- [ ] 배포 영향이 있으면 changeset 필요 여부를 언급한다.

## 7. 새 컴포넌트 기본 흐름

1. `packages/ui/src/components/<name>.tsx` 작성
2. 필요 시 `packages/ui/src/lib` 또는 hooks 재사용
3. `apps/registry/src/previews/<name>.tsx` 작성
4. `apps/registry/src/previews/index.ts`에 preview 등록
5. `npm run registry:build`
6. `npm run typecheck`
7. 문서 사이트에서 `/components/<name>` 확인

## 8. 새 아이콘 기본 흐름

1. 원본 SVG를 `svg/`에 추가
2. `npm run build:icons --workspace=@transight-design/ui`
3. 생성된 `IconName`에 새 ID가 들어갔는지 확인
4. 필요한 preview 또는 문서 반영
5. `npm run registry:build`

## 9. 판단이 애매할 때

다음은 임의로 결정하지 말고 사용자에게 확인합니다.

- 새로운 브랜드 색상, 타이포 스케일, radius, shadow 추가
- Transight 도메인 의미가 불명확한 아이콘 이름
- 기존 컴포넌트 API의 breaking change
- 배포 버전 정책 또는 package publish 범위
- 문서에 남길 회사 내부 정책/브랜드 문구

그 외 구현 세부사항은 기존 패턴을 우선해 보수적으로 결정합니다.
