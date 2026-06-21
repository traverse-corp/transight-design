# patches/

이 디렉토리는 **이 워킹트리가 stale인 상태에서 작성된 변경사항**을 보관합니다.
다른 머신에 더 최신 형상(미푸시 커밋 포함)이 있으므로, 이쪽에서 만든 수정은
기존 추적 파일을 직접 건드리지 않고 여기에 패치 번들 형태로 모입니다.

수신측 에이전트(같은 Claude Code)가 최신 형상에서 각 번들을 읽고 적용합니다.

## 디렉토리 구조

```
patches/
  2026-06-21-<task-slug>/
    PATCH_GUIDE.md     ← 수신측 에이전트에게 주는 적용 지시서 (필수)
    files/             ← 통째로 교체/추가할 파일의 완성본 (선택)
      <mirrored path>
    diff.patch         ← 트리비얼한 줄 단위 변경에 한해 git diff 첨부 (선택)
    NOTES.md           ← 결정 배경, 트레이드오프 등 (선택)
```

네이밍: `YYYY-MM-DD-kebab-case-slug` (예: `2026-06-21-fix-button-variants`).

## PATCH_GUIDE.md 작성 규칙

수신측이 Claude Code임을 전제로, **툴 콜 단위의 명시적 지시**로 작성합니다.

필수 섹션:

1. **Intent** — 이 패치가 무엇을 달성하는가 (1~2문장).
2. **Target files** — 변경 대상 파일을 리포 루트 기준 상대 경로로 나열.
   각 파일마다 **앵커**를 명시 (함수명, export명, 고유 식별 문자열).
   **줄 번호는 앵커로 쓰지 말 것** — 최신 형상에서 이미 이동했을 가능성이 높음.
3. **Apply steps** — 수신측 에이전트의 툴 콜로 표현:
   - "`Read` `packages/ui/src/components/button.tsx`"
   - "`Edit`: `old_string` = 아래 블록 / `new_string` = 아래 블록"
   - 또는 "`Write` `files/<path>` 내용으로 `<target>` 통째 교체"
4. **Conflict handling** — 앵커가 이미 다르게 변경돼 있을 가능성이 있으면
   "이런 모습이면 [[이렇게]], 저런 모습이면 [[수신측 판단]]" 식으로 분기 명시.
5. **Verification** — 적용 후 수신측이 돌릴 검증 커맨드.
   예: `npm run typecheck`, `npm run build`, `npm run registry:validate`.

### 좋은 앵커 / 나쁜 앵커

| 좋음 | 나쁨 |
|------|------|
| `export const buttonVariants = cva(` | `line 14` |
| `cn("inline-flex items-center justify-center"` | `the className string` |
| `// registry: 'base/button'` | `the top of the file` |

## 템플릿

새 패치를 시작할 때 `patches/_TEMPLATE/`를 복사해 쓰면 됩니다.

## 적용 후 정리

수신측에서 패치를 반영하고 푸시까지 마치면, 이 stale 리포를 pull한 뒤
해당 `patches/<bundle>/` 폴더를 삭제(또는 `patches/_applied/`로 이동)하면 됩니다.
