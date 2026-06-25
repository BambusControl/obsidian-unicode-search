# ADR 0008: Testing Patterns

## Status

Accepted

## Context

The plugin needs tests for pure library functions (comparison, helpers, data transforms) without Obsidian dependencies. Tests should be fast, isolated, and mirror the source structure.

## Decision

Use Jest with `ts-jest` for TypeScript support. Tests live in `tests/libraries/` mirroring `src/libraries/`:

```
tests/
└── libraries/
    ├── comparison/     # Tests for comparison functions
    └── helpers/        # Tests for utility functions
```

### Test Conventions

- File naming: `*.spec.ts` (not `*.test.ts`)
- Import from `src/` directly (path aliases in tsconfig)
- Use `describe`/`it` or `test` blocks
- Assert with `expect` from `@jest/globals`
- Test pure functions only — no Obsidian mocks needed

### Example

```typescript
import { compareUseRecord } from "src/libraries/comparison/compareUseRecord";

test("later use is before sooner use", () => {
    expect(compareUseRecord(
        { firstUse: new Date(0), lastUse: new Date(2), timesUsed: 1 },
        { firstUse: new Date(0), lastUse: new Date(1), timesUsed: 1 },
        new Date(0),
    )).toBe(-1);
});
```

### Error Testing

Plugin-specific errors use `UnicodeSearchError`:

```typescript
import { UnicodeSearchError } from "src/unicode-search/errors/unicodeSearchError";

it("should throw UnicodeSearchError when array is empty", () => {
    expect(() => getRandomItem([])).toThrow(UnicodeSearchError);
    expect(() => getRandomItem([])).toThrow("Cannot get a random item from an empty array");
});
```

## Consequences

### Positive

- Fast tests (no Obsidian runtime)
- Clear separation of testable (libraries) vs untestable (Obsidian components)
- Path aliases make imports clean

### Negative

- No integration tests for Obsidian components
- Need to mock Obsidian APIs for component tests (not currently done)

### Neutral

- Run via `npm test`
- Coverage not enforced

## Implementation

- `tests/libraries/` — all test files
- `jest.config.js` — Jest configuration
- `tsconfig.json` — path aliases for `src/`
