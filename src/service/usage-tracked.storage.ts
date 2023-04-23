import {UnicodeCharacterInfoModel} from "../data/model/unicode-character-info.model";
import {ObsidianUnicodeSearchError} from "../data/exception/obsidian-unicode-search.error";
import {StatTracked} from "../data/type/stat-tracked";
import {StatTrackedStorage} from "./storage/base.storage";

type DataType = { usageBasedCharacterStorage: (UnicodeCharacterInfoModel & StatTracked)[] };

export class UsageTrackedStorage implements StatTrackedStorage {

	private data: (UnicodeCharacterInfoModel & StatTracked)[];

	public constructor() {
		this.data = [];
	}

	public getAll(): (UnicodeCharacterInfoModel & StatTracked)[] {
		return this.data;
	}

	public recordUsage(id: UnicodeCharacterInfoModel["char"]): void {
		const char = this.data.find(item => item.char == id);

		if (char == null) {
			throw new ObsidianUnicodeSearchError(`No character '${id}' exists.`);
		}

		char.useCount = char.useCount + 1;
		char.lastUsed = new Date();
	}

	public importData(data?: Partial<DataType>): void {
		this.data = data?.usageBasedCharacterStorage?.sort((a, b) => a.useCount - b.useCount)
			?? this.data;
	}

	public exportData(): DataType {
		return {
			usageBasedCharacterStorage: this.data
		};
	}
}

