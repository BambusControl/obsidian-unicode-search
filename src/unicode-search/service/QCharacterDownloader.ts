import {CodepointData} from "../../libraries/types/data/QCodepointData";

export interface CharacterDownloader {
    download(): Promise<CodepointData>;
}
