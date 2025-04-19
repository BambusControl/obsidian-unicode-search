import {DataPartManager} from "./dataPartManager";
import {DataEvent, MetaDataNew} from "../../../libraries/types/savedata/nieuw/metaDataNew";
import {CURRENT_VERSION, SaveDataVersion} from "../../../libraries/types/savedata/oud/saveData";
import {isTypeMetaDataNew} from "../../../libraries/helpers/nieuw/isTypeSaveDataNew";

export class MetaDataManager implements DataPartManager<MetaDataNew> {
    private readonly dataVersions1 = new Set<SaveDataVersion>(
        ["0.4.0"
        , "0.5.0"
        , "0.6.0"
        , "0.6.1-NEXT"
        ]);

    async initSkeleton(rawData: any): Promise<MetaDataNew> {
        return isTypeMetaDataNew(rawData)
            ? rawData
            : {
                initialized: false,
                version: CURRENT_VERSION,
                events: []
            };
    }

    async initData(dataSkeleton: MetaDataNew): Promise<MetaDataNew> {
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

    async updateData(parsedData: MetaDataNew, events: Set<DataEvent>): Promise<MetaDataNew> {
        if (this.dataVersions1.has(parsedData.version)) {
            return parsedData;
        }

        return parsedData;
    }

}
