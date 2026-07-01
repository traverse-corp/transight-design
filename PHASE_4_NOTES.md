# Phase 4 — 레지스트리 구성 (완료)

## 결과

| 항목 | 수치 |
|---|---|
| 총 레지스트리 아이템 | **81** |
| 검증 | ✅ `shadcn registry validate` 통과 |
| 빌드 산출물 | `public/r/*.json` (82개 — 81 items + 1 인덱스) |

## 아이템 분류

| 타입 | 개수 | 내용 |
|---|---|---|
| `registry:style` | 5 | tokens, theme, typography, flex, index(styles) |
| `registry:lib` | 5 | utils, format, get-strict-context, pagination-types, tokens(TS) |
| `registry:hook` | 4 | use-mobile, use-controlled-state, use-caps-lock, use-adaptive-chars |
| `registry:ui` | 66 | 모든 컴포넌트 |
| `registry:item` | 1 | `transight-design` — 전체 번들 (모든 아이템 의존성) |

## SUIT 폰트 처리

브리프는 `registry:font` 항목을 명시했으나, **shadcn 스키마는 `registry:font`를 Google Fonts 전용** (`provider: 'google'`)으로 제약. SUIT는 자체 CDN(jsdelivr `sunn-us/SUIT`)이라 별도 항목 불가.

→ `typography.css` 안의 `@import url('https://cdn.jsdelivr.net/.../SUIT-Variable.css')`로 통합 유지. `style-typography` 아이템에 포함됨.

## 자동 생성 스크립트

`packages/ui/scripts/build-registry.mjs` — `src/` introspection으로 아이템 생성:

- import 파싱으로 `registryDependencies` 자동 추출 (`@/components/X`, `@/lib/X`, `@/lib/hooks/X`)
- 외부 패키지 import는 화이트리스트(`EXTERNAL_DEPS`)와 매칭하여 `dependencies` 자동 추출
- 화이트리스트 외 외부 패키지 발견 시 stderr 경고

## 스크립트 (`packages/ui/package.json`)

```bash
npm run registry:generate   # src/ → registry.json
npm run registry:validate   # shadcn 스키마 검증
npm run registry:build      # registry.json → public/r/*.json
npm run build               # generate + build (한 방)
```

## 빌드 검증

```bash
$ cd packages/ui
$ npm run registry:validate
✔ Registry is valid.
✔ Checked 1 registry file and 81 items.

$ npm run registry:build
✔ Building registry.
$ ls public/r/ | wc -l
82
```

`public/r/button.json` 같은 아이템 파일에는 `files[].content`로 컴포넌트 소스가 완전히 인라인 — shadcn CLI가 그대로 가져다 사용자 프로젝트에 복사.

## 브리프 §Phase 4 항목 대응

- [x] `registry.json` 작성 — 81 items (`include` 분리 미사용, 단일 파일)
- [x] 항목별 타입 매핑 — 2번 표대로
- [x] 전체 번들 = `transight-design` 아이템 (`registry:item` + 80개 `registryDependencies`)
- [x] `npx shadcn build` → `public/r/*.json` 생성 ✅
- [ ] **검증: 임시 테스트 앱 설치 확인** — Phase 4 후속. 진행 방법은 아래.
- ⚠️ **브리프의 `registry:base` 타입** — 실제 스키마에는 있으나 우리 케이스에서는 `registry:item` 번들로 충분. `registry:base`는 별도 base style(아이콘 라이브러리, baseColor 등)을 정의할 때 사용.

## 설치 검증 (사용자 직접 실행)

레지스트리를 호스팅하기 전 로컬 파일로 검증할 수 있음. 임시 Vite 앱에서:

```bash
# 임시 앱 생성
npm create vite@latest test-install -- --template react-ts
cd test-install
npm install
npx shadcn@latest init --defaults

# 로컬 파일로 단일 컴포넌트 설치
npx shadcn@latest add /path/to/transight-design/packages/ui/public/r/button.json --dry-run
npx shadcn@latest add /path/to/transight-design/packages/ui/public/r/button.json

# 전체 번들
npx shadcn@latest add /path/to/transight-design/packages/ui/public/r/transight-design.json
```

호스팅 후에는 URL 또는 GitHub 주소로 가능:

```bash
# 정적 호스팅 (apps/registry에 Next.js 배포 후)
npx shadcn@latest add https://transight-design.netlify.app/r/button.json

# 또는 GitHub 직접 (브리프 §Phase 4: "공개 GitHub 레지스트리로 빌드 생략 검토")
npx shadcn@latest add traverse-corp/transight-design/button
```

후자가 단순함 — 빌드된 `public/r/*.json`을 호스팅할 필요 없이 source `registry.json`을 GitHub에서 직접 읽어감. Phase 6 (오픈소스 런칭) 시점에 결정.

## 알려진 제약

1. **컴포넌트 import 추출의 한계** — 정규식 기반이라 동적 import, side-effect import 등은 못 잡음. 다행히 우리 컴포넌트는 static import만 사용.
2. **`registryDependencies` 모두 bare name** — 같은 레지스트리 내라 `transight-design/button` 같은 prefix 없이 `button`만 적음. 다른 레지스트리의 shadcn 공식 `button`과 이름 충돌 가능. 사용자가 `npx shadcn add @transight-design/button` 처럼 namespace로 부르면 해소.
3. **자산(아이콘) stub** — `CoinIcon`, `icon`은 `@/assets/*` placeholder 의존. 사용자 아이콘 파일 도착 시 stub 교체 + 재빌드 필요.

## 다음 (Phase 5 — 자체 CLI)

`packages/cli/`:
1. `bin: transight-design` (또는 `@transight-design/ui`)
2. `init` — 디자인 시스템 base + 토큰 + 폰트 한 방 설치 (`shadcn add transight-design` 위임)
3. `add` — `shadcn add @transight-design/{name}` 얇은 래퍼
4. 자체 UX/브랜딩 옵션만 추가, 나머지는 shadcn 로직 위임
