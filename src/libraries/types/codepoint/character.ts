import {UnicodeCodepoint} from "./codepoint";
import {UsageInfo} from "../savedata/usageData";

/**
 * Base representation of a character
 */
export type Character = UnicodeCodepoint & Partial<UsageInfo>;

export type UsedCharacter = Character & UsageInfo;
export type MaybeUsedCharacter = Character | (Character & UsageInfo);

export type CharacterKey = Character["codepoint"];
