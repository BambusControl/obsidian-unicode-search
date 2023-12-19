import {UsageInfo} from "./usageInfo";
import {UnicodeCharacter} from "./unicodeCharacter";
import {PinInfo} from "./pinInfo";

/**
 * Base representation of a character
 */
export type Character = UnicodeCharacter & Partial<UsageInfo> & Partial<PinInfo>;

export type UsedCharacter = Character & UsageInfo
export type PinnedCharacter = Character & PinInfo

export type CharacterKey = UnicodeCharacter["char"];
