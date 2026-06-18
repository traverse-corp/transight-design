# Phase 6b — 컴포넌트 라이브 프리뷰 + 코드 표시 (완료)

## 결과

| 항목 | 결과 |
|---|---|
| 동적 라우트 | `/components/[name]` (generateStaticParams로 81개 prerender) |
| 라이브 프리뷰 | 10개 (base 컴포넌트) |
| 코드 표시 | 모든 81 아이템 — files[0].content 인라인 |
| 설치 명령 | Transight CLI + shadcn GitHub 직접 (2종) |
| 메타 패널 | Type · NPM 의존성 · Registry 의존성 · 파일 목록 |
| 빌드 | ✅ 85 페이지 정적 prerender, /components 16.7KB, 123KB first load |

## 생성된 파일

```
apps/registry/src/
├── app/
│   ├── globals.css                # 디자인 시스템 CSS 통합 (tokens/theme/typo/flex 전부 import)
│   ├── page.tsx                   # 인덱스 — /components/[name] 링크로 변경
│   └── components/[name]/page.tsx # 동적 라우트
├── components/
│   ├── code-block.tsx             # 모노 코드 + 복사 버튼
│   ├── copy-button.tsx            # 클립보드 복사 (client)
│   ├── install-commands.tsx       # CLI + shadcn 명령 2종
│   └── metadata-panel.tsx         # type · deps · regDeps · files
└── previews/
    ├── index.ts                   # name → Preview 매핑
    ├── button.tsx                 # 9 variant + 2 size
    ├── badge.tsx                  # 6 variant
    ├── alert.tsx                  # 기본 + destructive
    ├── card.tsx                   # Header/Content/Footer 풀 컴포지션
    ├── separator.tsx
    ├── skeleton.tsx               # text + block
    ├── spinner.tsx                # 색상 3종
    ├── avatar.tsx                 # image + fallback + 크기
    ├── input.tsx                  # text + password + disabled
    └── label.tsx                  # Label + Input 조합
```

## 핵심 설계 결정

### 1. 디자인 시스템 CSS 글로벌 통합

`apps/registry/src/app/globals.css`에서 `packages/ui/src/styles/*.css` 전부 import + `@source`로 컴포넌트 스캔 등록.

- 모든 페이지에서 디자인 시스템 토큰·유틸 사용 가능
- 컴포넌트 프리뷰가 실사용 환경과 동일하게 렌더링됨
- 문서 사이트 자체 토큰은 `--color-doc-*` prefix로 분리

### 2. Path 충돌 해결 (중요)

`packages/ui` 컴포넌트는 내부에서 `@/lib/utils`를 import. 이를 registry app에서 import하면 registry의 `@/`(=`./src/*`)와 충돌. shadcn 배포 방식 유지 위해 ui 소스의 `@/` 표기 보존이 필수 (사용자가 받았을 때 본인의 `@/`로 그대로 동작해야 함).

**해결**: registry tsconfig의 paths에 **fallback 추가**:
```json
"paths": {
  "@/*": ["./src/*", "../../packages/ui/src/*"]
}
```

- TS는 첫 매칭 → fallback 순으로 시도. registry에 없는 경로는 ui src에서 찾음
- Next.js도 동일하게 tsconfig paths 적용 → 런타임도 정상
- ui와 registry에서 같은 이름 충돌 안 됨 (확인됨)

추가로 `next.config.ts`에 `transpilePackages: ['@transight-design/ui']`로 ui의 .tsx 트랜스파일 명시.

### 3. `exports` 필드에 확장자 명시

`packages/ui/package.json` exports를 wildcard에서 `*.tsx` / `*.ts` 명시로 변경:
```json
"./components/*": "./src/components/*.tsx",
"./tokens/*": "./src/tokens/*.ts",
"./tokens": "./src/tokens/index.ts",
"./lib/*": "./src/lib/*.ts",
"./lib/hooks/*": "./src/lib/hooks/*"
```

TS Bundler 모듈 해석이 확장자 없는 wildcard에서 .tsx를 자동 추론하지 못해 발생한 오류 해결.

## 프리뷰 범위 (10개)

provider 없이 즉시 동작하는 base 컴포넌트만 선정. 나머지 71개는 "Preview는 Phase 6c에서 추가" placeholder.

향후 추가 시 고려:
- **Provider 필요**: Tooltip, Sonner, Toast (각 Provider 래핑)
- **i18n 의존**: CopyButton, hash-text, AlertDialog 등 (`I18nextProvider` 스텁)
- **복잡한 상태**: Dialog, AlertDialog, Sheet, Popover, DropdownMenu (open state 데모)
- **Form 결합**: Field, FieldGroup, RadioGroup, Checkbox (제어 상태 데모)
- **도메인 의존**: clickable-addr, clickable-tx (mock onSelect)

## 검증

```
$ npx tsc -p apps/registry/tsconfig.json --noEmit
exit: 0

$ npx next build
✓ Compiled successfully in 2.7s
✓ Generating static pages (85/85)
Route (app)                  Size      First Load JS
○ /                          161 B     106 kB
● /components/[name]         16.7 kB   123 kB
    ├ /components/style-flex
    ├ /components/styles
    └ [+78 more paths]
```

전 81 아이템이 빌드 타임에 정적 prerender됨. 사용자가 dev 서버 띄우면 즉시 모든 경로 접근 가능.

## 사용자 확인

```bash
cd C:\Users\송경후\traverse\1-Services\transight-design\apps\registry
npm run dev

# http://localhost:3000/                       — 인덱스
# http://localhost:3000/components/button      — 라이브 프리뷰 ✅
# http://localhost:3000/components/badge       — 라이브 프리뷰 ✅
# http://localhost:3000/components/AlertDialog — "Preview는 6c에서" + 코드/메타
```

## 다음 (Phase 6c — 오픈소스 인프라)

브리프 §Phase 6 잔여:
1. **MIT 라이선스** 파일 추가
2. **CONTRIBUTING.md** — 컴포넌트 추가 절차 가이드
3. **CI** — typecheck + registry validate + build (GitHub Actions)
4. **changesets** — 버전 관리
5. **공식 shadcn registry index 제출** — namespace 등록
6. (옵션) **MCP 서버** — AI 에이전트 직접 설치

추가로 6b 후속 (선택):
- 나머지 71개 컴포넌트에 프리뷰 점진 추가
- 검색·필터 UI
- 다크 모드 토글 (디자인 시스템 `.dark` 클래스 활용)
- 코드 신택스 하이라이팅 (shiki)
