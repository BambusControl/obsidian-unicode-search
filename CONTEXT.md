# Unicode Search — Domain Glossary

An Obsidian plugin for searching the Unicode Character Database (UCD) and inserting characters into the editor.

---

## Core Domain

**Code Point**:
The numeric address in the Unicode code space, ranging from `U+0000` to `U+10FFFF`. The identity of a character slot — a number, nothing more.
_Avoid_: Address, slot, code

**Character**:
The full entity representing a Unicode character. Combines identity (code point) with metadata (glyph, name, category).
_Avoid_: Symbol, glyph (use "Glyph" for rendered form only)

**Glyph**:
The rendered string representation of a character, NFC-normalised.
_Avoid_: Symbol, character (use "Character" for the full entity)

**Code Point Key**:
Base interface for identifying a character by its numeric code point only. Contains only the `id` field.
_Avoid_: Identifier, key

**Code Point Attribute**:
Metadata attributes of a character (glyph, name, category), separate from its identity.
_Avoid_: Metadata, properties

**Character Key**:
The type alias for a character's identifying field: `Character["id"]`. Used as the key type for lookups and storage.
_Avoid_: Identifier, key

**Character for Search**:
A character as it flows through the search UI — exactly one of `Character`, `CharacterWithUseHistory`, or `FavoriteCharacter`.
_Avoid_: Search character, result item

---

## Unicode Metadata

**Plane**:
A contiguous range of 65,536 code points (16 bits). The plugin structures its character pool by plane.
_Avoid_: Group, range

**Block**:
A named range of code points within a plane (e.g., "Basic Latin", "Arrows"). The finest-grained poolable unit by code point range.
_Avoid_: Range, section

**General Category**:
A single-letter-group + two-letter-category classification (e.g., `Lu` = Letter-uppercase). Used as an axis for scoping the character pool.
_Avoid_: Type, category group

**General Category Group**:
A single-letter grouping of categories (L, M, N, P, S, Z, C). Each group contains its member categories.
_Avoid_: Category, group

**Code Point Interval**:
A closed interval/range of Unicode code points.
_Avoid_: Range, span

See [ADR-0012](docs/adr/0012-unicode-metadata-model.md) for the full data model.

---

## User Behaviour

**Character Pool**:
The set of Unicode characters the user has chosen to include in search. Configured via a `UnicodeFilter` (planes, blocks, categories) and stored as a `PoolChunk` in save data.
_Avoid_: Filter, settings, selection

**Use History**:
Records of which characters the user has inserted and how often. Stored as a `UseHistoryChunk` in save data.
_Avoid_: Usage, history, recents

**Favourite**:
A character the user has explicitly bookmarked. Has optional **Quick Insert** support.
_Avoid_: Bookmark, saved character

**Quick Insert**:
A feature that registers an Obsidian command for keyboard shortcut insertion of a character's glyph.
_Avoid_: Hotkey, shortcut

---

## Persistence Architecture

**Save Data**:
The top-level plugin data structure (`data.json`), composed of five independently versioned **chunks**. See [ADR-0002](docs/adr/0002-chunk-based-data-architecture.md).
_Avoid_: Data, storage, config

**Chunk**:
An independently versioned segment of save data (meta, pool, characters, useHistory, favorites).
_Avoid_: Segment, partition, section

**Chunk Handler**:
Interface for chunk lifecycle management (init, update, persist). Each chunk has one dedicated handler.
_Avoid_: Manager, processor

**Data Event**:
A signal queued in the meta chunk that tells other chunks to perform work during the next update cycle.
_Avoid_: Signal, trigger, command

**Data Bootstrapper**:
Interface for orchestrating the one-time initialisation pipeline. See [ADR-0003](docs/adr/0003-data-initialization-pipeline.md).
_Avoid_: Initializer, loader

---

## Search

**Fuzzy Search**:
Two-phase search: candidate retrieval, then scoring via text matching on name and hex matching on code point. See [ADR-0006](docs/adr/0006-two-phase-fuzzy-search.md).
_Avoid_: Search, find, lookup

**Query Routing**:
The process of routing a search query to two parallel strategies: name search and hex search.
_Avoid_: Routing, dispatch

**Character Search Attributes**:
The two axes of matching per character (code point and name).
_Avoid_: Attributes, fields, axes

**Candidate Retrieval**:
Phase 1 of fuzzy search: using Obsidian's built-in `fuzzySearch` to retrieve candidates.
_Avoid_: Retrieval, filtering

**Scoring and Ranking**:
Phase 2 of fuzzy search: scoring results on two axes and ranking by multiple factors.
_Avoid_: Ranking, sorting

---

## UI Concepts

**Insert Character Modal**:
The primary modal. Opens via a command, accepts a query, displays scored results, and inserts the selected character's glyph into the active editor.
_Avoid_: Search modal, main modal

**Pick Character Modal**:
A secondary modal used by the settings tab to let users pick a character when adding a favourite.
_Avoid_: Selection modal, picker

**Fuzzy Search Modal**:
Abstract base for both modals. Handles suggestion rendering, use-history-based ranking, and random placeholder text.
_Avoid_: Base modal, abstract modal

See [ADR-0010](docs/adr/0010-ui-modal-architecture.md) for the modal hierarchy.

---

## Services

**Character Service**:
Main service for character operations (get, getAll, getUsed, getFavorites, recordUsage). Delegates to storage interfaces but presents a unified API to UI components.
_Avoid_: Service, manager

**Favourite Store**:
Interface for managing favourite characters.
_Avoid_: Store, repository

**Pool Store**:
Interface for reading and writing the character pool configuration (`UnicodeFilter`).
_Avoid_: Filter store, settings store

**Code Point Store**:
Interface for accessing the character database.
_Avoid_: Store, database

**Use History Store**:
Interface for reading and writing use records.
_Avoid_: Store, history manager

**Store vs Storage**:
`*Store` suffix denotes a domain interface (e.g., `PoolStore`, `CodePointStore`). `*Storage` suffix denotes its concrete implementation backed by save data (e.g., `PoolStorage`, `CodePointStorage`). This is intentional — interfaces describe what a domain exposes; storage classes implement how data is persisted.

---

## Conventions

**Raw vs Parsed**:
Serialization boundary: `Raw` prefix for stored types (dates as strings), unprefixed for runtime types (dates as Date objects). Exception: `Favorite` → `ParsedFavorite`. See [ADR-0004](docs/adr/0004-type-layering-and-extension-pattern.md).
_Avoid_: Serialized, stored, runtime

**Maybe**:
A type alias for nullable returns: `type Maybe<T> = T | null`.
_Avoid_: Nullable, optional

**Read Cache**:
Wrapper for lazy evaluation with memoization on first access. See [ADR-0007](docs/adr/0007-readcache-for-lazy-evaluation.md).
_Avoid_: Cache, lazy evaluator

**Persist Cache**:
Bridge between Obsidian's `loadData`/`saveData` with an in-memory cache.
_Avoid_: Cache, storage wrapper

**Unicode Search Error**:
Plugin-specific error type extending `Error`.
_Avoid_: Error, exception

---

## Flagged Ambiguities

- "Filter" was used to mean both **Character Pool** (the set of characters) and **Unicode Filter** (the configuration). These are distinct: the **Character Pool** is the result, while the **Unicode Filter** is the configuration that determines it.
- "Cache" was used for both **Persist Cache** (storage bridge) and **Read Cache** (lazy evaluation). These serve different purposes: **Persist Cache** bridges Obsidian's storage API, while **Read Cache** memoizes expensive derived data on first access within a session.
- "Store" is used for domain interfaces (**Favourite Store**, **Code Point Store**, **Use History Store**, **Pool Store**). Concrete implementations use the **Storage** suffix (e.g., `FavoriteStorage` implements `FavoriteStore`). These suffixes are intentional and should not be conflated across domains.

---

## Relationships

- A **Character** has exactly one **Code Point** (identity) and one set of **Code Point Attributes** (metadata).
- A **Character** can have zero or one **Use History** record.
- A **Character** can be a **Favourite** (zero or one).
- A **Character Pool** contains many **Characters** (filtered by planes, blocks, categories).
- **Save Data** contains five **Chunks**: meta, pool, characters, useHistory, favorites.
- Each **Chunk** has one dedicated **Chunk Handler**.
- **Data Events** are queued in the meta **Chunk** and processed by other chunks during update.
- **Fuzzy Search** uses **Query Routing** to parallel **Name Search** and **Hex Search**.
- **Insert Character Modal** and **Pick Character Modal** both extend **Fuzzy Search Modal**.
