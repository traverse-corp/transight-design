import { IconSprite } from "@/icon-system/sprite.gen";
import { PreviewShell } from "./_components/preview-shell";

export const metadata = {
  title: "Icon System — Transight Design",
};

export default function IconSystemPage() {
  return (
    <>
      <IconSprite />
      <PreviewShell />
    </>
  );
}
