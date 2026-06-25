# ADR 0004: Type Layering and Extension Pattern

## Status

Accepted

## Context

Characters flow through multiple contexts in the plugin: raw storage, runtime use, search results, and favourites. Each context adds different metadata. Without a clear type hierarchy, the codebase accumulates ad-hoc type assertions and union types that are hard to maintain.

## Decision

Use a composable type layering pattern with explicit extension types:

### Base Types

```typescript
// Identity only
interface CodePointKey { id: CodePoint; }

// Identity + metadata
interface CodePointAttribute {
    glyph: string;    // NFC-normalised string
    name: string;     // Unicode name (lowercased)
    category: string; // General Category abbreviation
}

// Full character
type Character = CodePointKey & CodePointAttribute;
```

### Extension Types

Add storage-specific data via intersection:

```typescript
type CodePointUse = CodePointKey & UseRecord;
type CodePointFavorite = CodePointKey & ParsedFavorite;
```

### Context Types

Union types for UI consumption:

```typescript
type CharacterForSearch = Character | CharacterWithUseHistory | FavoriteCharacter;
type CharacterKey = Character["id"];
```

### Raw vs Parsed Boundary

Serialization boundary with `Raw` prefix for stored types:

```typescript
interface RawUseRecord { firstUse: DateString; lastUse: DateString; timesUsed: number; }
type UseRecord = UseCount & UseDate;  // Parsed: Date objects
```

Exception: `Favorite` (raw) → `ParsedFavorite` (parsed) to avoid naming collision.

## Consequences

### Positive

- Clear identity vs metadata separation
- Type-safe composition without inheritance
- Explicit serialization boundary
- IDE support for type narrowing in search results

### Negative

- Multiple type aliases to learn
- `Raw` prefix convention is non-standard

### Neutral

- Code identifiers use American spelling (`Favorite`) while UI uses British (`Favourite`)

## Implementation

- `src/libraries/types/codePoint/` — base and extension types
- `src/libraries/types/codePoint/character.ts` — context types
- `src/libraries/types/savedata/` — raw types
