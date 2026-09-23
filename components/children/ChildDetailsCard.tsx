import type { Child } from "@/lib/children-data";
import { classroom } from "@/lib/feed-data";

interface ChildDetailsCardProps {
  child: Child;
}

export function ChildDetailsCard({ child }: ChildDetailsCardProps) {
  const rows = [
    { label: "Fecha de nacimiento", value: child.birthDate },
    { label: "Sala", value: classroom.name },
    { label: "Ingreso", value: child.enrollment },
  ];

  return (
    <div className="overflow-hidden rounded-[16px] border border-border bg-surface">
      {rows.map((row, index) => (
        <div
          key={row.label}
          className={`flex justify-between px-[18px] py-[15px] ${
            index < rows.length - 1 ? "border-b border-border-divider" : ""
          }`}
        >
          <span className="text-[14.5px] text-ink-muted">{row.label}</span>
          <span className="text-[14.5px] font-extrabold text-ink">{row.value}</span>
        </div>
      ))}
    </div>
  );
}
