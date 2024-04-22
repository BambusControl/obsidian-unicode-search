import {QUnicodeData} from "../../libraries/types/data/QCodePointAttribute";
import {QSettings} from "../../libraries/types/data/QSaveData";
import {Plugin} from "obsidian";
import {ObsidianUnicodeSearchError} from "../errors/obsidianUnicodeSearchError";
import {QMetadataStore} from "./QMetadataStore";

export interface QRootDataStore {
    getUnicodeData(): Promise<QUnicodeData>
    initializeUnicodeData(characters: QUnicodeData): Promise<QUnicodeData>

    getSettings(): Promise<QSettings>
    saveSettings(userOptions: QSettings): Promise<QSettings>
}

export class QtRootDataStore implements QRootDataStore, QMetadataStore {

    public constructor(
        private readonly plugin: Pick<Plugin, "saveData" | "loadData">,
    ) {
    }

    getSettings(): Promise<QSettings> {
        throw new ObsidianUnicodeSearchError("Not implemented");
    }

    getUnicodeData(): Promise<QUnicodeData> {
        throw new ObsidianUnicodeSearchError("Not implemented");
    }

    initializeUnicodeData(characters: QUnicodeData): Promise<QUnicodeData> {
        throw new ObsidianUnicodeSearchError("Not implemented");
    }

    saveSettings(userOptions: QSettings): Promise<QSettings> {
        throw new ObsidianUnicodeSearchError("Not implemented");
    }

    isInitialized(): Promise<boolean> {
        /* TODO [metadatastore] */
        return Promise.resolve(false);
    }

}
