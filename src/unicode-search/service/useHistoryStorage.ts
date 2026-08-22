import type {UseHistoryStore} from "./useHistoryStore";
import type {CharacterKey} from "../../libraries/types/codePoint/character";
import {parseUseRecord} from "../../libraries/helpers/parseUseRecord";
import {serializeUseRecord} from "../../libraries/helpers/serializeUseRecord";
import type {RootDataStore} from "./rootDataStore";
import type {UseHistoryChunk} from "../../libraries/types/savedata/useHistoryChunk";

import type {CodePointUse} from "../../libraries/types/codePoint/extension";
import type {UseRecord} from "../../libraries/types/savedata/useRecord";

export class UseHistoryStorage implements UseHistoryStore {
    constructor(private readonly store: RootDataStore) {
    }

    async upsert(
        key: CharacterKey,
        apply: (char?: UseRecord) => UseRecord,
    ): Promise<CodePointUse> {
        const data = await this.getUsed();

        const foundIndex = data.findIndex((ch) => ch.id === key);
        const found = foundIndex >= 0;
        const index = found ? foundIndex : 0;

        const modified = {
            ...apply(found ? {...data[index]} : undefined),
            id: key,
        };

        if (found) {
            data[foundIndex] = modified;
        } else {
            data.unshift(modified);
        }

        await this.overwriteUsageData(data);

        return data[index];
    }

    async getUsed(): Promise<CodePointUse[]> {
        return (await this.store.getUseHistory()).codePoints.map(parseUseRecord);
    }

    private async overwriteUsageData(
        data: CodePointUse[],
    ): Promise<CodePointUse[]> {
        const newData = await this.mergeUsage({
            codePoints: data.map(serializeUseRecord),
        });

        return newData.codePoints.map(parseUseRecord);
    }

    private async mergeUsage(
        data: Partial<UseHistoryChunk>,
    ): Promise<UseHistoryChunk> {
        const storedData = await this.store.getUseHistory();

        const newData = {
            ...storedData,
            ...data,
        };

        return await this.store.overwriteUseHistory(newData);
    }
}
