import Link from "next/link";
import { Heart, MessageCircle } from "@/components/shared/icons";

interface PostActionsProps {
  hearts: number;
  comments: number;
}

export function PostActions({ hearts, comments }: PostActionsProps) {
  return (
    <div className="mt-4 flex items-center gap-[18px] border-t border-border-divider pt-[14px]">
      <span className="flex items-center gap-[7px] text-sm font-bold text-brand-light">
        <Heart />
        {hearts}
      </span>
      <Link
        href="/detalle-publicacion"
        className="flex items-center gap-[7px] text-sm font-bold text-ink-muted"
      >
        <MessageCircle />
        {comments}
      </Link>
      <span className="flex-1" />
      <Link href="/crear-publicacion" className="text-sm font-extrabold text-brand-dark">
        Editar
      </Link>
    </div>
  );
}