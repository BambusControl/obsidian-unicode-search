import type {ChunkHandler} from "./chunkHandler";
import type {FavoriteChunk} from "../../libraries/types/savedata/favoriteChunk";
import {CURRENT_DATA_VERSION} from "../../libraries/types/savedata/version";
import type {DataEvent} from "../../libraries/types/savedata/metaChunk";
import type {DataChunk} from "../../libraries/types/savedata/dataChunk";

export class FavoriteChunkHandler implements ChunkHandler<FavoriteChunk> {
    initData(chunk: DataChunk): FavoriteChunk {
        if (chunk.initialized && isFavoriteChunk(chunk)) {
            return chunk;
        }

        console.info("Initializing favorites");

        return {
            ...chunk,
            initialized: true,
            version: CURRENT_DATA_VERSION,
            codePoints: [],
        };
    }

    async updateData(chunk: FavoriteChunk, _: Set<DataEvent>): Promise<FavoriteChunk> {
        if (chunk.version === CURRENT_DATA_VERSION) {
            /* No-op */
            return chunk;
        }

        const updatedData = chunk;

        if (updatedData.version === "0.7.0") {
            /* Field names were updated */
            updatedData.codePoints = (updatedData as any).codepoints.map((codepoint: any) => ({
                id: codepoint.codepoint.codePointAt(0) ?? 0,
                added: codepoint.added,
                quickInsertEnabled: codepoint.hotkey,
            }));
            updatedData.version = "0.7.0";
        }

        return updatedData;
    }

}

function isFavoriteChunk(chunk: DataChunk): chunk is FavoriteChunk {
    return "codePoints" in chunk
        && Array.isArray(chunk.codePoints)
        ;
}
