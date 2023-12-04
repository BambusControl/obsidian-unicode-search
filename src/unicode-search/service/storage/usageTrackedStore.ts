import {ObsidianUnicodeSearchError} from "../../errors/obsidianUnicodeSearchError";

import {CharacterStore} from "./characterStore";
import {StorageService} from "../storageService";
import {CharacterKeyType, UsageTrackedCharacter} from "../../../libraries/types/character";

export class UsageTrackedStore implements CharacterStore {

	public constructor(
		private readonly exportService: StorageService,
	) {
	}

	public async getAll(): Promise<UsageTrackedCharacter[]> {
		return await this.exportService.getData();
	}

	public async recordUsage(id: CharacterKeyType): Promise<void> {
		const data = await this.exportService.getData();
		const char = data.find(char => char.char === id);

		if (char == null) {
			throw new ObsidianUnicodeSearchError(`No character '${id}' exists.`);
		}

		char.useCount = (char.useCount ?? 0) + 1;
		char.lastUsed = (new Date()).valueOf();

		await this.exportService.exportChar(char);
	}
}

