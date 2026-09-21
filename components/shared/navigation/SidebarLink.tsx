import Link from "next/link";
import type { ReactNode } from "react";

interface SidebarLinkProps {
  href: string;
  label: string;
  icon: ReactNode;
  active?: boolean;
}

export function SidebarLink({ href, label, icon, active = false }: SidebarLinkProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-xl px-3 py-[11px] text-[14.5px] ${
        active ? "bg-brand-active font-extrabold text-brand" : "font-semibold text-ink-nav"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}