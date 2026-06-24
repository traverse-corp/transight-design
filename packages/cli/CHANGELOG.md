# @transight-design/cli

## 0.2.0

### Minor Changes

- variant add 서브커맨드 추가 — Style 4축(color/theme/shape/size) 조합을 한 줄 CLI 명령으로
  컴포넌트 파일의 `<X>VariantPresets` 객체에 자동 등록. AI 에이전트 종류 무관(Claude/Cursor/
  Cline/Codex/Gemini 등 모두 동일하게 위임 가능).

  사용:

  ```bash
  npx @transight-design/cli variant add --component=button --name=my-brand --color=blue --theme=soft
  ```

  - 사용자 repo의 `src/components/{base|custom}/<X>.tsx`를 자동 탐색 (`--path`로 override 가능)
  - 균형잡힌 중괄호 카운팅으로 `<X>VariantPresets` 객체 범위 찾아 한 줄 삽입
  - `--dry-run` 지원: 파일 변경 없이 결과 미리보기
