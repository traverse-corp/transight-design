# Phase 5 — 자체 CLI (완료)

## 결과

| 항목 | 수치 |
|---|---|
| CLI 패키지 | `@transight-design/cli` |
| bin 명령어 | `transight-design` |
| 구현 명령 | **4개** (init / add / list / view) |
| 번들 크기 | ESM 5.03 KB |
| 검증 | dry-run 4개 명령 모두 정상 |

## 구조

```
packages/cli/
├── package.json          @transight-design/cli, bin: transight-design
├── tsconfig.json         @/* alias = ./src/*
└── src/
    ├── index.ts          commander entry — 4개 명령 등록
    ├── config.ts         GITHUB_REPO, BUNDLE_ITEM, githubAddress()
    ├── lib/runner.ts     shadcn 위임 실행기 (패키지 매니저 자동 탐지)
    └── commands/
        ├── init.ts       전체 번들 한 방 설치
        ├── add.ts        개별 컴포넌트 설치 (멀티)
        ├── list.ts       사용 가능한 아이템 목록
        └── view.ts       정보 미리 보기 (설치 안 함)
```

## 동작 방식

브리프 §Phase 5 "재구현 대신 shadcn 로직 위임 우선" 그대로:

1. 사용자가 `transight-design add button` 실행
2. CLI는 `process.env.npm_config_user_agent`로 사용자 패키지 매니저 감지
3. 적절한 러너로 `shadcn@latest`에 위임:
   - npm → `npx shadcn@latest add traverse-corp/transight-design/button`
   - pnpm → `pnpm dlx shadcn@latest add ...`
   - bun → `bunx --bun shadcn@latest add ...`
4. shadcn이 GitHub 소스 레지스트리에서 직접 읽어와 사용자 프로젝트에 복사

→ **우리 CLI는 주소 변환·UX 표시만 담당.** 파일 복사, import 재작성, tsconfig 갱신, 의존성 설치 등 무거운 작업은 전부 shadcn에 위임.

## 명령어

```bash
# 전체 번들 (토큰·폰트·lib·hooks·컴포넌트) 한 방 설치
transight-design init [--ref <branch|tag|sha>] [--dry-run]

# 개별 컴포넌트 설치 (여러 개 동시 가능)
transight-design add <comp...> [--ref <ref>] [--dry-run]

# 사용 가능한 모든 아이템 목록
transight-design list [--dry-run]

# 정보 미리 보기 (설치 안 함)
transight-design view <comp> [--ref <ref>] [--dry-run]
```

## 검증 결과 (dry-run)

```
$ transight-design init --dry-run
[dry-run] npx shadcn@latest add traverse-corp/transight-design/transight-design

$ transight-design add button card --dry-run
[dry-run] npx shadcn@latest add traverse-corp/transight-design/button \
          traverse-corp/transight-design/card

$ transight-design list --dry-run
[dry-run] npx shadcn@latest list traverse-corp/transight-design

$ transight-design view dialog --dry-run
[dry-run] npx shadcn@latest view traverse-corp/transight-design/dialog
```

## 의존성

| 패키지 | 역할 |
|---|---|
| `commander ^12.1.0` | CLI 인자 파싱 (shadcn 자체도 사용) |
| `picocolors ^1.1.0` | 컬러 출력 (chalk보다 가벼움, 0 deps) |

`shadcn`은 의존성에 넣지 않음 — 사용자 패키지 매니저로 `npx shadcn@latest` 식으로 매번 최신 fetch. 사용자가 shadcn 버전 잠그고 싶으면 직접 통제 가능.

## GitHub 주소 결정 (Phase 4 후속)

사용자 결정: **GitHub 소스 레지스트리 우선, Phase 6에서 호스팅 URL 옵션 추가**.

현재 `config.ts`의 `GITHUB_REPO = 'traverse-corp/transight-design'`은 placeholder. 실제 GitHub 푸시 후 실제 owner/repo로 교체 필요. 사용자가 다른 owner를 쓸 거면 알려주세요.

## 브리프 §Phase 5 항목 대응

- [x] `packages/cli/`: `bin` → `transight-design` (npx 실행 가능)
- [x] `init` — base + 토큰 + 폰트 토대 한 방 설치 (전체 번들 위임)
- [x] `add` — 컴포넌트 개별/멀티 설치
- [x] **재구현 대신 shadcn 로직 위임 우선** — 모든 명령이 `runShadcn(...)` 한 줄로 끝남
- [x] 추가: `list`, `view` (보너스 — 사용자 편의)

## 알려진 한계 / 후속

- **`transight-design` 명령어를 글로벌 설치 없이 쓰려면** `npx @transight-design/cli` 호출 필요. 또는 사용자가 `npm i -g @transight-design/cli` 해야 `transight-design` 글로벌. CLI 자체를 npm 배포할 때 결정.
- **로컬 테스트** — 현재는 `node dist/index.js ...`로만 가능. `npm link` 또는 `pnpm link --global` 후 `transight-design ...`로 쓸 수 있음.
- **`--ref` 옵션 전파** — `add`/`view`는 컴포넌트별로 ref가 한 번에 적용됨. 컴포넌트별로 다른 ref 지원은 불필요해 보임.

## 다음 (Phase 6 — 문서 사이트 + 오픈소스 런칭)

`apps/registry/` (Next.js):
1. 컴포넌트별 라이브 프리뷰 + props 문서 + 코드 복사 버튼
2. 빌드된 `public/r/*.json` 정적 호스팅 (`@transight-design` namespace alias 진입점)
3. MIT 라이선스, CONTRIBUTING, CI (typecheck + registry validate + build)
4. 버전 관리 — changesets
5. 공식 shadcn registry index에 namespace 제출
6. (옵션) MCP 서버 연결 — AI 에이전트가 직접 설치 가능

분량이 크니 단계 분할 권장. Phase 6는 4~6단계로 쪼개서 진행하는 게 적합.
