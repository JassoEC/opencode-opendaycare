import { Check } from "@/components/shared/icons";

export function ConsentCheckbox() {
  return (
    <div className="mb-6 flex items-start gap-3 rounded-[14px] bg-consent-bg px-4 py-[14px]">
      <span className="mt-[1px] flex h-6 w-6 shrink-0 items-center justify-center rounded-[8px] bg-consent-check">
        <Check size={15} strokeWidth={3} className="text-white" />
      </span>
      <span className="text-[14px] leading-[1.45] text-consent-ink">
        Autorizo a la guardería a tomar y compartir fotos de mi hijo dentro de
        la app.
      </span>
    </div>
  );
}