"use client";

import { AppDialog } from "@/components/shared/AppDialog";
import { fieldClass, labelClass } from "@/components/shared/form-styles";
import { ChevronDown, Plus } from "@/components/shared/icons";
import { classroom } from "@/lib/feed-data";

export function AddChildDialog() {
  return (
    <AppDialog
      maxWidth="520px"
      trigger={(open) => (
        <button
          type="button"
          onClick={open}
          className="flex cursor-pointer items-center gap-2 rounded-[14px] px-[18px] py-[11px] text-[14.5px] font-extrabold text-white"
          style={{
            background: "linear-gradient(180deg,#F4977E,#EE8164)",
            boxShadow: "0 8px 18px -8px rgba(238,129,100,.7)",
          }}
        >
          <Plus />
          Agregar niño
        </button>
      )}
    >
      {(close) => (
        <>
          <div className="flex items-center justify-between border-b border-border px-[26px] py-5">
            <button
              type="button"
              onClick={close}
              className="cursor-pointer bg-transparent p-0 text-[15px] font-bold text-ink-muted"
            >
              Cancelar
            </button>
            <span className="font-display text-[18px] font-semibold text-ink">
              Agregar niño
            </span>
            <button
              type="button"
              onClick={close}
              className="cursor-pointer bg-transparent p-0 text-[15px] font-extrabold text-brand"
            >
              Guardar
            </button>
          </div>

          <div className="p-[24px_26px]">
            <div className={labelClass}>NOMBRE COMPLETO</div>
            <input
              type="text"
              placeholder="Ej. Martina López"
              className={`${fieldClass} mb-[18px]`}
            />

            <div className="mb-[18px] flex gap-[14px]">
              <div className="flex-1">
                <div className={labelClass}>FECHA DE NACIMIENTO</div>
                <input
                  type="text"
                  placeholder="dd/mm/aaaa"
                  className={fieldClass}
                />
              </div>
              <div className="flex-1">
                <div className={labelClass}>SALA</div>
                <div className="flex items-center gap-2 rounded-[14px] border-[1.5px] border-input-border bg-white px-[16px]! py-[13px]! text-[15px] font-bold text-ink">
                  {classroom.name}
                  <span className="flex-1" />
                  <ChevronDown className="text-placeholder-ink" />
                </div>
              </div>
            </div>

            <div className={labelClass}>ALERGIAS (ETIQUETAS)</div>
            <input
              type="text"
              placeholder="Ej. Maní, Lactosa"
              className={`${fieldClass} mb-[18px]`}
            />

            <div className={labelClass}>NOTAS MÉDICAS</div>
            <textarea
              placeholder="Indicaciones, medicación, contactos…"
              className={`${fieldClass} min-h-[90px] resize-y leading-[1.5] px-[16px]! py-[13px]!`}
            />
          </div>
        </>
      )}
    </AppDialog>
  );
}
