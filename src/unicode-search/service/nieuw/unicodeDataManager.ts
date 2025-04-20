import {DataFragmentManager} from "./dataFragmentManager";
import {UnicodeFragment} from "../../../libraries/types/savedata/nieuw/unicodeFragment";
import {CURRENT_VERSION, SaveDataVersion} from "../../../libraries/types/savedata/oud/saveDataVersion";
import {isTypeUnicodeFragment} from "../../../libraries/helpers/nieuw/isTypeSaveData";
import {CharacterDownloader} from "../characterDownloader";
import {DataEvent} from "../../../libraries/types/savedata/nieuw/metaFragment";

export class UnicodeDataManager implements DataFragmentManager<UnicodeFragment> {
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

    async initSkeleton(rawData: any): Promise<UnicodeFragment> {
        return isTypeUnicodeFragment(rawData)
            ? rawData
            : {
                initialized: false,
                version: CURRENT_VERSION,
                codepoints: [],
            };
    }

    async initData(dataSkeleton: UnicodeFragment): Promise<UnicodeFragment> {
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

    async updateData(parsedData: UnicodeFragment, events: Set<DataEvent>): Promise<UnicodeFragment> {
        const data = this.updateByVersion(parsedData);



        return data;
    }

    private updateByVersion(data: UnicodeFragment): UnicodeFragment {
        if (this.dataVersions1.has(data.version)) {
            return data;
        }

        // No data version
        return data;
    }
}
