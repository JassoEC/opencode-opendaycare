import type { AvatarSpec } from "@/lib/feed-data";
import { Megaphone } from "@/components/shared/icons";

interface AvatarProps {
  spec: AvatarSpec;
  size?: number;
  className?: string;
}

export function Avatar({ spec, size = 44, className }: AvatarProps) {
  const baseClass = "flex items-center justify-center rounded-full shrink-0";

  if (spec.kind === "icon") {
    return (
      <div
        className={`${baseClass} ${className ?? ""}`}
        style={{ width: size, height: size, background: spec.bg, color: spec.fg }}
      >
        <Megaphone size={Math.round(size * 0.45)} />
      </div>
    );
  }

  return (
    <div
      className={`${baseClass} font-display ${className ?? ""}`}
      style={{
        width: size,
        height: size,
        background: spec.bg,
        color: spec.fg,
        fontSize: Math.round(size * 0.38),
      }}
    >
      {spec.initial}
    </div>
  );
}