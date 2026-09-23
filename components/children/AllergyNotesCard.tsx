import { AlertTriangle } from "@/components/shared/icons";

interface AllergyNotesCardProps {
  notes?: string;
}

export function AllergyNotesCard({ notes }: AllergyNotesCardProps) {
  if (!notes) return null;

  return (
    <div className="flex gap-[14px] rounded-[16px] bg-alert-bg px-[18px] py-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] bg-alert-icon-bg text-white">
        <AlertTriangle />
      </span>
      <div>
        <div className="mb-0.5 text-[15px] font-extrabold text-alert-title">Alergias y notas</div>
        <div className="text-[14.5px] leading-[1.5] text-alert-body">{notes}</div>
      </div>
    </div>
  );
}
