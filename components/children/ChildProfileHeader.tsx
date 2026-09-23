import Link from "next/link";
import type { Child } from "@/lib/children-data";
import { classroom } from "@/lib/feed-data";

interface ChildProfileHeaderProps {
  child: Child;
}

export function ChildProfileHeader({ child }: ChildProfileHeaderProps) {
  return (
    <div className="flex items-center gap-[18px]">
      <span
        className="flex h-[84px] w-[84px] shrink-0 items-center justify-center rounded-full font-display text-[34px] font-semibold"
        style={{ background: child.avatar.bg, color: child.avatar.fg }}
      >
        {child.avatar.initial}
      </span>
      <div className="min-w-0 flex-1">
        <h1 className="font-display text-[28px] font-semibold text-ink">{child.name}</h1>
        <p className="mt-[3px] text-[15px] text-ink-muted">
          {child.ageYears} años · Sala {classroom.name}
        </p>
      </div>
      <Link
        href="/children/new"
        className="shrink-0 rounded-[12px] border-[1.5px] border-border bg-surface px-4 py-[9px] text-[14px] font-bold text-ink-nav"
      >
        Editar
      </Link>
    </div>
  );
}
