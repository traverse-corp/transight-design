# icon-system/

자체 SVG sprite + `<Icon>` 컴포넌트. 색상은 `tokens.css`의 팔레트 토큰,
크기는 `xs/sm/md/lg/xl` = 12/14/16/20/24 px로 제한된 strict union.

## 파일

| File | 종류 | 역할 |
|------|------|------|
| `icon.tsx` | 소스 | `<Icon src color size className />` 컴포넌트 |
| `sprite.gen.tsx` | 생성 | `<IconSprite />` — 앱 루트에 한 번 마운트 |
| `icons.gen.ts` | 생성 | `IconName` union + `ICON_NAMES` const |

원본 SVG는 `<repo-root>/svg/`에 둔다. `*.gen.*`은 절대 손대지 않는다.

## 재생성

```bash
npm run build:icons   # from packages/ui/
```

`predev` / `prebuild` 훅에 연결되어 있어 일반 개발/빌드 시 자동 실행됨.

## 사용

```tsx
import { IconSprite } from '@/icons/sprite.gen'
import { Icon } from '@/icons/icon'

// 앱 루트(Next.js layout.tsx의 <body> 안 등)에 한 번
<IconSprite />

// 어디서든
<Icon src='ic-com-search' color='primary-blue-1' size='sm' />
```

`<IconSprite />`를 마운트하지 않으면 `<Icon>`은 빈 svg를 렌더한다.
