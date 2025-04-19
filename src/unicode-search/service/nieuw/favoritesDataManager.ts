import {DataPartManager} from "./dataPartManager";
import {FavoritesDataNew} from "../../../libraries/types/savedata/nieuw/favoritesDataNew";
import {CURRENT_VERSION, SaveDataVersion} from "../../../libraries/types/savedata/oud/saveData";
import {isTypeFavoritesDataNew} from "../../../libraries/helpers/nieuw/isTypeSaveDataNew";
import {DataEvent} from "../../../libraries/types/savedata/nieuw/metaDataNew";

export class FavoritesDataManager implements DataPartManager<FavoritesDataNew> {
    private readonly dataVersions1 = new Set<SaveDataVersion>(
    [ "0.4.0"
    , "0.5.0"
    , "0.6.0"
    , "0.6.1-NEXT"
    ])

    async initSkeleton(rawData: any): Promise<T> {
        return isTypeFavoritesDataNew(rawData)
            ? rawData
            : {
                initialized: false,
                version: CURRENT_VERSION,
                codepoints: [],
            };
    }

    async initData(dataSkeleton: T): Promise<T> {
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

    async updateData(parsedData: T, events: Set<DataEvent>): Promise<T> {
        if (this.dataVersions1.has(parsedData.version)) {
            return parsedData;
        }

        // No data version
        return parsedData;
    }

}
