# ADR 0009: Character Service Interface

## Status

Accepted

## Context

The plugin needs a single entry point for all character operations. Without it, UI components would need to coordinate between multiple storage interfaces (`CodePointStore`, `UseHistoryStore`, `FavoriteStore`) directly, duplicating lookup logic and creating tight coupling between the search modal and the persistence layer.

## Decision

Expose a single `CharacterService` interface as the entry point for all character operations. It delegates to storage interfaces but presents a unified API to UI components:

```typescript
interface CharacterService {
    getOne(key: CharacterKey): Promise<Character>;
    getAllCharacters(): Promise<Character[]>;
    getUsed(): Promise<CharacterWithUseHistory[]>;
    getFavorites(): Promise<FavoriteCharacter[]>;
    getAll(): Promise<MaybeCharacterWithUseHistory[]>;
    recordUsage(key: CharacterKey): Promise<UseRecord>;
}
```

The `recordUsage` call is made on every character insert from the modal, keeping the use history in sync with user behaviour. `getAll` merges characters with use history data, providing the search modal with a single queryable list.

The concrete implementation is `UserCharacterService`, which composes `CodePointStore`, `UseHistoryStore`, and `FavoriteStore`.

## Consequences

### Positive

- UI components depend on one interface, not three
- Search modal doesn't need to know about storage internals
- `recordUsage` is a single call site — easy to audit and test
- `getAll` pre-merges data the search modal needs, avoiding N+1 lookups

### Negative

- `CharacterService` accumulates methods as new features are added
- The interface is plugin-specific (lives in `unicode-search/`, not `libraries/`)

### Neutral

- Implementation lives in `src/unicode-search/service/characterService.ts`
- Interface is implemented by `UserCharacterService` in `src/unicode-search/service/userCharacterService.ts`
