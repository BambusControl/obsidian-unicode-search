import {ObsidianUnicodeSearchError} from "../../errors/obsidianUnicodeSearchError";

import {CharacterService} from "../characterService";
import {CharacterStore} from "../characterStore";
import {
    Character,
    CharacterKey,
    PinnedCharacter,
    UnpinnedCharacter,
    UsedCharacter
} from "../../../libraries/types/character";

export class UsageTrackedCharacterService implements CharacterService {

	public constructor(
        private readonly characterStore: CharacterStore,
	) {
	}

    public async getOne(key: CharacterKey): Promise<Character> {
        const characters = await this.getAll();
        const char = characters.find(char => char.char === key);

		if (char == null) {
			throw new ObsidianUnicodeSearchError(`No character '${key}' exists.`);
		}

        return char;
    }

	public getAll(): Promise<Character[]> {
        return this.characterStore.loadCharacters();
	}

    public async getUsed(): Promise<UsedCharacter[]> {
        return (await this.getAll())
            .filter(char => char.useCount != null && char.lastUsed != null)
            .map(char => char as UsedCharacter);
    }

	public async recordUsage(key: CharacterKey): Promise<UsedCharacter> {
		const char = await this.getOne(key);

        const usedChar: UsedCharacter = {
            ...char,
            useCount: (char.useCount ?? 0) + 1,
            lastUsed: (new Date()).valueOf(),
        }

		await this.characterStore.saveCharacter(usedChar);
        return usedChar;
	}

    public async getPinned(): Promise<PinnedCharacter[]> {
        return (await this.getAll())
            .filter(char => char.pin != null)
            .map(char => char as PinnedCharacter);
    }

    public async pin(key: CharacterKey): Promise<PinnedCharacter> {
		const char = await this.getOne(key);

        if (char.pin != null) {
			throw new ObsidianUnicodeSearchError(`Character '${key}' is already pinned.`);
        }

        const pinnedChar: PinnedCharacter = {
            ...char,
            pin: (await this.getPinned()).length + 1
        };

		await this.characterStore.saveCharacter(pinnedChar);
        return pinnedChar;
    }

    public async unpin(key: CharacterKey): Promise<UnpinnedCharacter> {
        // TODO #1: On unpin all characters get yeeted

		const char = await this.getOne(key);

        if (char.pin == null) {
			throw new ObsidianUnicodeSearchError(`Character '${key}' is not pinned.`);
        }

        const pinnedChar = char as PinnedCharacter;
        const {pin, ...unpinnedChar } = pinnedChar;

        await this.characterStore.saveCharacter(unpinnedChar);

        const followingCharacters = (await this.getPinned())
            .filter(ch => ch.pin > pinnedChar.pin)
            .map(ch => ({
                ...ch,
                pin: ch.pin - 1
            }));

        await this.characterStore.saveCharacters(followingCharacters);

        return unpinnedChar;
    }
}

