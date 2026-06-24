import {ChunkHandler} from "./chunkHandler";
import {DataEvent, isDataEvent, MetaChunk} from "../../libraries/types/savedata/metaChunk";
import {CURRENT_PLUGIN_VERSION} from "../../libraries/types/savedata/version";
import {DataChunk} from "../../libraries/types/savedata/dataChunk";

export class MetaChunkHandler implements ChunkHandler<MetaChunk> {
    initData(fragment: DataChunk): MetaChunk {
        if (fragment.initialized && isMetaChunk(fragment)) {
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

    async updateData(fragment: MetaChunk, _: Set<DataEvent>): Promise<MetaChunk> {
        /* No-op yet */
        return fragment;
    }

}

function isMetaChunk(fragment: DataChunk): fragment is MetaChunk {
    return "events" in fragment
        && fragment.events != null
        && Array.isArray(fragment.events)
        && fragment.events.every(e => isDataEvent(e))
        ;
}
