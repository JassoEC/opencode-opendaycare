import Link from "next/link";
import { Avatar } from "@/components/shared/Avatar";
import { Camera } from "@/components/shared/icons";
import { currentUser } from "@/lib/feed-data";

export function ComposerTrigger() {
  const userAvatar = {
    kind: "initial" as const,
    initial: currentUser.initial,
    bg: "#F2937A",
    fg: "#fff",
  };

  return (
    <Link
      href="/posts/new"
      className="mb-6 flex items-center gap-[14px] rounded-[18px] border border-border bg-surface px-[18px] py-[14px]"
      style={{ boxShadow: "0 4px 14px -10px rgba(120,90,60,.4)" }}
    >
      <Avatar spec={userAvatar} size={40} />
      <span className="flex-1 text-[15px] text-ink-subtle">Compartí un momento…</span>
      <span className="flex h-[38px] w-[38px] items-center justify-center rounded-xl bg-brand-active text-brand-light">
        <Camera />
      </span>
    </Link>
  );
}