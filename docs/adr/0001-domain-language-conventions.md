# ADR 0001: Domain Language Conventions

## Status

Accepted

## Context

The Obsidian Unicode Search plugin has accumulated inconsistent terminology across code, UI, and documentation. This creates confusion for both developers and users. Key issues include:

1. **Spelling inconsistency**: "Favorite" (American) vs "Favourite" (British)
2. **Terminology mismatch**: Code uses "quickInsertEnabled" but UI says "Hotkeys"
3. **Concept ambiguity**: "Pool" vs "Filter" for character selection
4. **Technical vs user-friendly**: Unicode terms like "General Categories" may confuse users

## Decision

We will adopt the following domain language conventions:

### 1. British Spelling

**Decision**: Use British spelling throughout user-facing text.

**Rationale**:

- Aligns with the author's preference and many international English standards
- Provides consistency across documentation and UI
- Code identifiers remain unchanged to avoid breaking changes

**Examples**:

- "Favourite" (not "Favorite") in UI text
- "Initialise" (not "Initialize") in documentation
- Code keeps `Favorite`, `FavoriteStore`, etc.

### 2. User-Facing Terminology

See [CONTEXT.md](../CONTEXT.md) for the full terminology table mapping user-facing terms to code identifiers.

### 3. Unicode Terminology

**Decision**: Use Unicode-specific terminology as-is.

**Rationale**:

- These are standard Unicode terms (General Categories, Planes, Blocks)
- Users searching for Unicode characters likely understand these terms
- Simplifying would lose precision and confuse technical users

**Examples**:

- "General Categories" (not "Character Types")
- "Planes" (not "Character Groups")
- "Blocks" (not "Character Ranges")

### 4. Code vs UI Separation

**Decision**: Code identifiers follow existing conventions; UI text follows domain conventions.

**Rationale**:

- Avoids breaking changes in code
- Allows UI to be more user-friendly
- Maintains developer experience with familiar code patterns

**Examples**:

- Code: `Favorite`, `quickInsertEnabled`, `PoolChunk`
- UI: "Favourites", "Quick Insert", "Character Pool"

## Consequences

### Positive

- Consistent terminology across documentation and UI
- Clear separation between code and user-facing text
- Better user experience with familiar, clear terms
- British spelling provides international consistency

### Negative

- Need to maintain two sets of terminology (code vs UI)
- May confuse developers who expect code and UI to match exactly
- Requires documentation to explain the mapping

### Neutral

- Code identifiers remain unchanged (no breaking changes)
- Unicode terms remain technical (as intended)
- Documentation updated to reflect new conventions

## Implementation

1. **CONTEXT.md**: Updated with Language Conventions section and new terminology
2. **README.md**: Updated to use British spelling and new terminology
3. **Code**: Updated UI text to use British spelling and new terminology
   - `settingTab.ts`: Updated tooltips and descriptions
   - `visualElements.ts`: Updated tooltips
4. **Future documentation**: Follow the conventions in this ADR

## References

- [CONTEXT.md](../CONTEXT.md) - Domain glossary with language conventions
- [Unicode Standard](https://www.unicode.org/standard/standard.html) - Official Unicode terminology
