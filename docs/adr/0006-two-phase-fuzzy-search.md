# ADR 0006: Two-Phase Fuzzy Search

## Status

Accepted

## Context

The search modal needs to match user queries against thousands of Unicode characters quickly. A single-pass approach (scoring everything) is too slow. The search must support two axes: character name and hex code point.

## Decision

Use a two-phase search approach:

### Phase 1: Candidate Retrieval

Obsidian's built-in `fuzzySearch` retrieves candidates and produces initial `SearchResult` objects with match positions and scores.

### Phase 2: Scoring and Ranking

Results are scored on two axes via `CharacterSearchAttributes`:

```typescript
type CharacterSearchAttributes<T> = {
    codePoint: T;  // Match against hex representation
    name: T;       // Match against character name
}
```

Results are merged by `CodePoint` (deduplication) and ranked by:

1. Fuzzy match score on name
2. Exact hex match on code point
3. Use history (recency and frequency)
4. Favourite status

### Query Routing

```typescript
// Name search: normalised text against character names and glyph
// Hex search: hex string against code point id
// Results merged by code point id and de-duplicated
```

### Null Handling

When one axis has no match, `fillNullSearchMatchScores` fills it with `NONE_RESULT` (score: 0, empty matches):

```typescript
const NONE_RESULT: SearchMatchResult = { score: 0, matches: [] };
```

## Consequences

### Positive

- Fast candidate retrieval using Obsidian's optimised fuzzy search
- Dual-axis matching allows "A" to match both "LATIN CAPITAL LETTER A" and hex "0041"
- Clean separation of retrieval and ranking logic
- Use history integration for personalised ranking

### Negative

- Two phases add complexity
- Need to handle null matches explicitly

### Neutral

- Results limited to configurable `limit` (default 50)
- Random placeholder shown when no query

## Implementation

- `src/unicode-search/components/characterSearch.ts` — types and constants
- `src/unicode-search/components/characterSearchAttributes.ts` — attribute types
- `src/unicode-search/components/fuzzySearchModal.ts` — search orchestration
- `src/libraries/comparison/` — comparison and fill functions
