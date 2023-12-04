import {UnicodeCharacter} from "../../libraries/types/unicodeCharacter";

export interface CharacterDownloader {
    fetchCharacters(): Promise<UnicodeCharacter[]>;
}
