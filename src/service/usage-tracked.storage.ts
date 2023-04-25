import {CharacterKeyType, CharacterMapOf} from "../data/unicode.character";
import {ObsidianUnicodeSearchError} from "../data/obsidian-unicode-search.error";

import {StatTrackedCharacter, StatTrackedStorage} from "./storage/stat-tracked.storage";
import {DataService} from "./data.service";

export class UsageTrackedStorage implements StatTrackedStorage {

	public constructor(
		private readonly exportService: DataService,
	) {
	}

	public async getAll(): Promise<CharacterMapOf<StatTrackedCharacter>> {
		return await this.exportService.getData();
	}

	public async recordUsage(id: CharacterKeyType): Promise<void> {
		const char = (await this.exportService.getData())[id];

		if (char == null) {
			throw new ObsidianUnicodeSearchError(`No character '${id}' exists.`);
		}

		char.useCount = (char.useCount ?? 0) + 1;
		char.lastUsed = (new Date()).valueOf();

		await this.exportService.exportChar(char);
	}
}

