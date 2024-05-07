import {UnicodeSearchError} from "../../errors/unicodeSearchError";
import {
    Character,
    CharacterKey, MaybeUsedCharacter,
    UsedCharacter
} from "../../../libraries/types/codepoint/character";
import {CodepointStore} from "../codePointStore";
import {CharacterService} from "../characterService";
import {UsageStore} from "../usageStore";
import {ParsedUsageInfo} from "../../../libraries/types/savedata/usageData";

export class UsageCharacterService implements CharacterService {

	public constructor(
        private readonly codepointStore: CodepointStore,
        private readonly usageStore: UsageStore,
	) {
	}

    public async getOne(key: CharacterKey): Promise<Character> {
        const characters = await this.getAllCharacters();
        const char = characters.find(char => char.codepoint === key);

		if (char == null) {
			throw new UnicodeSearchError(`No character '${key}' exists.`);
		}

        return char;
    }

	public getAllCharacters(): Promise<Character[]> {
        return this.codepointStore.getCodepoints();
	}

    public async getUsed(): Promise<UsedCharacter[]> {
        const allCharacters = await this.getAllCharacters();
        const usedCharacters = await this.usageStore.getUsed();
        const usedKeys = usedCharacters.map(ch => ch.codepoint);

        return allCharacters
            .filter(ch => usedKeys.contains(ch.codepoint))
            .map(character => ({
                ...usedCharacters.find(usage => usage.codepoint === character.codepoint)!,
                ...character,
            }));
    }

    public async getAll(): Promise<MaybeUsedCharacter[]> {
        const allCharacters = await this.getAllCharacters();
        const usedCharacters = await this.usageStore.getUsed();

        return allCharacters.map(character => ({
            ...usedCharacters.find(usage => usage.codepoint === character.codepoint),
            ...character,
        }));
    }

	public recordUsage(key: CharacterKey): Promise<ParsedUsageInfo> {
        const timestamp = new Date();

		return this.usageStore.updateCharacter(key, (current) => ({
            ...current,
            firstUsed: current?.firstUsed ?? timestamp,
            lastUsed: timestamp,
            useCount: (current?.useCount ?? 0) + 1,
        }))
	}
}

