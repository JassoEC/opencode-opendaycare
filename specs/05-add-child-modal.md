# SPEC 05 — Modal Agregar niño en /children

> **Status:** Implemented
> **Depends on:** SPEC 02, SPEC 03
> **Date:** 2026-09-23
> **Objective:** Implementar el alta de niño (`agregar-nino.dc.html`) como un modal estático sobre `/children` — el botón "Agregar niño" lo abre en lugar de navegar a `/children/new` — cerrable por Cancelar/Esc/scrim/Guardar, pixel-perfect al template y adaptado a móvil.

## Por qué existe este spec

Activa el botón "Agregar niño" que hoy apunta a un 404 y que el SPEC 03 dejó pendiente. Introduce el primer patrón de dialog de la app (`<dialog>` nativo en un client component). Además reemplaza la ruta `/children/new` de la tabla canónica del SPEC 02: el alta pasa a ser modal, no página.

## Scope

**In:**

- `components/children/AddChildDialog.tsx` (client component, único `"use client"` nuevo): trigger "Agregar niño" con visual idéntico al Link actual (gradiente `180deg #F4977E→#EE8164`, sombra `0 8px 18px -8px rgba(238,129,100,.7)`, ícono `Plus`) + `<dialog>` nativo abierto con `showModal()`.
- Modal pixel-perfect a `agregar-nino.dc.html` en ≥1024px: card 520px bg `#FBF4EC` (token nuevo), border `#ECE0D0`, radius 24px, sombra `0 20px 50px -24px rgba(63,54,46,.35)`.
  - Header: "Cancelar" (`#94887B`, weight 700, 15px) · "Agregar niño" (Fredoka 600, 18px, `#3F362E`) · "Guardar" (`#D9583C`, weight 800, 15px), border-bottom `#ECE0D0`.
  - Campos con label eyebrow (12px, weight 800, letter-spacing `.7px`, `#94887B`): NOMBRE COMPLETO (placeholder "Ej. Martina López"), FECHA DE NACIMIENTO (input text, placeholder "dd/mm/aaaa") + SALA (caja estática "Soles" + `ChevronDown`, flex 1:1, gap 14px), ALERGIAS (ETIQUETAS) (placeholder "Ej. Maní, Lactosa"), NOTAS MÉDICAS (textarea min-height 90px, placeholder "Indicaciones, medicación, contactos…").
  - Inputs: border `#EADFD0` (1.5px), radius 14px, padding 13px 16px, bg blanco, 15px, placeholder `#B6A99B`. Vacíos, sin prefill.
- Scrim `rgba(63,54,46,.45)` en `::backdrop`; body sin scroll mientras el dialog está abierto.
- Cierre por: botón Cancelar, tecla Esc, click en scrim y botón Guardar — los cuatro sin ningún efecto (mock estático: sin navegación, sin cambios en la grilla).
- Foco: primer input al abrir; retorno al botón trigger al cerrar.
- Ícono nuevo `ChevronDown` en `components/shared/icons.tsx` (el chevron del template apunta abajo; hoy solo existe `ChevronRight`).
- Token nuevo `--color-surface-modal: #fbf4ec` en `app/globals.css` (el resto de colores ya son tokens: `ink-muted`, `brand`, `border`, `input-border`, `input-placeholder`, `placeholder-ink`).
- `app/children/page.tsx`: el `<Link href="/children/new">` se reemplaza por `<AddChildDialog />`; la página sigue siendo server component.
- Responsive <1024px: card centrada con márgenes (16–24px), scroll interno del dialog si no cabe; el top layer del dialog queda por encima de la bottom nav.
- Ediciones in place (verification reports intactos): tabla canónica del SPEC 02 (`agregar-nino.dc.html` → modal en `/children`, sin ruta) y referencias al botón "Agregar niño" en el SPEC 03.

**Out of scope (for future specs):**

- Guardar real: validación, alta en la grilla, persistencia, backend.
- Edición de perfil: el botón "Editar" de `/children/[childId]` sigue → `/children/new` (404) hasta su propio spec.
- Página `/children/new` (nunca existirá; el modal la reemplaza).
- Select funcional de sala y tags/chips interactivos de alergias (solo existe "Soles"; mock).
- `/children/[childId]/daily-summary` y `link-parent` (siguen 404).
- Layout tablet, dark mode.
- Los templates `references/pantallas/*.dc.html` (intocables).

## Data model

Esta feature no introduce estructuras de datos nuevas. Es un mock estático: los placeholders son copy de UI en el componente y la sala sale de `classroom.name` (`lib/feed-data.ts`, "Soles"). El modelo `Child` del SPEC 03 queda como referencia para el alta real cuando llegue el backend.

## Implementation plan

1. **Token** — `app/globals.css`: `--color-surface-modal: #fbf4ec`. Manual: `npm run dev` carga sin errores.
2. **Ícono** — `ChevronDown` en `components/shared/icons.tsx`. Manual: compila.
3. **Dialog** — `AddChildDialog.tsx`: `<dialog>` + ref + `showModal()`/`close()`, reset de estilos default (`w-[calc(100%-2rem)] max-w-[520px]`), header, 5 campos, scrim en `::backdrop` (variante arbitraria `[&::backdrop]` o micro-regla CSS), cierre por Cancelar/Esc/scrim/Guardar, foco inicial/retorno, scroll lock del body. Manual: compila; abrir/cerrar funciona.
4. **Trigger + wiring** — botón trigger con el visual exacto del Link actual; reemplazo en `app/children/page.tsx`. Manual: `/children` cerrado idéntico al screenshot del SPEC 03; click abre el modal.
5. **Specs in place** — SPEC 02 (entrada de la tabla canónica) y SPEC 03 (referencias del botón), verification reports intactos. Manual: relectura sin contradicciones internas.
6. **Verificación final** — `npm run lint`, `npm run build`, screenshots desktop + móvil del modal abierto, de `/children` cerrado y regresión de `/` en `.playwright-mcp/`, click-through de los 4 cierres (Cancelar, Esc, scrim, Guardar sin efectos).

## Acceptance criteria

- [x] `npm run lint` pasa sin errores.
- [x] `npm run build` compila sin errores.
- [x] `/children` con el modal cerrado es idéntico al screenshot del SPEC 03 (el botón pasa de `<a>` a `<button>` sin cambio visual).
- [x] Click en "Agregar niño" abre el modal sin navegación; en ≥1024px es pixel-perfect a `agregar-nino.dc.html` (card 520px `#FBF4EC`, header Cancelar/Agregar niño/Guardar, 5 campos con labels y placeholders exactos, SALA caja estática "Soles" con chevron).
- [x] Scrim `rgba(63,54,46,.45)` visible; click en el scrim cierra el modal.
- [x] Cancelar, Esc y Guardar cierran el modal; Guardar no produce ningún efecto (sin navegación ni cambios en la grilla).
- [x] Al abrir, el foco queda en el primer input; al cerrar, vuelve al botón "Agregar niño".
- [x] Con el modal abierto, el fondo queda inerte y sin scroll; el modal queda por encima de la bottom nav en móvil.
- [x] En <1024px: card centrada con márgenes, scroll interno si no cabe, sin overflow horizontal.
- [x] `AddChildDialog.tsx` es el único `"use client"` nuevo; `app/children/page.tsx` sigue siendo server component.
- [x] SPEC 02 y SPEC 03 actualizados in place sin contradicciones; verification reports intactos.
- [x] El único resto de `/children/new` en `app/` y `components/` es el botón "Editar" del perfil (pendiente de su spec).
- [x] Screenshots en `.playwright-mcp/` comparados contra el template.

## Decisions

- **Sí:** mock estático — los cuatro cierres no producen efectos. Patrón de los specs 01/03/04; la funcionalidad llega con el backend.
- **No:** agregar el niño en memoria o localStorage. Rompe el patrón de mocks y exige lógica de avatar/edad derivada sin datos reales.
- **Sí:** el modal reemplaza la ruta `/children/new`; SPEC 02 editado in place. Precedente: SPEC 02 editó a SPEC 01 de la misma forma.
- **No:** convivir modal + página `/children/new`. Duplicación sin necesidad.
- **Sí:** "Editar" del perfil fuera de scope; sigue → `/children/new` (404) hasta su spec de edición (form pre-poblado es otro flujo).
- **Sí:** SALA como caja estática "Soles" + chevron. Solo existe una sala; fidelidad al template.
- **No:** `<select>` funcional. Sin efecto en un mock.
- **Sí:** `<dialog>` nativo con `showModal()`. Esc, focus-trap y `::backdrop` gratis del browser; cero dependencias.
- **No:** overlay div controlado (focus-trap manual propenso a errores) ni librería headless (el proyecto no tiene dependencias de UI).
- **Sí:** scrim translúcido oscuro `rgba(63,54,46,.45)` (tono ink del proyecto); el template no define scrim.
- **Sí:** campos vacíos con los placeholders exactos del template; fecha como input text ("dd/mm/aaaa").
- **Sí:** móvil = card centrada con márgenes + scroll interno (mismo patrón en ambos breakpoints).
- **Sí:** token `--color-surface-modal` para `#FBF4EC`. Los colores sólidos van como tokens (regla del SPEC 01); solo los gradientes van inline.

## Risks

| Riesgo | Mitigación |
| --- | --- |
| `<dialog>` trae estilos default (width fit-content, márgenes) | Reset explícito en el componente: `w-[calc(100%-2rem)] max-w-[520px]`, centering nativo |
| `::backdrop` sin variante Tailwind dedicada | Variante arbitraria `[&::backdrop]:bg-[rgba(63,54,46,.45)]` o micro-regla en `globals.css` |
| Segundo client component en la feature children | Acotado a un árbol hoja con el trigger; precedente `ChildrenBrowser` (SPEC 03) |
| Regresión visual del botón al pasar de Link a button | Screenshot de `/children` cerrado comparado contra el del SPEC 03 |
| Click en scrim vs click en la card (cerrar por error) | Listener de click solo cuando `event.target === dialog` (la card es hija) |

## What is **not** in this spec

- Guardar real, validación, persistencia, backend.
- Edición de perfil (botón "Editar" → su propio spec).
- Ruta `/children/new` como página.
- Select de sala y chips de alergias interactivos.
- `daily-summary` y `link-parent`.
- Layout tablet, dark mode.

Cada una de esas, si llega, va en su propio spec.

## Verification report

**Fecha:** 2026-09-23 · **Branch:** `spec-05-add-child-modal` · **Spec:** SPEC 05 — Modal Agregar niño en /children

| Criterio | Resultado | Evidencia |
|---|---|---|
| `npm run lint` pasa | **PASS** | Salida de `npm run lint`: 0 errores. |
| `npm run build` compila | **PASS** | Salida de `npm run build`: `✓ Compiled successfully`, TypeScript finalizado, 15 páginas generadas. |
| `/children` cerrado idéntico al SPEC 03 | **PASS** | Screenshot `.playwright-mcp/spec-05-children-closed-desktop-1440x900.png` y `.playwright-mcp/verify-children-closed-desktop.png` — botón "Agregar niño" con gradiente, sombra e ícono `Plus` idénticos al `<a>` del SPEC 03. |
| Modal pixel-perfect desktop | **PASS** | Screenshot `.playwright-mcp/spec-05-modal-open-desktop-1440x900.png` comparado contra `references/pantallas/agregar-nino.dc.html`: card 520px `#FBF4EC`, border `#ECE0D0`, radius 24px, sombra, header (Cancelar/Agregar niño/Guardar con pesos y colores correctos), 5 campos con labels y placeholders exactos, SALA "Soles" + `ChevronDown`. |
| Scrim visible; click cierra | **PASS** | `dialog::backdrop { background: rgba(63, 54, 46, 0.45) }` en `globals.css`. Click en scrim vía `dialog.click()` → `dialog.open === false`. |
| Cancelar, Esc, Guardar cierran sin efectos | **PASS** | Cancelar: `dialog.open === false`. Esc: `dialog.open === false`. Guardar: `dialog.open === false`, URL permanece `/children` (sin navegación). |
| Foco: primer input al abrir, trigger al cerrar | **PASS** | `page.evaluate` → al abrir: `focusedAfterOpen = "INPUT Ej. Martina López"`; al cerrar: `focusedAfterClose = "BUTTON Agregar niño"`. |
| Fondo inerte + sin scroll; modal sobre bottom nav | **PASS** | `page.evaluate` → `bodyOverflow = "hidden"`. Screenshot móvil confirma modal por encima de la bottom nav. |
| <1024px: card centrada, márgenes, scroll interno | **PASS** | Screenshot `.playwright-mcp/spec-05-modal-open-mobile-390x844.png` — card centrada con márgenes laterales, `max-h-[calc(100vh-2rem)] overflow-y-auto`, sin overflow horizontal. |
| Único `"use client"` nuevo; `children/page.tsx` server | **PASS** | `AddChildDialog.tsx` línea 1: `"use client"`. `children/page.tsx` sin `"use client"`, solo imports + JSX. |
| SPEC 02/03 actualizados in place | **PASS** | SPEC 02 línea 46: `agregar-nino.dc.html → modal en /children`. SPEC 03 línea 82: referencia al modal. Verification reports intactos en ambos. |
| `/children/new` solo en "Editar" del perfil | **PASS** | `rg "children/new" app/ components/` → 1 match: `ChildProfileHeader.tsx:25 href="/children/new"`. |
| Screenshots en `.playwright-mcp/` | **PASS** | 4 screenshots existentes: `spec-05-modal-open-desktop-1440x900.png`, `spec-05-modal-open-mobile-390x844.png`, `spec-05-children-closed-desktop-1440x900.png`, `spec-05-regression-home-1440x900.png`. Comparación visual contra template: fidelidad total. |

**Arreglos menores aplicados:** ninguno — todos los criterios pasaron en el primer intento.

**Arreglos mayores pendientes:** ninguno.

**Notas:**
- No se inició un nuevo dev server (ya estaba corriendo en `localhost:3000`).
- Console errors esperados por rutas `/children/new`, `/posts/new`, etc. que retornan 404 (no son errores de la feature; están out of scope).
