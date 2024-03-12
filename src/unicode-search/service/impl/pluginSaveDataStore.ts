import {Plugin} from "obsidian";
import {CharacterStore} from "../characterStore";
import {ObsidianUnicodeSearchError} from "../../errors/obsidianUnicodeSearchError";
import {SaveData} from "../../../libraries/types/data/saveData";
import {isTypeSaveData} from "../../../libraries/helpers/isTypeSaveData";
import {Character, CharacterKey, CharacterTransform} from "../../../libraries/types/character";
import {UserOptionStore} from "../userOptionStore";
import {UserOptions} from "src/libraries/types/userOptions";
import {MetadataStore} from "../metadataStore";
import {CharacterCategory} from "../../../libraries/data/characterCategory";
import {Metadata} from "../../../libraries/types/data/metadata";
import {UnicodePlaneNumber} from "../../../libraries/data/unicodePlaneNumber";
import {UNICODE_CATEGORIES_ALL} from "../../../libraries/data/unicodeCategories";
import {ClosedIntervalEndpoint} from "../../../libraries/types/codePointInterval";

const INITALIZATION_STORE: SaveData = {
    meta: {
        initialized: false,
        version: "0.5.0-NEXT",
    },
    user: {
        characterFilter: {
            unicodeSubcategories: UNICODE_CATEGORIES_ALL,
            unicodePlanes: [ 0, 1 ],
            unicodeBlocks: [],
            customIntervals: []
        }
    },
    data: [],
};

export class PluginSaveDataStore implements MetadataStore, CharacterStore, UserOptionStore {

    private _store?: SaveData;

    public constructor(
        private readonly plugin: Pick<Plugin, "saveData" | "loadData">,
    ) {
    }

    public async getCharacters(): Promise<Character[]> {
        return (await this._getFromStorage()).data;
    }

    public async initializeCharacters(data: Character[]): Promise<void> {
        await this._mergeToStorage({
            meta: {
                ...INITALIZATION_STORE.meta,
                initialized: true,
            },
            data: data,
        })
    }

    public async placeCharacter(char: Character): Promise<void> {
        const currentChars = await this.getCharacters();

        const foundIndex = currentChars.findIndex(ch => ch.char === char.char)
        const found = foundIndex >= 0;

        const newChars = currentChars;

        if (found) {
            newChars[foundIndex] = char;
        } else {
            newChars.push(char);
        }

        await this._mergeToStorage({data: newChars});
    }

    public async placeCharacters(chars: Character[]): Promise<void> {
        const currentChars = new Map((await this.getCharacters()).map(v => [v.char, v]));
        const changedChars = new Map(chars.map(v => [v.char, v]));

        for (const [key, char] of changedChars.entries()) {
            currentChars.set(key, char);
        }

        const newChars = Array.from(currentChars.values());

        await this._mergeToStorage({data: newChars});
    }

    public async updateCharacter<Out>(
        key: CharacterKey, apply: (char: Character) => Character & Out
    ): Promise<Character & Out> {

        const currentChars = await this.getCharacters();

        const foundIndex = currentChars.findIndex(ch => ch.char === key)
        const found = foundIndex >= 0;

        if (!found) {
            throw new ObsidianUnicodeSearchError(`Cannot update non-existent character '${key}' to storage`);
        }

        const newChars = currentChars;
        const modifiedChar = apply({...currentChars[foundIndex]});

        newChars[foundIndex] = modifiedChar;
        await this._mergeToStorage({data: newChars});

        return modifiedChar;
    }

    public async updateCharacters<Out>(
        keyApplyMap: Map<CharacterKey, CharacterTransform<Out>>
    ): Promise<Map<CharacterKey, Character & Out>> {

        const currentChars = await this.getCharacters();
        const indexMappings = new Map<number, CharacterTransform<Out>>()

        for (const [key, mapping] of keyApplyMap) {
            const foundIndex = currentChars.findIndex(ch => ch.char === key)
            const found = foundIndex >= 0;

            if (!found) {
                throw new ObsidianUnicodeSearchError(`Cannot update non-existent character '${key}' to storage`);
            }

            indexMappings.set(foundIndex, mapping);
        }

        const newChars = currentChars;
        const modifiedChars = new Map<CharacterKey, Character & Out>()

        for (const [index, mapping] of indexMappings) {
            const modifiedChar = mapping({...currentChars[index]});
            newChars[index] = modifiedChar;
            modifiedChars.set(modifiedChar.char, modifiedChar)
        }

        await this._mergeToStorage({data: newChars});

        return modifiedChars;
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

    public async getCharacterSubcategory(category: CharacterCategory): Promise<boolean> {
        const data = new Set((await this._getFromStorage()).user.characterFilter.unicodeSubcategories);
        return data.has(category);
    }

    public async setCharacterSubcategory(category: CharacterCategory, set: boolean): Promise<void> {
        const userdata = (await this._getFromStorage()).user;
        const subcategories = new Set(userdata.characterFilter.unicodeSubcategories);

        if (set) {
            subcategories.add(category);
        } else {
            subcategories.delete(category);
        }

        /* Doesn't save the state correctly */

        /* TODO: refactor these */
        await this.saveUserOptions({
            ...userdata,
            characterFilter: {
                ...userdata.characterFilter,
                unicodeSubcategories: Array.from(subcategories),
            }
        })
        await this._setInitialized(false);
    }

    public async getCharacterPlane(planeNumber: UnicodePlaneNumber): Promise<boolean> {
        const data = new Set((await this._getFromStorage()).user.characterFilter.unicodePlanes);
        return data.has(planeNumber);
    }

    public async setCharacterPlane(planeNumber: UnicodePlaneNumber, set: boolean): Promise<void> {
        const userdata = (await this._getFromStorage()).user;
        const planes = new Set(userdata.characterFilter.unicodePlanes);

        if (set) {
            planes.add(planeNumber);
        } else {
            planes.delete(planeNumber);
        }

        /* Doesn't save the state correctly */

        /* TODO: refactor these */
        await this.saveUserOptions({
            ...userdata,
            characterFilter: {
                ...userdata.characterFilter,
                unicodePlanes: Array.from(planes),
            }
        })

        await this._setInitialized(false);
    }

    public async getCharacterBlock(blockStart: ClosedIntervalEndpoint): Promise<boolean> {
        const data = new Set((await this._getFromStorage()).user.characterFilter.unicodeBlocks);
        return data.has(blockStart);
    }

    public async setCharacterBlock(blockStart: ClosedIntervalEndpoint, set: boolean): Promise<void> {
        const userdata = (await this._getFromStorage()).user;
        const planes = new Set(userdata.characterFilter.unicodeBlocks);

        if (set) {
            planes.add(blockStart);
        } else {
            planes.delete(blockStart);
        }

        /* Doesn't save the state correctly */

        /* TODO: refactor these */
        await this.saveUserOptions({
            ...userdata,
            characterFilter: {
                ...userdata.characterFilter,
                unicodeBlocks: Array.from(planes),
            }
        })

        await this._setInitialized(false);
    }

    private async _setInitialized(initialized: boolean): Promise<void> {
        await this._mergeMetadata({
            initialized: initialized,
        });
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
