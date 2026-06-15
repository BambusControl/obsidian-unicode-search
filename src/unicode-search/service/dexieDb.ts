import {Dexie, EntityTable} from "dexie";
import {CodepointFavorite, CodepointUse} from "../../libraries/types/codepoint/extension";
import {UnicodeCodepoint} from "../../libraries/types/codepoint/unicode";

/* TODO: CLEANUP */
export type DexieDb = Dexie & {
    codepoints: EntityTable<UnicodeCodepoint>
    usage: EntityTable<CodepointUse>
    favorites: EntityTable<CodepointFavorite>
};
