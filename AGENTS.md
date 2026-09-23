<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Proyecto

- Aplicación de guardería en Next.js 16.3.5 + React 19 + Tailwind CSS v4 + TypeScript.
- Implementado hasta ahora: `specs/01-feed-home.md` (Status: Implemented) — feed home `/` pixel-perfect + responsive, 100% server components. No hay tests ni CI configurados.
- Base ya establecida para las demás pantallas (reutilizar en specs futuros): tokens crema en `app/globals.css`, fuentes Fredoka+Nunito vía `next/font`, `components/shared/` (icons, Avatar, navigation), `components/feed/` y datos tipados en `lib/feed-data.ts`.
- Plantillas de referencia en `references/pantallas/*.dc.html`; mapeo template → rutas en `specs/01-feed-home.md`.

## Comandos

- `npm run dev` — servidor de desarrollo
- `npm run lint` — eslint (no hay script de typecheck)
- `npm run build` — compila y pasa el typecheck de Next

## Quirks del framework

- Tailwind v4, configuración CSS-first en `app/globals.css` (`@import "tailwindcss"` + `@theme inline`). NO existe `tailwind.config.*`.
- Alias `@/*` → raíz del repo (paths en `tsconfig.json`).
- Es Next.js **16** con breaking changes (ver bloque auto-generado arriba): antes de escribir código, lee la doc local en `node_modules/next/dist/docs/`.

## Workflow

- Features grandes se planifican con el skill `/spec`, se implementan con `/spec-impl` (en `.agents/skills/`) y se verifican con el agente `spec-verifier`. Los specs viven en `specs/` (ej.: `specs/01-feed-home.md`); el branch se nombra `spec-NN-slug` (ej.: `spec-01-feed-home`).
- Tras `/spec-impl`, invocar el agente `spec-verifier` (task tool con `subagent_type: spec-verifier`) pasándole el spec: verifica los "Acceptance criteria" con evidencia real, aplica arreglos menores, marca los checks `[x]` y, si todo pasa, cambia el Status a `Implemented` (ejemplo en `specs/01-feed-home.md` → sección "Verification report").

## MCPs

- Playwright screen shots y todo lo relacionado con Playwright tiene que estar en la carpeta .playwright-mcp

- Context7 Usaremos este MCP para traer la documentacion actualizada del Framework

## Spec Driven Development - Skills y agentes

- /spec usaremos esta skill para crear las especificaciones
- /spec-impl usaremos esta skill para realizar las implementaciones
- spec-verifier — agente (`.opencode/agents/spec-verifier.md`, no es skill): usar tras `/spec-impl` o cuando se necesite revisar/marcar los "Acceptance criteria" de un spec. Se invoca con el task tool (`subagent_type: spec-verifier`) + el spec como argumento. Nunca commitea: el commit es decisión del humano.


## Reglas de codificacion
- Usa clean code de forma estricta, lo que significa que los nombres de variables, funciones, tipos, etc, deben estar en ingles
- Las URLs y rutas van siempre en inglés (identificadores de infraestructura); los textos de UI y los datos quedan en español. Tabla canónica de mapeo template → ruta: `specs/02-english-routes.md`

- importante No hacer commits si no se piden explicitamente
