import {QCodePoint, QCodePointAttribute, QUnicodeData} from "../../libraries/types/data/QCodePointAttribute";
import {QSaveData, QSettings, QUserCodepointData} from "../../libraries/types/data/QSaveData";
import {Plugin} from "obsidian";
import {UnicodeSearchError} from "../errors/unicodeSearchError";
import {QMetadataStore} from "./QMetadataStore";
import {SaveData} from "../../libraries/types/data/saveData";
import {isTypeSaveData} from "../../libraries/helpers/isTypeSaveData";
import {Cache} from "./cache";

export interface QRootDataStore {
    getUnicodeData(): Promise<QUnicodeData>
    overwriteUnicodeData(characters: QUnicodeData): Promise<QUnicodeData>

    getSettings(): Promise<QSettings>
    saveSettings(userOptions: QSettings): Promise<QSettings>
}

function Q_INITALIZATION_STORE(): QSaveData {
    return {
        settings: {
            filter: {
                planes: {
                    blocks: {}
                },
                categories: {}
            }
        },
        user: {
            codepoints: new Map<QCodePoint, QUserCodepointData>()
        },
        unicode: {
            codepoints: new Map<QCodePoint, QCodePointAttribute>()
        }
    }
}

async function importData(
    dataLoader: Pick<Plugin, "loadData">,
): Promise<QSaveData> {
    const externalData = await dataLoader.loadData();
    /* TODO: SAVE DATA TYPE CHECK */
    const dataLoaded = externalData != null /*&& isTypeSaveData(externalData)*/;

    const newData: QSaveData = dataLoaded
        ? externalData
        : {...Q_INITALIZATION_STORE()};

    if (newData == null) {
        /* TODO: I don't think this can ever happen... */
        throw new UnicodeSearchError("Cannot import plugin data. The file is not valid!");
    }

    return newData;
}

export class QtRootDataStore implements QRootDataStore, QMetadataStore {

    private storedData?: Cache<QSaveData>;
    private dataChanges?: Partial<QSaveData>;

    constructor(
        private readonly plugin: Pick<Plugin, "saveData" | "loadData">,
    ) {
        this.storedData = new Cache(
            () => importData(plugin),
            (data) => plugin.saveData(data)
        );
    }


    getUnicodeData(): Promise<QUnicodeData> {
        throw new UnicodeSearchError("Not implemented");
    }

    overwriteUnicodeData(characters: QUnicodeData): Promise<QUnicodeData> {
        throw new UnicodeSearchError("Not implemented");
    }

    getSettings(): Promise<QSettings> {
        throw new UnicodeSearchError("Not implemented");
    }

    saveSettings(userOptions: QSettings): Promise<QSettings> {
        throw new UnicodeSearchError("Not implemented");
    }

    isInitialized(): Promise<boolean> {
        /* TODO [metadatastore] */
        return Promise.resolve(false);
    }

    private async mergeData(data: Partial<QSaveData>): Promise<QSaveData> {

    }

}
