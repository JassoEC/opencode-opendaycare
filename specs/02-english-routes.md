# SPEC 02 — URLs en inglés: migración de links y actualización de docs

> **Status:** Implemented
> **Depends on:** SPEC 01
> **Date:** 2026-09-21
> **Objective:** Migrar las URLs de la app de español a inglés (solo rutas; labels de UI y datos quedan en español) cambiando los hrefs existentes y revirtiendo la decisión de rutas en español del spec 01, antes de construir nuevas pantallas.

## Por qué existe este spec

Hoy solo existe la página `/`: la migración es 13 hrefs en 6 componentes y ninguna página que mover. Cada pantalla nueva construida con rutas en español encarecería la migración. Además, este spec pasa a ser la **tabla canónica de mapeo template → ruta** que todos los specs futuros deben respetar.

## Scope

**In:**

- Cambiar los 13 hrefs de 6 componentes según la tabla canónica (abajo):
  - `Sidebar.tsx`: `/crear-publicacion`→`/posts/new` · `/ninos`→`/children` · `/avisos`→`/announcements` · `/mi-cuenta`→`/account`
  - `BottomNav.tsx`: ídem los 4
  - `TopBar.tsx`: `/mi-cuenta`→`/account`
  - `ComposerTrigger.tsx`: `/crear-publicacion`→`/posts/new`
  - `PostActions.tsx`: `/detalle-publicacion`→`/posts/${postId}` (nueva prop `postId: string`) · `/crear-publicacion`→`/posts/new`
  - `PhotoPlaceholder.tsx`: `/foto`→`/photo`
  - `PostCard.tsx`: pasa `post.id` a `PostActions` como `postId`
  - `/` y `/login` no cambian.
- Editar `specs/01-feed-home.md` in place: referencias a rutas en Scope (top bar → `/account`, bottom nav → `/posts/new`, listado de pantallas 404), tabla de mapeo (§Data model), párrafo Convenciones (rutas ahora en inglés), paso 7 del plan y criterio móvil de Acceptance. **Verification report intacto** (evidencia histórica de lo verificado ese día).
- Nueva entrada en Decisions del spec 01 documentando la reversión (fecha 2026-09-21 + referencia a este spec).
- `AGENTS.md`: una línea bajo "Reglas de codificacion" fijando la convención — URLs/rutas en inglés; textos de UI y datos en español.

**Out of scope:**

- Crear las páginas nuevas (todas las rutas siguen 404, igual que hoy).
- Redirects de rutas viejas (no hay páginas servidas bajo esas rutas).
- Cambiar labels de UI ("Niños", "Mi cuenta"), datos ni slugs (`/children/mateo-fernandez` conserva nombres en español — es data).
- Prop `active`/`NavItem` del nav (llega con el spec de Niños).
- Los templates `references/pantallas/*.dc.html` (referencias originales, intocables).

## Data model

Sin datos nuevos. Tabla canónica de mapeo (fuente de verdad para todos los specs):

| Template | Ruta |
| --- | --- |
| `index.dc.html`, `feed.dc.html` | `/` |
| `ninos.dc.html` | `/children` |
| `perfil-nino.dc.html` | `/children/[childId]` |
| `agregar-nino.dc.html` | modal en `/children` (sin ruta, ver SPEC 05) |
| `resumen-dia.dc.html` | `/children/[childId]/daily-summary` |
| `vincular-padre.dc.html` | modal en `/children/[childId]` (sin ruta, ver SPEC 06) |
| `avisos.dc.html` | `/announcements` |
| `mi-cuenta.dc.html` | `/account` |
| `crear-publicacion.dc.html` | `/posts/new` |
| `detalle-publicacion.dc.html` | `/posts/[postId]` |
| `foto.dc.html` | `/photo` |
| `login.dc.html` | `/login` |
| `activar-cuenta.dc.html` | `/activate-account` |
| `familia-feed.dc.html` | `/family` (provisional, se define en su spec) |
| `familia-cuenta.dc.html` | `/family/account` (provisional, se define en su spec) |

Convención: URLs y segmentos de ruta en inglés (identificadores de infraestructura); labels de UI, textos y valores de datos en español. Los slugs derivados de datos (ids de niño tipo `mateo-fernandez`) quedan en español.

## Implementation plan

1. **Hrefs** — los 13 cambios de la tabla de scope + prop `postId` en `PostActions` (con `PostCard` pasando `post.id`). Manual: grep de rutas españolas (`/ninos|/avisos|/mi-cuenta|/crear-publicacion|/detalle-publicacion|/foto|/agregar-nino|/perfil-nino|/resumen-dia|/vincular-padre|/activar-cuenta`) en `app/` y `components/` → 0 resultados; `/` renderiza igual.
2. **Spec 01 in place** — actualizar Scope, tabla de mapeo, Convenciones, paso 7 y criterio móvil a las rutas inglesas; agregar entrada en Decisions: "Sí: URLs en inglés (reversión de la decisión original, 2026-09-21, ver SPEC 02)". Verification report sin tocar. Manual: relectura del spec sin contradicciones internas.
3. **AGENTS.md** — línea de convención bajo "Reglas de codificacion". Manual: visible en el archivo.
4. **Verificación final** — `npm run lint`, `npm run build`, snapshot de `/` en `.playwright-mcp/` confirmando los hrefs nuevos (sidebar/bottom nav → `/children`, `/announcements`, `/account`, `/posts/new`, `/photo`, `/login`) y cero cambios visuales.

## Acceptance criteria

- [x] `npm run lint` pasa sin errores.
- [x] `npm run build` compila sin errores.
- [x] Los 13 hrefs apuntan a las rutas inglesas de la tabla canónica (verificado por grep y snapshot de `/`).
- [x] Grep de rutas españolas en `app/`, `components/` y `lib/` → 0 resultados.
- [x] `specs/01-feed-home.md` actualizado sin contradicciones (tabla, convención, scope, plan y criterios en inglés; nueva entrada en Decisions con la reversión; Verification report intacto).
- [x] `AGENTS.md` documenta la convención de URLs.
- [x] La home `/` no tiene ningún cambio visual (solo cambian los hrefs).

## Decisions

- **Sí:** URLs en inglés con textos de UI/datos en español. Revierte la decisión del spec 01 (que las trataba como decisión de producto): las URLs son identificadores de infraestructura y encajan con la regla de código en inglés de AGENTS.md; el español vive en la capa user-facing (labels, contenido, datos).
- **Sí:** rutas REST anidadas (`/posts/[postId]`, `/children/new`, `/children/[childId]/daily-summary`, `/children/[childId]/link-parent`). Escalable y predecible a medida que lleguen pantallas.
- **Sí:** prop `postId` en `PostActions`. El patrón `/posts/[postId]` exige un id real; `PostCard` ya lo tiene.
- **Sí:** editar el spec 01 in place y dejar el Verification report como evidencia histórica. El body del spec describe el sistema actual; el report describe lo verificado ese día.
- **Sí:** sin redirects. No existe ninguna página bajo las rutas viejas: no hay nada que redirigir.
- **No:** cambiar labels de UI ni slugs derivados de datos (nombre de los niños).
- **No:** incluir la prop `active`/`NavItem` del nav. Pertenece al spec de Niños (03), que la necesita de verdad.

## What is **not** in this spec

- Las 16 pantallas de `references/pantallas/` (siguen 404).
- Redirects, auth, base de datos, interactividad.
- La regeneración del spec de Niños como `03-ninos` (se redacta después de este, ya con la tabla canónica).

## Verification report

**Fecha:** 2026-09-22 · **Branch:** `spec-02-english-routes` · **Spec:** 02-english-routes

### Tabla de criterios

| Criterio | Resultado | Evidencia |
|---|---|---|
| `npm run lint` pasa sin errores | **PASS** | `npm run lint` → "eslint: No issues found" |
| `npm run build` compila sin errores | **PASS** | `npm run build` → "✓ Compiled successfully", TypeScript en 1429ms, 4/4 páginas estáticas generadas |
| 13 hrefs apuntan a rutas inglesas | **PASS** | `grep -r "href=" components/` confirma los 13 hrefs en inglés: `Sidebar.tsx` (4: `/posts/new`, `/children`, `/announcements`, `/account`), `BottomNav.tsx` (4: `/children`, `/posts/new`, `/announcements`, `/account`), `TopBar.tsx` (1: `/account`), `ComposerTrigger.tsx` (1: `/posts/new`), `PostActions.tsx` (2: `/posts/${postId}`, `/posts/new`), `PhotoPlaceholder.tsx` (1: `/photo`). Snapshot DOM en `.playwright-mcp/spec-02-links.json` confirma los hrefs en el HTML renderizado. |
| Grep rutas españolas → 0 en código | **PASS** | `rg "/(ninos\|avisos\|mi-cuenta\|crear-publicacion\|detalle-publicacion\|foto\|agregar-nino\|perfil-nino\|resumen-dia\|vincular-padre\|activar-cuenta\|familia)"` en `app/`, `components/`, `lib/` → 0 resultados. Los únicos matches están en `specs/` (documentación, no código). |
| `specs/01-feed-home.md` sin contradicciones | **PASS** | Tabla de mapeo con rutas inglesas (§Data model). Convenciones actualizadas con referencia a SPEC 02. Decisión "URLs en inglés (reversión…)" añadida en §Decisions (línea 132). Implementation plan paso 7 → `/posts/new`. Acceptance criteria móvil → `/account`, `/posts/new`. Verification report del spec 01 intacto (evidencia histórica). |
| `AGENTS.md` documenta convención de URLs | **PASS** | Línea en §Reglas de codificacion: "Las URLs y rutas van siempre en inglés (identificadores de infraestructura); los textos de UI y los datos quedan en español. Tabla canónica de mapeo template → ruta: `specs/02-english-routes.md`" |
| Home `/` sin cambios visuales | **PASS** | Screenshots `.playwright-mcp/spec-02-desktop-1440x900.png` (desktop) y `.playwright-mcp/spec-02-mobile-390x844.png` (móvil) confirmando layout idéntico al spec 01: sidebar 248px, saludo, composer, divisor "PUBLICADO HOY", 3 posts con badges y contadores 3/1, 5/2, 8/0. Bottom nav en móvil con 5 ítems. Console errors: 0. Los únicos cambios son los hrefs en los `<a>`. |

### Arreglos menores aplicados durante la verificación

- Ninguno. Todos los criterios pasan sin necesidad de correcciones.

### Desviaciones del scope

- Ninguna. La implementación coincide con el scope definido.
