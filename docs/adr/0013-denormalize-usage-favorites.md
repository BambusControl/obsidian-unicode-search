# ADR 0013: Denormalize Usage & Favorites into Unified Codepoints Table

## Status

Superseded — explored and reverted (see [ADR-0014](0014-dexie-indexeddb-explored-reverted.md))

## Context

The search modal needs to sort characters by multiple factors: fuzzy match score, use history (recency and frequency), and favourite status. Usage history and favourites are stored in separate chunks and merged at query time. JavaScript performs multi-tier comparisons after merging the data in memory via `compareCharacterMatches.ts`.

During the Dexie/IndexedDB experiment (ADR-0014), an alternative was tried: denormalize usage history and favourites into a unified codepoints table with pre-computed `sortKey` values that encode the tiebreaker hierarchy (usage > favourites > codepoint). This would enable database-level sorting via a computed index, rather than requiring JavaScript to perform multi-tier comparisons.

## Decision (historical — reverted)

Denormalize usage history and favourites data into the unified codepoints table. Instead of three separate data sources merged at query time, the codepoints table stores pre-computed `sortKey` values that encode the tiebreaker priority.

This approach was implemented in commit `3a1aa5b` as part of the Dexie integration, then reverted along with the entire IndexedDB experiment. The current codebase does not contain `computeSortKey.ts`, a `sortKey` field, or a unified codepoints table.

## Current implementation

Sorting tiebreakers remain in-memory, handled by the comparison layer:

- `src/libraries/comparison/compareCharacterMatches.ts` — orchestrates match score then character tiebreakers
- `src/libraries/comparison/compareCharacters.ts`
- `src/libraries/comparison/compareSearchMatches.ts`

The fuzzy search scoring pipeline (ADR-0006) ranks results by match score first, then use history and favourite status via these JavaScript comparisons.

## Consequences (historical)

### Positive (if retained)

- Database-level sorting would eliminate JavaScript multi-tier comparison for tiebreakers
- Single query could return pre-sorted results — no post-query merge step

### Negative (if retained)

- Denormalization means usage/favourite data is duplicated (stored in both the chunk and the codepoints table)
- Data consistency requires careful handling during writes — updates to usage or favourites must propagate to the codepoints table
- Tied to an external IndexedDB dependency (Dexie)

### Why reverted

The denormalization was inseparable from the Dexie/IndexedDB storage layer. When IndexedDB was reverted, the denormalization and `sortKey` approach were reverted with it. Performance with the current chunk-based JSON storage remains acceptable for the plugin's use case.
