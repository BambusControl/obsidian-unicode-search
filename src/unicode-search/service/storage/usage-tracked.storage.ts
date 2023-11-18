import {ObsidianUnicodeSearchError} from "../../errors/obsidian-unicode-search.error";

import {TrackedStorage} from "./tracked.storage";
import {DataService} from "../data.service";
import {CharacterKeyType, UsageTrackedCharacter} from "../../../libraries/types/character";

export class UsageTrackedStorage implements TrackedStorage {

	public constructor(
		private readonly exportService: DataService,
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

