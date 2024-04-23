import {QUnicodeCodePointWithAttributes} from "./data/QUnicodeCodePointWithAttributes";
import {QUsageInfo} from "./qUsageInfo";

/**
 * Base representation of a character
 */
export type QCharacter = QUnicodeCodePointWithAttributes & Partial<QUsageInfo>;
export type QPartialCharacter = Partial<QCharacter> & Pick<QCharacter, "codePoint">;
export type QCharacterTransform<Out> = (char: QCharacter) => QCharacter & Out

export type QUsedCharacter = QCharacter & QUsageInfo;

export type QCharacterKey = QCharacter["codePoint"];
export type QCharacters = Array<QCharacter>
