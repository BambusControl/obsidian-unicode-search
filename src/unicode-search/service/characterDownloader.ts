import {Codepoints} from "../../libraries/types/codepoint/codepoint";

export interface CharacterDownloader {
    download(): Promise<Codepoints>;
}
