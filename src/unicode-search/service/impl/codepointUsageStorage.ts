import {RootDataStore} from "../rootDataStore";
import {UsageStore} from "../usageStore";
import {CharacterKey} from "../../../libraries/types/codepoint/character";
import {CodepointStore} from "../codePointStore";
import {CodepointUsage, UsageData, UsageInfo} from "../../../libraries/types/savedata/usageData";

export class CodepointUsageStorage implements UsageStore {

    constructor(
        private readonly store: RootDataStore,
        private readonly codepointStore: CodepointStore,
    ) {
    }

    async updateCharacter(
        key: CharacterKey,
        apply: (char: UsageInfo) => UsageInfo
    ): Promise<CodepointUsage>
    {
        const data = await this.getData();

        const foundIndex = data.findIndex(ch => ch.codepoint === key)
        const index = foundIndex < 0 ? 0 : foundIndex;

        const modifiedUsage = apply({...data[index]});

        data[index] = {
            ...modifiedUsage,
            codepoint: key,
        };

        await this.overwriteUsageData(data)

        return data[index];
    }

    async getUsed(): Promise<CodepointUsage[]> {
        return (await this.getData()).filter(char => char.useCount > 0);
    }

    private async getData(): Promise<CodepointUsage[]> {
        return (await this.store.getUsage()).codepoints;
    }

    private async overwriteUsageData(data: CodepointUsage[]): Promise<CodepointUsage[]> {
        return (await this.mergeUsage({
            codepoints: data
        })).codepoints
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
