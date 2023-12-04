import {UnicodeCharacter} from "../../libraries/types/unicodeCharacter";

export interface CharacterDownloadService {
    fetchCharacters(): Promise<UnicodeCharacter[]>;
}
