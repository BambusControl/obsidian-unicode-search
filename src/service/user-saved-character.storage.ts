import {SavedCharacterStorage} from "./storage/saved-character.storage";
import {ExternalData} from "../data/type/external.data";
import {SavedCharacterInfoModel} from "../data/model/saved-character-info.model";

type DataType = { userSavedCharacterStorage: SavedCharacterInfoModel[] };

export class UserSavedCharacterStorage implements SavedCharacterStorage, ExternalData<DataType> {

	private data: SavedCharacterInfoModel[];

	public constructor() {
		this.data = [];
	}

	public getAll(): SavedCharacterInfoModel[] {
		return this.data;
	}

	public affect(character: SavedCharacterInfoModel): void {
		let char = this.data.find(storedCharacter => storedCharacter.char == character.char);

		if (char == null) {
			char = {...character };
			this.data.push(char);
		} else {
			char.savedRank = character.savedRank;
		}
	}

	public remove(character: SavedCharacterInfoModel): void {
		const char = this.data.find(storedCharacter => storedCharacter.char == character.char);

		if (char != null) {
			char.savedRank = undefined;
		}
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
