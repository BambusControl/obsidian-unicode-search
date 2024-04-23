import {RootDataStore} from "../qRootDataStore";
import {UsageStore} from "../QUsageStore";
import {CharacterKey} from "../../../libraries/types/qCharacter";
import {CodepointStore} from "../QCodepointStore";
import {UsageData} from "../../../libraries/types/data/QUsageData";
import {Usage} from "../../../libraries/types/data/QUsage";
import {UsageInfo} from "../../../libraries/types/qUsageInfo";

export class QtUsageStore implements UsageStore {

    constructor(
        private readonly store: RootDataStore,
        private readonly codepointStore: CodepointStore,
    ) {
    }

    async updateCharacter(
        key: CharacterKey,
        apply: (char: UsageInfo) => UsageInfo
    ): Promise<UsageData>
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

    async getUsed(): Promise<UsageData[]> {
        return (await this.getData()).filter(char => char.useCount > 0);
    }

    private async getData(): Promise<UsageData[]> {
        return (await this.store.getUsage()).codepoints;
    }

    private async overwriteUsageData(data: UsageData[]): Promise<UsageData[]> {
        return (await this.mergeUsage({
            codepoints: data
        })).codepoints
    }

    private async mergeUsage(data: Partial<Usage>): Promise<Usage> {
        const storedData = await this.store.getUsage();

        const newData = {
            ...storedData,
            ...data
        };

        return await this.store.saveUsage(newData);
    }
}
