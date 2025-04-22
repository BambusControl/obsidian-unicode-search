import {DataFragmentManager} from "./dataFragmentManager";
import {DataEvent, isDataEvent, MetaFragment} from "../../libraries/types/savedata/metaFragment";
import {SaveDataVersion} from "../../libraries/types/savedata/saveDataVersion";import {DataFragment} from "../../libraries/types/savedata/dataFragment";

export class MetaDataManager implements DataFragmentManager<MetaFragment> {
    private readonly dataVersions1 = new Set<SaveDataVersion>(
        ["0.4.0"
        , "0.5.0"
        , "0.6.0"
        , "0.6.1-NEXT"
        ]);

    initData(fragment: DataFragment): MetaFragment {
        if (fragment.initialized && isMetaFragment(fragment)) {
            return fragment;
        }

        return {
            ...fragment,
            initialized: true,
            events: []
        };
    }

    async updateData(fragment: MetaFragment, events: Set<DataEvent>): Promise<MetaFragment> {
        if (this.dataVersions1.has(fragment.version)) {
            return fragment;
        }

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
