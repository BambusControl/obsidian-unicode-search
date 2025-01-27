import {DataPartManager} from "./dataPartManager";
import {FavoritesDataNew} from "../../../libraries/types/savedata/nieuw/favoritesDataNew";
import {initializationData} from "../../../libraries/data/oud/initializationData";
import {CURRENT_VERSION} from "../../../libraries/types/savedata/oud/saveData";
import {isTypeFavoritesDataNew} from "../../../libraries/helpers/nieuw/isTypeSaveDataNew";

export class FavoritesDataManager implements DataPartManager<FavoritesDataNew> {
    async initSkeleton(loadedData: any): Promise<FavoritesDataNew> {
        return isTypeFavoritesDataNew(loadedData)
            ? loadedData
            : {
                initialized: false,
                version: CURRENT_VERSION,
                codepoints: [],
            };
    }

    initData(): Promise<FavoritesDataNew> {
        return {
            initialized: true,
            version: CURRENT_VERSION,
            codepoints: [],
        };
    }

    updateData(): Promise<FavoritesDataNew> {
        throw new Error("Method not implemented.");
    }

    verifyData(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}
