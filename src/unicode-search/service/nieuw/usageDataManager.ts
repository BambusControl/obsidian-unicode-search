import {DataPartManager} from "./dataPartManager";
import {UsageDataNew} from "../../../libraries/types/savedata/nieuw/usageDataNew";
import {CURRENT_VERSION} from "../../../libraries/types/savedata/oud/saveData";
import {isTypeUsageDataNew} from "../../../libraries/helpers/nieuw/isTypeSaveDataNew";

export class UsageDataManager implements DataPartManager<UsageDataNew> {
    async initSkeleton(loadedData: any): Promise<UsageDataNew> {
        return isTypeUsageDataNew(loadedData)
            ? loadedData
            : {
                initialized: false,
                version: CURRENT_VERSION,
                codepoints: [],
            };
    }

    initData(): Promise<UsageDataNew> {
        return {
            initialized: true,
            version: CURRENT_VERSION,
            codepoints: [],
        };
    }

    updateData(): Promise<UsageDataNew> {
        throw new Error("Method not implemented.");
    }

    verifyData(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}
