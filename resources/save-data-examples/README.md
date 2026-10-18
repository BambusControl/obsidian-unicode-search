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
| `0.7.0.json`          | `0.7.0`         | 0.7.0 … 0.7.3                     | Five fragments: `meta/filter/characters/usage/favorites`, lowercase `codepoints`, `pluginVersion: "0.7.0"`, `events: ["download_characters"]` queue |
| `0.7.4.json`          | `0.7.4`         | current code                      | Five chunks: `meta/pool/characters/useHistory/favorites`, camelCase `codePoints`, numeric `id` keys. `meta.pluginVersion = "0.7.4"`. Validates against [`../save-data-schema.json`](../save-data-schema.json) |

**Why the layouts and versions diverge:** plugin 0.7.0 shipped the
five-fragment layout (`filter`, lowercase `codepoints`, `hotkey`) and releases
0.7.1–0.7.3 wrote it unchanged (verified: no commit touched
`src/libraries/types/savedata/` between those tags). Plugin 0.7.4 then
overhauled the layout — commit `f894b3d` ("Try and improve architecture",
contained only in tag 0.7.4) renamed chunks and fields (`pool`/`useHistory`,
`codePoints`, `quickInsertEnabled`, numeric `id`) **without bumping the
save-data version** (`CURRENT_DATA_VERSION` stayed `"0.7.0"`). Chunk-layout
files written by the released 0.7.4 therefore exist in the wild stamped
`version: "0.7.0"`, indistinguishable by stamp from fragment files. The
version scheme now names the chunk layout `0.7.4`, and the migrations run
`0.6.0 → 0.7.0 → 0.7.4`; migration (b) must still branch on the presence of
lowercase `codepoints`, because both layouts answer to the `0.7.0` stamp.
`resources/save-data-examples-real-world/` keeps the files exactly as the
released versions wrote them, including the mislabelled `0.7.0` chunk file.

## Example content

- **Characters** — 12 real Unicode 14.0.0 entries (from the repo's `ucd-mirror`
  branch), all plane 0, all in categories included by the default filter.
  Real save files hold ~15 400 entries; the examples are truncated to keep the
  files reviewable. `0.4.0`/`0.5.0` store the same 12 in their `{name, char}` form.
- **Usage** — five characters with a consistent insert history (ISO 8601 dates;
  epoch milliseconds for the 0.4.x/0.5.x inline `lastUsed` stats).
- **Favorites** — four characters, newest first (`FavoriteStorage.addFavorite`
  unshifts). Same four (and the same `quickInsertEnabled`/`hotkey` flags) in
  `0.7.0.json` and `0.7.4.json`.
- **Filter** — the plugin's full default filter (7 planes / 328 blocks,
  plane 0 included; 7 category groups / 30 categories, groups `L`,`N`,`P`,`S`
  included), identical in `0.6.0.json`, `0.7.0.json` and `0.7.4.json`.
- `meta.pluginVersion` never exceeds `"0.7.4"` in any example.

## Known issues discovered while building these examples

Facts verified against git history — recorded here because they affect how
these files are consumed.

1. **`0.6.0` gate regression — resolved.** `isInitialSaveData`
   (`src/libraries/types/savedata/initialSaveData.ts`) checked
   `"codePoints"` (camelCase) in `unicode`/`usage`, but genuine 0.6.0 files
   store lowercase `codepoints` (tag 0.6.0: `unicodeData.ts:8`,
   `usageData.ts:8`), so `initialMigration`'s gate never fired for real files
   and they crashed on load. Fixed in commit `b86b512`; the gate now matches
   genuine 0.6.0 data, which is what `0.6.0.json` here contains.
2. **The 0.4.0 validator checked the wrong key.** At tag 0.4.0,
   `isTypeSaveData` tested `object.data` instead of `object.meta`, so 0.4.0
   files could fail its own load-time validation; fixed in 0.5.0. Irrelevant
   for the examples' shape, but explains odd load behaviour of true 0.4.0 files.
3. **Schema enum.** `save-data-schema.json` includes both `"0.7.0"` and
   `"0.7.4"`; `version.ts` now declares `CURRENT_DATA_VERSION = "0.7.4"`
   (commit `c023f51`), so every example validates against the schema as
   committed.

All files use 2-space indentation, LF endings and a trailing newline, matching
the repo's `.editorconfig`.
