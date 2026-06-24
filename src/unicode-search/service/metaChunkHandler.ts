import {ChunkHandler} from "./chunkHandler";
import {DataEvent, isDataEvent, MetaChunk} from "../../libraries/types/savedata/metaChunk";
import {CURRENT_PLUGIN_VERSION} from "../../libraries/types/savedata/version";
import {DataChunk} from "../../libraries/types/savedata/dataChunk";

export class MetaChunkHandler implements ChunkHandler<MetaChunk> {
    initData(chunk: DataChunk): MetaChunk {
        if (chunk.initialized && isMetaChunk(chunk)) {
            return chunk;
        }

        console.info("Initializing metadata");

        return {
            ...chunk,
            pluginVersion: CURRENT_PLUGIN_VERSION,
            initialized: true,
            events: [],
        };
    }

    async updateData(chunk: MetaChunk, _: Set<DataEvent>): Promise<MetaChunk> {
        /* No-op yet */
        return chunk;
    }

}

function isMetaChunk(chunk: DataChunk): chunk is MetaChunk {
    return "events" in chunk
        && chunk.events != null
        && Array.isArray(chunk.events)
        && chunk.events.every(e => isDataEvent(e))
        ;
}
