import Link from "next/link";
import { Avatar } from "@/components/shared/Avatar";
import { SunLogo } from "@/components/shared/icons";
import { currentUser } from "@/lib/feed-data";

export function TopBar() {
  const userAvatar = {
    kind: "initial" as const,
    initial: currentUser.initial,
    bg: "#F2937A",
    fg: "#fff",
  };

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-surface px-4 py-3 lg:hidden">
      <Link href="/" className="flex items-center gap-2.5">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-[10px] text-white"
          style={{ background: "linear-gradient(155deg,#F8C3A8,#F2937A)" }}
        >
          <SunLogo size={19} />
        </span>
        <span className="font-display text-[17px] font-semibold leading-none text-ink">
          OpenDayCare
        </span>
      </Link>
      <Link href="/mi-cuenta">
        <Avatar spec={userAvatar} size={38} />
      </Link>
    </header>
  );
}