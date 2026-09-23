import { AddChildDialog } from "@/components/children/AddChildDialog";
import { ChildrenBrowser } from "@/components/children/ChildrenBrowser";
import { BottomNav } from "@/components/shared/navigation/BottomNav";
import { Sidebar } from "@/components/shared/navigation/Sidebar";
import { TopBar } from "@/components/shared/navigation/TopBar";
import { children } from "@/lib/children-data";

export default function ChildrenPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar active="children" />
      <main className="h-screen min-w-0 flex-1 overflow-y-auto">
        <TopBar />
        <div className="mx-auto w-full max-w-[880px] px-4 pt-[34px] pb-28 lg:px-10 lg:pb-20">
          <div className="mb-[22px] flex items-end justify-between gap-4">
            <div>
              <div className="mb-1 text-[12.5px] font-extrabold tracking-[0.8px] text-brand">
                GESTIÓN
              </div>
              <h1 className="font-display text-[30px] font-semibold text-ink">Niños</h1>
            </div>
            <AddChildDialog />
          </div>

          <ChildrenBrowser kids={children} />
        </div>
      </main>
      <BottomNav active="children" />
    </div>
  );
}
