import Link from "next/link";
import type { ReactNode } from "react";
import { Bell, Home, Kids, Plus, User } from "@/components/shared/icons";

interface BottomNavLinkProps {
  href: string;
  label: string;
  icon: ReactNode;
  active?: boolean;
}

function BottomNavLink({ href, label, icon, active = false }: BottomNavLinkProps) {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center gap-1 text-[10.5px] ${
        active ? "font-extrabold text-brand" : "font-semibold text-ink-nav"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 z-10 flex w-full items-center justify-around border-t border-border bg-surface px-2 pt-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] lg:hidden">
      <BottomNavLink href="/" label="Feed" icon={<Home size={22} />} active />
      <BottomNavLink href="/children" label="Niños" icon={<Kids size={22} />} />
      <Link
        href="/posts/new"
        aria-label="Crear publicación"
        className="-mt-6 flex h-12 w-12 items-center justify-center rounded-2xl text-white"
        style={{
          background: "linear-gradient(180deg,#F4977E,#EE8164)",
          boxShadow: "0 8px 18px -8px rgba(238,129,100,.75)",
        }}
      >
        <Plus size={24} />
      </Link>
      <BottomNavLink href="/announcements" label="Avisos" icon={<Bell size={22} />} />
      <BottomNavLink href="/account" label="Mi cuenta" icon={<User size={22} />} />
    </nav>
  );
}