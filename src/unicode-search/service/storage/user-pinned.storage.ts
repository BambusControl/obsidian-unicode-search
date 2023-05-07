import {CharacterKeyType, CharacterMapOf} from "../../../libraries/types/unicode.character";
import {ObsidianUnicodeSearchError} from "../../errors/obsidian-unicode-search.error";
import {PinnedCharacter, PinnedStorage} from "./pinned.storage";
import {DataService} from "../data.service";

export class UserPinnedStorage implements PinnedStorage {

	public constructor(
		private readonly exportService: DataService,
	) {
	}

	public async pin(id: CharacterKeyType, order: number): Promise<void> {
		const data = await this.exportService.getData();
		const char = data.find(char => char.char === id);

		if (char == null) {
			throw new ObsidianUnicodeSearchError(`No character '${id}' exists.`);
		}

		char.pinned = order;
		await this.exportService.exportChar(char);
	}

	public async unpin(id: CharacterKeyType): Promise<void> {
		const data = await this.exportService.getData();
		const char = data.find(char => char.char === id);

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
