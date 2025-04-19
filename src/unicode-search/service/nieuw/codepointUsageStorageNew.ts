import {UsageStore} from "../usageStore";
import {CharacterKey} from "../../../libraries/types/codepoint/character";
import {
    UsageData
} from "../../../libraries/types/savedata/oud/usageData";
import {parseUsageInfo} from "../../../libraries/helpers/oud/parseUsageInfo";
import {serializeUsageInfo} from "../../../libraries/helpers/oud/serializeUsageInfo";
import {CodepointParsedUsage} from "../../../libraries/types/savedata/oud/codepoint";
import {ParsedUsageInfo} from "../../../libraries/types/savedata/oud/parsedUsageInfo";
import {RootDataStoreNew} from "../rootDataStoreNew";

export class CodepointUsageStorageNew implements UsageStore {

    constructor(
        private readonly store: RootDataStoreNew,
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

    private async mergeUsage(data: Partial<UsageData>): Promise<UsageData> {
        const storedData = await this.store.getUsage();

        const newData = {
            ...storedData,
            ...data
        };

        return await this.store.overwriteUsage(newData);
    }
}
