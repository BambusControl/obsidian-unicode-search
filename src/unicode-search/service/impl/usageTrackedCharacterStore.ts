import {ObsidianUnicodeSearchError} from "../../errors/obsidianUnicodeSearchError";

import {CharacterStore} from "../characterStore";
import {CharacterDataStore} from "../characterDataStore";
import {Character, CharacterKeyType, UsedCharacter} from "../../../libraries/types/character";

export class UsageTrackedCharacterStore implements CharacterStore {

	public constructor(
		private readonly exportService: CharacterDataStore,
	) {
	}

	public async fetchAll(): Promise<Character[]> {
		return await this.exportService.fetchCharacters();
	}

	public async recordUsage(id: CharacterKeyType): Promise<void> {
		const data = await this.exportService.fetchCharacters();
		const char = data.find(char => char.char === id);

		if (char == null) {
			throw new ObsidianUnicodeSearchError(`No character '${id}' exists.`);
		}

		char.useCount = (char.useCount ?? 0) + 1;
		char.lastUsed = (new Date()).valueOf();

		await this.exportService.exportCharacter(char);
	}

    public async fetchTouched(): Promise<UsedCharacter[]> {
        return (await this.fetchAll())
            .filter(char => char.useCount != null && char.lastUsed != null)
            .map(char => char as UsedCharacter)
    }
}

