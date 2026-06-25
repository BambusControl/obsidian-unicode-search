# ADR 0014: Dexie/IndexedDB — Explored and Reverted

## Status

Accepted — explored and reverted

## Context

The UCD (Unicode Character Database) is large, and using JSON (`data.json`) to store, filter, and manipulate characters was slow. IndexedDB was proposed as a solution — it works everywhere, and there's even a library specifically for Obsidian ([Fevol/obsidian-database-library](https://github.com/Fevol/obsidian-database-library)). Dexie.js was chosen as the IndexedDB wrapper.

## Decision

Introduce Dexie.js for codepoint storage, then expand it to usage and favourites data.

### What was tried

1. **Commit `a3be498`**: Dexie DB used for `codepoints` storage instead of plugin JSON data
2. **Commit `06d8c76`**: Dexie DB expanded to usage and favourites storage
3. **Commit `3a1aa5b`**: Denormalized usage and favourites into unified codepoints table with computed `sortKey` index (see [ADR-0013](0013-denormalize-usage-favorites.md))

### Why it was reverted

The entire Dexie integration was reverted before the current HEAD. The current codebase has zero Dexie references — no `dexieDb.ts`, no `dexie` in `package.json`. The revert removed IndexedDB storage, the unified codepoints table, and the denormalized `sortKey` approach together.

The Dexie implementation didn't work with our data storage approach, and fuzzy searching was not supported. That resulted in too much re-work to implement without benefits.

The plugin returned to chunk-based JSON storage via Obsidian's `loadData`/`saveData` API. Sorting tiebreakers are handled in-memory by the comparison layer (`compareCharacterMatches.ts`), as described in [ADR-0006](0006-two-phase-fuzzy-search.md).

## Consequences

### Positive

- The exploration validated that IndexedDB is viable for this use case
- Future contributors know this path was tried and why it was abandoned
- Avoids an external database dependency and the data-consistency complexity of denormalization

### Negative

- Time spent on Dexie integration that was ultimately reverted
- Large UCD JSON filtering remains a potential performance concern for future work

### Neutral

- Dexie.js was only present in `package.json` during the exploration period
- The UCD download pipeline (`ucdUserFilterDownloader.ts`) was modified during the Dexie work but survived the revert
