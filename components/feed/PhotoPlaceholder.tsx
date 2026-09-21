import Link from "next/link";
import { ImageIcon } from "@/components/shared/icons";

export function PhotoPlaceholder({ caption }: { caption: string }) {
  return (
    <Link
      href="/foto"
      className="mt-3.5 flex h-[200px] flex-col items-center justify-center gap-2 rounded-2xl border-[1.5px] border-dashed border-border-dashed bg-placeholder-inner text-placeholder-ink"
    >
      <ImageIcon />
      <span className="text-[13.5px]">{caption}</span>
    </Link>
  );
}