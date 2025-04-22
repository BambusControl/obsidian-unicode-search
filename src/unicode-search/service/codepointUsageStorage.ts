import {UsageStore} from "./usageStore";
import {CharacterKey} from "../../libraries/types/codepoint/character";
import {parseUsageInfo} from "../../libraries/helpers/parseUsageInfo";
import {serializeUsageInfo} from "../../libraries/helpers/serializeUsageInfo";
import {RootDataStore} from "./rootDataStore";
import {CharacterUseFragment} from "../../libraries/types/savedata/usageFragment";

import {CodepointUse} from "../../libraries/types/codepoint/extension";
import {UsageInfo} from "../../libraries/types/savedata/usageInfo";

export class CodepointUsageStorage implements UsageStore {

    constructor(
        private readonly store: RootDataStore,
    ) {
    }

    async upsert(
        key: CharacterKey,
        apply: (char?: UsageInfo) => UsageInfo
    ): Promise<CodepointUse>
    {
        const data = await this.getUsed();

        const foundIndex = data.findIndex(ch => ch.codepoint === key);
        const found = foundIndex >= 0;
        const index = found ? foundIndex : 0;

        const modified = {
            ...apply(found ? {...data[index]} : undefined),
            codepoint: key,
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
        return (await this.store.getUsage())
            .codepoints
            .map(parseUsageInfo)
    }

    private async overwriteUsageData(data: CodepointUse[]): Promise<CodepointUse[]> {
        const newData = await this.mergeUsage({
            codepoints: data.map(serializeUsageInfo),
        });

        return newData.codepoints.map(parseUsageInfo)
    }

    private async mergeUsage(data: Partial<CharacterUseFragment>): Promise<CharacterUseFragment> {
        const storedData = await this.store.getUsage();

        const newData = {
            ...storedData,
            ...data
        };

        return await this.store.overwriteUsage(newData);
    }
}
