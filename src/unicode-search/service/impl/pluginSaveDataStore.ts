import {Plugin} from "obsidian";
import {CharacterStore} from "../characterStore";
import {ObsidianUnicodeSearchError} from "../../errors/obsidianUnicodeSearchError";
import {SaveData} from "../../../libraries/types/data/saveData";
import {isTypeSaveData} from "../../../libraries/types/data/isTypeSaveData";
import {Character, CharacterKey, CharacterTransform} from "../../../libraries/types/character";
import {UserOptionStore} from "../userOptionStore";
import { UserOptions } from "src/libraries/types/userOptions";
import {MetadataStore} from "../metadataStore";

const INITALIZATION_STORE: SaveData = {
	meta: {
		initialized: false,
		version: "0.5.0-NEXT",
	},
	user: {
	},
	data: [],
};

export class PluginSaveDataStore implements MetadataStore, CharacterStore, UserOptionStore {

	private _store?: SaveData;

	public constructor(
		private readonly plugin: Plugin,
	) {
	}

	public async getCharacters(): Promise<Character[]> {
		return (await this.getFromStorage()).data;
	}

	public async initializeCharacters(data: Character[]): Promise<void> {
        await this.saveDataToStorage({
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

        await this.saveDataToStorage({data: newChars});
	}

	public async placeCharacters(chars: Character[]): Promise<void> {
        const currentChars = new Map((await this.getCharacters()).map(v => [v.char, v]));
        const changedChars = new Map(chars.map(v => [v.char, v]));

        for (const [key, char] of changedChars.entries()) {
            currentChars.set(key, char);
        }

        const newChars = Array.from(currentChars.values());

        await this.saveDataToStorage({data: newChars});
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
        const modifiedChar = apply({... currentChars[foundIndex]});

        newChars[foundIndex] = modifiedChar;
        await this.saveDataToStorage({data: newChars});

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

        await this.saveDataToStorage({data: newChars});

        return modifiedChars;
    }

	public async isInitialized(): Promise<boolean> {
		const data = (await this.getFromStorage());
		const meta = data.meta;

		// TODO: move data migration logic
		if (meta.version !== INITALIZATION_STORE.meta.version) {
			const newData = {
				...INITALIZATION_STORE,
				...data,
			};

			newData.meta.version = INITALIZATION_STORE.meta.version;

			await this.saveDataToStorage(newData)
		}

		return meta.initialized;
	}

	public async getUserOptions(): Promise<UserOptions> {
		return (await this.getFromStorage()).user;
    }

	public async saveUserOptions(userOptions: UserOptions): Promise<UserOptions> {
		return (
			await this.saveDataToStorage({
				user: userOptions,
			})
		).user;
	}

	private async getFromStorage(): Promise<SaveData> {
		if (this._store == null) {
			this._store = await this._loadTheData();
		}

		return this._store;
	}

	private async saveDataToStorage(data: Partial<SaveData>): Promise<SaveData> {
		const currentData = await this.getFromStorage();

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

