import {DataFragmentManager} from "./dataFragmentManager";
import {UsageFragment} from "../../../libraries/types/savedata/nieuw/usageFragment";
import {CURRENT_VERSION, SaveDataVersion} from "../../../libraries/types/savedata/oud/saveDataVersion";
import {isTypeUsageFragment} from "../../../libraries/helpers/nieuw/isTypeSaveData";
import {DataEvent} from "../../../libraries/types/savedata/nieuw/metaFragment";

export class UsageDataManager implements DataFragmentManager<UsageFragment> {
    private readonly dataVersions1 = new Set<SaveDataVersion>(
    [ "0.4.0"
    , "0.5.0"
    , "0.6.0"
    , "0.6.1-NEXT"
    ])

    async initSkeleton(rawData: any): Promise<UsageFragment> {
        return isTypeUsageFragment(rawData)
            ? rawData
            : {
                initialized: false,
                version: CURRENT_VERSION,
                codepoints: [],
            };
    }

    async initData(dataSkeleton: UsageFragment): Promise<UsageFragment> {
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

    async updateData(parsedData: UsageFragment, events: Set<DataEvent>): Promise<UsageFragment> {
        if (this.dataVersions1.has(parsedData.version)) {
            return parsedData;
        }

        // No data version
        return parsedData;
    }

}
