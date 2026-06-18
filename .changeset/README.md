# Changesets

이 폴더에 패키지 변경 기록(`.md` 파일)을 쌓는다. 릴리즈 시점에 모아서 버전 bump + CHANGELOG 생성.

## 변경 기록 추가

```bash
npx changeset
```

대화형 질의:
1. 영향받는 패키지 선택 (스페이스로 토글)
2. 각 패키지의 변경 타입 (major / minor / patch)
3. 변경 설명 입력 (CHANGELOG에 들어감)

→ `.changeset/<random-name>.md` 생성. **PR에 포함해서 머지**.

## 릴리즈 (메인테이너)

```bash
npm run version    # changeset version — 버전 bump + CHANGELOG 갱신
git add -A && git commit -m "chore: version packages"
git push
npm run release    # changeset publish — npm 발행 (CI에서 실행 권장)
```

## 무시되는 패키지

`@transight-design/registry`는 문서 사이트 (`private: true`) — publish 대상 아님. `config.json`의 `ignore`에 포함.

## 참고

https://github.com/changesets/changesets/blob/main/docs/intro-to-using-changesets.md
