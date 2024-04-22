import {UnicodeCharacter} from "../../libraries/types/unicodeCharacter";
import {QUnicodeData} from "../../libraries/types/data/QCodePointAttribute";

export interface CharacterDownloader {
    download(): Promise<UnicodeCharacter[]>;
}

export interface QCharacterDownloader {
    download(): Promise<QUnicodeData>;
}
