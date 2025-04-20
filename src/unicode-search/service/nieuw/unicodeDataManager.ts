import {DataFragmentManager} from "./dataFragmentManager";
import {UnicodeFragment} from "../../../libraries/types/savedata/nieuw/unicodeFragment";
import {CURRENT_VERSION, SaveDataVersion} from "../../../libraries/types/savedata/oud/saveDataVersion";
import {
    isCodepointKey
} from "../../../libraries/helpers/nieuw/isTypeSaveData";
import {CharacterDownloader} from "../characterDownloader";
import {DataEvent} from "../../../libraries/types/savedata/nieuw/metaFragment";
import {DataFragment} from "../../../libraries/types/savedata/nieuw/dataFragment";
import {UnicodeCodepoint} from "../../../libraries/types/codepoint/codepoint";

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

    async initData(fragment: DataFragment): Promise<UnicodeFragment> {
        /* TODO [NEXT]: Check if filter was modified?? */
        if (fragment.initialized && isUnicodeFragment(fragment)) {
            console.info("Unicode code point data already initialized");
            return fragment;
        }

        /* TODO [NEXT]: downloading should be done from an event! */
        console.info("Downloading character database");

        const codepoints = await this.ucdService.download();

        /* TODO: Satisfy filter through downloading?? */
        //await this.dataStore.setFilterSatisfied(true);

        return {
            ...fragment,
            initialized: true,
            version: CURRENT_VERSION,
            codepoints: codepoints,
        };
    }

    async updateData(fragment: UnicodeFragment, events: Set<DataEvent>): Promise<UnicodeFragment> {
        const data = this.updateByVersion(fragment);
        /* TODO [NEXT]: downloading should be done from an event! */
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

export function isUnicodeFragment(fragment: DataFragment): fragment is UnicodeFragment {
    return "codepoints" in fragment
        && fragment.codepoints != null
        && Array.isArray(fragment.codepoints)
        && fragment.codepoints.every(isUnicodeCodepoint)
        ;
}

function isUnicodeCodepoint(object: any): object is UnicodeCodepoint {
    return isCodepointKey(object)

        && "name" in object
        && object.name != null
        && typeof object.name === "string"

        && "category" in object
        && object.category != null
        && typeof object.category === "string"
        ;
}

