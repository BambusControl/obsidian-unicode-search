import {DataPartManager} from "./dataPartManager";
import {UnicodeDataNew} from "../../../libraries/types/savedata/nieuw/unicodeDataNew";
import {CURRENT_VERSION} from "../../../libraries/types/savedata/oud/saveData";
import {isTypeFavoritesDataNew, isTypeUnicodeDataNew} from "../../../libraries/helpers/nieuw/isTypeSaveDataNew";

export class UnicodeDataManager implements DataPartManager<UnicodeDataNew> {
    async initSkeleton(loadedData: any): Promise<UnicodeDataNew> {
        return isTypeUnicodeDataNew(loadedData)
            ? loadedData
            : {
                initialized: false,
                version: CURRENT_VERSION,
                codepoints: [],
            };
    }

    initData(): Promise<UnicodeDataNew> {
        return {
            initialized: true,
            version: CURRENT_VERSION,
            codepoints: [],
        };
    }

    updateData(): Promise<UnicodeDataNew> {
        throw new Error("Method not implemented.");
    }

    verifyData(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}
