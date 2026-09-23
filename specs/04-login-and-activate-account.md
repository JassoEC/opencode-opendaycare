# SPEC 04 — Login y activación de cuenta (/login y /activate-account)

> **Status:** Approved
> **Depends on:** SPEC 01, SPEC 02
> **Date:** 2026-09-23
> **Objective:** Implementar `/login` (sin el selector de rol Personal/Familia) y `/activate-account` como pantallas standalone de maqueta estática 100% server, fieles a sus templates y adaptadas a móvil.

## Por qué existe este spec

El botón de logout del Sidebar ya apunta a `/login` (SPEC 01) y hoy da 404: este spec lo activa. Además es el primer par de pantallas pre-auth e introduce el patrón standalone (sin shell de nav) que las pantallas de familia reutilizarán.

## Scope

**In:**

- Página `/login` (`app/login/page.tsx`) que replica pixel-perfect `login.dc.html` en ≥1024px, **excluyendo la sección "INGRESO COMO"** (botones Personal/Familia) por decisión del usuario:
  - Panel de marca izquierdo: degradado `linear-gradient(155deg,#F6A98E,#F2937A,#EC7E62)` (inline), círculos blancos translúcidos (420px `rgba(255,255,255,.12)` arriba-derecha, 300px `.10` abajo-izquierda), logo sol + "OpenDayCare" (Fredoka 600 21px), titular "El día de cada niño, compartido con su familia." (Fredoka 600 42px), subtítulo "Publicá momentos, gestioná las salas y mantené a las familias cerca, desde un solo lugar." y footer "🌿 Guardería Sala Soles".
  - Columna derecha (max-width 392px): h2 "Iniciar sesión", "Ingresá para ver el día de hoy.", EMAIL con valor `caro@opendaycare.com`, CONTRASEÑA con placeholder "••••••••", span "¿Olvidaste tu contraseña?" (no navegable), botón gradiente `180deg #F4977E→#EE8164` "Iniciar sesión" → `/`, y "¿Te invitó la guardería? **Activá tu cuenta**" → `/activate-account`.
- Página `/activate-account` (`app/activate-account/page.tsx`) que replica pixel-perfect `activar-cuenta.dc.html` (columna centrada, max-width 440px):
  - Tile 58px con degradado `155deg #F8C3A8→#F2937A` + logo sol, h1 "Bienvenida a OpenDayCare", subtítulo "Te invitaron a seguir el día de tu hijo. Creá tu contraseña para activar la cuenta."
  - Card blanca "Te invitaron a seguir a **Mateo · Sala Soles**" con avatar M (`#A9D9E8`/`#1F7A93`).
  - CÓDIGO DE INVITACIÓN con valor "7K4P9" (Fredoka 18px, weight 700, letter-spacing 3px), EMAIL `lucia.fernandez@gmail.com`, CREAR CONTRASEÑA (type password, border `#F2A78E` tal cual el template).
  - Caja de autorización `#FBF1D6` con check estático `#5FB97E` y texto "Autorizo a la guardería a tomar y compartir fotos de mi hijo dentro de la app." (`#8A7234`), pre-checkeada.
  - Botón "Activar mi cuenta" → `/` y "¿Ya tenés cuenta? **Iniciar sesión**" → `/login`.
- Componentes server en `components/auth/`: `AuthField.tsx` (label eyebrow + input base, variante `code`), `BrandPanel.tsx`, `LoginForm.tsx`, `InvitationCard.tsx`, `ConsentCheckbox.tsx`.
- Ícono nuevo `Check` en `components/shared/icons.tsx` (el sol ya existe como `SunLogo`).
- Tokens nuevos en `app/globals.css`: consent `#FBF1D6`/`#8A7234`/`#5FB97E`, input border `#EADFD0`, placeholder `#B6A99B` (hoy no existen).
- Mocks tipados en `lib/auth-data.ts` (modelo abajo), preparados para el swap a backend real.
- Responsive <1024px: `/login` oculta el panel de marca (form centrado) y `/activate-account` baja a columna única con padding reducido; sin overflow horizontal.
- Metadata de página: título de pestaña "Iniciar sesión · OpenDayCare" y "Activar cuenta · OpenDayCare".

**Out of scope (for future specs):**

- Selector de rol "INGRESO COMO: Personal/Familia" — excluido por el usuario.
- Auth real: sesiones, validación, backend, persistencia.
- Interactividad de los forms: toggle de contraseña, checkbox clickeable, submit real.
- Recuperación de contraseña (`/forgot-password` no existe en la tabla canónica del SPEC 02).
- `/family` y `/family/account` — 404 hasta sus specs.
- Nav de app en estas pantallas (standalone pre-auth).
- Layout tablet, dark mode.
- Los templates `references/pantallas/*.dc.html` (intocables).

## Data model

`lib/auth-data.ts`:

```ts
export const loginDemo = {
  email: "caro@opendaycare.com",   // prefill del campo EMAIL del login
};

export interface Invitation {
  childName: string;      // "Mateo"
  classroomName: string;  // "Sala Soles"
  code: string;           // "7K4P9"
  email: string;          // "lucia.fernandez@gmail.com"
  avatar: { initial: string; bg: string; fg: string };  // M · #A9D9E8 · #1F7A93
}

export const invitation: Invitation = {
  childName: "Mateo",
  classroomName: "Sala Soles",
  code: "7K4P9",
  email: "lucia.fernandez@gmail.com",
  avatar: { initial: "M", bg: "#A9D9E8", fg: "#1F7A93" },
};
```

Reglas derivadas:

- Card de invitación: "Te invitaron a seguir a" + `{childName} · {classroomName}`.
- Botones "Iniciar sesión" y "Activar mi cuenta" → `/` (única home implementada; flujo navegable — decisión del usuario).
- Links cruzados: `/login` → "Activá tu cuenta" → `/activate-account`; `/activate-account` → "Iniciar sesión" → `/login`.
- Rutas según la tabla canónica del SPEC 02: `login.dc.html` → `/login`, `activar-cuenta.dc.html` → `/activate-account`. Sin rutas nuevas.

## Implementation plan

1. **Tokens** — `app/globals.css`: consent (`#FBF1D6`/`#8A7234`/`#5FB97E`), input border `#EADFD0` y placeholder `#B6A99B` en base. Manual: `npm run dev` carga sin errores.
2. **Datos** — `lib/auth-data.ts` con `loginDemo`, `Invitation` e `invitation`. Manual: `npm run lint` pasa.
3. **Ícono** — `Check` en `components/shared/icons.tsx`. Manual: compila.
4. **AuthField** — label eyebrow + input base (border `#EADFD0`, radius 14px, padding 14px 16px, bg blanco, 15px) con variante `code` (Fredoka 18px, weight 700, letter-spacing 3px). Manual: compila.
5. **BrandPanel** — panel izquierdo del login (degradado inline 155deg, círculos absolutos, marca, titular, footer). Manual: compila.
6. **LoginForm** — columna derecha: `AuthField` EMAIL/CONTRASEÑA con `loginDemo.email`, span "¿Olvidaste tu contraseña?", `<Link>` "Iniciar sesión" → `/` y link a `/activate-account`. Manual: compila.
7. **Página `/login`** — grid `lg:grid-cols-[1.05fr_1fr]` min-h-screen; `<lg` `BrandPanel` se oculta y el form centra. Manual: 1440×900 idéntico a `login.dc.html` (sin "INGRESO COMO"); 390×844 sin panel coral.
8. **InvitationCard + ConsentCheckbox** — card blanca con avatar y textos de `invitation`; caja amarilla con check estático. Manual: compila.
9. **Página `/activate-account`** — columna centrada 440px, tile degradado, `AuthField` ×3 (código con variante), `ConsentCheckbox`, `<Link>` "Activar mi cuenta" → `/` y link a `/login`. Manual: 1440×900 idéntico a `activar-cuenta.dc.html`.
10. **Verificación final** — `npm run lint`, `npm run build`, screenshots desktop + móvil de ambas páginas en `.playwright-mcp/` comparados contra los templates, y click-through: logout del Sidebar → `/login` → "Iniciar sesión" → `/`; `/login` → "Activá tu cuenta" → `/activate-account` → "Iniciar sesión" → `/login`.

## Acceptance criteria

- [ ] `npm run lint` pasa sin errores.
- [ ] `npm run build` compila sin errores.
- [ ] En ≥1024px, `/login` es idéntico a `login.dc.html` excepto la sección "INGRESO COMO" (ausente): panel coral con degradado 155deg, círculos translúcidos, "OpenDayCare", titular "El día de cada niño, compartido con su familia.", footer "🌿 Guardería Sala Soles"; form con "Iniciar sesión", EMAIL `caro@opendaycare.com`, CONTRASEÑA con placeholder "••••••••", span "¿Olvidaste tu contraseña?", botón "Iniciar sesión" → `/` y "Activá tu cuenta" → `/activate-account`.
- [ ] En ≥1024px, `/activate-account` es idéntico a `activar-cuenta.dc.html`: tile degradado, "Bienvenida a OpenDayCare", card "Te invitaron a seguir a Mateo · Sala Soles" (avatar M), código "7K4P9", email `lucia.fernandez@gmail.com`, CREAR CONTRASEÑA (border `#F2A78E`), checkbox de autorización pre-checkeada, botón "Activar mi cuenta" → `/` y "Iniciar sesión" → `/login`.
- [ ] Ninguna de las dos páginas renderiza sidebar, top bar ni bottom nav.
- [ ] En <1024px: `/login` oculta el panel de marca (solo form centrado, sin overflow) y `/activate-account` queda en columna única con padding correcto.
- [ ] Ambas páginas son 100% server components (sin `"use client"` en la feature).
- [ ] Grep de "INGRESO COMO" y botones de rol en `app/login/` y `components/auth/` → 0 resultados.
- [ ] El logout del Sidebar navega a `/login` real (ya no 404).
- [ ] Screenshots desktop y móvil de ambas páginas guardados en `.playwright-mcp/` y comparados contra los templates.

## Decisions

- **Sí:** excluir "INGRESO COMO: Personal/Familia". Decisión explícita del usuario; simplifica el login y deja un único camino en la maqueta.
- **Sí:** botones "Iniciar sesión" y "Activar mi cuenta" → `/`. Única home implementada; flujos navegables de punta a punta (decisión del usuario).
- **No:** hrefs literales del template (`feed.dc.html` para staff / `familia-feed.dc.html` para activar). Los destinos reales staff/familia llegan con auth y el spec de `/family`.
- **Sí:** maqueta estática 100% server: botones = `<Link>`, checkbox fijo pre-checkeado, sin validación. Patrón SPEC 01/03.
- **No:** client components para los forms. No hay backend; la interactividad llega con el auth real.
- **Sí:** mocks tipados en `lib/auth-data.ts`. Mismo patrón que feed-data / children-data; el tipado deja el camino preparado para el backend (decisión del usuario).
- **Sí:** prefill de campos con los valores del template. Fidelidad pixel-perfect.
- **Sí:** "¿Olvidaste tu contraseña?" como span no navegable (como el template). No hay ruta canónica para recovery.
- **No:** inventar `/forgot-password`. Si llega, va en su spec y se agrega a la tabla canónica.
- **Sí:** pantallas standalone sin nav de app. Son pre-auth; el shell no aplica (decisión del usuario).
- **Sí:** móvil del login oculta el panel de marca (form-first). Decisión del usuario; la marca vuelve en `/activate-account` y en la app post-auth.
- **No:** marca compacta arriba en el login móvil. Descartada por el usuario.
- **Sí:** gradientes (panel, tile, botón) inline. Regla del SPEC 01 para gradientes multi-stop.

## Risks

| Riesgo | Mitigación |
| --- | --- |
| Desvío pixel-perfect (grid 1.05fr/1fr, círculos absolutos, degradados) | Comparación Playwright contra ambos templates a 1440×900 |
| El login móvil sin marca puede sentirse "descuadrado" | Decisión explícita del usuario; la marca vuelve en `/activate-account` y post-auth |
| Checkbox estático parece interactivo (cursor pointer) | Fidelidad al template; interactividad diferida al spec de auth real |
| `#F2A78E` en CREAR CONTRASEÑA se presta a confundirse con estado focus | Se replica tal cual el template (pixel-perfect); documentado aquí |

## What is **not** in this spec

- Selector de rol Personal/Familia.
- Auth real, sesiones, validación, backend.
- Interactividad de los forms.
- Recuperación de contraseña.
- `/family` y `/family/account`.
- Nav de app en pantallas pre-auth.
- Layout tablet, dark mode.

Cada una de esas, si llega, va en su propio spec.
