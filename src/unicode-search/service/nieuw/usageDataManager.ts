import {DataPartManager} from "./dataPartManager";
import {UsageDataNew} from "../../../libraries/types/savedata/nieuw/usageDataNew";
import {CURRENT_VERSION, SaveDataVersion} from "../../../libraries/types/savedata/oud/saveData";
import {isTypeUsageDataNew} from "../../../libraries/helpers/nieuw/isTypeSaveDataNew";

export class UsageDataManager implements DataPartManager<UsageDataNew> {
    private readonly dataVersions1 = new Set<SaveDataVersion>(
    [ "0.4.0"
    , "0.5.0"
    , "0.6.0"
    , "0.6.1-NEXT"
    ])

    async initSkeleton(loadedData: any): Promise<UsageDataNew> {
        return isTypeUsageDataNew(loadedData)
            ? loadedData
            : {
                initialized: false,
                version: CURRENT_VERSION,
                codepoints: [],
            };
    }

    async initData(dataSkeleton: UsageDataNew): Promise<UsageDataNew> {
        if (dataSkeleton.initialized) {
            return dataSkeleton;
        }

        return {
            ...dataSkeleton,
            initialized: true,
            version: CURRENT_VERSION,
            codepoints: [],
        };
    }

    async updateData(parsedData: UsageDataNew): Promise<UsageDataNew> {
        if (this.dataVersions1.has(parsedData.version)) {
            return parsedData;
        }

        // No data version
        return parsedData;
    }

}
