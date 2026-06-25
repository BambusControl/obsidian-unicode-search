# ADR 0010: UI Modal Architecture

## Status

Accepted

## Context

The plugin needs two modals that share search behaviour: one for inserting characters into the editor, and one for picking a character in the settings tab. Without a shared base, the search logic (candidate retrieval, suggestion rendering, use-history ranking) would be duplicated across both modals.

## Decision

Use inheritance from a shared abstract base class:

```
SuggestModal (Obsidian)
  └── FuzzySearchModal (abstract)
        ├── InsertCharacterModal
        └── PickCharacterModal
```

### FuzzySearchModal (abstract base)

- Extends Obsidian's `SuggestModal<MetaCharacterSearchResult>`
- Owns `getSuggestions()`: runs two-phase fuzzy search (ADR-0006), merges results by code point, applies use-history ranking and favourite boosting
- Owns `renderSuggestion()`: renders character glyph, code point, name, and match highlights
- Owns `onNoSuggestion()`: shows random placeholder character when query is empty
- Uses `ReadCache` for usage statistics (recency cutoff, average use count)
- Injected with `CharacterService` at construction

### InsertCharacterModal

- The primary search modal, opened via the `Search Unicode characters` command
- Overrides `onChooseSuggestion()`: inserts the selected character's glyph into the active editor via `editor.replaceSelection()`
- 28 lines — thin wrapper

### PickCharacterModal

- A secondary modal used by the settings tab to select a favourite character
- Overrides `onChooseSuggestion()`: no-op (does not insert)
- Overrides `selectSuggestion()`: resolves a promise with the chosen character (workaround: `onClose` fires before `onChooseSuggestion` in Obsidian's `SuggestModal`)
- Returns the selected character to the settings tab for favourite management

Both modals consume `CharacterForSearch` items (ADR-0004) and delegate search logic to the two-phase fuzzy search system (ADR-0006).

## Consequences

### Positive

- Search logic concentrated in one class — no duplication
- Modals are thin wrappers (28 and 44 lines respectively)
- Use-history ranking and favourite boosting apply to both modals automatically

### Negative

- `PickCharacterModal` fights the base class contract — `onClose` fires before `onChooseSuggestion`, requiring a `selectSuggestion` override with a comment explaining the workaround
- Search logic is locked inside the inheritance tree, untestable without an Obsidian `App` (the architecture review flags this as Candidate 3: extract a `SearchModule` via composition)

### Neutral

- Implementation lives in `src/unicode-search/components/`
- `FuzzySearchModal`: 143 lines
- `InsertCharacterModal`: 28 lines
- `PickCharacterModal`: 44 lines
