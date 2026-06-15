import {UsageStore} from "./usageStore";
import {CharacterKey} from "../../libraries/types/codepoint/character";
import {DexieDb} from "./dexieDb";

import {CodepointUse} from "../../libraries/types/codepoint/extension";
import {UsageInfo} from "../../libraries/types/savedata/usageInfo";

export class CodepointUsageStorage implements UsageStore {

    constructor(
        private readonly db: DexieDb,
    ) {
    }

    async upsert(
        key: CharacterKey,
        apply: (char?: UsageInfo) => UsageInfo
    ): Promise<CodepointUse>
    {
        const data = await this.getUsed();

        const foundIndex = data.findIndex(ch => ch.id === key);
        const found = foundIndex >= 0;
        const index = found ? foundIndex : 0;

        const modified = {
            ...apply(found ? {...data[index]} : undefined),
            id: key,
        };

        if (found) {
            data[foundIndex] = modified
        } else {
            data.unshift(modified)
        }

        await this.overwriteUsageData(data)

        return data[index];
    }

    async getUsed(): Promise<CodepointUse[]> {
        return this.db.usage.toArray();
    }

    private async overwriteUsageData(data: CodepointUse[]): Promise<void> {
        await this.db.usage.clear();
        await this.db.usage.bulkAdd(data);
    }
}
