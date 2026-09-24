"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const DIALOG_CHROME_CLASS =
  "m-auto w-[calc(100%-2rem)] max-h-[calc(100vh-2rem)] overflow-y-auto rounded-[24px] border border-border bg-surface-modal p-0 text-ink shadow-[0_20px_50px_-24px_rgba(63,54,46,.35)]";
const MAX_WIDTH_CLASS = {
  "520px": "max-w-[520px]",
  "480px": "max-w-[480px]",
} as const;

type AppDialogProps = {
  maxWidth: keyof typeof MAX_WIDTH_CLASS;
  trigger: (open: () => void) => ReactNode;
  children: (close: () => void) => ReactNode;
};

export function AppDialog({ maxWidth, trigger, children }: AppDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
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

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open === isOpen) return;
    if (isOpen) {
      dialog.showModal();
      dialog.querySelector<HTMLElement>("input, textarea, select")?.focus();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const handleDialogClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) closeDialog();
  };

  return (
    <>
      {trigger(openDialog)}
      <dialog
        ref={dialogRef}
        onClick={handleDialogClick}
        className={`${DIALOG_CHROME_CLASS} ${MAX_WIDTH_CLASS[maxWidth]}`}
      >
        {children(closeDialog)}
      </dialog>
    </>
  );
}
