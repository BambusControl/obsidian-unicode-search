import {UnicodeSearchError} from "../../errors/unicodeSearchError";
import {
    Character,
    CharacterKey, MaybeUsedCharacter,
    UsedCharacter
} from "../../../libraries/types/qCharacter";
import {CodepointStore} from "../QCodepointStore";
import {CharacterService} from "../QCharacterService";
import {UsageStore} from "../QUsageStore";
import {UsageInfo} from "../../../libraries/types/qUsageInfo";
import {compareCharacters} from "../../../libraries/comparison/compareCharacters";

export class QtCharacterService implements CharacterService {

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
        return this.codepointStore.getCharacters();
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

    public async getSorted(): Promise<MaybeUsedCharacter[]> {
        const allCharacters = await this.getAllCharacters();
        const usedCharacters = await this.usageStore.getUsed();

        const maybeUsedChars = allCharacters
            .map(character => ({
                ...usedCharacters.find(usage => usage.codepoint === character.codepoint),
                ...character,
            }))
            .sort((a, b) => compareCharacters(a, b))
        ;

        return maybeUsedChars;

        /*const mostRecent = qMostRecentlyUsed(usedCharacters).last();
        const mostRecentCutoff = mostRecent == null ? 0 : new Date(mostRecent.lastUsed).valueOf();
		const averageUsageCount = qAverageUseCount(usedCharacters);*/
    }

	public recordUsage(key: CharacterKey): Promise<UsageInfo> {
        const timestamp = (new Date()).toJSON()

		return this.usageStore.updateCharacter(key, (current) => ({
            ...current,
            firstUsed: current.firstUsed ?? timestamp,
            lastUsed: timestamp,
            useCount: (current.useCount ?? 0) + 1,
        }))
	}
}

