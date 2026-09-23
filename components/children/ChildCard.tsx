import Link from "next/link";
import { ChevronRight } from "@/components/shared/icons";
import { parentSummary, type Child } from "@/lib/children-data";

interface ChildCardProps {
  child: Child;
}

export function ChildCard({ child }: ChildCardProps) {
  return (
    <Link
      href={`/children/${child.id}`}
      className="flex min-w-0 items-center gap-[14px] rounded-[18px] border border-border bg-surface p-4 shadow-[0_4px_14px_-12px_rgba(120,90,60,.5)] transition hover:-translate-y-0.5 hover:border-[#F2A78E]"
    >
      <span
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-display text-[19px] font-semibold"
        style={{ background: child.avatar.bg, color: child.avatar.fg }}
      >
        {child.avatar.initial}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-display text-[16px] font-semibold text-ink">
          {child.name}
        </span>
        <span className="block text-[13px] text-ink-subtle">
          {child.ageYears} años · {parentSummary(child.parents.length)}
        </span>
      </span>
      {child.parents.length === 0 ? (
        <span className="shrink-0 rounded-full bg-link-bg px-[9px] py-[5px] text-[11px] font-extrabold text-link-ink">
          VINCULAR
        </span>
      ) : child.allergyLabel ? (
        <span className="shrink-0 rounded-full bg-allergy-bg px-[9px] py-[5px] text-[11px] font-extrabold text-allergy-ink">
          {child.allergyLabel}
        </span>
      ) : (
        <ChevronRight className="shrink-0 text-[#CBB89F]" />
      )}
    </Link>
  );
}
