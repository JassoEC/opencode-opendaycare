# SPEC 01 — Feed como home (/) , idéntico al template y responsive

> **Status:** Approved
> **Depends on:** Ninguno (primer spec del proyecto)
> **Date:** 2026-09-21
> **Objective:** Implementar la plantilla `references/pantallas/feed.dc.html` como página home (`/`), visualmente idéntica en desktop y adaptada a móvil con top bar + bottom nav, sin auth ni base de datos.

## Por qué existe este spec

Es la primera pantalla de la app y establece la base que las otras 15 pantallas de `references/pantallas/` reutilizarán: tokens de color, tipografías y componentes atómicos (sidebar, avatar, badges de post, cards).

## Scope

**In:**

- Página `/` (`app/page.tsx`) que replica pixel-perfect el template en viewport ≥1024px (lg): sidebar 248px, saludo, composer, divisor "PUBLICADO HOY" y los 3 posts (logro, actividad con foto placeholder, anuncio).
- Sistema de diseño base en `app/globals.css`: paleta crema como tokens en `@theme inline`, fuentes Fredoka + Nunito vía `next/font`, sin dark mode.
- Datos estáticos tipados (usuario, sala, 3 posts) en `lib/feed-data.ts`.
- Componentes granulares reutilizables:
  - `components/shared/`: `icons.tsx` (set de SVGs), `Avatar.tsx`
  - `components/shared/navigation/`: `Sidebar.tsx`, `SidebarLink.tsx`, `TopBar.tsx`, `BottomNav.tsx`
  - `components/feed/`: `ComposerTrigger.tsx`, `PostCard.tsx`, `PostBadge.tsx`, `PostActions.tsx`, `PhotoPlaceholder.tsx`
- Layout móvil <1024px: top bar sticky (marca + avatar → `/mi-cuenta`) y bottom nav fija de 5 ítems con botón "+" central destacado (gradiente naranja) → `/crear-publicacion`.
- Links reales con `next/link` a rutas futuras según el mapeo de la sección de datos.
- `app/layout.tsx`: fuentes Fredoka+Nunito, `lang="es"`, metadata "OpenDayCare".

**Out of scope (for future specs):**

- Las otras 15 pantallas (`/ninos`, `/avisos`, `/mi-cuenta`, `/crear-publicacion`, `/detalle-publicacion`, `/foto`, `/login`, etc.) — los links darán 404 hasta que existan.
- Autenticación, base de datos o cualquier persistencia.
- Interactividad: likes, comentarios, crear/editar publicaciones, logout funcional.
- Fotos reales en los posts (se mantiene el placeholder punteado del template).
- Layout intermedio de tablet (móvil cubre hasta 1023px).

## Data model

`lib/feed-data.ts`:

```ts
export type PostType = "logro" | "actividad" | "anuncio";

export type AvatarSpec =
  | { kind: "initial"; initial: string; bg: string; fg: string }
  | { kind: "icon"; icon: "megaphone"; bg: string; fg: string };

export interface Post {
  id: string;
  type: PostType;
  authorName: string;        // "Mateo" | "Anuncio general"
  avatar: AvatarSpec;        // Mateo: #A9D9E8/#1F7A93 · anuncio: #CCD8F4/#4E72C8
  time: string;              // "14:20"
  publishedBy: string;       // "publicado por vos"
  audience: string;          // "familia de Mateo" | "toda la sala"
  body: string;
  photo?: { caption: string };   // placeholder punteado si existe
  hearts: number;
  comments: number;
}

export const currentUser = { name: "Caro Giménez", role: "Maestra · Soles", initial: "C" };
export const sala = { name: "Soles", childrenCount: 12, fecha: "martes 17 jun" };
export const posts: Post[] = [
  // logro 14:20 · 3♥ 1💬 (orinal) · actividad 09:40 · 5♥ 2💬 (témperas, foto) · anuncio 07:50 · 8♥ 0💬 (parque)
];
```

Mapeo de rutas (template → app):

| Template | Ruta |
| --- | --- |
| `index.dc.html`, `feed.dc.html` | `/` |
| `ninos.dc.html` | `/ninos` |
| `avisos.dc.html` | `/avisos` |
| `mi-cuenta.dc.html` | `/mi-cuenta` |
| `crear-publicacion.dc.html` | `/crear-publicacion` |
| `detalle-publicacion.dc.html` | `/detalle-publicacion` |
| `foto.dc.html` | `/foto` |
| `login.dc.html` | `/login` |

Convenciones: textos y fecha hardcodeados tal cual el template (no dinámicos). Badges: logro `#CFEBD8`/`#3E9B6C`, actividad `#C7E7F1`/`#2E89A6`, anuncio `#CCD8F4`/`#4E72C8`.

## Implementation plan

1. **Tokens y base CSS** — `app/globals.css`: paleta en `@theme inline` (bg `#F6ECDF`, surface `#FFFDF9`, bordes `#ECE0D0`/`#E7DAC8`/`#F0E6D8`, textos `#3F362E`/`#4A4038`/`#94887B`/`#A89A8B`, marca `#D9583C`/`#E0654A`/`#C5503A`, nav activo `#FBE3D8`, badges), fuentes (`--font-display`→Fredoka, `--font-sans`→Nunito); eliminar dark mode y vars de Geist; body y scrollbar webkit base. Manual: `npm run dev` carga sin errores.
2. **Layout root** — `app/layout.tsx`: Fredoka + Nunito con `next/font/google` (subsets latin, variables `--font-fredoka`/`--font-nunito`), `lang="es"`, metadata "OpenDayCare"; quitar Geist. Manual: título de pestaña "OpenDayCare".
3. **Datos** — `lib/feed-data.ts` con tipos y datos de arriba. Manual: `npm run lint` pasa.
4. **Íconos** — `components/shared/icons.tsx`: SVGs del template como componentes (SunLogo, Plus, Home, Kids, Bell, User, LogOut, Camera, Heart, MessageCircle, ImageIcon, Megaphone). Manual: compila.
5. **Atómicos** — `components/shared/Avatar.tsx` (AvatarSpec + tamaño) y en `components/feed/`: `PostBadge.tsx`, `PhotoPlaceholder.tsx`, `PostActions.tsx`. Manual: compila.
6. **PostCard** — `components/feed/PostCard.tsx`: header (avatar + nombre + hora + badge), "Para: …", body, `PhotoPlaceholder` condicional, `PostActions`. Manual: compila.
7. **Composer** — `components/feed/ComposerTrigger.tsx`: caja "Compartí un momento…" como `Link` → `/crear-publicacion`. Manual: compila.
8. **Nav desktop** — `components/shared/navigation/SidebarLink.tsx` (estado activo) y `Sidebar.tsx` (marca, botón gradiente "Nueva publicación", nav, user card con logout). Visible solo ≥lg. Manual: 1440×900 muestra el sidebar.
9. **Nav móvil** — `components/shared/navigation/TopBar.tsx` (sticky <lg) y `BottomNav.tsx` (fixed <lg: Feed activo, Niños, "+" central, Avisos, Mi cuenta; safe-area). Manual: 390×844 muestra ambas barras, sin sidebar.
10. **Página** — `app/page.tsx`: shell flex (`Sidebar` | main con scroll propio) + header saludo, `ComposerTrigger`, divisor "PUBLICADO HOY", `posts.map` → `PostCard`; padding del contenedor reducido en móvil y padding inferior para despejar la bottom nav. Manual: `/` correcto en 1440×900 y 390×844.

## Acceptance criteria

- [ ] `npm run lint` pasa sin errores.
- [ ] `npm run build` compila sin errores.
- [ ] En ≥1024px, `/` es idéntico al template: sidebar 248px con Feed activo (`#FBE3D8`/`#D9583C`), botón gradiente "Nueva publicación", user card "Caro Giménez · Maestra · Soles" con logout; "Buenas, Caro", "12 niños · martes 17 jun", composer, divisor "PUBLICADO HOY" y los 3 posts con badges y contadores 3/1, 5/2 (con foto placeholder), 8/0.
- [ ] Fredoka y Nunito cargan vía `next/font` (self-hosted, sin `<link>` a Google Fonts en el HTML).
- [ ] Todos los links usan `next/link` con el mapeo de rutas de la sección de datos.
- [ ] En <1024px: sin sidebar; top bar sticky con marca y avatar → `/mi-cuenta`; bottom nav fija con Feed activo, Niños, "+" central (→ `/crear-publicacion`), Avisos, Mi cuenta; el contenido no queda tapado por la bottom nav.
- [ ] La página es 100% server component (sin `"use client"`).
- [ ] `app/globals.css` no tiene `prefers-color-scheme` ni referencias a Geist.
- [ ] Screenshots desktop y móvil guardados en `.playwright-mcp/` comparados contra el template.

## Decisions

- **Sí:** híbrido tokens en `@theme` + utilidades Tailwind v4 con valores arbitrarios; inline solo para gradientes y box-shadows multi-valor. Idiomático en Next 16 + Tailwind v4 y la paleta queda nombrada para las demás pantallas.
- **No:** portar 1:1 los `style="..."` inline. Menos mantenible y sin tokens reutilizables.
- **Sí:** `next/font/google` para Fredoka y Nunito. Self-hosting automático, mismo render visual.
- **No:** `<link>` a Google Fonts como el template. Next 16 recomienda `next/font`.
- **Sí:** componentes granulares atómicos. Las 16 pantallas de `references/` comparten estos patrones.
- **Sí:** organización `components/shared/` (cross-domain: `icons.tsx`, `Avatar.tsx`, `navigation/`) + carpetas por feature (`components/feed/`). Regla del proyecto: si un componente es o puede ser compartido entre dominios va a `shared/`; si no, carpeta por feature con nombres auto-descriptivos.
- **No:** `components/posts/` como carpeta de dominio anticipada. Los componentes de post viven en `feed/` y se promueven a `shared/` en el spec que traiga la reutilización real (`detalle-publicacion`, `crear-publicacion`).
- **Sí:** datos estáticos tipados en `lib/feed-data.ts`. Separa contenido de estructura y prepara el swap a datos reales.
- **Sí:** `<Link>` reales aunque 404. Fidelidad al template y cero retrabajo en specs futuros.
- **Sí:** responsive con un solo breakpoint lg (1024px): top bar + bottom nav. Elegido por el usuario.
- **No:** FAB flotante. El usuario prefirió el ítem "+" central en la bottom nav.
- **No:** drawer/hamburguesa. Requiere estado cliente y añade fricción.
- **Sí:** eliminar dark mode. El diseño es paleta crema única.
- **Sí:** fecha y textos hardcodeados ("martes 17 jun"). Dinamizar desvía del "idéntico" sin datos reales.
- **No:** interactividad de likes/comentarios/logout. No hay auth ni backend; es maqueta navegable.

## Risks

| Riesgo | Mitigación |
| --- | --- |
| Desvío pixel-perfect al traducir inline → Tailwind | Comparación visual con Playwright contra el template a 1440×900; gradientes/sombras complejas quedan inline |
| `next/font/google` necesita red en el primer build | Fallback documentado: `<link>` de Google Fonts como el template original |
| Rutas 404 al navegar | Aceptado por decisión; las pantallas llegan en specs propios |
| Pesos de fuente (Fredoka 600, Nunito 700/800) en variable fonts | Verificar en el screenshot contra el template |

## What is **not** in this spec

- Las otras 15 pantallas de `references/pantallas/`.
- Autenticación, base de datos o persistencia.
- Interactividad de likes, comentarios o publicaciones.
- Fotos reales en los posts.
- Layout intermedio de tablet.
- Dark mode.

Cada una de esas, si llega, va en su propio spec.
