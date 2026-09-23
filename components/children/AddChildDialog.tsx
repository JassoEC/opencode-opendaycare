"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Plus } from "@/components/shared/icons";
import { classroom } from "@/lib/feed-data";

const labelClass =
  "mb-2 text-[12px] font-extrabold tracking-[0.7px] text-ink-muted";
const fieldClass =
  "w-full rounded-[14px] border-[1.5px] border-input-border bg-white px-[16px]! py-[13px]! text-[15px] text-ink outline-none placeholder:text-input-placeholder";

export function AddChildDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => setIsOpen(false);
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  const openDialog = () => {
    dialogRef.current?.showModal();
    setIsOpen(true);
    nameInputRef.current?.focus();
  };

  const closeDialog = () => dialogRef.current?.close();

  const handleDialogClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) closeDialog();
  };

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        className="flex cursor-pointer items-center gap-2 rounded-[14px] px-[18px] py-[11px] text-[14.5px] font-extrabold text-white"
        style={{
          background: "linear-gradient(180deg,#F4977E,#EE8164)",
          boxShadow: "0 8px 18px -8px rgba(238,129,100,.7)",
        }}
      >
        <Plus />
        Agregar niño
      </button>

      <dialog
        ref={dialogRef}
        onClick={handleDialogClick}
        className="m-auto w-[calc(100%-2rem)] max-w-[520px] max-h-[calc(100vh-2rem)] overflow-y-auto rounded-[24px] border border-border bg-surface-modal p-0 text-ink shadow-[0_20px_50px_-24px_rgba(63,54,46,.35)]"
      >
        <div className="flex items-center justify-between border-b border-border px-[26px] py-5">
          <button
            type="button"
            onClick={closeDialog}
            className="cursor-pointer bg-transparent p-0 text-[15px] font-bold text-ink-muted"
          >
            Cancelar
          </button>
          <span className="font-display text-[18px] font-semibold text-ink">
            Agregar niño
          </span>
          <button
            type="button"
            onClick={closeDialog}
            className="cursor-pointer bg-transparent p-0 text-[15px] font-extrabold text-brand"
          >
            Guardar
          </button>
        </div>

        <div className="p-[24px_26px]">
          <div className={labelClass}>NOMBRE COMPLETO</div>
          <input
            ref={nameInputRef}
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
      </dialog>
    </>
  );
}