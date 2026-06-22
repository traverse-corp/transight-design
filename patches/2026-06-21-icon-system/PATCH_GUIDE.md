# PATCH: Icon system (sprite + `<Icon>` component)

> 수신측(같은 Claude Code) 적용 지시서. 이 번들은 stale 워킹트리에서 작성됨.
> 이미 커밋되어 push되면 git pull로 받게 되며, 그 후 이 가이드대로 통합 작업을 진행.

## ⚠️ 가장 먼저 — 기존 Icon과의 공존 결정

**stale 트리에 이미 `packages/ui/src/components/icon.tsx` (옛 시스템)가 존재했음**
— mask-image + `ICON_MAP` 기반, `size × 4 = px`, `label` prop, `text-*` className으로 색상 제어.

신규 시스템은 **충돌을 피하기 위해 `packages/ui/src/components/icon-next.tsx`**로
별도 파일에 두었음. 같은 commit 안에 다음이 공존:

| 파일 | 시스템 | API |
|------|--------|-----|
| `packages/ui/src/components/icon.tsx` (기존, 변경 없음) | mask-image + ICON_MAP | `<Icon src size={4} label className />` |
| `packages/ui/src/components/icon-next.tsx` (신규) | SVG sprite + `<use>` | `<Icon src color="cool-grey-06" size="md" className />` |

수신측은 pull 후 다음 중 하나를 선택:

1. **병행 유지** — 두 시스템 공존, 점진 마이그레이션. 가장 안전. (`icon-next.tsx` 그대로 두고 신규 컴포넌트가 이걸 사용)
2. **신규로 대체** — `icon.tsx` 삭제 + `icon-next.tsx` → `icon.tsx`로 rename + ICON_MAP/assets/icons 정리. 모든 기존 호출부 마이그레이션 필요 (size 4 → "md", className 색상 → color prop).
3. **신규 폐기** — 기존 mask-image 시스템 계속 사용. `icon-next.tsx` + `src/icons/` + svg/ + scripts/build-icons.mjs + apps/registry/src/app/icon-system/ 제거.

**최신 트리에 이미 새 sprite 시스템이 있다면** → 충돌이므로 diff 보고 한쪽으로 정리.

## Intent (신규 시스템 자체)

루트 `svg/` 디렉토리에 있는 58개 SVG 파일을 빌드 타임에 단일 sprite로 합치고,
`src`, `color`, `size`, `className` 4개 prop만 받는 순수 표출용 `<Icon>` 마스터 컴포넌트.
색상은 `tokens.css`의 cool-grey/primary-blue/ui-* 팔레트 토큰만 받고 (시맨틱 토큰 사용 안 함),
크기는 `xs/sm/md/lg/xl` = 12/14/16/20/24 px. 기본값 `color="cool-grey-06"`, `size="md"`.
항상 `aria-hidden="true"` (decorative 전용). onClick 등 비허용.

## 신규 파일 목록 (commit에 포함됨)

git pull 받으면 다음이 새로 들어옴 (기존 추적 파일은 안 건드림):

```
svg/                                                # 58 SVG 소스
packages/ui/scripts/build-icons.mjs                 # sprite 생성 스크립트
packages/ui/src/components/icon-next.tsx            # 신규 Icon 컴포넌트
packages/ui/src/icons/.gitignore                    # *.gen.* 제외
packages/ui/src/icons/README.md                     # 디렉토리 설명
apps/registry/src/app/icon-system/                  # 미리보기 페이지 (page + preview-shell)
patches/2026-06-21-icon-system/                     # 이 가이드 + files/ 미러
```

**수정 파일** (한 곳뿐):
- `apps/registry/src/app/page.tsx` — 헤더 아래 Icon System 진입 카드 한 섹션 삽입

## 적용 절차

### 1. (자동) git pull 후 svg/와 신규 디렉토리가 들어와 있음을 확인

```bash
ls svg | wc -l                                # 58
ls packages/ui/src/components/icon-next.tsx   # 존재
ls packages/ui/src/icons                      # README, .gitignore
ls apps/registry/src/app/icon-system          # page.tsx, _components/
```

### 2. sprite 빌드

`*.gen.*` 파일은 gitignored. 로컬에서 한 번 돌려야 import가 풀린다.

```bash
node packages/ui/scripts/build-icons.mjs
```

기대 출력: `[build-icons] 58 icons → .../packages/ui/src/icons`

생성:
- `packages/ui/src/icons/sprite.gen.tsx`
- `packages/ui/src/icons/icons.gen.ts`

### 3. (권장) `predev`/`prebuild` 훅 등록 — `packages/ui/package.json`

**Read** `packages/ui/package.json`. `scripts`에 다음 추가 (기존 prebuild/predev가
있으면 체이닝):

```json
"build:icons": "node scripts/build-icons.mjs"
```

```jsonc
// 기존이 "prebuild": "<other>"라면:
"prebuild": "node scripts/build-icons.mjs && <other>",
// 기존 predev도 동일 체이닝
```

`build:icons`는 신규이므로 그대로 추가.

### 4. (선택) 메인 페이지 진입 카드 — 이미 commit에 포함됨

`apps/registry/src/app/page.tsx`는 commit에서 이미 수정된 상태로 pull됨.
헤더 아래에 `/icon-system` 링크 카드가 한 섹션 들어가 있음.

만약 머지 충돌이 났다면 (수신측에서 page.tsx를 별도로 수정했을 경우):

**앵커 = 설치 섹션 시작 직전**. 다음 블록 직전에 카드 섹션 삽입:

```tsx
<section className='mb-10 rounded-lg border border-[color:var(--color-doc-border)] bg-[#fbfcfe] p-6'>
  <h2 className='mb-3 text-lg font-semibold'>설치</h2>
```

삽입할 카드 (앵커 직전):

```tsx
<section className='mb-10'>
  <Link
    href='/icon-system'
    className='group flex items-center justify-between rounded-lg border border-[color:var(--color-doc-border)] bg-[#fbfcfe] p-5 transition hover:border-[color:var(--color-doc-accent)]'
  >
    <div>
      <div className='text-xs font-semibold uppercase tracking-wider text-[color:var(--color-doc-muted)]'>
        Foundation
      </div>
      <div className='mt-1 text-lg font-bold text-cool-grey-11'>Icon System</div>
      <div className='mt-1 text-sm text-[color:var(--color-doc-muted)]'>
        58개 아이콘 · 색상·크기 토큰 인터랙티브 미리보기
      </div>
    </div>
    <div className='text-cool-grey-06 transition group-hover:text-[color:var(--color-doc-accent)]'>→</div>
  </Link>
</section>
```

`Link`는 `next/link`. page.tsx 1행에 `import Link from 'next/link'`가 있는지 확인.

### 5. (선택) `packages/ui` export map

외부에서 `@transight-design/ui/icons/sprite.gen` / `@transight-design/ui/components/icon-next`
로 import하려면 `packages/ui/package.json`의 `exports` 필드에 추가:

```jsonc
"exports": {
  // 기존 ...
  "./icons/sprite.gen": "./src/icons/sprite.gen.tsx",
  "./components/icon-next": "./src/components/icon-next.tsx"
}
```

apps/registry는 tsconfig의 `@/*` alias로 직접 packages/ui/src 접근 가능하므로
필수는 아님 — registry 배포 단계 진입 시 추가.

## Verification

```bash
npm run typecheck
npm run dev   # 또는 npm run dev --workspace=@transight-design/registry
```

브라우저:
- `http://localhost:3000` → 헤더 아래에 "Icon System" 카드 노출
- 카드 클릭 → `/icon-system` 진입
- 5개 size 버튼 / 37개 color 토큰 버튼 / 58개 아이콘 그리드
- 아이콘 카드 클릭 → 클립보드에 `<Icon src="..." color="..." size="..." />` 복사
- 카드 우상단에 "Copied" 배지 1.2초 표시

TS:
- `<Icon src="ic-nonexistent" />` → 컴파일 에러
- `<Icon color="purple" />` → 컴파일 에러 (`ui-purple`이 올바른 토큰명)

## 정리

성공 후:
- 통합 전략을 결정해서 적용 (병행/대체/폐기 중 하나)
- `patches/2026-06-21-icon-system/`은 `patches/_applied/`로 이동하거나 PR merge 후 제거

## 비고

- sprite.gen.tsx / icons.gen.ts는 gitignored. 로컬 빌드로만 존재.
- registry 배포 파이프라인(`registry:build`)에 신규 아이콘 시스템을 포함시키는 작업은
  별도 패치에서 다룸 — 이 번들은 dev 서버에서 동작하는 v1 골격 + 미리보기까지만 담당.
- 옛 `icon.tsx`는 이 commit에서 한 글자도 안 건드려졌으니, 다른 머신에서 그 API에
  의존하던 미푸시 작업은 그대로 살아있어야 함.
