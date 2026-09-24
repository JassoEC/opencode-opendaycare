"use client";

import { AppDialog } from "@/components/shared/AppDialog";
import { fieldClass, labelClass } from "@/components/shared/form-styles";
import { Info, Plus, Send, X } from "@/components/shared/icons";
import type { Child } from "@/lib/children-data";

const INVITATION_CODE = "7K4P9";
const INVITATION_CODE_EXPIRY = "Vence en 7 días";

interface LinkParentDialogProps {
  child: Child;
}

export function LinkParentDialog({ child }: LinkParentDialogProps) {
  const firstName = child.name.split(" ")[0];

  return (
    <AppDialog
      maxWidth="480px"
      trigger={(open) => (
        <button
          type="button"
          onClick={open}
          className="flex cursor-pointer items-center gap-3 pt-2"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[1.5px] border-dashed border-[#D8CBBA] text-placeholder-ink">
            <Plus />
          </span>
          <span className="text-[14.5px] font-extrabold text-brand-dark">
            Vincular otro padre
          </span>
        </button>
      )}
    >
      {(close) => (
        <>
          <div className="flex items-center justify-between border-b border-border px-[26px] py-5">
            <div>
              <div className="font-display text-[18px] font-semibold text-ink">
                Vincular padre
              </div>
              <div className="text-[13px] text-ink-subtle">a {child.name}</div>
            </div>
            <button
              type="button"
              onClick={close}
              className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[10px] bg-border-divider text-ink-muted"
            >
              <X />
            </button>
          </div>

          <div className="p-[22px_26px]">
            <div className="mb-5 flex gap-[11px] rounded-[14px] bg-invite-bg p-[13px_16px]">
              <Info className="mt-[1px] shrink-0 text-announcement-ink" />
              <span className="text-[13.5px] leading-[1.45] text-invite-ink">
                Le enviaremos un correo con un código para que active su
                cuenta. Solo verá el feed de {firstName}.
              </span>
            </div>

            <div className={labelClass}>NOMBRE DEL PADRE/MADRE</div>
            <input
              type="text"
              placeholder="Ej. Diego Fernández"
              className={`${fieldClass} mb-[18px]`}
            />

            <div className={labelClass}>EMAIL</div>
            <input
              type="email"
              placeholder="correo@ejemplo.com"
              className={`${fieldClass} mb-[18px]`}
            />

            <div className={`${labelClass} mb-[10px]!`}>PARENTESCO</div>
            <div className="mb-5 flex gap-[9px]">
              <button
                type="button"
                className="flex-1 cursor-pointer rounded-full border-[1.5px] border-invite-pill-border bg-announcement-bg p-[11px] text-[14px] font-extrabold text-announcement-ink"
              >
                Mamá
              </button>
              <button
                type="button"
                className="flex-1 cursor-pointer rounded-full border-[1.5px] border-border bg-surface p-[11px] text-[14px] font-extrabold text-ink-nav"
              >
                Papá
              </button>
              <button
                type="button"
                className="flex-1 cursor-pointer rounded-full border-[1.5px] border-border bg-surface p-[11px] text-[14px] font-extrabold text-ink-nav"
              >
                Tutor/a
              </button>
            </div>

            <div className="mb-5 rounded-[16px] border-[1.5px] border-dashed border-invite-code-border bg-consent-bg p-[18px] text-center">
              <div className={`${labelClass} text-invite-code-ink!`}>
                CÓDIGO DE INVITACIÓN
              </div>
              <div className="font-display text-[34px] font-semibold tracking-[7px] text-consent-ink">
                {INVITATION_CODE}
              </div>
              <div className="mt-[6px] text-[13px] text-invite-code-ink">
                {INVITATION_CODE_EXPIRY}
              </div>
            </div>

            <button
              type="button"
              onClick={close}
              className="flex w-full cursor-pointer items-center justify-center gap-[9px] rounded-[14px] p-[14px] text-[15.5px] font-extrabold text-white"
              style={{
                background: "linear-gradient(180deg,#F4977E,#EE8164)",
                boxShadow: "0 10px 22px -8px rgba(238,129,100,.7)",
              }}
            >
              <Send />
              Enviar invitación
            </button>
          </div>
        </>
      )}
    </AppDialog>
  );
}
