import {UsageInfo} from "./usageInfo";
import {UnicodeCharacter} from "./unicodeCharacter";
import {PinInfo} from "./pinInfo";

/**
 * Base representation of a character
 */
export type Character = UnicodeCharacter & Partial<UsageInfo> & Partial<PinInfo>;

export type UsedCharacter = Character & UsageInfo;
export type UnusedCharacter = UnicodeCharacter & Partial<PinInfo>;
export type PinnedCharacter = Character & PinInfo;
export type UnpinnedCharacter = UnicodeCharacter & Partial<UsageInfo>;

export type CharacterKey = UnicodeCharacter["char"];
