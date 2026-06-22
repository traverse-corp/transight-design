import * as React from "react";
import { cn } from "@/lib/utils";
import type { IconName } from "@/icons/icons.gen";

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

const SIZE_PX: Record<IconSize, number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
};

// Color palette token names from packages/ui/src/styles/tokens.css.
// Resolved at render time as `var(--color-<token>)` and applied via CSS `color`,
// which the sprite's currentColor fill/stroke inherits.
export type IconColor =
  | "cool-grey-white"
  | "cool-grey-01"
  | "cool-grey-02"
  | "cool-grey-03"
  | "cool-grey-04"
  | "cool-grey-05"
  | "cool-grey-06"
  | "cool-grey-07"
  | "cool-grey-08"
  | "cool-grey-09"
  | "cool-grey-10"
  | "cool-grey-11"
  | "cool-grey-black"
  | "primary-blue-1"
  | "primary-blue-2"
  | "primary-blue-deep"
  | "primary-skyblue-1"
  | "primary-skyblue-2"
  | "accent-amber"
  | "ui-red"
  | "ui-orange"
  | "ui-yellow"
  | "ui-olive"
  | "ui-green"
  | "ui-skyblue"
  | "ui-blue"
  | "ui-purple"
  | "ui-pink"
  | "ui-text-red"
  | "ui-text-orange"
  | "ui-text-yellow"
  | "ui-text-olive"
  | "ui-text-green"
  | "ui-text-skyblue"
  | "ui-text-blue"
  | "ui-text-purple"
  | "ui-text-pink";

export interface IconProps {
  src: IconName;
  color?: IconColor;
  size?: IconSize;
  className?: string;
}

/**
 * Pure display icon. References a <symbol> inside the <IconSprite /> that must be
 * mounted once at the app root.
 *
 * No interactive props (onClick etc.) by design — wrap with a button if needed.
 */
export function Icon({
  src,
  color = "cool-grey-06",
  size = "md",
  className,
}: IconProps) {
  const px = SIZE_PX[size];
  return (
    <svg
      width={px}
      height={px}
      aria-hidden="true"
      focusable="false"
      style={{ color: `var(--color-${color})` }}
      className={cn("inline-block shrink-0", className)}
    >
      <use href={`#${src}`} />
    </svg>
  );
}
