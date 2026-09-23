import { invitation } from "@/lib/auth-data";

export function InvitationCard() {
  return (
    <div className="mb-[22px] flex items-center gap-[14px] rounded-[16px] border-[1.5px] border-input-border bg-surface px-4 py-[14px]">
      <span
        className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full font-display text-[19px] font-semibold"
        style={{
          background: invitation.avatar.bg,
          color: invitation.avatar.fg,
        }}
      >
        {invitation.avatar.initial}
      </span>
      <div>
        <div className="text-[13px] text-ink-muted">Te invitaron a seguir a</div>
        <div className="font-display text-[17px] font-semibold text-ink">
          {invitation.childName} · {invitation.classroomName}
        </div>
      </div>
    </div>
  );
}