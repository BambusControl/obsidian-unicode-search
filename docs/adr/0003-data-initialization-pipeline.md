# ADR 0003: Data Initialization Pipeline

## Status

Accepted

## Context

The plugin must initialise data on load, handling three scenarios: fresh install, upgrade from v0.6.0 (original, deprectaed flat schema version), and normal upgrade between chunk-based versions. The pipeline must ensure data is correctly shaped, migrated, and persisted before any UI or service code runs.

## Decision

Use a multi-stage bootstrap pipeline orchestrated by `RootDataBootstrapper`:

1. **Load** — Read raw JSON from Obsidian storage via `PersistCache`
2. **Migrate** — Transform v0.6.0 flat schema into chunk structure (if applicable) and update with each new version when necessary
3. **Shape** — Ensure all chunks exist with correct `DataChunk` shape
4. **Init Meta** — Initialize meta chunk first (other chunks need its events)
5. **Init Chunks** — Each chunk handler initialises its defaults
6. **Update** — Each chunk handler processes events and migrates versions
7. **Persist** — Write final state back to Obsidian storage

### PersistCache

Bridges Obsidian's `loadData`/`saveData` with an in-memory cache:

```typescript
class PersistCache<T> {
    async get(): Promise<T>;      // Lazy load from storage
    set(value: T): void;          // Update cache
    async persist(): Promise<T>;  // Write to storage
}
```

### DataEvent System

Cross-chunk communication uses a typed event queue in the meta chunk:

```typescript
enum DataEvent {
    DownloadCharacters = "download_characters",
}
```

Events are consumed (removed) after processing. Unprocessed events are logged for debugging.

## Consequences

### Positive

- Deterministic initialization order — meta always processes first
- Graceful migration from v0.6.0 with automatic reshaping
- Event-driven updates allow chunks to react to external triggers (e.g., UCD download)
- Console logging at each stage for debugging

### Negative

- Pipeline is synchronous in feel (though async) — harder to parallelize
- Meta chunk must be initialized before other chunks can process events

### Neutral

- Called on plugin load and when settings are saved
- Migration only handles v0.6.0 → current (no multi-step migrations)

## Implementation

- `src/unicode-search/service/rootDataBootstrapper.ts` — pipeline orchestrator
- `src/unicode-search/service/dataBootstrapper.ts` — interface
- `src/libraries/types/persistCache.ts` — storage bridge
