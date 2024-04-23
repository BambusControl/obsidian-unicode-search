import {QRootDataStore} from "../qRootDataStore";
import {QUsageStore} from "../QUsageStore";
import {QCharacterKey, QUsedCharacter} from "../../../libraries/types/qCharacter";
import {QCodePointStore} from "../QCodePointStore";
import {QUsageData} from "../../../libraries/types/data/QUsageData";
import {QUsage} from "../../../libraries/types/data/QUsage";
import {QUsageInfo} from "../../../libraries/types/qUsageInfo";

export class QtUsageStore implements QUsageStore {

    constructor(
        private readonly store: QRootDataStore,
        private readonly codePointStore: QCodePointStore,
    ) {
    }

    async updateCharacter(
        key: QCharacterKey,
        apply: (char: QUsageInfo) => QUsageInfo
    ): Promise<QUsageData>
    {
        const data = await this.getData();

        const foundIndex = data.findIndex(ch => ch.codePoint === key)
        const index = foundIndex < 0 ? 0 : foundIndex;

        const modifiedUsage = apply({...data[index]});

        data[index] = {
            ...modifiedUsage,
            codePoint: key,
        };

        await this.overwriteUsageData(data)

        return data[index];
    }

    async getUsed(): Promise<QUsageData[]> {
        return (await this.getData()).filter(char => char.useCount > 0);
    }

    private async getData(): Promise<QUsageData[]> {
        return (await this.store.getUsage()).codepoints;
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
