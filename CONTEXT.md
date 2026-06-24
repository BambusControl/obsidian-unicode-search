# Unicode Search — Domain Glossary

An Obsidian plugin for searching the Unicode Character Database (UCD) and inserting characters into the editor.

---

## Core Domain

### Code Point

The numeric address in the Unicode code space, ranging from `U+0000` to `U+10FFFF`. A code point is the *identity* of a character slot — it is a number, nothing more. In the plugin, this is stored as a plain integer (`CodePoint`), e.g., `0x269`.

Unicode makes a clear separation: the **code point** is the address; the **character** is the abstract text element assigned to that address. The plugin's naming follows this distinction.

### CodePointKey

The base interface for identifying a character by its numeric code point. Contains only the `id` field. Used as a building block for extension types like `CodePointUse` and `CodePointFavorite`.

```typescript
interface CodePointKey {
    id: CodePoint;
}
```

### CodePointAttribute

The metadata attributes of a Unicode character, separate from its identity. Contains the string representation and classification.

```typescript
interface CodePointAttribute {
    glyph: string;    // NFC-normalised string representation
    name: string;     // Unicode character name (lowercased)
    category: string; // General Category abbreviation (e.g., "So")
}
```

### Character

The full entity representing a Unicode character. Combines `CodePointKey` (identity) with `CodePointAttribute` (metadata). This is the canonical type used throughout the plugin.

```typescript
type Character = CodePointKey & CodePointAttribute;
// = { id: CodePoint, glyph: string, name: string, category: string }
```

- **id** — the numeric code point (the address, e.g., `0x269`)
- **glyph** — the JavaScript string representation, NFC-normalised (the rendered form, e.g., `"⚉"`)
- **name** — the Unicode character name, lowercased after download (e.g., `"gear"`)
- **category** — the Unicode General Category abbreviation (e.g., `"So"` for Symbol-other)

### CharacterKey

A type alias for the character's identifying field: `type CharacterKey = Character["id"]`. Used as the key type for lookups and storage operations.

### CharacterForSearch

A character as it flows through the search UI — exactly one of `Character`, `CharacterWithUseHistory`, or `FavoriteCharacter`. Used as the item type for search results in the modals.

```typescript
type CharacterForSearch = Character | CharacterWithUseHistory | FavoriteCharacter;
```

---

## Extension Types

These types extend `CodePointKey` with additional data from storage.

### CodePointUse

A character with its use history data attached. Used by `UseHistoryStore` and `UseHistoryChunk`.

```typescript
type CodePointUse = CodePointKey & UseRecord;
type RawCodePointUse = CodePointKey & RawUseRecord;
```

### CodePointFavorite

A character with its favorite data attached. Used by `FavoriteStore` and `FavoriteChunk`.

```typescript
type CodePointFavorite = CodePointKey & ParsedFavorite;
type RawCodePointFavorite = CodePointKey & Favorite;
```

---

## User Behaviour

### Use History

The record of which characters the user has inserted and how often. Every time a character is inserted, a use is recorded against it. The modal surfaces this as "recently used" and "frequently used" badges.

### UseRecord

The per-character data shape for use history. Has raw (stored) and parsed (runtime) variants.

```typescript
// Stored in save data (dates as strings)
interface RawUseRecord {
    firstUse: DateString;
    lastUse: DateString;
    timesUsed: number;
}

// Parsed for use in plugin (dates as Date objects)
type UseRecord = UseCount & UseDate;
interface UseCount { timesUsed: number; }
interface UseDate { firstUse: Date; lastUse: Date; }
```

### UseHistoryStore

Interface for reading and writing use records.

```typescript
interface UseHistoryStore {
    upsert(key: CharacterKey, apply: (char?: UseRecord) => UseRecord): Promise<CodePointUse>;
    getUsed(): Promise<CodePointUse[]>;
}
```

### CharacterWithUseHistory

A `Character` with its `UseRecord` attached. Used by the search modal to show recency and frequency badges.

```typescript
type CharacterWithUseHistory = Character & UseRecord;
```

### UseHistoryStatistics

Derived summaries computed from the full use history. Used by the modal to decide which characters get badges.

```typescript
interface UseHistoryStatistics {
    topThirdRecentlyUsed: Date;  // Recency cutoff date
    averageUseCount: number;     // Average timesUsed across all used characters
}
```

### UseHistoryChunk

The save data chunk that persists the use history schema version and metadata. The actual use records are stored in the `codePoints` array.

```typescript
interface UseHistoryChunk extends DataChunk {
    codePoints: RawCodePointUse[];
}
```

### Favorite

A character the user has explicitly bookmarked. Has raw (stored) and parsed (runtime) variants.

```typescript
// Stored in save data (date as string)
interface Favorite {
    added: DateString;
    quickInsertEnabled: boolean;
}

// Parsed for use in plugin (date as Date object)
interface ParsedFavorite {
    added: Date;
    quickInsertEnabled: boolean;
}
```

A favourite can optionally have **quickInsertEnabled**, which registers an Obsidian command (`Insert '<glyph>'`). The user can then assign a keyboard shortcut to that command via Obsidian's hotkey settings.

### FavoriteChunk

The save data chunk that persists favorite data.

```typescript
interface FavoriteChunk extends DataChunk {
    codePoints: RawCodePointFavorite[];
}
```

---

## Unicode Metadata

### Plane

A contiguous range of 65,536 code points (16 bits). The plugin structures its character pool by plane.

### Block

A named range of code points within a plane (e.g., "Basic Latin", "Arrows"). Blocks are the finest-grained poolable unit by code point range.

### CodePointInterval

Represents a closed interval/range of Unicode code points.

```typescript
interface CodePointInterval {
    start: CodePoint;
    end: CodePoint;
}
```

### General Category (Unicode)

A single-letter-group + two-letter-category classification (e.g., group `L` = Letter, category `Lu` = Letter-uppercase). The plugin uses categories as a second axis for scoping the character pool.

### General Category Group

A single-letter grouping of categories (L, M, N, P, S, Z, C). Each group contains its member categories and their inclusion flags.

### Character Pool

The set of characters the user has chosen to include in search. Configured via a `UnicodeFilter` (planes, blocks, categories) and stored as a `PoolChunk` in save data. The pool answers "which characters can I find?"

*Avoid*: Filter, settings, unicode filter (use "Unicode Filter" for the data structure only)

### UnicodeFilter

The data structure that encodes the user's pool configuration. Stored inside `PoolChunk.unicode`. Applied at UCD download time to scope which characters are persisted.

```typescript
interface UnicodeFilter {
    planes: PlaneFilter[];
    categoryGroups: CategoryGroupFilter[];
}
```

---

## Persistence Architecture

### SaveData

The top-level plugin data structure (`data.json`), composed of five independently versioned **chunks**:

```typescript
interface SaveData {
    meta: MetaChunk;
    pool: PoolChunk;
    characters: CharacterChunk;
    useHistory: UseHistoryChunk;
    favorites: FavoriteChunk;
}
```

| Chunk | Content |
|----------|---------|
| `meta` | Plugin version and event queue |
| `characters` | UCD download metadata and schema tracking |
| `pool` | User's character pool configuration — which planes, blocks, and categories to include |
| `useHistory` | User insertion history |
| `favorites` | User bookmarked characters |

### DataChunk

The base shape of each save-data segment. Each chunk has its own lifecycle managed by a **ChunkHandler**.

```typescript
interface DataChunk {
    initialized: boolean;
    version: SaveDataVersion;
}
```

### ChunkHandler

Interface for chunk lifecycle management. Each chunk has one dedicated handler.

```typescript
interface ChunkHandler<Fragment extends DataChunk> {
    initData(fragment: DataChunk): Fragment;
    updateData(fragment: Fragment, events: Set<DataEvent>): Promise<Fragment>;
}
```

| Chunk | Handler |
|----------|---------|
| `MetaChunk` | `MetaChunkHandler` |
| `PoolChunk` | `PoolChunkHandler` |
| `CharacterChunk` | `CharacterChunkHandler` |
| `UseHistoryChunk` | `UseHistoryChunkHandler` |
| `FavoriteChunk` | `FavoriteChunkHandler` |

### DataBootstrapper

Interface for orchestrating the one-time initialisation pipeline.

```typescript
interface DataBootstrapper {
    initializeData(): Promise<void>;
}
```

The `RootDataBootstrapper` implementation:

1. Loads raw JSON from Obsidian storage
2. Performs initial migration from pre-chunk data formats
3. Shapes missing chunks into base `DataChunk` shape
4. Initializes meta chunk first (other chunks need its events)
5. Initializes each chunk handler
6. Updates each chunk (migrate versions, process events like UCD download)
7. Persists the final state back to Obsidian

Called on plugin load and when settings are saved.

### DataEvent

A signal queued in the meta chunk that tells other chunks to perform work during the next update cycle. Events are consumed and removed after processing. Currently only `DownloadCharacters` exists.

```typescript
enum DataEvent {
    DownloadCharacters = "download_characters",
}
```

---

## Search

### Fuzzy Search

Two-phase search: (1) candidate retrieval, then (2) scoring via text matching on the name field and hex matching on the code point.

### CharacterSearchAttributes

The two axes of matching per character. Used in search results to carry match scores and positions.

```typescript
type CharacterSearchAttributes<T> = {
    codePoint: T;  // Match against the hex representation of the code point
    name: T;       // Match against the character name
}
```

### CharacterSearchResult

A result item pairing a `character` with its `match` attributes, each carrying an Obsidian `SearchResult` (score + match positions for highlighting).

```typescript
type CharacterSearchResult<CharacterType, AttributeMatchType> = {
    character: Character & CharacterType;
    match: CharacterSearchAttributes<AttributeMatchType>;
}

type MetaCharacterSearchResult = CharacterSearchResult<CharacterForSearch, SearchMatchResult>;
```

### Query Routing

A search query is routed to two parallel strategies:

- **Name search**: Normalised text against character names and glyph.
- **Hex search**: Hex string against the code point id.

Results are merged by code point id and de-duplicated.

---

## UI Concepts

### InsertCharacterModal

The primary modal. Opens via a command, accepts a query, displays scored results, and inserts the selected character's glyph into the active editor. Calls `characterService.recordUsage()` on insert.

### PickCharacterModal

A secondary modal used by the settings tab to let users pick a character when adding a favourite. Resolves a promise with the chosen character.

### FuzzySearchModal

Abstract base for both modals. Handles suggestion rendering, use-history-based ranking (recent use, frequent use), and random placeholder text.

---

## Services

### CharacterService

Main service for character operations.

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

### FavoriteStore

Interface for managing favorite characters.

```typescript
interface FavoriteStore {
    getFavorites(): Promise<CodePointFavorite[]>;
    addFavorite(key: CharacterKey): Promise<CodePointFavorite>;
    removeFavorite(key: CharacterKey): Promise<void>;
    update(key: CharacterKey, apply: (char: ParsedFavorite) => Partial<ParsedFavorite>): Promise<CodePointFavorite>;
    upsert(key: CharacterKey, apply: (char?: ParsedFavorite) => ParsedFavorite): Promise<CodePointFavorite>;
}
```

### CodePointStore

Interface for accessing the character database.

```typescript
interface CodePointStore {
    getCharacters(): Promise<Character[]>;
}
```

---

## Conventions

### Raw vs Parsed

The codebase uses a `Raw` prefix for serialized (stored) types — e.g., `RawUseRecord`, `RawCodePointUse`, `RawCodePointFavorite`. Types without the prefix are parsed (runtime) variants with `Date` objects instead of date strings. Exception: `Favorite` (raw) → `ParsedFavorite` (parsed), to avoid collision with the `Character` intersection type.

### Maybe

A type alias for nullable returns: `type Maybe<T> = T | null`. Used when an operation may not find a result (e.g., `PickCharacterModal` resolves to `Maybe<Character>`).

## Helpers

### toGlyph

Converts a numeric code point to its NFC-normalised string representation.

```typescript
function toGlyph(codePoint: CodePoint): string;
```

### toHexadecimal

Converts a `CodePointKey` to its zero-padded hexadecimal string representation.

```typescript
function toHexadecimal(character: CodePointKey): string;
// Returns e.g., "0041" for code point 65 (A)
```

---

## Plugin Initialisation

The plugin's `onload` follows a multi-step initialisation pipeline:

1. Create the `PersistCache` (bridge between Obsidian's `loadData`/`saveData`)
2. Create storage wrappers (`RootPluginDataStorage`, `CodePointStorage`, `FavoriteStorage`, `UseHistoryStorage`, etc.)
3. Create chunk handlers (`MetaChunkHandler`, `PoolChunkHandler`, `CharacterChunkHandler`, `UseHistoryChunkHandler`, `FavoriteChunkHandler`)
4. Create `RootDataBootstrapper` with all handlers
5. Call `dataBootstrapper.initializeData()` which:
   - **Loads** raw JSON from Obsidian storage
   - **Migrates** from pre-chunk data formats (version 0.6.0 and earlier)
   - **Shapes** missing chunks into base `DataChunk` shape
   - **Inits** each chunk with defaults
   - **Updates** each chunk (migrate versions, process events like UCD download)
   - **Persists** the final state back to Obsidian
6. Register command modal and favourite hotkey commands
7. Register settings tab

### Initial Migration

Data from plugin version `0.6.0` uses a flat schema that must be reshaped into the chunk structure during initialisation. Data version `0.7.0` is the first version to use the chunk-based architecture.
