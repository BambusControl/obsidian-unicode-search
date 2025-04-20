import {DataFragmentManager} from "./dataFragmentManager";
import {UsageFragment} from "../../../libraries/types/savedata/nieuw/usageFragment";
import {SaveDataVersion} from "../../../libraries/types/savedata/oud/saveDataVersion";
import {isCodepointKey} from "../../../libraries/helpers/nieuw/isTypeSaveData";
import {DataEvent} from "../../../libraries/types/savedata/nieuw/metaFragment";
import {DataFragment} from "../../../libraries/types/savedata/nieuw/dataFragment";
import {CodepointUsage} from "../../../libraries/types/savedata/oud/codepoint";

export class UsageDataManager implements DataFragmentManager<UsageFragment> {
    private readonly dataVersions1 = new Set<SaveDataVersion>(
    [ "0.4.0"
    , "0.5.0"
    , "0.6.0"
    , "0.6.1-NEXT"
    ])

    initData(fragment: DataFragment): UsageFragment {
        if (fragment.initialized && isUsageFragment(fragment)) {
            return fragment;
        }

        return {
            ...fragment,
            initialized: true,
            codepoints: [],
        };
    }

    async updateData(fragment: UsageFragment, events: Set<DataEvent>): Promise<UsageFragment> {
        if (this.dataVersions1.has(fragment.version)) {
            return fragment;
        }

        // No data version
        return fragment;
    }

}

function isUsageFragment(fragment: DataFragment): fragment is UsageFragment {
    return "codepoints" in fragment
        && fragment.codepoints != null
        && Array.isArray(fragment.codepoints)
        && fragment.codepoints.every(isCodepointUsage)
        ;
}
function isCodepointUsage(object: any): object is CodepointUsage {
    return isCodepointKey(object)

        && "firstUsed" in object
        && object.firstUsed != null
        && typeof object.firstUsed === "string"

        && "lastUsed" in object
        && object.lastUsed != null
        && typeof object.lastUsed === "string"

        && "useCount" in object
        && object.useCount != null
        && typeof object.useCount === "number"
}

