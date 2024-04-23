import {UnicodeCharacter} from "../../libraries/types/unicodeCharacter";

export interface CharacterDownloader {
    download(): Promise<UnicodeCharacter[]>;
}

