# SPEC 01 — Feed como home (/) , idéntico al template y responsive

> **Status:** Implemented
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
- Layout móvil <1024px: top bar sticky (marca + avatar → `/account`) y bottom nav fija de 5 ítems con botón "+" central destacado (gradiente naranja) → `/posts/new`.
- Links reales con `next/link` a rutas futuras según el mapeo de la sección de datos.
- `app/layout.tsx`: fuentes Fredoka+Nunito, `lang="es"`, metadata "OpenDayCare".

**Out of scope (for future specs):**

- Las otras 15 pantallas (`/children`, `/announcements`, `/account`, `/posts/new`, `/posts/[postId]`, `/photo`, `/login`, etc.) — los links darán 404 hasta que existan.
- Autenticación, base de datos o cualquier persistencia.
- Interactividad: likes, comentarios, crear/editar publicaciones, logout funcional.
- Fotos reales en los posts (se mantiene el placeholder punteado del template).
- Layout intermedio de tablet (móvil cubre hasta 1023px).

## Data model

`lib/feed-data.ts`:

```ts
export type PostType = "achievement" | "activity" | "announcement";

export const postTypeLabels: Record<PostType, string> = {
  achievement: "Logro",
  activity: "Actividad",
  announcement: "Anuncio",
};

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
export const classroom = { name: "Soles", childrenCount: 12, date: "martes 17 jun" };
export const posts: Post[] = [
  // achievement 14:20 · 3♥ 1💬 (orinal) · activity 09:40 · 5♥ 2💬 (témperas, foto) · announcement 07:50 · 8♥ 0💬 (parque)
];
```

Mapeo de rutas (template → app):

| Template | Ruta |
| --- | --- |
| `index.dc.html`, `feed.dc.html` | `/` |
| `ninos.dc.html` | `/children` |
| `avisos.dc.html` | `/announcements` |
| `mi-cuenta.dc.html` | `/account` |
| `crear-publicacion.dc.html` | `/posts/new` |
| `detalle-publicacion.dc.html` | `/posts/[postId]` |
| `foto.dc.html` | `/photo` |
| `login.dc.html` | `/login` |

Tabla canónica completa de mapeo (todos los templates): ver SPEC 02 §Data model.

Convenciones: identificadores (variables, funciones, tipos, props, archivos) siempre en inglés — regla de AGENTS.md; los textos de UI y valores de datos hardcodeados ("Soles", "martes 17 jun", "Mateo") quedan en español. URLs y segmentos de ruta en inglés (`/children`, `/account`, `/posts/new`, ...): son identificadores de infraestructura — reversión de la decisión original de rutas en español (2026-09-21, ver SPEC 02); el español vive en la capa user-facing (labels, contenido, datos) y los slugs derivados de datos (ids de niño tipo `mateo-fernandez`) quedan en español. Textos y fecha hardcodeados tal cual el template (no dinámicos). Badges (label vía `postTypeLabels` + color): achievement `#CFEBD8`/`#3E9B6C`, activity `#C7E7F1`/`#2E89A6`, announcement `#CCD8F4`/`#4E72C8`.

## Implementation plan

1. **Tokens y base CSS** — `app/globals.css`: paleta en `@theme inline` (bg `#F6ECDF`, surface `#FFFDF9`, bordes `#ECE0D0`/`#E7DAC8`/`#F0E6D8`, textos `#3F362E`/`#4A4038`/`#94887B`/`#A89A8B`, marca `#D9583C`/`#E0654A`/`#C5503A`, nav activo `#FBE3D8`, badges), fuentes (`--font-display`→Fredoka, `--font-sans`→Nunito); eliminar dark mode y vars de Geist; body y scrollbar webkit base. Manual: `npm run dev` carga sin errores.
2. **Layout root** — `app/layout.tsx`: Fredoka + Nunito con `next/font/google` (subsets latin, variables `--font-fredoka`/`--font-nunito`), `lang="es"`, metadata "OpenDayCare"; quitar Geist. Manual: título de pestaña "OpenDayCare".
3. **Datos** — `lib/feed-data.ts` con tipos, `postTypeLabels` y datos de arriba. Manual: `npm run lint` pasa.
4. **Íconos** — `components/shared/icons.tsx`: SVGs del template como componentes (SunLogo, Plus, Home, Kids, Bell, User, LogOut, Camera, Heart, MessageCircle, ImageIcon, Megaphone). Manual: compila.
5. **Atómicos** — `components/shared/Avatar.tsx` (AvatarSpec + tamaño) y en `components/feed/`: `PostBadge.tsx` (label vía `postTypeLabels` + color por tipo), `PhotoPlaceholder.tsx`, `PostActions.tsx`. Manual: compila.
6. **PostCard** — `components/feed/PostCard.tsx`: header (avatar + nombre + hora + badge), "Para: …", body, `PhotoPlaceholder` condicional, `PostActions`. Manual: compila.
7. **Composer** — `components/feed/ComposerTrigger.tsx`: caja "Compartí un momento…" como `Link` → `/posts/new`. Manual: compila.
8. **Nav desktop** — `components/shared/navigation/SidebarLink.tsx` (estado activo) y `Sidebar.tsx` (marca, botón gradiente "Nueva publicación", nav, user card con logout). Visible solo ≥lg. Manual: 1440×900 muestra el sidebar.
9. **Nav móvil** — `components/shared/navigation/TopBar.tsx` (sticky <lg) y `BottomNav.tsx` (fixed <lg: Feed activo, Niños, "+" central, Avisos, Mi cuenta; safe-area). Manual: 390×844 muestra ambas barras, sin sidebar.
10. **Página** — `app/page.tsx`: shell flex (`Sidebar` | main con scroll propio) + header saludo, `ComposerTrigger`, divisor "PUBLICADO HOY", `posts.map` → `PostCard`; padding del contenedor reducido en móvil y padding inferior para despejar la bottom nav. Manual: `/` correcto en 1440×900 y 390×844.

## Acceptance criteria

- [x] `npm run lint` pasa sin errores.
- [x] `npm run build` compila sin errores.
- [x] En ≥1024px, `/` es idéntico al template: sidebar 248px con Feed activo (`#FBE3D8`/`#D9583C`), botón gradiente "Nueva publicación", user card "Caro Giménez · Maestra · Soles" con logout; "Buenas, Caro", "12 niños · martes 17 jun", composer, divisor "PUBLICADO HOY" y los 3 posts con badges y contadores 3/1, 5/2 (con foto placeholder), 8/0.
- [x] Fredoka y Nunito cargan vía `next/font` (self-hosted, sin `<link>` a Google Fonts en el HTML).
- [x] Todos los links usan `next/link` con el mapeo de rutas de la sección de datos.
- [x] En <1024px: sin sidebar; top bar sticky con marca y avatar → `/account`; bottom nav fija con Feed activo, Niños, "+" central (→ `/posts/new`), Avisos, Mi cuenta; el contenido no queda tapado por la bottom nav.
- [x] La página es 100% server component (sin `"use client"`).
- [x] `app/globals.css` no tiene `prefers-color-scheme` ni referencias a Geist.
- [x] Screenshots desktop y móvil guardados en `.playwright-mcp/` comparados contra el template.

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
- **Sí:** URLs en inglés (reversión de la decisión original, 2026-09-21, ver SPEC 02). Las URLs son identificadores de infraestructura; el español vive en la capa user-facing (labels, contenido, datos).

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

## Verification report

**Fecha:** 2026-09-21 · **Branch:** `spec-01-feed-home` · **Spec:** 01-feed-home

### Tabla de criterios

| Criterio | Resultado | Evidencia |
|---|---|---|
| `npm run lint` pasa sin errores | **PASS** | `npx eslint "app/**/*.{ts,tsx}" "components/**/*.{ts,tsx}" "lib/**/*.{ts,tsx}"` → "No issues found" |
| `npm run build` compila sin errores | **PASS** | `npm run build` → "✓ Compiled successfully", TypeScript en 1372ms, 4/4 páginas estáticas generadas |
| Desktop ≥1024px idéntico al template | **PASS** | Screenshot `.playwright-mcp/spec-01-desktop-1440x900.png` + snapshot. Sidebar 248px confirmado (`getBoundingClientRect().width`). Feed activo: bg `rgb(251,227,216)`=`#FBE3D8`, texto `rgb(217,88,60)`=`#D9583C`. "Nueva publicación" texto blanco `rgb(255,255,255)`. Badges: LOGRO `#CFEBD8`/`#3E9B6C`, ACTIVIDAD `#C7E7F1`/`#2E89A6`, ANUNCIO `#CCD8F4`/`#4E72C8`. Contadores: 3/1, 5/2 (con foto), 8/0. Todos los textos verificados en accessibility snapshot. |
| Fredoka y Nunito self-hosted | **PASS** | `evaluate`: 0 links a `fonts.googleapis.com`. `getComputedStyle(h1).fontFamily` → `"Fredoka, \"Fredoka Fallback\""` (font-weight 600). `getComputedStyle(body).fontFamily` → `"Nunito, \"Nunito Fallback\", system-ui, sans-serif"`. Fuentes cargadas vía `next/font/google` en `app/layout.tsx`. |
| Todos los links usan `next/link` | **PASS** | 7 archivos importan `Link from "next/link"`: `Sidebar.tsx`, `SidebarLink.tsx`, `TopBar.tsx`, `BottomNav.tsx`, `ComposerTrigger.tsx`, `PostActions.tsx`, `PhotoPlaceholder.tsx`. Rutas verificadas en snapshot: `/`, `/ninos`, `/avisos`, `/mi-cuenta`, `/crear-publicacion`, `/detalle-publicacion`, `/foto`, `/login`. |
| Móvil <1024px: top bar + bottom nav | **PASS** | Screenshot `.playwright-mcp/spec-01-mobile-390x844.png` + snapshot a 390×844. Sin sidebar (`aside` oculto vía `hidden lg:flex`). Top bar sticky con logo→`/` y avatar→`/mi-cuenta`. Bottom nav fija con Feed activo, Niños, "+"→`/crear-publicacion`, Avisos, Mi cuenta. Contenido no tapado (`pb-28`). |
| 100% server component | **PASS** | `grep -r "use client" app/ components/` → 0 resultados. Solo aparece en el propio spec. |
| `globals.css` sin dark mode ni Geist | **PASS** | `grep -E "prefers-color-scheme|Geist|geist" app/globals.css` → 0 resultados. |
| Screenshots en `.playwright-mcp/` | **PASS** | `.playwright-mcp/spec-01-desktop-1440x900.png` (89.8K) y `.playwright-mcp/spec-01-mobile-390x844.png` (66.6K). |

### Arreglos menores aplicados durante la verificación

1. **CSS cascade bug en `app/globals.css`** — La regla `a { color: inherit; text-decoration: none; }` estaba sin capa CSS (unlayered), lo que en Tailwind v4 tiene mayor prioridad que las utilidades en `@layer utilities`. Esto causaba que **todos** los `<a>` con clases de color Tailwind (`text-brand`, `text-white`, `text-brand-dark`) renderizaran con el color heredado (`#3F362E`) en lugar del color especificado.
   - **Fix:** Envuelta la regla en `@layer base { a { ... } }` para que las utilidades de Tailwind puedan sobrescribirla.
   - **Impacto:** El link "Feed" activo ahora muestra `#D9583C` (antes `#3F362E`), "Nueva publicación" ahora blanco (antes `#3F362E`), "Editar" ahora `#C5503A` (antes `#3F362E`).

2. **Typo en token de color** — `--color-achievement-bg` era `#cfe8d8` en vez de `#cfebd8` (canal verde: `E8` en vez de `EB`). El template y el spec especifican `#CFEBD8`.
   - **Fix:** Corregido a `#cfebd8` en `app/globals.css` línea 25.

### Desviaciones del scope

- Ninguna. La implementación coincide con el scope definido.
