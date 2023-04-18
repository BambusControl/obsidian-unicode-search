import {UsageTrackedCharacterInfoModel} from "../data/model/usage-tracked-character-info.model";
import {OrderedCharacterStorage} from "./storage/ordered-character.storage";
import {ExternalData} from "../data/type/external.data";

type DataType = { usageBasedCharacterStorage: UsageTrackedCharacterInfoModel[] };

export class UsageBasedCharacterStorage implements OrderedCharacterStorage, ExternalData<DataType> {

	private data: UsageTrackedCharacterInfoModel[];

	public constructor() {
		this.data = [];
	}

	public getAll(): UsageTrackedCharacterInfoModel[] {
		return this.data;
	}

	public affect(character: UsageTrackedCharacterInfoModel): void {
		let char = this.data.find(storedCharacter => storedCharacter.char == character.char);

		if (char == null) {
			char = { ...character, hitCount: 0 };
			this.data.push(char)
		}

		char.hitCount++;
	}

	public importData(data?: Partial<DataType>): void {
		this.data = data?.usageBasedCharacterStorage?.sort((a, b) => a.hitCount - b.hitCount)
			?? this.data;
	}

	public exportData(): DataType {
		return {
			usageBasedCharacterStorage: this.data
		};
	}
}

