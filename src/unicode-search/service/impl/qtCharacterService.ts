import {UnicodeSearchError} from "../../errors/unicodeSearchError";
import {
    QCharacter,
    QCharacterKey, QMaybeUsedCharacter,
    QUsedCharacter
} from "../../../libraries/types/qCharacter";
import {QCodePointStore} from "../QCodePointStore";
import {QCharacterService} from "../QCharacterService";
import {QUsageStore} from "../QUsageStore";
import {QUsageInfo} from "../../../libraries/types/qUsageInfo";
import {qCompareCharacters} from "../../../libraries/comparison/compareCharacters";

export class QtCharacterService implements QCharacterService {

	public constructor(
        private readonly codePointStore: QCodePointStore,
        private readonly usageStore: QUsageStore,
	) {
	}

    public async getOne(key: QCharacterKey): Promise<QCharacter> {
        const characters = await this.getAllCharacters();
        const char = characters.find(char => char.codePoint === key);

		if (char == null) {
			throw new UnicodeSearchError(`No character '${key}' exists.`);
		}

        return char;
    }

	public getAllCharacters(): Promise<QCharacter[]> {
        return this.codePointStore.getCharacters();
	}

    public async getUsed(): Promise<QUsedCharacter[]> {
        const allCharacters = await this.getAllCharacters();
        const usedCharacters = await this.usageStore.getUsed();
        const usedKeys = usedCharacters.map(ch => ch.codePoint);

        return allCharacters
            .filter(ch => usedKeys.contains(ch.codePoint))
            .map(character => ({
                ...usedCharacters.find(usage => usage.codePoint === character.codePoint)!,
                ...character,
            }));
    }

    public async getSorted(): Promise<QMaybeUsedCharacter[]> {
        const allCharacters = await this.getAllCharacters();
        const usedCharacters = await this.usageStore.getUsed();

        const maybeUsedChars = allCharacters
            .map(character => ({
                ...usedCharacters.find(usage => usage.codePoint === character.codePoint),
                ...character,
            }))
            .sort((a, b) => qCompareCharacters(a, b))
        ;

        return maybeUsedChars;

        /*const mostRecent = qMostRecentlyUsed(usedCharacters).last();
        const mostRecentCutoff = mostRecent == null ? 0 : new Date(mostRecent.lastUsed).valueOf();
		const averageUsageCount = qAverageUseCount(usedCharacters);*/
    }

	public recordUsage(key: QCharacterKey): Promise<QUsageInfo> {
        const timestamp = (new Date()).toJSON()

		return this.usageStore.updateCharacter(key, (current) => ({
            ...current,
            firstUsed: current.firstUsed ?? timestamp,
            lastUsed: timestamp,
            useCount: (current.useCount ?? 0) + 1,
        }))
	}
}

