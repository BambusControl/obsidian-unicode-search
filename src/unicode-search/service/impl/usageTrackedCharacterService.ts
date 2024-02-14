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
        return this.characterStore.getCharacters();
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

        // TODO: update
		await this.characterStore.putCharacter(usedChar);
        return usedChar;
	}

    public async getPinned(): Promise<PinnedCharacter[]> {
        return (await this.getAll())
            .filter(char => char.pin != null)
            .map(char => char as PinnedCharacter);
    }

    public async pin(key: CharacterKey): Promise<PinnedCharacter> {
        const pinNumber = (await this.getPinned()).length + 1;
        const pinnedChar = await this.characterStore.updateCharacter(key, (ch) => ({...ch, pin: pinNumber}));
        return pinnedChar as PinnedCharacter;
    }

    public async unpin(key: CharacterKey): Promise<UnpinnedCharacter> {
        const pinnedChars = (await this.getPinned());
        const foundIndex = pinnedChars.findIndex(ch => ch.char == key)

        if (foundIndex < 0) {
			throw new ObsidianUnicodeSearchError(`No character '${key}' exists.`);
		}

		const char = pinnedChars[foundIndex];

        if (char.pin == null) {
			throw new ObsidianUnicodeSearchError(`Character '${key}' is not pinned.`);
        }

        const {pin, ...unpinnedChar} = char;

        const followingCharacters = pinnedChars
            .filter(ch => ch.pin > pin)
            .map(ch => ({
                ...ch,
                pin: ch.pin - 1
            }));

        await this.characterStore.placeCharacters([unpinnedChar, ...followingCharacters]);

        return unpinnedChar;
    }
}

