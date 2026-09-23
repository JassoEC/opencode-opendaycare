import Link from "next/link";
import { AuthField } from "@/components/auth/AuthField";
import { loginDemo } from "@/lib/auth-data";

export function LoginForm() {
  return (
    <div className="w-full max-w-[392px]">
      <h2 className="font-display text-[30px] font-semibold text-ink">
        Iniciar sesión
      </h2>
      <p className="mt-[6px] mb-7 text-[15px] text-ink-muted">
        Ingresá para ver el día de hoy.
      </p>

      <AuthField
        label="EMAIL"
        type="email"
        defaultValue={loginDemo.email}
        className="mb-[18px]"
      />
      <AuthField
        label="CONTRASEÑA"
        type="password"
        placeholder="••••••••"
        className="mb-[10px]"
      />

      <div className="mb-5 text-right">
        <span className="text-[13.5px] font-bold text-brand-dark">
          ¿Olvidaste tu contraseña?
        </span>
      </div>

      <Link
        href="/"
        className="block w-full rounded-[15px] px-3 py-[15px] text-center text-[16px] font-extrabold text-white"
        style={{
          background: "linear-gradient(180deg,#F4977E,#EE8164)",
          boxShadow: "0 10px 22px -8px rgba(238,129,100,.7)",
        }}
      >
        Iniciar sesión
      </Link>

      <p className="mt-6 text-center text-[14.5px] text-ink-muted">
        ¿Te invitó la guardería?{" "}
        <Link href="/activate-account" className="font-extrabold text-brand-dark">
          Activá tu cuenta
        </Link>
      </p>
    </div>
  );
}