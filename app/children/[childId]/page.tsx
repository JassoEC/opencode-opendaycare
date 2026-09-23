import Link from "next/link";
import { notFound } from "next/navigation";
import { AllergyNotesCard } from "@/components/children/AllergyNotesCard";
import { ChildDetailsCard } from "@/components/children/ChildDetailsCard";
import { ChildProfileHeader } from "@/components/children/ChildProfileHeader";
import { ParentsCard } from "@/components/children/ParentsCard";
import { ArrowLeft, SunLogo } from "@/components/shared/icons";
import { BottomNav } from "@/components/shared/navigation/BottomNav";
import { Sidebar } from "@/components/shared/navigation/Sidebar";
import { TopBar } from "@/components/shared/navigation/TopBar";
import { children } from "@/lib/children-data";

interface ChildProfilePageProps {
  params: Promise<{ childId: string }>;
}

export function generateStaticParams() {
  return children.map((child) => ({ childId: child.id }));
}

export default async function ChildProfilePage({ params }: ChildProfilePageProps) {
  const { childId } = await params;
  const child = children.find((item) => item.id === childId);

  if (!child) {
    notFound();
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar active="children" />
      <main className="h-screen min-w-0 flex-1 overflow-y-auto">
        <TopBar />
        <div className="mx-auto w-full max-w-[820px] px-4 pt-[34px] pb-28 lg:px-10 lg:pb-20">
          <Link
            href="/children"
            className="mb-5 flex items-center gap-[7px] text-[14px] font-bold text-ink-muted"
          >
            <ArrowLeft />
            Volver a Niños
          </Link>

          <div className="flex flex-wrap items-start gap-[26px]">
            <div className="flex min-w-[300px] flex-1 flex-col gap-[18px]">
              <ChildProfileHeader child={child} />
              <AllergyNotesCard notes={child.allergyNotes} />
              <ChildDetailsCard child={child} />
            </div>

            <div className="flex w-[300px] flex-none flex-col gap-[14px]">
              <Link
                href={`/children/${child.id}/daily-summary`}
                className="flex w-full items-center justify-center gap-[9px] rounded-[14px] bg-ink p-[13px] text-[15px] font-extrabold text-white"
              >
                <SunLogo size={18} />
                Resumen del día
              </Link>
              <ParentsCard child={child} />
            </div>
          </div>
        </div>
      </main>
      <BottomNav active="children" />
    </div>
  );
}
