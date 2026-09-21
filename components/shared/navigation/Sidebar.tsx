import Link from "next/link";
import { Avatar } from "@/components/shared/Avatar";
import { Bell, Home, Kids, LogOut, Plus, SunLogo, User } from "@/components/shared/icons";
import { SidebarLink } from "@/components/shared/navigation/SidebarLink";
import { classroom, currentUser } from "@/lib/feed-data";

export function Sidebar() {
  const userAvatar = {
    kind: "initial" as const,
    initial: currentUser.initial,
    bg: "#F2937A",
    fg: "#fff",
  };

  return (
    <aside className="sticky top-0 hidden h-screen w-[248px] shrink-0 flex-col border-r border-border bg-surface px-4 py-6 lg:flex">
      <Link href="/" className="mb-[22px] flex items-center gap-[11px] px-2 pt-1">
        <span
          className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-xl text-white"
          style={{ background: "linear-gradient(155deg,#F8C3A8,#F2937A)" }}
        >
          <SunLogo />
        </span>
        <span className="flex flex-col">
          <span className="font-display text-[17px] font-semibold leading-none text-ink">
            OpenDayCare
          </span>
          <span className="mt-0.5 text-[11.5px] text-ink-subtle">Sala {classroom.name}</span>
        </span>
      </Link>

      <Link
        href="/crear-publicacion"
        className="mb-[18px] flex w-full items-center justify-center gap-2 rounded-[14px] px-3 py-3 text-[14.5px] font-extrabold text-white"
        style={{
          background: "linear-gradient(180deg,#F4977E,#EE8164)",
          boxShadow: "0 8px 18px -8px rgba(238,129,100,.75)",
        }}
      >
        <Plus />
        Nueva publicación
      </Link>

      <nav className="flex flex-1 flex-col gap-1">
        <SidebarLink href="/" label="Feed" icon={<Home />} active />
        <SidebarLink href="/ninos" label="Niños" icon={<Kids />} />
        <SidebarLink href="/avisos" label="Avisos" icon={<Bell />} />
        <SidebarLink href="/mi-cuenta" label="Mi cuenta" icon={<User />} />
      </nav>

      <div className="mt-2.5 border-t border-border pt-[14px]">
        <div className="flex items-center gap-[11px] px-2 py-1.5">
          <Avatar spec={userAvatar} size={38} />
          <div className="min-w-0 flex-1">
            <div className="text-sm font-extrabold text-ink">{currentUser.name}</div>
            <div className="text-xs text-ink-subtle">{currentUser.role}</div>
          </div>
          <Link
            href="/login"
            title="Cerrar sesión"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-background text-ink-muted"
          >
            <LogOut />
          </Link>
        </div>
      </div>
    </aside>
  );
}