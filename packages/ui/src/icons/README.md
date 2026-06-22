# icons/

Generated icon sprite + types. **Never edit `*.gen.*` files by hand** — they're
overwritten by `scripts/build-icons.mjs` on every build.

## Files

| File | Source | Purpose |
|------|--------|---------|
| `sprite.gen.tsx` | generated | `<IconSprite />` React component — mount once at app root |
| `icons.gen.ts` | generated | `type IconName` union + `ICON_NAMES` const array |

Source SVGs live at **`<repo-root>/svg/`** (outside `packages/ui` so designers can drop
files in without touching the component lib).

## Regenerate

From `packages/ui/`:

```bash
node scripts/build-icons.mjs
```

Or via the wired-up script (added to `package.json`):

```bash
npm run build:icons
```

## How it works

1. Build script reads every `*.svg` in `/svg/`.
2. Filename → icon id (slugified, lowercase, hyphenated). e.g. `ic-com-search.svg` → `"ic-com-search"`.
3. Normalizes each SVG:
   - `fill="black"|"#000"|"#000000"` → `fill="currentColor"` (same for stroke)
   - Internal IDs (e.g. Figma's `clip0_860_1735`) prefixed with `<icon-id>__` to avoid collisions when symbols share a document.
4. Wraps inner SVG in `<symbol id="<icon-id>" viewBox="...">...</symbol>`.
5. Concatenates all symbols into a hidden `<svg>` and emits as `<IconSprite />`.
6. Emits `IconName` union from the icon id list.

## Usage

```tsx
import { IconSprite } from "@/icons/sprite.gen";
import { Icon } from "@/components/icon-next";

// once at app root (e.g. Next.js layout.tsx inside <body>)
<IconSprite />

// anywhere
<Icon src="ic-com-search" color="primary-blue-1" size="sm" />
```

> **NB**: `icon-next.tsx`는 sprite 기반 신규 시스템. 기존 mask-image 기반 `icon.tsx`는
> 별도 파일로 공존 — 통합 전략은 `patches/2026-06-21-icon-system/PATCH_GUIDE.md` 참고.
