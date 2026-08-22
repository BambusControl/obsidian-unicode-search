import {Character} from "../../libraries/types/codePoint/unicode";

export interface CharacterDownloader {
    download(): Promise<Character[]>;
}
