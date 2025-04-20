import {DataFragmentManager} from "./dataFragmentManager";
import {DataEvent, MetaFragment} from "../../../libraries/types/savedata/nieuw/metaFragment";
import {CURRENT_VERSION, SaveDataVersion} from "../../../libraries/types/savedata/oud/saveDataVersion";
import {isTypeMetaFragment} from "../../../libraries/helpers/nieuw/isTypeSaveData";

export class MetaDataManager implements DataFragmentManager<MetaFragment> {
    private readonly dataVersions1 = new Set<SaveDataVersion>(
        ["0.4.0"
        , "0.5.0"
        , "0.6.0"
        , "0.6.1-NEXT"
        ]);

    async initSkeleton(rawData: any): Promise<MetaFragment> {
        return isTypeMetaFragment(rawData)
            ? rawData
            : {
                initialized: false,
                version: CURRENT_VERSION,
                events: []
            };
    }

    async initData(dataSkeleton: MetaFragment): Promise<MetaFragment> {
        if (dataSkeleton.initialized) {
            return dataSkeleton;
        }

        return {
            ...dataSkeleton,
            initialized: true,
            version: CURRENT_VERSION,
            events: []
        };
    }

    async updateData(parsedData: MetaFragment, _: Set<DataEvent>): Promise<MetaFragment> {
        if (this.dataVersions1.has(parsedData.version)) {
            return parsedData;
        }

        return parsedData;
    }

}
