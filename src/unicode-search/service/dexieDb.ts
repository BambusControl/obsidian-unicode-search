import {Dexie, EntityTable} from "dexie";
import {UnicodeCodepoint} from "../../libraries/types/codepoint/unicode";

/* TODO: CLEANUP */
export type DexieDb = Dexie & {
    codepoints: EntityTable<UnicodeCodepoint>
};
