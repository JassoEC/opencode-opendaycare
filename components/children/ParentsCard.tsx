import { LinkParentDialog } from "@/components/children/LinkParentDialog";
import type { Child } from "@/lib/children-data";

interface ParentsCardProps {
  child: Child;
}

export function ParentsCard({ child }: ParentsCardProps) {
  return (
    <div className="rounded-[16px] border border-border bg-surface px-[18px] py-4">
      <div className="mb-[14px] text-[12.5px] font-extrabold tracking-[0.8px] text-ink-section">
        PADRES VINCULADOS
      </div>
      <div className="flex flex-col gap-[14px]">
        {child.parents.map((parent) => (
          <div key={parent.name} className="flex items-center gap-3">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-[16px] font-semibold"
              style={{ background: parent.avatar.bg, color: parent.avatar.fg }}
            >
              {parent.avatar.initial}
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[14.5px] font-extrabold text-ink">{parent.name}</div>
              <div className="text-[12.5px] text-ink-subtle">
                {parent.role} · {parent.statusText}
              </div>
            </div>
            {parent.status === "active" ? (
              <span className="shrink-0 rounded-full bg-achievement-bg px-[9px] py-1 text-[10.5px] font-extrabold text-achievement-ink">
                ACTIVA
              </span>
            ) : (
              <span className="shrink-0 rounded-full bg-pending-bg px-[9px] py-1 text-[10.5px] font-extrabold text-pending-ink">
                PENDIENTE
              </span>
            )}
          </div>
        ))}
        <LinkParentDialog child={child} />
      </div>
    </div>
  );
}
