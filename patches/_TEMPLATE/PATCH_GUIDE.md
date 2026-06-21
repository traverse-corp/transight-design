# PATCH: <one-line title>

> 수신측 에이전트(Claude Code) 적용 지시서.
> 이 번들은 stale 워킹트리에서 작성됨 — 최신 형상에서 앵커가 다를 수 있음.

## Intent

<이 패치가 달성하는 바를 1~2문장으로. 왜 필요한지 포함.>

## Target files

| 파일 | 변경 종류 | 앵커 |
|------|-----------|------|
| `packages/ui/src/components/<name>.tsx` | edit | `export const <name>Variants = cva(` |
| `packages/ui/registry.json` | regenerate | (빌드 산출물 — 직접 손대지 말 것) |

## Apply steps

### 1. `packages/ui/src/components/<name>.tsx`

`Read` 후 `Edit`:

**old_string** (수신측 현재 파일에서 찾아야 할 블록):
```tsx
<verbatim 기존 코드 — 가능하면 unique한 줄 포함>
```

**new_string** (교체 후):
```tsx
<verbatim 새 코드>
```

> 만약 `old_string`이 그대로 안 보이면: <대안 안내, 또는 "수신측이 판단해서 반영">

### 2. 레지스트리 재생성

`Bash`:
```bash
npm run build
```

`registry.json` / `variants.json`이 자동 갱신됨. 수동 편집 금지.

## Conflict handling

- 앵커 블록이 이미 다른 형태로 존재 → <어떻게 머지할지, 또는 수신측에 위임>
- 파일 자체가 없어졌으면 → <스킵 / 새로 만들기 / 사용자 확인>

## Verification

수신측에서 적용 후 다음을 실행:

```bash
npm run typecheck
npm run lint
npm run build
```

기대 결과: <pass 기준, 예: typecheck 0 errors, registry build 성공>

## 정리

적용·푸시 완료 후 stale 측에서 이 디렉토리(`patches/<this-bundle>/`)를 삭제하거나
`patches/_applied/`로 이동.
