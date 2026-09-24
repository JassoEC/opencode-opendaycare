# SPEC 06 — Modal Vincular padre en /children/[childId]

> **Status:** Approved
> **Depends on:** SPEC 02, SPEC 03, SPEC 05
> **Date:** 2026-09-23
> **Objective:** Implementar `vincular-padre.dc.html` como un modal estático sobre `/children/[childId]` — el dashed "Vincular otro padre" lo abre en lugar de navegar a `/children/[childId]/link-parent` — extrayendo un shell de dialog reutilizable (`AppDialog`) que también pasa a usar el modal Agregar niño del SPEC 05.

## Por qué existe este spec

Activa el dashed "Vincular otro padre" que hoy navega a un 404 (pendiente del SPEC 03). Convierte `vincular-padre.dc.html` en modal — mismo mecanismo que el SPEC 05 aplicó al alta — y resuelve la deuda que dejó ese spec: la mecánica de dialog (trigger, `showModal()`, scrim, Esc, foco, scroll-lock) se extrae a un shell reutilizable en `components/shared/` en lugar de duplicarse por pantalla.

## Scope

**In:**

- `components/shared/AppDialog.tsx` (client): shell de dialog reutilizable con toda la mecánica del SPEC 05 — `<dialog>` nativo + `showModal()`/`close()`, scrim click (`event.target === dialog`), Esc nativo, listener de `close`, scroll-lock del body, foco en el primer input al abrir y retorno al trigger al cerrar — más el chrome visual de la card (bg `surface-modal`, border, radius 24px, sombra, `m-auto`, `w-[calc(100%-2rem)]`, `max-h` + scroll interno) parametrizado por `maxWidth` ("520px" | "480px"). El contenido entra como render-prop que recibe `close` (los botones de cierre del contenido llaman a esa función).
- Refactor de `components/children/AddChildDialog.tsx` para usar `AppDialog` (maxWidth 520px): mismo trigger, mismo contenido, mismos 4 cierres (Cancelar/Esc/scrim/Guardar). Cero cambios visuales y de comportamiento.
- Extracción de `labelClass`/`fieldClass` (hoy locales en `AddChildDialog`) a `components/shared/form-styles.ts`, consumidos por ambos dialogs.
- `components/children/LinkParentDialog.tsx` (client): trigger dashed "Vincular otro padre" con visual idéntico al `<Link>` actual de `ParentsCard` (círculo dashed `#D8CBBA` + `Plus` + texto `brand-dark`) + contenido pixel-perfect a `vincular-padre.dc.html` en ≥1024px (card 480px):
  - Header: "Vincular padre" (Fredoka 600, 18px) + "a {child.name}" (13px, `ink-subtle`) a la izquierda; botón X a la derecha (34×34px, radius 10px, bg `border-divider`, color `ink-muted`, ícono 18px); border-bottom `border`, padding 20px 26px. X cierra el modal.
  - Banner info: bg `#E3ECFB` (token nuevo), radius 14px, padding 13px 16px, ícono `Info` 20px `announcement-ink`, texto 13.5px `#3F5694` (token nuevo), line-height 1.45: "Le enviaremos un correo con un código para que active su cuenta. Solo verá el feed de {nombre de pila}."
  - Campos con label eyebrow + input base (estilos extraídos): NOMBRE DEL PADRE/MADRE (placeholder "Ej. Diego Fernández"), EMAIL (type email, placeholder "correo@ejemplo.com"). Inputs vacíos, sin prefill.
  - PARENTESCO: 3 pills estáticas (flex, gap 9px, radius 999px, border 1.5px, padding 11px, weight 800, 14px): "Mamá" seleccionada (bg `announcement-bg`, border `#9FB8EC` token nuevo, color `announcement-ink`); "Papá" y "Tutor/a" neutras (bg `surface`, border `border`, color `ink-nav`).
  - Caja de código: bg `consent-bg`, border 1.5px dashed `#E6D08A` (token nuevo), radius 16px, padding 18px, centrada: "CÓDIGO DE INVITACIÓN" (eyebrow, `#A88526` token nuevo), "7K4P9" (Fredoka 600, 34px, letter-spacing 7px, `consent-ink`), "Vence en 7 días" (13px, `#A88526`). Constantes de copy del mock.
  - Botón "Enviar invitación": gradiente inline `180deg #F4977E→#EE8164`, radius 14px, padding 14px, blanco 800 15.5px, sombra `0 10px 22px -8px rgba(238,129,100,.7)`, ícono `Send` 19px. Cierra el modal sin efectos.
- `components/children/ParentsCard.tsx`: el `<Link href="/children/${child.id}/link-parent">` se reemplaza por `<LinkParentDialog child={child} />`; `ParentsCard` sigue siendo server component (pasa el objeto serializable).
- Íconos nuevos en `components/shared/icons.tsx`: `X` (18px), `Info` (20px, circle + i), `Send` (19px, paper plane).
- Tokens nuevos en `app/globals.css` (solo los 5 que no existen): `#E3ECFB`, `#3F5694`, `#9FB8EC`, `#E6D08A`, `#A88526`. El resto ya son tokens: `announcement-bg/ink`, `consent-bg/ink`, `surface-modal`, `border`, `ink-nav`, `ink-subtle`, `ink-muted`, `border-divider`, `input-border`, `input-placeholder`.
- Ediciones in place (verification reports intactos): SPEC 02 — tabla canónica `vincular-padre.dc.html` → modal en `/children/[childId]` (sin ruta); SPEC 03 — referencias al dashed "Vincular otro padre" (Scope, reglas del Data model, Acceptance) pasan de link a modal trigger.
- Responsive <1024px: patrón del SPEC 05 — card centrada con márgenes (16–24px), scroll interno si no cabe, top layer por encima de la bottom nav.

**Out of scope (for future specs):**

- Envío real de la invitación: validación, generación de código, email, backend, persistencia.
- Ruta `/children/[childId]/link-parent` (nunca existirá; el modal la reemplaza, como `/children/new` en el SPEC 05).
- Pills de parentesco interactivas (mock estático, "Mamá" fija) y tags/chips.
- Badge VINCULAR del listado `/children` como trigger del modal (sigue navegando al perfil).
- `/children/[childId]/daily-summary` (sigue 404) y edición de perfil.
- Auth real y flujo completo con `/activate-account`.
- Layout tablet, dark mode.
- Los templates `references/pantallas/*.dc.html` (intocables).

## Data model

Esta feature no introduce estructuras de datos nuevas. El niño llega por props desde `lib/children-data.ts` (el perfil ya lo resuelve por `childId`); el código "7K4P9" y "Vence en 7 días" son constantes de copy en `LinkParentDialog` (patrón del SPEC 05).

Reglas derivadas:

- Header: "a {child.name}" — nombre completo ("a Mateo Fernández").
- Banner: nombre de pila = primera palabra de `child.name` ("Solo verá el feed de Mateo.").
- Trigger: visual idéntico al dashed actual de `ParentsCard` (círculo dashed `#D8CBBA` 40px + `Plus` + "Vincular otro padre" en `brand-dark`).

## Implementation plan

1. **Tokens** — `app/globals.css`: los 5 tokens nuevos. Manual: `npm run dev` carga sin errores.
2. **Íconos** — `X`, `Info`, `Send` en `components/shared/icons.tsx`. Manual: compila.
3. **AppDialog** — `components/shared/AppDialog.tsx`: mecánica + chrome + `maxWidth` + render-prop con `close`. Manual: compila.
4. **Refactor AddChildDialog** — migrar a `AppDialog` (520px) + extraer `labelClass`/`fieldClass` a `components/shared/form-styles.ts`. Manual: abrir/cerrar el modal Agregar niño se comporta igual; screenshot idéntico al del SPEC 05.
5. **LinkParentDialog** — trigger dashed + contenido completo (header con X, banner, 2 campos, pills, caja de código, botón Enviar). Manual: compila.
6. **Wiring** — `ParentsCard` reemplaza el `<Link>` por `<LinkParentDialog>`. Manual: perfil cerrado idéntico al screenshot del SPEC 03; click en el dashed abre el modal.
7. **Specs in place** — SPEC 02 (tabla canónica) y SPEC 03 (referencias del dashed), verification reports intactos. Manual: relectura sin contradicciones internas.
8. **Verificación final** — `npm run lint`, `npm run build`, screenshots desktop + móvil del modal abierto, del perfil cerrado (regresión SPEC 03), del modal Agregar niño (regresión SPEC 05) en `.playwright-mcp/`, click-through de los 4 cierres (X, Esc, scrim, Enviar invitación) y foco inicial/retorno.

## Acceptance criteria

- [ ] `npm run lint` pasa sin errores.
- [ ] `npm run build` compila sin errores.
- [ ] El dashed "Vincular otro padre" abre el modal sin navegación; el trigger es visualmente idéntico al `<Link>` actual (círculo dashed + `Plus` + texto).
- [ ] En ≥1024px, el modal es pixel-perfect a `vincular-padre.dc.html`: card 480px `#FBF4EC`, header "Vincular padre / a Mateo Fernández" + botón X, banner azul con el texto exacto, NOMBRE DEL PADRE/MADRE y EMAIL con placeholders exactos, pills PARENTESCO (Mamá seleccionada `#CCD8F4`/`#9FB8EC`/`#4E72C8`; Papá y Tutor/a neutras), caja de código "7K4P9" + "Vence en 7 días", botón gradiente "Enviar invitación" con ícono Send.
- [ ] X, Esc, click en scrim y "Enviar invitación" cierran el modal; ninguno produce efecto (sin navegación ni cambios).
- [ ] Al abrir, el foco queda en el primer input; al cerrar, vuelve al trigger dashed. Body sin scroll con el modal abierto; el modal queda por encima de la bottom nav en móvil.
- [ ] En <1024px: card centrada con márgenes, scroll interno si no cabe, sin overflow horizontal.
- [ ] Refactor sin regresión: `AddChildDialog` usa `AppDialog` y el modal Agregar niño se ve y comporta idéntico (4 cierres, foco, scrim, scroll-lock, pixel-perfect vs `agregar-nino.dc.html`).
- [ ] El perfil con el modal cerrado es idéntico al screenshot del SPEC 03.
- [ ] `AppDialog.tsx` y `LinkParentDialog.tsx` son los únicos `"use client"` nuevos; `ParentsCard.tsx` sigue siendo server component.
- [ ] Grep de `link-parent` en `app/` y `components/` → 0 resultados.
- [ ] SPEC 02 y SPEC 03 actualizados in place sin contradicciones; verification reports intactos.
- [ ] Screenshots desktop y móvil en `.playwright-mcp/` comparados contra el template.

## Decisions

- **Sí:** modal sobre el perfil en lugar de página con ruta. Decisión del usuario: la card centrada del template es en realidad un modal; reemplaza la ruta `/children/[childId]/link-parent` de la tabla canónica (mecanismo del SPEC 05 con `/children/new`).
- **Sí:** extraer `AppDialog` a `components/shared/` y refactorizar `AddChildDialog`. Decisión del usuario ("hacerlo reutilizable"); la mecánica de dialog queda única para la app y el refactor se blinda con criterio de regresión explícito.
- **No:** shell solo para el nuevo modal. Dejaría la mecánica duplicada en `AddChildDialog`.
- **Sí:** mock estático: pills fijas, inputs vacíos, los 4 cierres sin efectos. Patrón SPEC 01/04/05.
- **No:** pills interactivas ni validación. Llegan con el backend.
- **Sí:** "Enviar invitación" = cierre sin efectos. En un modal sobre el perfil, "volver al perfil" (decisión del usuario) equivale a cerrar.
- **No:** navegación forzada a `/children/[childId]` al enviar. Redundante: el modal está montado en esa página.
- **Sí:** sin datos nuevos — child por props; "7K4P9" y "Vence en 7 días" como constantes de copy (patrón SPEC 05).
- **No:** mock tipado en `lib/`. No hay generación real de códigos.
- **Sí:** solo el dashed del perfil abre el modal (decisión del usuario); el badge VINCULAR del listado sigue navegando al perfil.
- **Sí:** nombre de pila derivado (primera palabra de `child.name`) para el banner; nombre completo en el header.
- **Sí:** extraer `labelClass`/`fieldClass` a `components/shared/form-styles.ts`. Dos consumidores con estilos idénticos; DRY.
- **Sí:** tokens nuevos solo para los 5 colores inexistentes; el resto reutiliza tokens existentes (`announcement-*`, `consent-*`, etc.).
- **Sí:** estándar visual "idéntico al template" verificado por comparación Playwright (1440×900 y 390×844), sin umbral numérico — como specs 01–05.

## Risks

| Riesgo | Mitigación |
| --- | --- |
| Regresión del modal Agregar niño al refactor a `AppDialog` | Criterio de regresión explícito: screenshot + click-through de los 4 cierres contra `agregar-nino.dc.html` |
| API del shell (render-prop con `close`) queda incómoda para futuros dialogs | Dos consumidores reales la validan; si evoluciona, se documenta en el spec que la extienda |
| Desvío pixel-perfect (banner azul, pills, caja dashed, código 34px con letter-spacing 7px) | Comparación Playwright contra `vincular-padre.dc.html` a 1440×900 |
| El dashed pasa de `<a>` a `<button>` (perfil) | Screenshot del perfil cerrado comparado contra el del SPEC 03 |

## What is **not** in this spec

- Envío real, validación, generación de código, emails, backend, persistencia.
- Ruta `/children/[childId]/link-parent` como página.
- Pills interactivas; badge VINCULAR del listado como trigger.
- `daily-summary`, edición de perfil.
- Auth real y flujo con `/activate-account`.
- Layout tablet, dark mode.

Cada una de esas, si llega, va en su propio spec.
