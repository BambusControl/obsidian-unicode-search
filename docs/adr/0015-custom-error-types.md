# ADR 0015: Custom Error Types at Every Layer

## Status

Accepted

## Context

As the codebase grew, two separate violation patterns appeared:

1. `libraries/types/persistCache.ts` and `libraries/helpers/getRandomItem.ts` both threw
   `UnicodeSearchError` — a type defined in `unicode-search/errors/`, which is plugin-layer code.
   This violated ADR-0005 (libraries/ must not import from unicode-search/).

2. The existing `UnicodeSearchError` was the only named error type in the plugin. Any error thrown
   by the plugin — whether from generic library utilities or domain-specific plugin code — looked
   identical in stack traces and catch blocks.

The fix introduced a second named error class (`LibraryError`) so that the two layers have distinct,
named error types. At the same time, an explicit policy was recorded: never throw plain `Error`
anywhere in the plugin.

## Decision

**Never throw `new Error(...)` anywhere in the plugin.** Always throw a named subclass.

Two error types exist, one per layer:

| Layer | Type | Location |
|-------|------|----------|
| `src/libraries/` | `LibraryError` | `src/libraries/errors/libraryError.ts` |
| `src/unicode-search/` | `UnicodeSearchError` | `src/unicode-search/errors/unicodeSearchError.ts` |

Both extend `Error` and set `this.name` in the constructor, so they are immediately identifiable
in stack traces and `instanceof` checks without importing the class.

### Rules

- Code in `src/libraries/` throws `LibraryError`. It must not import or throw `UnicodeSearchError`.
- Code in `src/unicode-search/` throws `UnicodeSearchError`. It may catch `LibraryError` when
  handling errors that originate in library code.
- Do not introduce additional error subclasses without updating this ADR.
- Catch blocks that need to distinguish plugin errors from third-party errors can test
  `error instanceof LibraryError` or `error instanceof UnicodeSearchError`.

## Consequences

### Positive

- Errors from the plugin are always distinguishable from errors thrown by Obsidian, Node, or
  third-party packages (which use plain `Error` or their own types).
- The two named types distinguish library-layer defects from plugin-layer domain errors.
- Fixes the ADR-0005 violation: `libraries/` no longer imports from `unicode-search/errors/`.

### Negative

- Every new throw site must choose the correct type — minor discipline overhead.

### Neutral

- Existing `UnicodeSearchError` throw sites in `unicode-search/` are unchanged.
- `LibraryError` is introduced at two sites: `PersistCache` and `getRandomItem`.

## Implementation

- `src/libraries/errors/libraryError.ts` — `LibraryError` class
- `src/unicode-search/errors/unicodeSearchError.ts` — `UnicodeSearchError` class (unchanged)
- `src/libraries/types/persistCache.ts` — updated to throw `LibraryError`
- `src/libraries/helpers/getRandomItem.ts` — updated to throw `LibraryError`
