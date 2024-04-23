import {UnicodeCodepointWithAttributes} from "./data/QUnicodeCodepointWithAttributes";
import {UsageInfo} from "./qUsageInfo";

/**
 * Base representation of a character
 */
export type Character = UnicodeCodepointWithAttributes & Partial<UsageInfo>;

export type UsedCharacter = Character & UsageInfo;
export type MaybeUsedCharacter = Character | (Character & UsageInfo);

export type CharacterKey = Character["codepoint"];
