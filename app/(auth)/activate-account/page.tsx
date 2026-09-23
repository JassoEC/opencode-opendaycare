import type { Metadata } from "next";
import Link from "next/link";
import { AuthField } from "@/components/auth/AuthField";
import { ConsentCheckbox } from "@/components/auth/ConsentCheckbox";
import { InvitationCard } from "@/components/auth/InvitationCard";
import { SunLogo } from "@/components/shared/icons";
import { invitation } from "@/lib/auth-data";

export const metadata: Metadata = {
  title: "Activar cuenta · OpenDayCare",
};

export default function ActivateAccountPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-10 sm:px-10">
      <div className="w-full max-w-[440px]">
        <div
          className="mb-[22px] flex h-[58px] w-[58px] items-center justify-center rounded-[18px] text-white"
          style={{
            background: "linear-gradient(155deg,#F8C3A8,#F2937A)",
            boxShadow: "0 12px 26px -10px rgba(238,129,100,.65)",
          }}
        >
          <SunLogo size={30} />
        </div>

        <h1 className="font-display text-[32px] font-semibold leading-[1.15] text-ink">
          Bienvenida a OpenDayCare
        </h1>
        <p className="mt-2 mb-[26px] text-[15.5px] leading-[1.55] text-ink-muted">
          Te invitaron a seguir el día de tu hijo. Creá tu contraseña para
          activar la cuenta.
        </p>

        <InvitationCard />

        <AuthField
          label="CÓDIGO DE INVITACIÓN"
          variant="code"
          defaultValue={invitation.code}
          className="mb-[18px]"
        />
        <AuthField
          label="EMAIL"
          type="email"
          defaultValue={invitation.email}
          className="mb-[18px]"
        />
        <AuthField
          label="CREAR CONTRASEÑA"
          type="password"
          borderAccent
          className="mb-[18px]"
        />

        <ConsentCheckbox />

        <Link
          href="/"
          className="block w-full rounded-[15px] px-3 py-[15px] text-center text-[16px] font-extrabold text-white"
          style={{
            background: "linear-gradient(180deg,#F4977E,#EE8164)",
            boxShadow: "0 10px 22px -8px rgba(238,129,100,.7)",
          }}
        >
          Activar mi cuenta
        </Link>
        <p className="mt-[22px] text-center text-[14.5px] text-ink-muted">
          ¿Ya tenés cuenta?{" "}
          <Link href="/login" className="font-extrabold text-brand-dark">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </main>
  );
}