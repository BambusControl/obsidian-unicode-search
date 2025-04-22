import {DataFragmentManager} from "./dataFragmentManager";
import {CharacterUseFragment} from "../../libraries/types/savedata/usageFragment";
import {SaveDataVersion} from "../../libraries/types/savedata/version";
import {isCodepointKey} from "../../libraries/helpers/isTypeSaveData";
import {DataEvent} from "../../libraries/types/savedata/metaFragment";
import {DataFragment} from "../../libraries/types/savedata/dataFragment";


import {RawCodepointUse} from "../../libraries/types/codepoint/extension";

export class UsageDataManager implements DataFragmentManager<CharacterUseFragment> {
    initData(fragment: DataFragment): CharacterUseFragment {
        if (fragment.initialized && isUsageFragment(fragment)) {
            return fragment;
        }

        console.info("Initializing usage");

        return {
            ...fragment,
            initialized: true,
            codepoints: [],
        };
    }

    async updateData(fragment: CharacterUseFragment, _: Set<DataEvent>): Promise<CharacterUseFragment> {
        /* No-op yet */
        return fragment;
    }

}

function isUsageFragment(fragment: DataFragment): fragment is CharacterUseFragment {
    return "codepoints" in fragment
        && fragment.codepoints != null
        && Array.isArray(fragment.codepoints)
        && fragment.codepoints.every(isCodepointUsage)
        ;
}

function isCodepointUsage(object: any): object is RawCodepointUse {
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
