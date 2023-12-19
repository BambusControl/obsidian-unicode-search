import {ObsidianUnicodeSearchError} from "../../errors/obsidianUnicodeSearchError";

import {CharacterService} from "../characterService";
import {CharacterStore} from "../characterStore";
import {Character, CharacterKey, UsedCharacter} from "../../../libraries/types/character";

export class UsageTrackedCharacterService implements CharacterService {

	public constructor(
        private readonly characterStore: CharacterStore,
	) {
	}

	public getAll(): Promise<Character[]> {
        return this.characterStore.loadCharacters();
	}

	public async recordUsage(id: CharacterKey): Promise<void> {
		const data = await this.getAll();
		const char = data.find(char => char.char === id);

		if (char == null) {
			throw new ObsidianUnicodeSearchError(`No character '${id}' exists.`);
		}

		char.useCount = (char.useCount ?? 0) + 1;
		char.lastUsed = (new Date()).valueOf();

		await this.characterStore.saveCharacter(char);
	}

    public async getUsed(): Promise<UsedCharacter[]> {
        return (await this.getAll())
            .filter(char => char.useCount != null && char.lastUsed != null)
            .map(char => char as UsedCharacter)
    }
}

