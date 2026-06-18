# Phase 6a — 문서 사이트 골격 (완료)

## 결과

| 항목 | 결과 |
|---|---|
| 프레임워크 | Next.js 15 (App Router) + React 19 + Tailwind v4 |
| 페이지 | `/` (인덱스), `/r/:item.json` (정적 호스팅) |
| sync 스크립트 | `packages/ui/public/r/*` → `apps/registry/public/r/*` (82 파일) |
| 타입체크 | ✅ exit 0 |
| 프로덕션 빌드 | ✅ first load 106 KB, 4 페이지 prerender |

## 구조

```
apps/registry/
├── package.json              @transight-design/registry, predev/prebuild으로 sync 자동
├── next.config.ts            /r/* 캐시 헤더 + CORS
├── postcss.config.mjs        @tailwindcss/postcss
├── tsconfig.json             @/* alias = ./src/*
├── next-env.d.ts             (Next 자동 갱신)
├── scripts/
│   └── sync-registry.mjs     ui 빌드 산출물 동기화
├── src/
│   ├── app/
│   │   ├── globals.css       Tailwind + SUIT 폰트 + doc 토큰 (디자인 시스템 토큰과 격리)
│   │   ├── layout.tsx        루트 레이아웃
│   │   └── page.tsx          인덱스 — 81개 아이템 타입별 그룹 표시
│   └── lib/
│       └── registry.ts       registry.json 로더 + 그룹핑 유틸
└── public/r/*.json           sync로 채워짐 (82 파일, gitignore)
```

## 인덱스 페이지 구성

- 헤더: 레지스트리 이름, 설명, 총 아이템 수
- 설치 가이드 박스: `transight-design init` / `add` / `shadcn` GitHub 직접
- 타입별 그룹 (Bundles · Styles · Lib · Hooks · Components 순):
  - 각 아이템은 `/r/<name>.json`으로 링크
  - 호버 시 description을 `title`로 표시
- 푸터: MIT, GitHub 링크

## 스크립트

```bash
cd apps/registry

npm run dev      # predev로 sync 후 next dev --turbo --port 3000
npm run build    # prebuild로 sync 후 next build
npm run start    # 프로덕션 서버
```

루트에서도 가능 (workspace 필터):
```bash
npm run dev --workspace=@transight-design/registry
npm run build --workspace=@transight-design/registry
```

## 검증

### 빌드
```
✓ Compiled successfully in 3.0s
✓ Linting and checking validity of types
✓ Generating static pages (4/4)
Route (app)        Size     First Load JS
○ /                3.44 kB  106 kB
○ /_not-found      984 B    103 kB
```

### dev 서버 (사용자 직접)
```bash
cd apps/registry
npm run dev
# http://localhost:3000/         → 인덱스
# http://localhost:3000/r/button.json   → button 컴포넌트 JSON
# http://localhost:3000/r/transight-design.json → 전체 번들 JSON
```

### 로컬 호스팅으로 shadcn 설치 검증
```bash
# 다른 임시 앱에서
npx shadcn@latest add http://localhost:3000/r/button.json --dry-run
```

## 자동 동기화

`apps/registry/package.json`의 `predev` / `prebuild` 훅이 매번 `scripts/sync-registry.mjs`를 실행해서 `packages/ui/public/r/*.json`을 가져옴.

→ `packages/ui`에서 `npm run build`로 레지스트리 재빌드 후 registry app의 dev/build 돌리면 자동 반영.

## 디자인 시스템 토큰 격리

문서 사이트(globals.css)는 디자인 시스템 토큰을 직접 들고오지 않고, 자체 doc 토큰 4개만 사용 (`--color-doc-bg/fg/muted/border/accent`).

- 이유 1: 디자인 시스템 토큰이 변하면 문서 사이트 외관이 흔들리는 걸 막음
- 이유 2: Phase 6b에서 컴포넌트 프리뷰 영역에만 `@import '@transight-design/ui/styles/index.css'` 적용 예정 (격리 렌더링)

## 알려진 동작

- `next-env.d.ts`와 `tsconfig.json`은 Next.js 빌드 시 자동 갱신됨 (`allowJs: true`, `.next/types/routes.d.ts` 참조 추가). 정상 동작이고 커밋해도 됨.
- `public/r/*.json`은 sync 산출물이라 `.gitignore`에 추가. 빌드 시 매번 재생성됨.

## 다음 (Phase 6b — 컴포넌트 프리뷰 + 코드 표시)

1. `/components/[name]` 동적 라우트
2. 좌측: 컴포넌트 실제 렌더링 (디자인 시스템 토큰 격리 적용)
3. 우측: 소스 코드 + 복사 버튼 + 설치 명령어
4. dependencies / registryDependencies 표시
5. 검색 / 필터 (선택)
