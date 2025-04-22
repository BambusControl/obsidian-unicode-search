import {UsageStore} from "./usageStore";
import {CharacterKey} from "../../libraries/types/codepoint/character";
import {parseUsageInfo} from "../../libraries/helpers/parseUsageInfo";
import {serializeUsageInfo} from "../../libraries/helpers/serializeUsageInfo";
import {RootDataStore} from "./rootDataStore";
import {UsageFragment} from "../../libraries/types/savedata/usageFragment";

import {CodepointParsedUsage} from "../../libraries/types/codepoint/extension";
import {ParsedUsageInfo} from "../../libraries/types/savedata/usageInfo";

export class CodepointUsageStorage implements UsageStore {

    constructor(
        private readonly store: RootDataStore,
    ) {
    }

    async upsert(
        key: CharacterKey,
        apply: (char?: ParsedUsageInfo) => ParsedUsageInfo
    ): Promise<CodepointParsedUsage>
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

    async getUsed(): Promise<CodepointParsedUsage[]> {
        return (await this.store.getUsage())
            .codepoints
            .map(parseUsageInfo)
    }

    private async overwriteUsageData(data: CodepointParsedUsage[]): Promise<CodepointParsedUsage[]> {
        const newData = await this.mergeUsage({
            codepoints: data.map(serializeUsageInfo),
        });

        return newData.codepoints.map(parseUsageInfo)
    }

    private async mergeUsage(data: Partial<UsageFragment>): Promise<UsageFragment> {
        const storedData = await this.store.getUsage();

        const newData = {
            ...storedData,
            ...data
        };

        return await this.store.overwriteUsage(newData);
    }
}
