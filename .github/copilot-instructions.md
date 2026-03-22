# Copilot coding instructions

## Project overview

- This repository contains the **Obsidian Unicode Search** plugin.
- Source code is in `/src`:
    - `/src/unicode-search` contains plugin/runtime integration with the Obsidian API.
    - `/src/libraries` contains reusable pure logic (comparison, helpers, data, ordering, and types).
- Tests are in `/tests` and generally mirror files in `/src/libraries`.

## Development workflow

- Use Node.js + npm.
- Main scripts:
    - `npm run dev` – development build/watch mode
    - `npm run build` – TypeScript check + production bundle
    - `npm run test` – Jest tests
    - `npm run export-schema` – regenerate `resources/save-data-schema.json` for SaveData changes
- Before finalizing changes, run:
    1. `npm run build`
    2. `npm run test`

## Coding guidelines

- Use TypeScript and keep changes strongly typed.
- Follow existing formatting conventions from `.editorconfig` (UTF-8, LF, 4 spaces).
- Keep business logic in `/src/libraries` when possible; keep Obsidian UI/plugin glue in `/src/unicode-search`.
- Make focused, minimal changes that fit existing naming and structure.

## Testing guidelines

- Add or update Jest tests for logic changes.
- Place tests under `/tests` in the corresponding mirrored path.
- Prefer targeted unit tests over broad rewrites.
