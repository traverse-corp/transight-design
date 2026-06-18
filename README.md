# Transight Design System

shadcn 방식 배포형 디자인 시스템. 소스 파일을 사용자 레포로 **복사**하여 사용자가 코드를 소유·수정한다.

## 모노레포 구조

```
transight-design/
├── packages/
│   ├── ui/        # Base UI 컴포넌트 + 토큰 + registry.json
│   └── cli/       # @transight-design/ui CLI (얇은 래퍼)
├── apps/
│   └── registry/  # 문서 + 레지스트리 JSON 호스팅 (Next.js, Phase 4~6)
├── tsconfig.base.json
├── turbo.json
└── package.json     # workspaces: packages/* + apps/*
```

## 빌드 진행 상태

진행 가이드: `design-system-build-brief.md` (transight-v2 레포)

- [x] Phase 0 — 기존 레포 감사 (`PHASE_0_INVENTORY.md`)
- [x] Phase 1 — 모노레포 골격
- [x] Phase 2 — 토큰 레이어
- [x] Phase 3 — 컴포넌트 정규화 (완료, typecheck 0건)
- [x] Phase 4 — 레지스트리 구성 (81 items, validate ✅, build ✅)
- [x] Phase 5 — 자체 CLI (init/add/list/view, dry-run 검증 ✅)
- [⏳] Phase 6 — 문서 사이트 + 오픈소스 런칭
  - [x] 6a 인덱스 + 정적 호스팅 (Next.js 15 + Tailwind v4, build ✅)
  - [x] 6b 라이브 프리뷰 + 코드 + 설치 명령 (85 페이지 prerender ✅)
  - [x] **6c** 오픈소스 인프라 — LICENSE, CONTRIBUTING, CI, changesets ✅ ← **현재** (registry 등록은 GitHub 푸시 후)

## 결정 사항

- **배포 모델**: shadcn 방식 (소스 복사, npm install 아님)
- **공개 범위**: 공개 오픈소스 (MIT)
- **스택**: Tailwind v4 + Base UI (`@base-ui/react`) + Turborepo
- **색상**: hex 유지 (oklch 변환 안 함, Figma 정합성)
- **다크 모드**: 지원
- **워크스페이스**: npm workspaces

## 첫 셋업

```bash
npm install
npm run build
```
