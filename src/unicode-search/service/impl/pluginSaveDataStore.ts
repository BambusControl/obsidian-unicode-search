import {Plugin} from "obsidian";
import {CharacterStore} from "../characterStore";
import {ObsidianUnicodeSearchError} from "../../errors/obsidianUnicodeSearchError";
import {SaveData} from "../../../libraries/types/data/saveData";
import {isTypeSaveData} from "../../../libraries/types/data/isTypeSaveData";
import {Character, PartialCharacter} from "../../../libraries/types/character";
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
		// TODO: Since fetching is managed by this component's lifecycle, it should not be in its public interface.
		this.loadCharacters().then();
	}

	public async loadCharacters(): Promise<Character[]> {
		return (await this.getFromStorage()).data;
	}

    // TODO: Refactor these oneliners.
	public async saveCharacter(character: Character): Promise<void> {
		await this.saveCharToStorage(character);
	}

    // TODO: Refactor these oneliners.
	public async putCharacter(data: PartialCharacter): Promise<void> {
		await this.putCharToStorage(data);
	}

	public async saveCharacters(data: Character[]): Promise<void> {
        await this.saveDataToStorage({
            data: data,
        })
	}

    // TODO: Refactor these oneliners.
    public async putCharacters(characters: PartialCharacter[]): Promise<void> {
        await this.putCharsToStorage(characters);
    }

	public async isSaveDataInitialized(): Promise<boolean> {
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

	public async setSaveDataAsInitialized(): Promise<void> {
		const data = await this.getFromStorage();

		await this.saveDataToStorage({
			meta: {
				...data.meta,
				...INITALIZATION_STORE.meta,
				initialized: true,
			},
		});
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

	private async saveCharToStorage(char: Character): Promise<Character> {
        const currentChars = await this.loadCharacters();

        const foundIndex = currentChars.findIndex(ch => ch.char === char.char)
        const found = foundIndex >= 0;

        const newChars = currentChars;

        if (found) {
            newChars[foundIndex] = char;
        } else {
            newChars.push(char);
        }

        await this.saveDataToStorage({data: newChars});

        // TODO: Are returns needed?
		return char;
	}

	private async putCharToStorage(char: PartialCharacter): Promise<Character> {
		const currentChars = await this.loadCharacters();

        const foundIndex = currentChars.findIndex(ch => ch.char === char.char)
        const found = foundIndex >= 0;

        const newChars = currentChars;

        if (found) {
            newChars[foundIndex] = {
                ...newChars[foundIndex],
                ...char,
            } as Character;
        } else {
            throw new ObsidianUnicodeSearchError(`Cannot save non-existent character '${char.char}' to storage`);
        }

        await this.saveDataToStorage({data: newChars});

        // TODO: Are returns needed?
		return newChars[foundIndex];
	}

	private async putCharsToStorage(chars: PartialCharacter[]): Promise<Character[]> {
        const oldChars = new Map((await this.loadCharacters()).map(v => [v.char, v]));
        const newChars = new Map(chars.map(v => [v.char, v]));

        const oldKeys = Array.from(oldChars.keys());
        const newKeys = Array.from(newChars.keys());

        const missingKeys = newKeys.filter(newKey => !oldKeys.contains(newKey));

        if (missingKeys.length > 0) {
			throw new ObsidianUnicodeSearchError(`Cannot save non-existent characters '${missingKeys}' to storage`);
		}

        for (const [newKey, newChar] of newChars.entries()) {

            const mergedChar = {
                ...oldChars.get(newKey)!,
                ...newChar,
            } as Character;

            oldChars.set(newKey, mergedChar);
        }

        const mergedCharacters = Array.from(oldChars.values());

        await this.saveDataToStorage({data: mergedCharacters});
        return mergedCharacters;
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

	public async fetchUserOptions(): Promise<UserOptions> {
		return (await this.getFromStorage()).user;
    }

	public async exportUserOptions(userOptions: UserOptions): Promise<UserOptions> {
		return (
			await this.saveDataToStorage({
				user: userOptions,
			})
		).user;
	}

}

