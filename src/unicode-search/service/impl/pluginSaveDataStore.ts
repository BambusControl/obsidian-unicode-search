import {Plugin} from "obsidian";
import {CharacterDataStore} from "../characterDataStore";
import {ObsidianUnicodeSearchError} from "../../errors/obsidianUnicodeSearchError";
import {CharacterProvider} from "../characterProvider";
import {compareCharacters} from "../../../libraries/comparison/compareCharacters";
import {SaveData} from "../../../libraries/types/data/saveData";
import {isTypeSaveData} from "../../../libraries/types/data/isTypeSaveData";
import {Character, PartialCharacter} from "../../../libraries/types/character";
import {UserOptionStore} from "../userOptionStore";
import { UserOptions } from "src/libraries/types/userOptions";

const INITALIZATION_STORE: SaveData = {
	meta: {
		initialized: false,
		version: "0.5.0-NEXT",
	},
	user: {
		pinned: [],
	},
	data: [],
};

export class PluginSaveDataStore implements CharacterDataStore, CharacterProvider, UserOptionStore {

	private _store?: SaveData;

	public constructor(
		private readonly plugin: Plugin,
	) {
		// TODO: Since fetching is managed by this component's lifecycle, it should not be in its public interface.
		this.fetchCharacters().then();
	}

	public async exportCharacters(data: Character[]): Promise<Character[]> {
		return (
			await this.saveDataToStorage({
				data: data,
			})
		).data;
	}

	public async exportCharacter(data: PartialCharacter): Promise<Character> {
		return (await this.saveCharToStorage(data));
	}

	public async fetchCharacters(): Promise<Character[]> {
		return (await this.getFromStorage()).data;
	}

	public getCharacters(): Character[] {
		const data = this._store?.data ?? [];
		return data.sort(compareCharacters);
	}

	public async isSaveDataInitialized(): Promise<boolean> {
		const data = (await this.getFromStorage());
		const meta = data.meta;

		return meta.initialized
			&& meta.version === INITALIZATION_STORE.meta.version;
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

	private async saveCharToStorage(char: PartialCharacter): Promise<Character> {
		const currentChar = (await this.fetchCharacters())
			.find(v => v.char === char.char);

		if (currentChar == null) {
			throw new ObsidianUnicodeSearchError(`Cannot save non-existent character '${char.char}' to storage`);
		}

		Object.assign(currentChar, char);

		await this.plugin.saveData(this._store);
		return currentChar;
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

	getUserOptions(): UserOptions {
		return this._store?.user
			?? {...INITALIZATION_STORE.user};
    }

}

