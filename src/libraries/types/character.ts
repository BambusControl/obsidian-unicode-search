import {UsageInfo} from "./usageInfo";
import {UnicodeCharacter} from "./unicodeCharacter";
import {PinInfo} from "./pinInfo";

/**
 * Base representation of a character
 */
export type Character = UnicodeCharacter & Partial<UsageInfo> & Partial<PinInfo>;

