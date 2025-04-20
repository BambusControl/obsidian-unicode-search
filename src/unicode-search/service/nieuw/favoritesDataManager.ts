import {DataFragmentManager} from "./dataFragmentManager";
import {FavoritesFragment} from "../../../libraries/types/savedata/nieuw/favoritesFragment";
import {CURRENT_VERSION, SaveDataVersion} from "../../../libraries/types/savedata/oud/saveDataVersion";
import {isTypeFavoritesFragment} from "../../../libraries/helpers/nieuw/isTypeSaveData";
import {DataEvent} from "../../../libraries/types/savedata/nieuw/metaFragment";

export class FavoritesDataManager implements DataFragmentManager<FavoritesFragment> {
    private readonly dataVersions1 = new Set<SaveDataVersion>(
    [ "0.4.0"
    , "0.5.0"
    , "0.6.0"
    , "0.6.1-NEXT"
    ])

    async initSkeleton(rawData: any): Promise<FavoritesFragment> {
        return isTypeFavoritesFragment(rawData)
            ? rawData
            : {
                initialized: false,
                version: CURRENT_VERSION,
                codepoints: [],
            };
    }

    async initData(dataSkeleton: FavoritesFragment): Promise<FavoritesFragment> {
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

    async updateData(parsedData: FavoritesFragment, events: Set<DataEvent>): Promise<FavoritesFragment> {
        if (this.dataVersions1.has(parsedData.version)) {
            return parsedData;
        }

        // No data version
        return parsedData;
    }

}
