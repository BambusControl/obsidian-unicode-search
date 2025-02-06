import {DataPartManager} from "./dataPartManager";
import {UnicodeDataNew} from "../../../libraries/types/savedata/nieuw/unicodeDataNew";
import {CURRENT_VERSION, SaveDataVersion} from "../../../libraries/types/savedata/oud/saveData";
import {isTypeFavoritesDataNew, isTypeUnicodeDataNew} from "../../../libraries/helpers/nieuw/isTypeSaveDataNew";

export class UnicodeDataManager implements DataPartManager<UnicodeDataNew> {
    private readonly dataVersions1 = new Set<SaveDataVersion>(
    [ "0.4.0"
    , "0.5.0"
    , "0.6.0"
    , "0.6.1-NEXT"
    ])

    async initSkeleton(loadedData: any): Promise<UnicodeDataNew> {
        return isTypeUnicodeDataNew(loadedData)
            ? loadedData
            : {
                initialized: false,
                version: CURRENT_VERSION,
                codepoints: [],
            };
    }

    async initData(dataSkeleton: UnicodeDataNew): Promise<UnicodeDataNew> {
        if (dataSkeleton.initialized) {
            return dataSkeleton;
        }

        /* TODO: should this fetch the unicode data? */
        return {
            ...dataSkeleton,
            initialized: true,
            version: CURRENT_VERSION,
            codepoints: [],
        };
    }

    async updateData(parsedData: UnicodeDataNew): Promise<UnicodeDataNew> {
        if (this.dataVersions1.has(parsedData.version)) {
            return parsedData;
        }

        // No data version
        return parsedData;
    }

}
