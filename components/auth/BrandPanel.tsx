import { SunLogo } from "@/components/shared/icons";

export function BrandPanel() {
  return (
    <aside
      className="relative hidden flex-col justify-between overflow-hidden px-[60px] py-14 text-white lg:flex"
      style={{
        background:
          "linear-gradient(155deg,#F6A98E 0%,#F2937A 45%,#EC7E62 100%)",
      }}
    >
      <div className="absolute -top-[140px] -right-[120px] h-[420px] w-[420px] rounded-full bg-white/12" />
      <div className="absolute -bottom-[110px] -left-[80px] h-[300px] w-[300px] rounded-full bg-white/10" />

      <div className="relative flex items-center gap-[13px]">
        <div className="flex h-[46px] w-[46px] items-center justify-center rounded-[14px] bg-white/22">
          <SunLogo size={26} className="text-white" />
        </div>
        <span className="font-display text-[21px] font-semibold tracking-[0.5px]">
          OpenDayCare
        </span>
      </div>

      <div className="relative">
        <h1 className="font-display text-[42px] font-semibold leading-[1.12]">
          El día de cada niño,<br />compartido con su familia.
        </h1>
        <p className="mt-[18px] max-w-[430px] text-[17px] leading-[1.6] text-white/92">
          Publicá momentos, gestioná las salas y mantené a las familias cerca,
          desde un solo lugar.
        </p>
      </div>

      <div className="relative text-[14px] text-white/90">
        🌿 Guardería Sala Soles
      </div>
    </aside>
  );
}