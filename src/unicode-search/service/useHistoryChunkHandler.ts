import {ChunkHandler} from "./chunkHandler";
import {UseHistoryChunk} from "../../libraries/types/savedata/useHistoryChunk";
import {CURRENT_DATA_VERSION} from "../../libraries/types/savedata/version";
import {isCodePointKey} from "../../libraries/helpers/isTypeSaveData";
import {DataEvent} from "../../libraries/types/savedata/metaChunk";
import {DataChunk} from "../../libraries/types/savedata/dataChunk";


import {RawCodePointUse} from "../../libraries/types/codePoint/extension";

export class UseHistoryChunkHandler implements ChunkHandler<UseHistoryChunk> {
    initData(fragment: DataChunk): UseHistoryChunk {
        if (fragment.initialized && isUsageFragment(fragment)) {
            return fragment;
        }

        console.info("Initializing usage");

        return {
            ...fragment,
            initialized: true,
            version: CURRENT_DATA_VERSION,
            codePoints: [],
        };
    }

    async updateData(fragment: UseHistoryChunk, _: Set<DataEvent>): Promise<UseHistoryChunk> {
        /* No-op yet */
        return fragment;
    }

}

function isUsageFragment(fragment: DataChunk): fragment is UseHistoryChunk {
    return "codePoints" in fragment
        && fragment.codePoints != null
        && Array.isArray(fragment.codePoints)
        && fragment.codePoints.every(isCodePointUseRecord)
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
