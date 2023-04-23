import {CharacterKeyType, CharacterMapOf, UnicodeCharacterInfoModel} from "../data/model/unicode-character-info.model";
import {ObsidianUnicodeSearchError} from "../data/exception/obsidian-unicode-search.error";
import {Pinnable} from "../data/type/pinnable";
import {PinnedCharacter, PinnedStorage} from "./storage/pinned.storage";
import {DataService} from "./data.service";

export class UserPinnedStorage implements PinnedStorage {

	public constructor(
		private readonly exportService: DataService,
	) {
	}

	public async pin(id: CharacterKeyType, order: number): Promise<void> {
		const char = (await this.exportService.getData())[id];

		if (char == null) {
			throw new ObsidianUnicodeSearchError(`No character '${id}' exists.`);
		}

		char.pinned = order;
	}

    public async unpin(id: CharacterKeyType): Promise<void> {
		const char = (await this.exportService.getData())[id];

		if (char == null) {
			throw new ObsidianUnicodeSearchError(`No character '${id}' exists.`);
		}

		char.pinned = undefined;
		await this.exportService.exportChar(char);
    }

	public async getAll(): Promise<CharacterMapOf<PinnedCharacter>> {
		return await this.exportService.getData();
	}
}
