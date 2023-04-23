import {PinnedStorage} from "./storage/base.storage";
import {UnicodeCharacterInfoModel} from "../data/model/unicode-character-info.model";
import {ObsidianUnicodeSearchError} from "../data/exception/obsidian-unicode-search.error";
import {Pinnable} from "../data/type/pinnable";

type SavedCharacterInfoModel = (UnicodeCharacterInfoModel & Pinnable)
type DataType = { userSavedCharacterStorage: SavedCharacterInfoModel[] };

export class UserPinnedStorage implements PinnedStorage {

	private data: SavedCharacterInfoModel[];

	public constructor() {
		this.data = [];
	}

	public pin(id: UnicodeCharacterInfoModel["char"], order: number): void {
        const char = this.data.find(item => item.char == id);

		if (char == null) {
			throw new ObsidianUnicodeSearchError(`No character '${id}' exists.`);
		}

		char.pinned = order;
    }

    public unpin(id: UnicodeCharacterInfoModel["char"]): void {
        const char = this.data.find(item => item.char == id);

		if (char == null) {
			throw new ObsidianUnicodeSearchError(`No character '${id}' exists.`);
		}

		char.pinned = null;
    }

	public getAll(): SavedCharacterInfoModel[] {
		return this.data;
	}

	public importData(data?: Partial<DataType>): void {
		this.data = data?.userSavedCharacterStorage ?? this.data;
	}

	public exportData(): DataType {
		return {
			userSavedCharacterStorage: this.data
		};
	}
}
