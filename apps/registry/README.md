# apps/registry

Transight Design System의 Next.js 문서 사이트이자 shadcn registry 정적 호스팅 앱입니다.

## 역할

- 컴포넌트, 스타일, 아이콘 시스템의 라이브 프리뷰 제공
- Props 문서, variant 목록, 설치 명령, 코드 예시 제공
- `public/r/*.json` registry item 정적 호스팅
- `packages/ui/registry.json`과 `packages/ui/public/r` 산출물을 문서 앱으로 동기화

## 실행

루트에서 실행:

```bash
npm run dev
```

또는 workspace를 직접 지정:

```bash
npm run dev --workspace=@transight-design/registry
```

기본 주소는 `http://localhost:3002`입니다.

`predev`는 다음 작업을 자동 수행합니다.

1. `packages/ui` 아이콘 sprite 재생성
2. registry JSON을 `apps/registry/public/r`로 동기화
3. 컴포넌트 variant 데이터를 `src/data/variants.json`으로 추출

## 빌드 검증

```bash
npm run typecheck --workspace=@transight-design/registry
npm run build --workspace=@transight-design/registry
```

루트의 `npm run build`를 실행하면 UI registry 생성 후 이 앱의 production build까지 함께 검증합니다.

## 주요 경로

- `src/app/page.tsx`: 첫 화면, 설치/사용 안내
- `src/app/components`: 컴포넌트 카탈로그
- `src/app/styles`: 토큰/타이포/flex 문서
- `src/app/icon-system`: 아이콘 시스템 설치/브라우즈 문서
- `src/previews`: 컴포넌트별 라이브 프리뷰
- `src/components/component-props-docs.tsx`: Props 문서 데이터
- `scripts/sync-registry.mjs`: UI registry 산출물 동기화
- `scripts/extract-variants.mjs`: variant 문서 데이터 생성

## 변경 시 주의

- 컴포넌트 소스 변경 후에는 `npm run build --workspace=@transight-design/ui`로 registry 산출물을 먼저 갱신합니다.
- 문서 앱에서 새 컴포넌트를 노출하려면 `apps/registry/src/previews/index.ts`와 `packages/ui/src/registry/component-manifest.json`의 상태를 함께 확인합니다.
- `public/r`와 `src/data/variants.json`은 생성 산출물이므로 수동 편집보다 빌드/동기화 스크립트를 우선합니다.
