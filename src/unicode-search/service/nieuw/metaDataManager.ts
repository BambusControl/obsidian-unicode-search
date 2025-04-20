import {DataFragmentManager} from "./dataFragmentManager";
import {DataEvent, isDataEvent, MetaFragment} from "../../../libraries/types/savedata/nieuw/metaFragment";
import {SaveDataVersion} from "../../../libraries/types/savedata/oud/saveDataVersion";import {DataFragment} from "../../../libraries/types/savedata/nieuw/dataFragment";

export class MetaDataManager implements DataFragmentManager<MetaFragment> {
    private readonly dataVersions1 = new Set<SaveDataVersion>(
        ["0.4.0"
        , "0.5.0"
        , "0.6.0"
        , "0.6.1-NEXT"
        ]);

    async initData(fragment: DataFragment): Promise<MetaFragment> {
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
        && fragment.events.every(isDataEvent)
        ;
}
