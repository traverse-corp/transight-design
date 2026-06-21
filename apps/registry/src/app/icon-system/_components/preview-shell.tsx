"use client";

import * as React from "react";
import { Icon, type IconColor, type IconSize } from "@/components/icon-next";
import { ICON_NAMES } from "@/icons/icons.gen";

const SIZES: { value: IconSize; label: string; px: number }[] = [
  { value: "xs", label: "xs", px: 12 },
  { value: "sm", label: "sm", px: 14 },
  { value: "md", label: "md", px: 16 },
  { value: "lg", label: "lg", px: 20 },
  { value: "xl", label: "xl", px: 24 },
];

const COLOR_GROUPS: { label: string; colors: IconColor[] }[] = [
  {
    label: "cool-grey",
    colors: [
      "cool-grey-white",
      "cool-grey-01",
      "cool-grey-02",
      "cool-grey-03",
      "cool-grey-04",
      "cool-grey-05",
      "cool-grey-06",
      "cool-grey-07",
      "cool-grey-08",
      "cool-grey-09",
      "cool-grey-10",
      "cool-grey-11",
      "cool-grey-black",
    ],
  },
  {
    label: "primary",
    colors: [
      "primary-blue-1",
      "primary-blue-2",
      "primary-blue-deep",
      "primary-skyblue-1",
      "primary-skyblue-2",
    ],
  },
  { label: "accent", colors: ["accent-amber"] },
  {
    label: "ui",
    colors: [
      "ui-red",
      "ui-orange",
      "ui-yellow",
      "ui-olive",
      "ui-green",
      "ui-skyblue",
      "ui-blue",
      "ui-purple",
      "ui-pink",
    ],
  },
  {
    label: "ui-text",
    colors: [
      "ui-text-red",
      "ui-text-orange",
      "ui-text-yellow",
      "ui-text-olive",
      "ui-text-green",
      "ui-text-skyblue",
      "ui-text-blue",
      "ui-text-purple",
      "ui-text-pink",
    ],
  },
];

export function PreviewShell() {
  const [color, setColor] = React.useState<IconColor>("cool-grey-06");
  const [size, setSize] = React.useState<IconSize>("md");
  const [copied, setCopied] = React.useState<string | null>(null);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const copySnippet = React.useCallback(
    async (name: string) => {
      const snippet = `<Icon src="${name}" color="${color}" size="${size}" />`;
      try {
        await navigator.clipboard.writeText(snippet);
      } catch {
        // clipboard API may be unavailable (e.g. insecure context) — silently skip
      }
      setCopied(name);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(null), 1200);
    },
    [color, size],
  );

  React.useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  return (
    <div className="mx-auto max-w-6xl space-y-10 p-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-cool-grey-11">Icon System</h1>
        <p className="text-sm text-cool-grey-07">
          전체 {ICON_NAMES.length}개 아이콘 · 팔레트 토큰 색상 × 5단계 크기로 인터랙티브 미리보기.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-cool-grey-07">
          Size
        </h2>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => {
            const active = s.value === size;
            return (
              <button
                key={s.value}
                type="button"
                onClick={() => setSize(s.value)}
                className={
                  "rounded-md border px-3 py-1.5 text-sm transition " +
                  (active
                    ? "border-primary-blue-1 bg-primary-blue-1 text-cool-grey-white"
                    : "border-cool-grey-04 bg-cool-grey-white text-cool-grey-09 hover:border-cool-grey-06")
                }
              >
                <span className="font-mono">{s.label}</span>
                <span className="ml-1.5 text-xs opacity-70">{s.px}px</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-cool-grey-07">
          Color
        </h2>
        <div className="space-y-3">
          {COLOR_GROUPS.map((group) => (
            <div key={group.label} className="space-y-2">
              <div className="text-xs font-medium text-cool-grey-06">{group.label}</div>
              <div className="flex flex-wrap gap-2">
                {group.colors.map((c) => {
                  const active = c === color;
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setColor(c)}
                      title={c}
                      className={
                        "flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-xs transition " +
                        (active
                          ? "border-cool-grey-11 bg-cool-grey-02 text-cool-grey-11"
                          : "border-cool-grey-04 bg-cool-grey-white text-cool-grey-08 hover:border-cool-grey-06")
                      }
                    >
                      <span
                        className="inline-block h-3.5 w-3.5 rounded-sm border border-cool-grey-04"
                        style={{ backgroundColor: `var(--color-${c})` }}
                      />
                      <span className="font-mono">{c}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-cool-grey-07">
            Icons
          </h2>
          <div className="font-mono text-xs text-cool-grey-06">
            color=<span className="text-cool-grey-09">{color}</span> · size=
            <span className="text-cool-grey-09">{size}</span>
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-2">
          {ICON_NAMES.map((name) => {
            const isCopied = copied === name;
            return (
              <button
                key={name}
                type="button"
                onClick={() => copySnippet(name)}
                title={`Click to copy <Icon src="${name}" color="${color}" size="${size}" />`}
                className={
                  "group relative flex cursor-pointer flex-col items-center gap-2 rounded-lg border bg-cool-grey-white p-4 text-left transition " +
                  (isCopied
                    ? "border-primary-blue-1 bg-primary-skyblue-1"
                    : "border-cool-grey-04 hover:border-cool-grey-06 hover:bg-cool-grey-01 active:bg-cool-grey-02")
                }
              >
                <div className="flex h-10 w-10 items-center justify-center">
                  <Icon src={name} color={color} size={size} />
                </div>
                <div
                  className="w-full truncate text-center font-mono text-[11px] text-cool-grey-07"
                  title={name}
                >
                  {name}
                </div>
                {isCopied && (
                  <span className="pointer-events-none absolute right-1.5 top-1.5 rounded-sm bg-primary-blue-1 px-1.5 py-0.5 text-[10px] font-semibold text-cool-grey-white">
                    Copied
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      <footer className="border-t border-cool-grey-04 pt-6 text-xs text-cool-grey-06">
        <code className="font-mono">
          {`<Icon src="${ICON_NAMES[0]}" color="${color}" size="${size}" />`}
        </code>
      </footer>
    </div>
  );
}
