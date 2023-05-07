import {Plugin} from "obsidian";
import {DataService} from "./data.service";
import {ObsidianUnicodeSearchError} from "../errors/obsidian-unicode-search.error";
import {Character, Characters, PartialCharacter} from "../../libraries/types/unicode.character";
import {DataAccess} from "./data.access";
import {compareCharacters} from "../../libraries/comparison/compare.characters";
import {SaveData} from "../../libraries/types/data/save-data";

const INITALIZATION_STORE: SaveData = {
	meta: {
		initialized: false,
		version: "0.3.0-NEXT",
	},
	data: [],
};

export class PluginDataService implements DataService, DataAccess {

	private _store?: SaveData;

	public constructor(
		private readonly plugin: Plugin,
	) {
		this.getData().then();
	}

	public async exportData(data: Characters): Promise<Characters> {
		return (
			await this.saveDataToStorage({
				data: data,
			})
		).data;
	}

	public async exportChar(data: PartialCharacter): Promise<Character> {
		return (await this.saveCharToStorage(data));
	}

	public async getData(): Promise<Characters> {
		return (await this.getFromStorage()).data;
	}

	public getCharacters(): Characters {
		const data = this._store?.data ?? [];
		return data.sort(compareCharacters)
	}

	public async isInitialized(): Promise<boolean> {
		const data = (await this.getFromStorage());
		const meta = data.meta;

		return meta.initialized
			&& meta.version === INITALIZATION_STORE.meta.version;
	}

	public async setAsInitialized(): Promise<void> {
		const data = await this.getFromStorage();

		await this.saveDataToStorage({
			meta: {
				...data.meta,
				...INITALIZATION_STORE.meta,
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
		const currentChar = (await this.getData())
			.find(v => v.char === char.char);

		if (currentChar == null) {
			throw new ObsidianUnicodeSearchError(`Cannot save non-existent character '${char.char}' to storage`);
		}

		Object.assign(currentChar, char);

		await this.plugin.saveData(this._store);
		return currentChar;
	}

	private async _loadTheData(): Promise<SaveData> {
		const externalData: SaveData | null = await this.plugin.loadData();
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

