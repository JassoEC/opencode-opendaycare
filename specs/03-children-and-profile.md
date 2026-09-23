# SPEC 03 — Listado y perfil de niños (/children y /children/[childId])

> **Status:** Approved
> **Depends on:** SPEC 01, SPEC 02
> **Date:** 2026-09-22
> **Objective:** Implementar el listado de niños (`ninos.dc.html` → `/children`) y el perfil dinámico (`perfil-nino.dc.html` → `/children/[childId]`) con nav activo por página, datos tipados para los 8 niños y buscador funcional client-side.

## Por qué existe este spec

Es la segunda feature real de la app y activa el patrón que el SPEC 02 dejó pendiente para este spec: la prop `active`/`NavItem` del nav. Además introduce la primera ruta dinámica (`[childId]`) y la primera pieza client component (el buscador), sentando el patrón para las pantallas de detalle que vienen.

## Scope

**In:**

- Página `/children` (`app/children/page.tsx`) que replica pixel-perfect `ninos.dc.html` en ≥1024px: eyebrow "GESTIÓN" + h1 "Niños", botón gradiente "Agregar niño" → `/children/new`, buscador en caja surface, divisor "SALA SOLES · 8 niños" (conteo derivado de `children.length`), grilla de 2 columnas con las 8 cards.
- `components/children/ChildCard.tsx`: avatar con inicial y color del template, nombre, "X años · N padres vinculados", y a la derecha badge VINCULAR / badge de alergía (MANÍ, LACTOSA) / chevron según precedencia; hover border `#F2A78E` + `translateY(-2px)`; link → `/children/[childId]`.
- `components/children/ChildrenBrowser.tsx` (`"use client"`, única pieza client): input "Buscar niño…" que filtra la grilla en vivo por nombre (case- y accent-insensitive: "sofia" encuentra a "Sofía") y empty state "Sin resultados" cuando no hay matches. Recibe `children` como props desde la página server.
- Página `/children/[childId]` (`app/children/[childId]/page.tsx`) que replica pixel-perfect `perfil-nino.dc.html`: back link "Volver a Niños" → `/children`; encabezado (avatar 84px, nombre, "X años · Sala Soles", botón outline "Editar" → `/children/new`); card roja "Alergias y notas" (condicional a `allergyNotes`); card de datos (Fecha de nacimiento / Sala / Ingreso); columna derecha con botón oscuro "Resumen del día" → `/children/[childId]/daily-summary` y card "PADRES VINCULADOS" (padres con avatar, rol · estado, badge ACTIVA/PENDIENTE, dashed "Vincular otro padre" → `/children/[childId]/link-parent`). `notFound()` para ids desconocidos y `generateStaticParams` para los 8 slugs.
- Componentes del perfil en `components/children/`: `ChildProfileHeader.tsx`, `AllergyNotesCard.tsx`, `ChildDetailsCard.tsx`, `ParentsCard.tsx`.
- Datos tipados en `lib/children-data.ts` (modelo abajo) con perfil completo para los 8 niños.
- Nav activo: tipo `NavItem` (`components/shared/navigation/nav-item.ts`) + prop `active` en `Sidebar` y `BottomNav`; `app/page.tsx` pasa `active="feed"` (cero cambios visuales en `/`); las páginas nuevas pasan `active="children"`.
- Íconos nuevos en `components/shared/icons.tsx`: `Search`, `ChevronRight`, `ArrowLeft`, `AlertTriangle`.
- Tokens nuevos en `app/globals.css`: pendiente `#F7E7A6`/`#9A7B1E`, vincular `#F9D2DE`/`#C56486`, alergia `#FBD8CC`/`#D9684A`, alerta `#FBDAD6`/`#F4A8A0`/`#C5413A`/`#B25249`.
- Responsive <1024px (patrón del SPEC 01): top bar + bottom nav con Niños activo, grilla de 1 columna, perfil con columnas apiladas en el orden del template, padding inferior para despejar la bottom nav.

**Out of scope (for future specs):**

- `/children/new`, `/children/[childId]/daily-summary`, `/children/[childId]/link-parent` — 404 hasta sus specs.
- Edición real del perfil (el botón "Editar" va a `/children/new` por fidelidad al template; la ruta de edición se define en el spec de alta/edición).
- Unificar el conteo 12 vs 8 (fidelidad por pantalla; se resuelve con datos reales).
- Auth, base de datos, persistencia y acciones reales sobre padres (vincular/desvincular).
- Layout tablet, dark mode.
- Los templates `references/pantallas/*.dc.html` (intocables).

## Data model

`lib/children-data.ts`:

```ts
export type ParentStatus = "active" | "pending";

export interface ParentLink {
  name: string;          // "Lucía Fernández"
  role: string;          // "Mamá" | "Papá"
  statusText: string;    // "activa" | "invitación enviada"
  status: ParentStatus;
  avatar: { initial: string; bg: string; fg: string };  // fg blanco
}

export interface Child {
  id: string;            // slug en español (convención SPEC 02): "mateo-fernandez"
  name: string;
  avatar: { initial: string; bg: string; fg: string };
  ageYears: number;      // 2 | 3
  birthDate: string;     // "12 mar 2022"
  enrollment: string;    // "feb 2025"
  allergyLabel?: string; // "MANÍ" | "LACTOSA" — badge del listado
  allergyNotes?: string; // texto de la card roja del perfil
  parents: ParentLink[];
}

export const children: Child[] = [
  // Mateo Fernández — datos exactos del template:
  // M · #A9D9E8/#1F7A93 · 3 años · "12 mar 2022" · "feb 2025" · MANÍ
  // notes: "Alergia al maní. Evitar frutos secos. Lleva inhalador en la mochila."
  // parents: Lucía Fernández (Mamá · activa · #C9B6E8), Diego Fernández (Papá · invitación enviada · #A9C7E8)
  // …7 más con datos plausibles inventados, coherentes con el listado del template:
  // Sofía Méndez (S · #F4B8CC/#C44A7A · 2 años · 1 padre) · Benjamín Ruiz (B · #B9DEC4/#3E8B62 · 3 años · 2 padres)
  // Valentina Soto (V · #F4DC8E/#9A7B1E · 2 años · sin padres) · Tomás Díaz (T · #C9B6E8/#7B5FC0 · 3 años · 1 padre · LACTOSA)
  // Emma Castro (E · #F4B8CC/#C44A7A · 2 años · 1 padre) · Lucas Romero (L · #A9D9E8/#1F7A93 · 3 años · 1 padre)
  // Olivia Vega (O · #B9DEC4/#3E8B62 · 2 años · 1 padre)
];
```

Reglas derivadas:

- Resumen de padres: `2 padres vinculados` / `1 padre vinculado` / `sin padres vinculados` (pluralización).
- Precedencia del elemento derecho en la card del listado: `parents.length === 0` → badge VINCULAR (`#F9D2DE`/`#C56486`); si no, `allergyLabel` → badge de alergía (`#FBD8CC`/`#D9684A`); si no, chevron (`#CBB89F`).
- Card roja del perfil solo si `allergyNotes` existe. Card de padres con solo el dashed "Vincular otro padre" si `parents` está vacío (caso Valentina).
- Badges de estado: ACTIVA `#CFEBD8`/`#3E9B6C` (token achievement existente), PENDIENTE `#F7E7A6`/`#9A7B1E`.
- Rutas según la tabla canónica del SPEC 02: `ninos.dc.html` → `/children`, `perfil-nino.dc.html` → `/children/[childId]`, `agregar-nino.dc.html` → `/children/new`, `resumen-dia.dc.html` → `/children/[childId]/daily-summary`, `vincular-padre.dc.html` → `/children/[childId]/link-parent`. Sin rutas nuevas.

## Implementation plan

1. **Tokens** — `app/globals.css`: tokens nuevos (pendiente, vincular, alergía, alerta). Manual: `npm run dev` carga sin errores.
2. **Datos** — `lib/children-data.ts` con tipos, los 8 niños (Mateo exacto al template) y helper de resumen de padres. Manual: `npm run lint` pasa.
3. **Íconos** — `Search`, `ChevronRight`, `ArrowLeft`, `AlertTriangle` en `components/shared/icons.tsx`. Manual: compila.
4. **Nav activo** — `nav-item.ts` con `NavItem` + prop `active` en `Sidebar`/`BottomNav`; `app/page.tsx` pasa `active="feed"`. Manual: `/` idéntico al screenshot del SPEC 02 (Feed activo).
5. **ChildCard** — server component con avatar, textos y badge/chevron por precedencia. Manual: compila.
6. **ChildrenBrowser** — client component: input + grilla `children.map` → `ChildCard`, filtro live accent-insensitive (normalización NFD), empty state. Manual: al escribir "sof" queda solo la card de Sofía.
7. **Página `/children`** — shell (Sidebar/BottomNav `active="children"`) + header + botón "Agregar niño" + divisor + `ChildrenBrowser`. Manual: 1440×900 vs `ninos.dc.html`.
8. **Componentes del perfil** — `ChildProfileHeader`, `AllergyNotesCard` (condicional), `ChildDetailsCard`, `ParentsCard` (filas + dashed link). Manual: compila.
9. **Página `/children/[childId]`** — 2 columnas (flex 1 + 300px) que apilan en móvil, back link, `generateStaticParams` para los 8 slugs, `notFound()` si el id no existe. En Next 16 `params` es Promise: `await params`. Manual: `/children/mateo-fernandez` vs `perfil-nino.dc.html`; id inventado → 404.
10. **Verificación final** — `npm run lint`, `npm run build`, screenshots desktop + móvil de ambas páginas y de `/` (regresión del nav) en `.playwright-mcp/`.

## Acceptance criteria

- [ ] `npm run lint` pasa sin errores.
- [ ] `npm run build` compila sin errores.
- [ ] En ≥1024px, `/children` es idéntico a `ninos.dc.html`: "GESTIÓN / Niños", botón "Agregar niño" → `/children/new`, buscador, divisor "SALA SOLES · 8 niños", grilla 2 col con las 8 cards (avatares, edades y conteos de padres del template) y badges MANÍ (Mateo), LACTOSA (Tomás) y VINCULAR (Valentina).
- [ ] En ≥1024px, `/children/mateo-fernandez` es idéntico a `perfil-nino.dc.html`: back link, avatar 84px, "Mateo Fernández · 3 años · Sala Soles", "Editar" → `/children/new`, card roja con el texto de alergias exacto, datos "12 mar 2022 / Soles / feb 2025", "Resumen del día" → `/children/mateo-fernandez/daily-summary`, padres Lucía (ACTIVA) y Diego (PENDIENTE), "Vincular otro padre" → `/children/mateo-fernandez/link-parent`.
- [ ] Las 8 cards navegan a perfiles reales con datos completos; un id inexistente renderiza 404.
- [ ] El buscador filtra en vivo por nombre (accent-insensitive: "sofia" → "Sofía") con empty state "Sin resultados"; `ChildrenBrowser` es la única pieza `"use client"` de la feature.
- [ ] Sidebar y bottom nav muestran "Niños" activo en ambas páginas (`#FBE3D8`/`#D9583C`) y "Feed" activo en `/` sin regresión visual.
- [ ] En <1024px: top bar + bottom nav con Niños activo, grilla de 1 columna, perfil apilado, contenido no tapado por la bottom nav.
- [ ] Screenshots desktop y móvil de `/children`, `/children/mateo-fernandez` y `/` guardados en `.playwright-mcp/` y comparados contra los templates.

## Decisions

- **Sí:** prop `active: NavItem` explícita desde cada página. Es el plan diferido del SPEC 02 y mantiene el nav 100% server component.
- **No:** `usePathname` en el nav. Auto-detección cómoda pero convierte el nav en client component.
- **Sí:** datos completos para los 8 niños (inventados plausibles, coherentes con el listado). Toda card navega a un perfil real y el swap a datos reales queda preparado por el tipado.
- **Sí:** fidelidad por pantalla en el conteo: feed "12 niños" (SPEC 01, ya verificado) y lista "8 niños" derivado de `children.length`. Inconsistencia conocida, documentada; se unifica cuando lleguen datos reales.
- **No:** unificar a 8 o a 12. Desviaría una pantalla ya verificada o la grilla del template.
- **Sí:** "Editar" → `/children/new` como el template. La ruta de edición real se decide en el spec de alta/edición.
- **Sí:** buscador funcional client-side (decisión del usuario). El estado queda contenido en `ChildrenBrowser`, que recibe los datos como props; páginas y nav siguen siendo server.
- **No:** input visual estático. El usuario prefirió filtro funcional.
- **Sí:** precedencia de badge VINCULAR > alergía > chevron. Sin padres es el estado más crítico para la maestra.
- **Sí:** card roja de alergías condicional a `allergyNotes` (los niños sin alergias no la muestran).
- **Sí:** slugs de niño en español ("mateo-fernandez"). Convención del SPEC 02: los ids derivados de datos son data, no infraestructura.
- **Sí:** hover de cards con utilidades Tailwind (border `#F2A78E` + `translateY(-2px)`), como el CSS del template.

## Risks

| Riesgo | Mitigación |
| --- | --- |
| `ChildrenBrowser` rompe el "100% server components" del SPEC 01 | Acotado a un componente hoja con props inmutables; documentado en Decisions; el resto sigue server |
| Regresión visual en `/` al refactor del nav activo | Screenshot de `/` post-refactor comparado contra el del SPEC 02 |
| Desvío pixel-perfect al traducir inline → Tailwind (cards, card roja, dashed link, 2 columnas) | Comparación Playwright contra ambos templates a 1440×900 |
| Datos inventados pueden diferir de los reales | Coherentes con el listado del template y tipados; swap trivial |

## What is **not** in this spec

- `/children/new`, `daily-summary` y `link-parent` (siguen 404).
- Edición real del perfil y acciones sobre padres.
- Auth, base de datos, persistencia.
- Unificación del conteo 12 vs 8.
- Layout tablet, dark mode.

Cada una de esas, si llega, va en su propio spec.
