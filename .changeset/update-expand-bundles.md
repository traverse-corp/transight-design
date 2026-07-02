---
'@transight-design/cli': patch
---

`update` 커맨드가 번들 아이템(`base`, `essential` 등 registry:item)을 받으면 `registryDependencies`를 컴포넌트 이름으로 풀어서 재귀적으로 업데이트하도록 확장. 이제 `transight-design update base` 로 base 번들에 포함된 이미 설치된 컴포넌트 파일들을 한 번에 갱신할 수 있음.
