# ADR 0007: ReadCache for Lazy Evaluation

## Status

Accepted

## Context

Several services need to compute expensive derived data (e.g., use history statistics) that doesn't change often. Recomputing on every access wastes CPU; caching manually across call sites is error-prone.

## Decision

Use a `ReadCache<T>` wrapper for lazy evaluation with memoization on first access:

```typescript
class ReadCache<T> {
    constructor(private readonly getCallback: () => Promise<T>, initialValue?: T);
    async get(): Promise<T>;  // Computes on first access, then returns cached value
}
```

### Usage Pattern

```typescript
// In FuzzySearchModal
this.usageStatistics = new ReadCache(async () => {
    const usedCharacters = await characterService.getUsed();
    return {
        topThirdRecentlyUsed: mostRecentUses(usedCharacters).slice(0, 3).last() ?? new Date(0),
        averageUseCount: averageUseCount(usedCharacters),
    } as UseHistoryStatistics;
});
```

### Caching behaviour

- `ReadCache` computes on the first `get()` call, then returns the memoized value on subsequent calls
- A new `ReadCache` instance is created per modal session, so statistics are refreshed when the modal opens again
- `PersistCache` is the storage-level equivalent with explicit `persist()`

## Consequences

### Positive

- Lazy computation — only computed when first accessed
- Centralised caching logic
- Avoids redundant recomputation within a modal session

### Negative

- No explicit invalidation within a session — if underlying data changes while the modal is open, cached statistics may be stale until the modal is closed and reopened
- No TTL or manual invalidation API

### Neutral

- Used for read-heavy, write-rare data like statistics

## Implementation

- `src/libraries/types/readCache.ts` — cache implementation
- Used in `FuzzySearchModal` for usage statistics
