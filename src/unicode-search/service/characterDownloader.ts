import {UnicodeCodepoint} from "../../libraries/types/codepoint/unicode";

export interface CharacterDownloader {
    download(): Promise<UnicodeCodepoint[]>;
}
