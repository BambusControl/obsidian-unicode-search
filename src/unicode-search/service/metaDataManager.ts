import {DataFragmentManager} from "./dataFragmentManager";
import {DataEvent, isDataEvent, MetaFragment} from "../../libraries/types/savedata/metaFragment";
import {CURRENT_PLUGIN_VERSION, SaveDataVersion} from "../../libraries/types/savedata/version";
import {DataFragment} from "../../libraries/types/savedata/dataFragment";

export class MetaDataManager implements DataFragmentManager<MetaFragment> {
    initData(fragment: DataFragment): MetaFragment {
        if (fragment.initialized && isMetaFragment(fragment)) {
            return fragment;
        }

        console.info("Initializing metadata");

        return {
            ...fragment,
            pluginVersion: CURRENT_PLUGIN_VERSION,
            initialized: true,
            events: [],
        };
    }

    async updateData(fragment: MetaFragment, _: Set<DataEvent>): Promise<MetaFragment> {
        /* No-op yet */
        return fragment;
    }

}

function isMetaFragment(fragment: DataFragment): fragment is MetaFragment {
    return "events" in fragment
        && fragment.events != null
        && Array.isArray(fragment.events)
        && fragment.events.every(e => isDataEvent(e))
        ;
}
