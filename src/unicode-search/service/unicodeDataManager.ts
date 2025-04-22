import {DataFragmentManager} from "./dataFragmentManager";
import {UnicodeFragment} from "../../libraries/types/savedata/unicodeFragment";
import {SaveDataVersion} from "../../libraries/types/savedata/version";
import {isCodepointKey} from "../../libraries/helpers/isTypeSaveData";
import {CharacterDownloader} from "./characterDownloader";
import {DataEvent} from "../../libraries/types/savedata/metaFragment";
import {DataFragment} from "../../libraries/types/savedata/dataFragment";
import {UnicodeCodepoint} from "../../libraries/types/codepoint/unicode";

export class UnicodeDataManager implements DataFragmentManager<UnicodeFragment> {
    constructor(
        private readonly ucdService: CharacterDownloader,
    ) {
    }

    initData(fragment: DataFragment): UnicodeFragment {
        if (fragment.initialized && isUnicodeFragment(fragment)) {
            return fragment;
        }

        console.info("Initializing characters");

        return {
            ...fragment,
            initialized: true,
            codepoints: [],
        };
    }

    async updateData(fragment: UnicodeFragment, events: Set<DataEvent>): Promise<UnicodeFragment> {
        const updatedData = this.updateByVersion(fragment);
        const downloadRequested = events.has(DataEvent.DownloadCharacters);
        const emptyCharacterSet = fragment.codepoints.length < 1;

        if (!(downloadRequested || emptyCharacterSet)) {
            return updatedData;
        }

        console.info("Downloading character database");
        const codepoints = await this.ucdService.download();

        /* Yeah, we modify the input parameter */
        events.delete(DataEvent.DownloadCharacters);

        return {
            ...updatedData,
            codepoints: codepoints,
        };
    }

    private updateByVersion(fragment: UnicodeFragment): UnicodeFragment {
        /* No-op yet */
        return fragment;
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

