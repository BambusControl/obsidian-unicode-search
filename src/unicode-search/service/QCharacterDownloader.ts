import {QCodePointData} from "../../libraries/types/data/QCodePointData";

export interface QCharacterDownloader {
    download(): Promise<QCodePointData>;
}
