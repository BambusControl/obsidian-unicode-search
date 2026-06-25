# ADR 0005: Library vs Plugin Separation

## Status

Accepted

## Context

As the plugin grew, reusable types and helpers became entangled with Obsidian-specific code. This made it harder to test pure logic in isolation and reuse utilities across projects.

## Decision

Separate the codebase into two top-level directories:

```
src/
├── libraries/          # Reusable, Obsidian-agnostic code
│   ├── comparison/     # Comparison functions for characters and search results
│   ├── data/           # Unicode data (planes, categories, blocks)
│   ├── helpers/        # Pure utility functions (toGlyph, toHexadecimal, etc.)
│   ├── order/          # Ordering primitives (Order enum, inverse)
│   └── types/          # Type definitions (CodePoint, SaveData, etc.)
│
└── unicode-search/     # Plugin-specific code (Obsidian-dependent)
    ├── components/     # UI components (modals, settings)
    ├── errors/         # Plugin-specific error types
    ├── service/        # Services (storage, bootstrapper, stores)
    └── main.ts         # Plugin entry point
```

### Rules

- `libraries/` must NOT import from `unicode-search/`
- `unicode-search/` may import from `libraries/`
- `libraries/data/` contains static Unicode data (planes, categories) — not user data
- `libraries/types/` contains all type definitions, including save data structures

## Consequences

### Positive

- Pure functions in `libraries/` are easily testable without Obsidian mocks
- Clear dependency direction (libraries ← plugin)
- Reusable utilities for other projects

### Negative

- Need to maintain two directories
- Some types in `libraries/types/savedata/` are plugin-specific but live in libraries for consistency

### Neutral

- Test files mirror the `libraries/` structure in `tests/`

## Implementation

- `src/libraries/` — all Obsidian-agnostic code
- `src/unicode-search/` — all Obsidian-dependent code
- `tests/libraries/` — tests for library code
