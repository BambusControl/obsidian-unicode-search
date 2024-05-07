import {RootDataStore} from "../rootDataStore";
import {UsageStore} from "../usageStore";
import {CharacterKey} from "../../../libraries/types/codepoint/character";
import {CodepointStore} from "../codePointStore";
import {
    CodepointParsedUsage,
    ParsedUsageInfo,
    UsageData
} from "../../../libraries/types/savedata/usageData";
import {parseUsageInfo} from "../../../libraries/helpers/parseUsageInfo";
import {serializeUsageInfo} from "../../../libraries/helpers/serializeUsageInfo";

export class CodepointUsageStorage implements UsageStore {

    constructor(
        private readonly store: RootDataStore,
    ) {
    }

    async updateCharacter(
        key: CharacterKey,
        apply: (char?: ParsedUsageInfo) => ParsedUsageInfo
    ): Promise<CodepointParsedUsage>
    {
        const data = await this.getUsed();

        const foundIndex = data.findIndex(ch => ch.codepoint === key);
        const found = foundIndex >= 0;
        const index = found ? foundIndex : 0;

        const modifiedUsage = {
            ...apply(found ? {...data[index]} : undefined),
            codepoint: key,
        };

        if (found) {
            data[foundIndex] = modifiedUsage
        } else {
            data.unshift(modifiedUsage)
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
