import {UnicodeCodepoint} from "./codepoint";
import {ParsedUsageInfo, UsageInfo} from "../savedata/usageData";

/**
 * Base representation of a character
 */
export type Character = UnicodeCodepoint;

export type UsedCharacter = Character & ParsedUsageInfo;
export type MaybeUsedCharacter = Character | UsedCharacter;

export type CharacterKey = Character["codepoint"];
