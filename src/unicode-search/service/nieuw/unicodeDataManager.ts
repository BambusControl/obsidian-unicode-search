import {DataPartManager} from "./dataPartManager";
import {UnicodeDataNew} from "../../../libraries/types/savedata/nieuw/unicodeDataNew";
import {CURRENT_VERSION, SaveDataVersion} from "../../../libraries/types/savedata/oud/saveData";
import {isTypeUnicodeDataNew} from "../../../libraries/helpers/nieuw/isTypeSaveDataNew";
import {CharacterDownloader} from "../characterDownloader";

export class UnicodeDataManager implements DataPartManager<UnicodeDataNew> {
    private readonly dataVersions1 = new Set<SaveDataVersion>(
    [ "0.4.0"
    , "0.5.0"
    , "0.6.0"
    , "0.6.1-NEXT"
    ])

    constructor(
        private readonly ucdService: CharacterDownloader,
    ) {
    }

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
        /* TODO: Check if filter was modified?? */
        console.info({dataSkeleton})
        console.info(dataSkeleton.initialized)

        if (dataSkeleton.initialized) {
            console.info("Unicode code point data already initialized");
            return dataSkeleton;
        }

        console.info("Downloading character database");

        const codepoints = await this.ucdService.download();

        /* TODO: Satisfy filter through downloading?? */
        //await this.dataStore.setFilterSatisfied(true);

        return {
            ...dataSkeleton,
            initialized: true,
            version: CURRENT_VERSION,
            codepoints: codepoints,
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
