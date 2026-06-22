# 설계 노트 — Icon system v1

## 결정 사항

| 항목 | 결정 | 근거 |
|------|------|------|
| 렌더링 방식 | SVG sprite + `<use href="#id">` | 50개 이상 권장 규모, currentColor 동작, SSR 안전, framework-agnostic |
| sprite 마운트 | `<IconSprite />` 컴포넌트 한 번 | hidden `<svg>` 인라인, 추가 HTTP 없음, 컨슈머 빌드 설정 불필요 |
| src 타입 | 자동 생성 union (`IconName`) | 오타·존재하지 않는 아이콘을 컴파일 단계에서 차단 |
| color 타입 | strict 팔레트 토큰 union | 시맨틱 토큰 배제 (사용자 요청), `var(--color-<token>)` 매핑 |
| size 매핑 | xs/sm/md/lg/xl = 12/14/16/20/24 | 일반 UI 권장값 |
| default color | `cool-grey-06` | 사용자 지정 (`#969faf`) |
| default size | `md` (16) | 본문 inline용 |
| a11y | 항상 `aria-hidden="true"` | 순수 표출용, 의미 있는 아이콘은 부모에 label 부여 |
| interactive | 없음 (`onClick` 등 비허용) | 명시적 설계 — 클릭 가능해야 하면 `<button>`으로 감쌀 것 |

## 빌드 정규화 항목

빌드 스크립트(`build-icons.mjs`)가 SVG를 sprite화하면서 수행하는 변환:

1. **하드코딩 색상 정규화** — `fill="black|#000|#000000"` → `fill="currentColor"`. stroke도 동일.
2. **내부 ID prefix** — Figma export 시 자동 부여되는 `id="clip0_860_1735"` 같은 ID가 sprite에 모이면 충돌. `<icon-id>__` 접두사로 격리.
3. **파일명 slugify** — `mail-forward 1.svg` → `"mail-forward-1"`. 공백·언더스코어·특수문자 제거.
4. **viewBox 강제** — 없으면 빌드 실패. 모든 입력 SVG는 viewBox 가져야 함 (현재 58개 모두 만족).

## 명시적으로 다루지 **않는** 것

이 v1 범위 밖, 다음 패치에서 다룸:

- **registry 항목으로 등록** (shadcn `npx ... add icon`으로 컨슈머가 설치 가능하게)
- **컨슈머 배포 패키징** — 현재 sprite는 ui 패키지 내부 모듈. 외부 컨슈머용으로는
  static asset URL 방식이 더 적합할 수 있음 (재검토 필요).
- **다색 아이콘** — sprite + currentColor 조합은 단색만 깔끔히 지원. 다색이 필요해지면
  symbol 내부에서 CSS 변수로 fill 별도 슬롯 도입 검토.
- **트리 셰이킹** — sprite 방식은 사용한 아이콘만 번들에 남기기 어려움. 58개 정도 규모에서는
  비용 무시 가능. 수백 개로 증가하면 per-icon 모듈 방식 재검토.
- **아이콘 카탈로그 문서 페이지** — `apps/registry/src/app/icons/` 같은 미리보기 페이지.

## 기존 컴포넌트들과의 호환

`packages/ui/src/components/` 의 기존 컴포넌트 중 lucide-react 아이콘을 쓰는 곳들
(button, badge 등)은 그대로 둠. 이 시스템과 별개로 공존 가능. 점진 마이그레이션은
별도 패치.
