import {UnicodeCodepoints} from "../../libraries/types/codepoint/codepoint";

export interface CharacterDownloader {
    download(): Promise<UnicodeCodepoints>;
}
