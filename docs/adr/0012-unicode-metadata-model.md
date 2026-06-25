# ADR 0012: Unicode Metadata Model

## Status

Accepted

## Context

The plugin structures Unicode data along three axes to let users configure which characters appear in search. Without a clear model, the character pool would be a flat list with no scoping mechanism — users couldn't filter by script, symbol type, or code point range.

## Decision

Structure Unicode data using three axes:

| Axis | Unit | Description |
|------|------|-------------|
| **Plane** | 65,536 code points (16 bits) | Coarsest grouping. The plugin structures its character pool by plane. |
| **Block** | Named sub-range within a plane | Finest-grained poolable unit by code point range (e.g., "Basic Latin", "Arrows"). |
| **General Category** | Single-letter-group + two-letter-classification | Classification like `Lu` (Letter-uppercase), `Nd` (Number-decimal). Used as an axis for scoping the pool. |

`CodePointInterval` represents a closed range of code points, used internally when working with block boundaries.

The `UnicodeFilter` data structure encodes the user's pool configuration across all three axes and is persisted inside `PoolChunk` (ADR-0002). Static reference data (plane definitions, block lists, category taxonomies) lives in `src/libraries/data/` and is not user-authored.

### Data Files

- `src/libraries/data/unicodePlanes.ts` — plane definitions
- `src/libraries/data/unicodeCharacterCategories.ts` — category taxonomy
- `src/libraries/data/characterCategory.ts` — category type
- `src/libraries/data/characterCategoryGroup.ts` — category group type
- `src/libraries/types/unicode/` — type definitions for Plane, Block, Category, Interval

## Consequences

### Positive

- Users can scope search at multiple granularity levels (plane → block → category)
- Static reference data is Obsidian-agnostic and lives in `libraries/`
- `UnicodeFilter` is a single serialisable structure that captures the full pool configuration

### Negative

- Three axes add complexity to the settings UI
- Block and category lists are long — users may find the settings overwhelming

### Neutral

- The Unicode Character Database (UCD) provides the canonical block and category definitions
- `papaparse` is used to parse UCD CSV data during the UCD download pipeline (`ucdUserFilterDownloader.ts`)
