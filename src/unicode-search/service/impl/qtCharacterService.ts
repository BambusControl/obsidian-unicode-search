import {UnicodeSearchError} from "../../errors/unicodeSearchError";
import {
    QCharacter,
    QCharacterKey,
    QUsedCharacter
} from "../../../libraries/types/qCharacter";
import {QCodePointStore} from "../QCodePointStore";
import {QCharacterService} from "../QCharacterService";
import {QUsageStore} from "../QUsageStore";

export class QtCharacterService implements QCharacterService {

	public constructor(
        private readonly codePointStore: QCodePointStore,
        private readonly usageStore: QUsageStore,
	) {
	}

    public async getOne(key: QCharacterKey): Promise<QCharacter> {
        const characters = await this.getAll();
        const char = characters.find(char => char.codePoint === key);

		if (char == null) {
			throw new UnicodeSearchError(`No character '${key}' exists.`);
		}

        return char;
    }

	public getAll(): Promise<QCharacter[]> {
        return this.codePointStore.getCharacters();
	}

    public async getUsed(): Promise<QUsedCharacter[]> {
        return (await this.getAll())
            .filter(char => char.useCount != null && char.lastUsed != null)
            .map(char => char as QUsedCharacter);
    }

	public recordUsage(key: QCharacterKey): Promise<QUsedCharacter> {
        const timestamp = (new Date()).toJSON()

		return this.usageStore.updateCharacter<QUsedCharacter>(key, (current) => ({
            ...current,
            firstUsed: current.firstUsed ?? timestamp,
            lastUsed: timestamp,
            useCount: (current.useCount ?? 0) + 1,
        }))
	}
}

