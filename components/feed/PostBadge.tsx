import { postTypeLabels, type PostType } from "@/lib/feed-data";

const badgeStyles: Record<PostType, string> = {
  achievement: "bg-achievement-bg text-achievement-ink",
  activity: "bg-activity-bg text-activity-ink",
  announcement: "bg-announcement-bg text-announcement-ink",
};

export function PostBadge({ type }: { type: PostType }) {
  return (
    <span className={`flex items-center gap-[7px] rounded-full px-3 py-1.5 ${badgeStyles[type]}`}>
      <span className="size-2 rounded-full bg-current" />
      <span className="text-xs font-extrabold tracking-[0.5px]">
        {postTypeLabels[type].toUpperCase()}
      </span>
    </span>
  );
}