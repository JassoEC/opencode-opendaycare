import type { InputHTMLAttributes } from "react";

interface AuthFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  variant?: "text" | "code";
  borderAccent?: boolean;
}

export function AuthField({
  label,
  variant = "text",
  borderAccent = false,
  className,
  ...props
}: AuthFieldProps) {
  return (
    <div className={className}>
      <div className="mb-2 text-[12px] font-bold tracking-[0.7px] text-ink-muted">
        {label}
      </div>
      <input
        {...props}
        className={`w-full rounded-[14px] border-[1.5px] bg-surface px-4 py-[14px] text-[15px] text-ink outline-none placeholder:text-input-placeholder ${
          borderAccent ? "border-[#F2A78E]" : "border-input-border"
        } ${
          variant === "code"
            ? "font-display text-[18px] font-bold tracking-[3px]"
            : ""
        }`}
      />
    </div>
  );
}