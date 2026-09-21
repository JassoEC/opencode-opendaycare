<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Proyecto

- Aplicación de guardería en Next.js 16.3.5 + React 19 + Tailwind CSS v4 + TypeScript.
- `app/` es todavía el boilerplate de `create-next-app`: no hay lógica de negocio, tests ni CI configurados.

## Comandos

- `npm run dev` — servidor de desarrollo
- `npm run lint` — eslint (no hay script de typecheck)
- `npm run build` — compila y pasa el typecheck de Next

## Quirks del framework

- Tailwind v4, configuración CSS-first en `app/globals.css` (`@import "tailwindcss"` + `@theme inline`). NO existe `tailwind.config.*`.
- Alias `@/*` → raíz del repo (paths en `tsconfig.json`).
- Es Next.js **16** con breaking changes (ver bloque auto-generado arriba): antes de escribir código, lee la doc local en `node_modules/next/dist/docs/`.

## Workflow

- Features grandes se planifican con el skill `/spec` y se implementan con `/spec-impl` (en `.agents/skills/`). Los specs viven en `specs/` (aún no creado); el branch se nombra `spec-NN-slug`.

## MCPs

- Playwright screen shots y todo lo relacionado con Playwright tiene que estar en la carpeta .playwright-mcp

- Context7 Usaremos este MCP para traer la documentacion actualizada del Framework

## Spec Driven Development - Skills

- /spec usaremos esta skill para crear las especificaciones
- /spec-impl usaremos esta skill para realizar las implementaciones


## Reglas de codificacion
- Usa clean code de forma estricta, lo que significa que los nombres de variables, funciones, tipos, etc, deben estar en ingles
