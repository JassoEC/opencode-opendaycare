import { ComposerTrigger } from "@/components/feed/ComposerTrigger";
import { PostCard } from "@/components/feed/PostCard";
import { BottomNav } from "@/components/shared/navigation/BottomNav";
import { Sidebar } from "@/components/shared/navigation/Sidebar";
import { TopBar } from "@/components/shared/navigation/TopBar";
import { classroom, currentUser, posts } from "@/lib/feed-data";

export default function HomePage() {
  const firstName = currentUser.name.split(" ")[0];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar active="feed" />
      <main className="h-screen min-w-0 flex-1 overflow-y-auto">
        <TopBar />
        <div className="mx-auto w-full max-w-[760px] px-4 pt-[34px] pb-28 lg:px-10 lg:pb-20">
          <div className="mb-6">
            <div className="mb-1 text-[12.5px] font-extrabold tracking-[0.8px] text-brand">
              GUARDERÍA · SALA {classroom.name.toUpperCase()}
            </div>
            <h1 className="font-display text-[30px] font-semibold text-ink">
              Buenas, {firstName}
            </h1>
            <p className="mt-1.5 text-[14.5px] text-ink-muted">
              {classroom.childrenCount} niños · {classroom.date}
            </p>
          </div>

          <ComposerTrigger />

          <div className="mb-[14px] flex items-center gap-[14px]">
            <span className="text-[12.5px] font-extrabold tracking-[0.8px] text-ink-section">
              PUBLICADO HOY
            </span>
            <span className="h-px flex-1 bg-border-soft" />
          </div>

          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </main>
      <BottomNav active="feed" />
    </div>
  );
}