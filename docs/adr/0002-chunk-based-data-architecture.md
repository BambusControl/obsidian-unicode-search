# ADR 0002: Chunk-Based Data Architecture

## Status

Accepted

## Context

The plugin needs to persist user data (character pool, use history, favourites, UCD metadata) across Obsidian sessions. Obsidian provides a simple `loadData()`/`saveData()` API that reads/writes a single `data.json` file. As the plugin grew, the flat data structure became unwieldy — version migrations affected the entire file, and unrelated data changes triggered unnecessary writes.

## Decision

Split `SaveData` into five independently versioned **chunks**, each managed by a dedicated `ChunkHandler`:

| Chunk | Content |
|-------|---------|
| `meta` | Plugin version and event queue |
| `pool` | User's character pool configuration |
| `characters` | UCD download metadata and schema tracking |
| `useHistory` | User insertion history |
| `favorites` | User bookmarked characters |

Each chunk implements `DataChunk` (containing `initialized` and `version` fields) and is processed independently during the bootstrap lifecycle.

### Data Structure

```typescript
interface SaveData extends SaveDataOf<DataChunk> {
    meta: MetaChunk;
    pool: PoolChunk;
    characters: CharacterChunk;
    useHistory: UseHistoryChunk;
    favorites: FavoriteChunk;
}
```

### ChunkHandler Interface

```typescript
interface ChunkHandler<Fragment extends DataChunk> {
    initData(fragment: DataChunk): Fragment;
    updateData(fragment: Fragment, events: Set<DataEvent>): Promise<Fragment>;
}
```

## Consequences

### Positive

- Independent versioning per chunk — migrations only affect the chunk that changed
- Clear separation of concerns — each chunk handler owns its data lifecycle
- Event-driven communication between chunks via `DataEvent` queue in meta chunk
- Graceful handling of missing chunks during migration (creates defaults)

### Negative

- Slightly more complex initialization pipeline
- Need to coordinate meta chunk first (other chunks depend on its events)

### Neutral

- Single `data.json` file still used (Obsidian constraint)
- All chunks persisted together in one write operation

## Implementation

- `src/libraries/types/savedata/` — chunk type definitions
- `src/unicode-search/service/chunkHandler.ts` — handler interface
- `src/unicode-search/service/rootDataBootstrapper.ts` — initialization orchestrator
