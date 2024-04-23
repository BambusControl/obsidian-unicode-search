import {QRootDataStore} from "./qRootDataStore";
import {QUsageStore} from "./QUsageStore";
import {QCharacter, QCharacterKey, QCharacterTransform} from "../../libraries/types/qCharacter";
import {QCodePointStore} from "./QCodePointStore";
import {UnicodeSearchError} from "../errors/unicodeSearchError";
import {QUsageData} from "../../libraries/types/data/QUsageData";
import {QSaveData} from "../../libraries/types/data/QSaveData";
import {QUsage} from "../../libraries/types/data/QUsage";

export class QtUsageStore implements QUsageStore {

    constructor(
        private readonly store: QRootDataStore,
        private readonly codePointStore: QCodePointStore,
    ) {
    }

    async updateCharacter<Out>(
        key: QCharacterKey,
        apply: (char: QUsageData) => QUsageData & Out
    ): Promise<QUsageData & Out>
    {
        const currentUsage = (await this.store.getUsage()).codepoints;

        let foundIndex = currentUsage.findIndex(ch => ch.codePoint === key)
        let found = foundIndex >= 0;

        if (!found) {
            const currentChars = await this.codePointStore.getCharacters();

            foundIndex = currentChars.findIndex(ch => ch.codePoint === key)
            found = foundIndex >= 0;
        }

        if (!found) {
            throw new UnicodeSearchError(`Cannot update non-existent character '${key}' to storage`);
        }

        const newUsage = currentUsage;
        const modifiedUsage = apply({...currentUsage[foundIndex]});

        newUsage[foundIndex] = modifiedUsage;

        await this.overwriteUsageData(newUsage)

        return modifiedUsage;
    }

    private async getUsageData(): Promise<QUsage> {
        return {...await this.store.getUsage()}
    }

    private async overwriteUsageData(data: QUsageData[]): Promise<QUsageData[]> {
        return (await this.mergeUsage({
            codepoints: data
        })).codepoints
    }

    private async mergeUsage(data: Partial<QUsage>): Promise<QUsage> {
        const storedData = await this.store.getUsage();

        const newData = {
            ...storedData,
            ...data
        };

        return await this.store.saveUsage(newData);
    }
}
