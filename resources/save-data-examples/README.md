# Save data examples

Example `data.json` payloads for every value of `SaveDataVersion`
(`src/libraries/types/savedata/version.ts`). Each file shows the exact on-disk
shape the plugin wrote at that save-data version, derived from the plugin's own
source at the corresponding release tags (extracted via `git archive` into a
scratch directory — no worktrees were used).

| File                  | SaveDataVersion | Plugin versions writing it        | On-disk layout |
|-----------------------|-----------------|-----------------------------------|----------------|
| `0.4.0.json`          | `0.4.0`         | 0.4.0                             | `{meta:{initialized,version}, data:[{name,char,useCount?,lastUsed?,pinned?}]}` — one flat array of characters with inline stats (`lastUsed` = epoch ms) |
| `0.5.0.json`          | `0.5.0`         | 0.5.0                             | Identical shape to 0.4.0; only `meta.version` differs |
| `0.6.0.json`          | `0.6.0`         | 0.6.0                             | Flat: `{initialized,version,settings:{filter},unicode:{codepoints},usage:{codepoints}}` — lowercase `codepoints`, dates as ISO strings |
| `0.7.0.json`          | `0.7.0`         | 0.7.4+ (current layout)           | Five chunks: `meta/pool/characters/useHistory/favorites`, camelCase `codePoints`, numeric `id` keys. `meta.pluginVersion = "0.7.4"` (examples are capped at 0.7.4). Validates against [`../save-data-schema.json`](../save-data-schema.json) |
| `0.7.0-legacy.json`   | `0.7.0`         | 0.7.0 … 0.7.3 (original layout)   | Five fragments: `meta/filter/characters/usage/favorites`, lowercase `codepoints`, `pluginVersion: "0.7.0"`, `events: ["download_characters"]` queue |

**Why two 0.7.0 files:** the save-data *version* `0.7.0` outlived the on-disk
*layout* it was introduced with. Plugin 0.7.0 shipped the five-fragment layout
(`filter`, lowercase `codepoints`, `hotkey`) and releases 0.7.1–0.7.3 wrote it
unchanged (verified: no commit touched `src/libraries/types/savedata/` between
those tags). Plugin 0.7.4 then overhauled the layout — commit `f894b3d`
("Try and improve architecture", contained only in tag 0.7.4) renamed chunks
and fields (`pool`/`useHistory`, `codePoints`, `quickInsertEnabled`, numeric
`id`) **without bumping the save-data version** (`CURRENT_DATA_VERSION` stayed
`"0.7.0"`; see `version.ts`: "Update only if save data schema changed"). Both
layouts therefore legitimately exist on disk stamped `version: "0.7.0"`, and
the version field alone cannot tell them apart — code must check for
`codepoints` vs `codePoints`.

Because the version stamp stayed `"0.7.0"`, migration gates keyed on
`version === "0.7.0"` cannot distinguish un-migrated legacy-layout data from
current-layout data. The `isInitialSaveData` regression below is one symptom
of the same rename.

## Example content

- **Characters** — 12 real Unicode 14.0.0 entries (from the repo's `ucd-mirror`
  branch), all plane 0, all in categories included by the default filter.
  Real save files hold ~15 400 entries; the examples are truncated to keep the
  files reviewable. `0.4.0`/`0.5.0` store the same 12 in their `{name, char}` form.
- **Usage** — five characters with a consistent insert history (ISO 8601 dates;
  epoch milliseconds for the 0.4.x/0.5.x inline `lastUsed` stats).
- **Favorites** — four characters, newest first (`FavoriteStorage.addFavorite`
  unshifts). Same four (and the same `quickInsertEnabled`/`hotkey` flags) in both 0.7.0 files.
- **Filter** — the plugin's full default filter (7 planes / 328 blocks,
  plane 0 included; 7 category groups / 30 categories, groups `L`,`N`,`P`,`S`
  included), identical in `0.6.0`, `0.7.0` and `0.7.0-legacy.json`.
- `meta.pluginVersion` never exceeds `"0.7.4"` in any example.

## Known issues discovered while building these examples

Facts verified against git history — recorded here because they affect how
these files are consumed.

1. **`0.6.0` data is no longer migrated by current code (regression in 0.7.4).**
   `isInitialSaveData` (`src/libraries/types/savedata/initialSaveData.ts`,
   lines 68/73) checks `"codePoints"` (camelCase) in `unicode`/`usage`, but
   genuine 0.6.0 files store lowercase `codepoints`
   (tag 0.6.0: `unicodeData.ts:8`, `usageData.ts:8`). The guard matched at tags
   0.7.1–0.7.3 and broke with the domain-language rename commit `f894b3d`
   (contained in tag 0.7.4). Consequence chain for a real 0.6.0 file loaded by
   0.7.4+: `initialMigration`'s gate never fires
   (`rootDataBootstrapper.ts:165`) → `shapeLoadedData` finds no `pool`/`filter`
   at top level (filter reset to defaults), no `characters` (re-download), and
   the flat `usage` passes the shape check but fails
   `UseHistoryChunkHandler.initData`'s `codePoints` check → usage history
   wiped. `0.6.0.json` here is *genuine* 0.6.0 data and is expected to fail
   HEAD's guard.
2. **The 0.4.0 validator checked the wrong key.** At tag 0.4.0,
   `isTypeSaveData` tested `object.data` instead of `object.meta`, so 0.4.0
   files could fail its own load-time validation; fixed in 0.5.0. Irrelevant
   for the examples' shape, but explains odd load behaviour of true 0.4.0 files.
3. **`CURRENT_PLUGIN_VERSION` vs schema enum.** `version.ts` currently says
   `"0.7.4-NEXT"` while the committed `save-data-schema.json` enum stops at
   `"0.7.4"`. Examples are capped at `"0.7.4"` so they validate against the
   schema as committed.

All files use 2-space indentation, LF endings and a trailing newline, matching
the repo's `.editorconfig`.
