import {UnicodeCharacter} from "../../libraries/types/unicodeCharacter";

import {QCodePointData} from "../../libraries/types/data/QCodePointData";

export interface CharacterDownloader {
    download(): Promise<UnicodeCharacter[]>;
}

export interface QCharacterDownloader {
    download(): Promise<QCodePointData>;
}
