import {Plugin} from "obsidian";
import {DataService} from "./data.service";
import {ObsidianUnicodeSearchError} from "../errors/obsidian-unicode-search.error";
import {Character, CharacterMap, PartialCharacter} from "../../libraries/types/unicode.character";
import {DataAccess} from "./data.access";
import {compareCharacters} from "../../libraries/comparison/compare.characters";

type DataVersions = "1" | "2";

type MetaType = {
	initialized: boolean;
	version: DataVersions;
};

type DataStore = {
	meta: MetaType;
	data: CharacterMap;
}

const INITALIZATION_STORE: DataStore = {
	meta: {
		initialized: false,
		version: "2",
	},
	data: [],
};

export class PluginDataService implements DataService, DataAccess {

	private _store?: DataStore;

	public constructor(
		private readonly plugin: Plugin,
	) {
		this.getData().then();
	}

	public async exportData(data: CharacterMap): Promise<CharacterMap> {
		return (
			await this.saveDataToStorage({
				data: data,
			})
		).data;
	}

	public async exportChar(data: PartialCharacter): Promise<Character> {
		return (await this.saveCharToStorage(data));
	}

	public async getData(): Promise<CharacterMap> {
		return (await this.getFromStorage()).data;
	}

	public getCharacters(): Array<Character> {
		const data = this._store?.data ?? [];
		return data.sort(compareCharacters)
	}

	public async isInitialized(): Promise<boolean> {
		const meta = (await this.getFromStorage()).meta;

		return meta.initialized
			&& meta.version === "2";
	}

	public async setAsInitialized(): Promise<void> {
		const data = await this.getFromStorage();

		await this.saveDataToStorage({
			meta: {
				...data.meta,
				initialized: true,
				version: "2",
			},
		});
	}

	private async getFromStorage(): Promise<DataStore> {
		if (this._store == null) {
			this._store = await this._loadTheData();
		}

		return this._store;
	}

	private async saveDataToStorage(data: Partial<DataStore>): Promise<DataStore> {
		const currentData = await this.getFromStorage();

		const newData: DataStore = {
			...currentData,
			...data,
		};

		await this.plugin.saveData(newData);
		this._store = newData;
		return this._store;
	}

	private async saveCharToStorage(char: PartialCharacter): Promise<Character> {
		const currentChar = (await this.getData())
			.find(v => v.char === char.char);

		if (currentChar == null) {
			throw new ObsidianUnicodeSearchError(`Cannot save non-existent character '${char.char}' to storage`);
		}

		Object.assign(currentChar, char);

		await this.plugin.saveData(this._store);
		return currentChar;
	}

	private async _loadTheData(): Promise<DataStore> {
		const externalData: DataStore | null = await this.plugin.loadData();
		const dataLoaded = externalData != null;

		const newData = dataLoaded
			? externalData
			: INITALIZATION_STORE;

		if (newData == null) {
			throw new ObsidianUnicodeSearchError("Cannot import plugin data. The file is not valid!");
		}

		if (!dataLoaded) {
			await this.plugin.saveData(newData);
		}

		return newData;
	}
}

