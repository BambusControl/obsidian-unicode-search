import {ChunkHandler} from "./chunkHandler";
import {FavoriteChunk} from "../../libraries/types/savedata/favoriteChunk";
import {CURRENT_DATA_VERSION} from "../../libraries/types/savedata/version";
import {DataEvent} from "../../libraries/types/savedata/metaChunk";
import {DataChunk} from "../../libraries/types/savedata/dataChunk";

export class FavoriteChunkHandler implements ChunkHandler<FavoriteChunk> {
    initData(fragment: DataChunk): FavoriteChunk {
        if (fragment.initialized && isFavoriteChunk(fragment)) {
            return fragment;
        }

        console.info("Initializing favorites");

        return {
            ...fragment,
            initialized: true,
            version: CURRENT_DATA_VERSION,
            codePoints: [],
        };
    }

    async updateData(fragment: FavoriteChunk, _: Set<DataEvent>): Promise<FavoriteChunk> {
        /* No-op yet */
        return fragment;
    }

}

function isFavoriteChunk(fragment: DataChunk): fragment is FavoriteChunk {
    return "codePoints" in fragment
        && Array.isArray(fragment.codePoints)
        ;
}
