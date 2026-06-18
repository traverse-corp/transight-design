# Phase 1 — 모노레포 골격 (완료)

## 생성된 구조

```
transight-design/
├── package.json              # 워크스페이스 루트 (workspaces: packages/* + apps/*), turbo 스크립트
├── turbo.json                # build / dev / lint / typecheck / registry:build / clean
├── tsconfig.base.json        # 모든 패키지가 extends
├── .prettierrc               # transight-v2와 동일 (100 width, no semi, single quote)
├── .gitignore / .npmrc
├── README.md
├── PHASE_0_INVENTORY.md      # transight-v2 감사 결과 (Phase 2/3 참조)
├── PHASE_1_NOTES.md          # ← 이 문서
│
├── packages/
│   ├── ui/                                   # 디자인 시스템 핵심
│   │   ├── package.json                      # @transight-design/ui
│   │   ├── tsconfig.json                     # @/* alias = ./src/*
│   │   ├── registry.json                     # shadcn 표준 스키마 (items: [])
│   │   └── src/
│   │       ├── index.ts                      # public surface (현재 비어 있음)
│   │       ├── lib/utils.ts                  # cn(clsx + twMerge)
│   │       ├── styles/  (.gitkeep)           # Phase 2: theme.css, transight-ds.css
│   │       ├── tokens/  (.gitkeep)           # Phase 2: colors/typography/shadows/gradients
│   │       └── components/  (.gitkeep)       # Phase 3: base 41 + custom 27
│   │
│   └── cli/                                  # 얇은 래퍼 (Phase 5에서 본 구현)
│       ├── package.json                      # bin: transight-design
│       ├── tsconfig.json
│       └── src/index.ts                      # placeholder
│
└── apps/
    └── registry/                             # Phase 4~6에서 Next.js로 구성
        └── README.md                         # placeholder
```

## 결정 사항 (Phase 1 한정)

| 항목 | 결정 |
|---|---|
| 워크스페이스 관리자 | **npm workspaces** (`package.json` workspaces 필드) |
| 빌드 오케스트레이터 | **Turborepo** ^2.5 |
| 노드 버전 | `>=20` |
| TypeScript | `^5.6`, `strict: true`, `noUncheckedIndexedAccess: true`, `verbatimModuleSyntax: true` |
| alias | `packages/ui` 내부에서 `@/*` → `./src/*` (브리프 Phase 1 명시 사항) |
| 패키지 네임스페이스 | `@transight-design/*` (`@acme` 일괄 치환 완료) |
| 라이선스 | MIT (브리프 §1) |

## 의존성 (아직 미설치 — 사용자가 `pnpm install` 실행)

**루트**
- `turbo`, `typescript`, `prettier`, `prettier-plugin-tailwindcss`

**packages/ui**
- runtime: `@base-ui/react ^1.5.0` (※ `@base-ui-components/react`는 deprecated되어 다시 `@base-ui/react`로 환원됨), `class-variance-authority`, `clsx`, `tailwind-merge`
- peer: `react >=18`, `react-dom >=18`, `tailwindcss ^4.0.0`
- dev: `react`, `react-dom`, `@types/react`, `tailwindcss`, `typescript`

**packages/cli**
- dev: `tsx`, `@types/node`, `typescript`

> 추후 추가 예정 (Phase별):
> - Phase 4: `shadcn` (CLI, `registry:build`용)
> - Phase 5: 자체 CLI 본 구현 의존성 (예: `commander`, `prompts`)
> - Phase 6: `next`, MDX 도구 등 — `apps/registry`

## 브리프 §Phase 1 항목 대응

- [x] 모노레포 골격 디렉토리 (`packages/ui`, `packages/cli`, `apps/registry`)
- [x] `@/` alias 설정 (`packages/ui/tsconfig.json`)
- [ ] **내부 import → `@/` 치환 빌드 스크립트** — Phase 3 컴포넌트 마이그레이션 시작 시 작성 (현재 컴포넌트가 없어 미작성)

## 검증

- 디렉토리 생성: ✅
- 설정 파일 작성: ✅
- 의존성 설치·빌드 실행: ⏸ (사용자가 `npm install` → `npm run typecheck` 실행 후 결과 공유 부탁)

## 다음 (Phase 2)

`PHASE_0_INVENTORY.md` §5~7의 실제 값으로:

1. `packages/ui/src/styles/theme.css` — `:root`, `.dark` 시맨틱 매핑 (라이트·다크 다 hex)
2. `packages/ui/src/styles/transight-ds.css` — Cool Grey / Primary / UI 9색×3 / Glass / 타이포 프리셋 / Flex 유틸 (transight-v2에서 그대로 이전, 검토 후)
3. `@theme`에 shadow 4종 + gradient 4종 정식 등록
4. SUIT Variable → `registry:font` 항목으로 정의
