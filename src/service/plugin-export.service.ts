import {Plugin} from "obsidian";
import {DataService} from "./data.service";
import {ObsidianUnicodeSearchError} from "../data/exception/obsidian-unicode-search.error";
import {Character, CharacterMap, PartialCharacter} from "../data/model/unicode-character-info.model";
import {DataAccess} from "./data.access";

export type MetaType = {
	initialized: boolean;
	version: "1";
};

export type DataStore = {
	meta: MetaType;
	data: CharacterMap;
}

const INITALIZATION_STORE: DataStore = {
	meta: {
		initialized: false,
		version: "1",
	},
	data: {},
};

export class PluginExportService implements DataService, DataAccess {

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
		const data = this._store?.data ?? {}
		return Object.entries(data)
			.map(([, value]) => ({...value}))
			.sort((a, b) => {
				// TODO SORTING
				if (a.pinned != null) {
					if (b.pinned == null) {
						// A < B
						return -1;
					}

					// A < B if B has order greater than A
					return a.pinned - b.pinned;
				}

				if (b.pinned != null) {
					// A > B
					return 1;
				}

				if (a.lastUsed != null) {
					if (b.lastUsed == null) {
						// A < B
						return -1;
					}

					// A < B if B has time of use later than A
					return a.lastUsed.valueOf() - b.lastUsed.valueOf();
				}

				if (b.lastUsed != null) {
					// A > B
					return 1;
				}

				if (a.useCount != null) {
					if (b.useCount == null) {
						// A < B
						return -1;
					}

					// A < B if B has fewer uses than A
					return b.useCount - a.useCount;
				}

				return 1;
			})
	}

	public async isInitialized(): Promise<boolean> {
		return (await this.getFromStorage()).meta.initialized;
	}

	public async setAsInitialized(): Promise<void> {
		const data = await this.getFromStorage();

		await this.saveDataToStorage({
			meta: {
				...data.meta,
				initialized: true,
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
		const currentChar = (await this.getData())[char.char];

		Object.assign(currentChar, char);

		await this.plugin.saveData(this._store);
		return currentChar;
	}

	private async _loadTheData(): Promise<DataStore> {
		const externalData = await this.plugin.loadData();
		const dataLoaded = externalData != null;

		const newData: DataStore = dataLoaded
			? (externalData as DataStore)
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
