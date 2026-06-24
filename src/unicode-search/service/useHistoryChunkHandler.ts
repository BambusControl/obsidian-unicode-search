import type {ChunkHandler} from "./chunkHandler";
import type {UseHistoryChunk} from "../../libraries/types/savedata/useHistoryChunk";
import {CURRENT_DATA_VERSION} from "../../libraries/types/savedata/version";
import {isCodePointKey} from "../../libraries/helpers/isTypeSaveData";
import type {DataEvent} from "../../libraries/types/savedata/metaChunk";
import type {DataChunk} from "../../libraries/types/savedata/dataChunk";


import type {RawCodePointUse} from "../../libraries/types/codePoint/extension";

export class UseHistoryChunkHandler implements ChunkHandler<UseHistoryChunk> {
    initData(chunk: DataChunk): UseHistoryChunk {
        if (chunk.initialized && isUseHistoryChunk(chunk)) {
            return chunk;
        }

        console.info("Initializing usage");

        return {
            ...chunk,
            initialized: true,
            version: CURRENT_DATA_VERSION,
            codePoints: [],
        };
    }

    async updateData(chunk: UseHistoryChunk, _: Set<DataEvent>): Promise<UseHistoryChunk> {
        if (chunk.version !== "0.7.0") {
            return chunk;
        }

        const updatedData = chunk;

        if (updatedData.version === "0.7.0") {
            /* Field names were updated */
            updatedData.codePoints = (updatedData as any).codepoints.map((codepoint: any) => ({
                id: codepoint.codepoint.codePointAt(0) ?? 0,
                firstUse: codepoint.firstUsed,
                lastUse: codepoint.lastUse,
                timesUsed: codepoint.useCount,
            }));
            updatedData.version = "0.7.3-NEXT";
        }

        return updatedData;
    }

}

function isUseHistoryChunk(chunk: DataChunk): chunk is UseHistoryChunk {
    return "codePoints" in chunk
        && chunk.codePoints != null
        && Array.isArray(chunk.codePoints)
        && chunk.codePoints.every(isCodePointUseRecord)
        ;
}

function isCodePointUseRecord(object: any): object is RawCodePointUse {
    return isCodePointKey(object)

        && "firstUse" in object
        && object.firstUse != null
        && typeof object.firstUse === "string"

        && "lastUse" in object
        && object.lastUse != null
        && typeof object.lastUse === "string"

        && "timesUsed" in object
        && object.timesUsed != null
        && typeof object.timesUsed === "number"
}
