import {UnicodeCodepoint} from "../../libraries/types/codepoint/codepoint";

export interface CharacterDownloader {
    download(): Promise<UnicodeCodepoint[]>;
}
