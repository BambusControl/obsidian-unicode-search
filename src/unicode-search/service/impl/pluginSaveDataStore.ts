import {Plugin} from "obsidian";
import {ObsidianUnicodeSearchError} from "../../errors/obsidianUnicodeSearchError";
import {SaveData} from "../../../libraries/types/data/saveData";
import {isTypeSaveData} from "../../../libraries/helpers/isTypeSaveData";
import {UserOptions} from "src/libraries/types/userOptions";
import {MetadataStore} from "../metadataStore";
import {Metadata} from "../../../libraries/types/data/metadata";
import {UNICODE_CATEGORIES_ALL} from "../../../libraries/data/unicodeCategories";
import {UNICODE_PLANE_0, UNICODE_PLANE_1} from "../../../libraries/data/unicodePlanes";
import {RootDataStore} from "../rootDataStore";
import {Characters} from "../../../libraries/types/character";

const INITALIZATION_STORE: SaveData = {
    meta: {
        initialized: false,
        version: "0.5.0-NEXT",
    },
    user: {
        characterFilter: {
            categories: UNICODE_CATEGORIES_ALL,
            unicodePlanes: [
                {
                    plane: {
                        ...UNICODE_PLANE_0.interval
                    },
                    select: "ALL"
                },
                {
                    plane: {
                        ...UNICODE_PLANE_1.interval
                    },
                    select: "ALL"
                },
            ],
        }
    },
    data: [],
};

export class PluginSaveDataStore implements RootDataStore, MetadataStore {

    private _store?: SaveData;

    public constructor(
        private readonly plugin: Pick<Plugin, "saveData" | "loadData">,
    ) {
    }

    public async getCharacterData(): Promise<Characters> {
        return (await this._getFromStorage()).data;
    }

    public async initializeCharacterData(characters: Characters): Promise<Characters> {
        return (await this._mergeToStorage({
            meta: {
                ...INITALIZATION_STORE.meta,
                initialized: true,
            },
            data: characters
        })).data;
    }

    public async isInitialized(): Promise<boolean> {
        const data = (await this._getFromStorage());
        const meta = data.meta;

        // TODO: move data migration logic
        if (meta.version !== INITALIZATION_STORE.meta.version) {
            const newData = {
                ...INITALIZATION_STORE,
                ...data,
            };

            newData.meta.version = INITALIZATION_STORE.meta.version;

            await this._mergeToStorage(newData)
        }

        return meta.initialized;
    }

    public async flagToReinitialize(): Promise<void> {
        await this._mergeMetadata({
            initialized: false,
        });
    }

    public async getUserOptions(): Promise<UserOptions> {
        return (await this._getFromStorage()).user;
    }

    public async saveUserOptions(userOptions: UserOptions): Promise<UserOptions> {
        return (
            await this._mergeToStorage({
                user: userOptions,
            })
        ).user;
    }

    private async _mergeMetadata(data: Partial<Metadata>): Promise<Metadata> {
        const currentData = await this._getFromStorage();

        return (await this._mergeToStorage({
            meta: {
                ...currentData.meta,
                ...data,
            }
        })).meta;
    }

    private async _getFromStorage(): Promise<SaveData> {
        if (this._store == null) {
            this._store = await this._loadTheData();
        }

        return this._store;
    }

    private async _mergeToStorage(data: Partial<SaveData>): Promise<SaveData> {
        const currentData = await this._getFromStorage();

        const newData: SaveData = {
            ...currentData,
            ...data,
        };

        await this.plugin.saveData(newData);
        this._store = newData;
        return this._store;
    }

    private async _loadTheData(): Promise<SaveData> {
        const externalData = await this.plugin.loadData();
        const dataLoaded = externalData != null && isTypeSaveData(externalData);

        const newData = dataLoaded
            ? externalData
            : {...INITALIZATION_STORE};

        if (newData == null) {
            throw new ObsidianUnicodeSearchError("Cannot import plugin data. The file is not valid!");
        }

        if (!dataLoaded) {
            await this.plugin.saveData(newData);
        }

        return newData;
    }
}

