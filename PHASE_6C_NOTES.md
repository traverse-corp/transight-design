# Phase 6c — 오픈소스 인프라 (완료)

## 추가된 파일

| 파일 | 역할 |
|---|---|
| `LICENSE` | MIT |
| `CONTRIBUTING.md` | 개발 환경, 컴포넌트 추가 절차, 커밋 컨벤션, PR, 릴리즈 |
| `.github/workflows/ci.yml` | typecheck + registry validate + build (3 패키지 + 문서 사이트) |
| `.changeset/config.json` | changesets 설정 — `@transight-design/registry` 무시 |
| `.changeset/README.md` | changeset 사용 가이드 |

## 추가된 의존성 / 스크립트

루트 `package.json`:
- devDep: `@changesets/cli ^2.27.0` (실제 설치 버전 2.31.0)
- scripts: `changeset`, `version`, `release`

## CI 워크플로우

`.github/workflows/ci.yml`:
- 트리거: main 푸시 + main 대상 PR
- concurrency 그룹으로 새 커밋 시 이전 실행 자동 취소
- Node 20 + npm ci
- 순서:
  1. 전 패키지 typecheck (`npm run typecheck` → turbo)
  2. `packages/ui`: registry generate + validate + build
  3. `packages/cli`: build
  4. `apps/registry`: build (predev/prebuild으로 sync 자동)
  5. main 푸시 시 빌드된 `public/r/` 아티팩트 14일 보관

## changesets 흐름

```bash
# 변경 작업 후
npx changeset
# → 영향 패키지·타입·설명 입력 → .changeset/<random>.md 생성

# PR에 changeset 파일 포함해서 머지

# 메인테이너 릴리즈
npm run version    # 버전 bump + CHANGELOG.md 생성
git commit -am "chore: version packages"
git push
npm run release    # npm publish
```

`@transight-design/registry`(문서 사이트)는 `private: true` + ignore 목록 → publish 대상 아님.

---

# 오픈소스 런칭 가이드 (사용자 액션 필요)

브리프 §Phase 6의 나머지 항목 — **GitHub 푸시 후 직접 실행할 단계들**.

## 1. GitHub 푸시

```bash
cd C:\Users\송경후\traverse\1-Services\transight-design

git init
git add .
git commit -m "feat: initial transight-design system

- Phase 0~5: foundation, tokens, components, registry, CLI
- Phase 6a/b: Next.js docs site with live previews
- Phase 6c: license, CI, changesets, contributing guide
"

# GitHub 저장소 생성 후 (Public 권장 — shadcn source registry는 public만 지원)
gh repo create traverse-corp/transight-design --public --source=. --push
# 또는 수동 push
git remote add origin git@github.com:traverse-corp/transight-design.git
git push -u origin main
```

owner가 `traverse`가 아니면 푸시 전에 `packages/cli/src/config.ts`의 `GITHUB_REPO` 갱신.

## 2. CI 첫 통과 확인

- GitHub Actions 탭에서 워크플로우 그린 확인
- 실패 시 로그 보고 즉시 수정 후 푸시

## 3. CLI 실제 동작 검증

```bash
# 임시 vite + tailwind v4 + shadcn 초기화된 앱에서
npx @transight-design/cli init --dry-run
# → shadcn add traverse-corp/transight-design/transight-design

npx @transight-design/cli add button --dry-run
# → shadcn add traverse-corp/transight-design/button

# 실제 설치 (드라이런 제거)
npx @transight-design/cli add button
# → packages/ui의 button.tsx + lib/utils.ts가 임시 앱에 복사되어야 함
```

## 4. 문서 사이트 배포 (선택)

**Vercel 권장** (Next.js 공식 호스팅):

```bash
# 한 번만
npm i -g vercel
cd apps/registry
vercel link
vercel --prod
```

또는 GitHub 연동: Vercel 대시보드 → New Project → 이 레포 선택 → Root Directory `apps/registry` → Deploy.

배포 후 `https://<your-domain>/r/<name>.json`으로 정적 호스팅 동작.

## 5. shadcn 공식 registry index 등록

shadcn UI 측에 namespace alias 등록 PR 제출. 등록되면 사용자가:

```bash
# 단축형 가능
npx shadcn@latest add @transight-design/button
# 대신
npx shadcn@latest add traverse-corp/transight-design/button
```

절차:
1. https://ui.shadcn.com/docs/registry 문서에서 최신 등록 방법 확인
2. 해당 PR 또는 폼 제출
3. namespace 추가되면 우리 CLI 보강 (`config.ts`에 namespace 별칭 옵션 추가)

## 6. npm 패키지 배포 (선택)

`@transight-design/cli`만 publish 필요 (`packages/ui`는 소스 복사 모델이라 npm 배포 안 함).

```bash
# npm 조직 'transight-design' 생성 후
npm login
cd packages/cli
npm run build
npm publish --access public
```

또는 changesets로 자동화:
```bash
npx changeset
npm run version
npm run release   # CI에서 NPM_TOKEN secret 사용
```

## 7. (옵션) MCP 서버

AI 에이전트(Claude Code 등)가 자연어로 컴포넌트 설치 가능하게 하는 Model Context Protocol 서버. 우선순위 낮음 — 사용자/팀 수요 생기면 진행.

shadcn 본체에 [v0 MCP 가이드](https://ui.shadcn.com/docs/mcp)가 있어 참고 가능.

---

## Phase 6 전체 마무리 체크리스트

- [x] 라이브 프리뷰 + 코드 복사 버튼 + props 문서 (간소화: dependencies/registryDependencies 표시)
- [x] MIT 라이선스
- [x] CONTRIBUTING
- [x] CI
- [x] 버전 관리 (changesets)
- [ ] **공식 registry index 제출** ← GitHub 푸시 후
- [ ] (옵션) MCP 서버

브리프 정의상 Phase 6 마무리는 GitHub 푸시 + registry 등록까지가 완전체. 코드 측면 전부 끝.

## 권장 다음 액션

1. **위 §1 GitHub 푸시** — 가장 먼저
2. CI 그린 확인
3. CLI 실제 검증 (임시 앱)
4. Vercel 배포 (선택)
5. registry 등록 (선택)
