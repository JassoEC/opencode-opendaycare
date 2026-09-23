import { Avatar } from "@/components/shared/Avatar";
import { PhotoPlaceholder } from "@/components/feed/PhotoPlaceholder";
import { PostActions } from "@/components/feed/PostActions";
import { PostBadge } from "@/components/feed/PostBadge";
import type { Post } from "@/lib/feed-data";

export function PostCard({ post }: { post: Post }) {
  return (
    <article
      className="rounded-[20px] border border-border bg-surface px-[22px] py-5"
      style={{ boxShadow: "0 4px 16px -12px rgba(120,90,60,.5)" }}
    >
      <div className="mb-3.5 flex items-center gap-3">
        <Avatar spec={post.avatar} size={44} />
        <div className="min-w-0 flex-1">
          <div className="font-display text-[16.5px] font-semibold text-ink">
            {post.authorName}
          </div>
          <div className="text-[12.5px] text-ink-subtle">
            {post.time} · {post.publishedBy}
          </div>
        </div>
        <PostBadge type={post.type} />
      </div>
      <div className="mb-2.5 text-[12.5px] text-ink-subtle">Para: {post.audience}</div>
      <p className="text-[15.5px] leading-[1.55] text-ink-body">{post.body}</p>
      {post.photo ? <PhotoPlaceholder caption={post.photo.caption} /> : null}
      <PostActions postId={post.id} hearts={post.hearts} comments={post.comments} />
    </article>
  );
}