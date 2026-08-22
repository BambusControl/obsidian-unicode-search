import type {ChunkHandler} from "./chunkHandler";
import type {CharacterChunk} from "../../libraries/types/savedata/characterChunk";
import {CURRENT_DATA_VERSION} from "../../libraries/types/savedata/version";
import {isCodePointKey} from "../../libraries/helpers/isTypeSaveData";
import type {CharacterDownloader} from "./characterDownloader";
import {DataEvent} from "../../libraries/types/savedata/metaChunk";
import type {DataChunk} from "../../libraries/types/savedata/dataChunk";
import type {Character} from "../../libraries/types/codePoint/unicode";

export class CharacterChunkHandler implements ChunkHandler<CharacterChunk> {
    constructor(
        private readonly ucdService: CharacterDownloader,
    ) {
    }

    initData(chunk: DataChunk): CharacterChunk {
        if (chunk.initialized && isCharacterChunk(chunk)) {
            return chunk;
        }

        console.info("Initializing characters");

        return {
            ...chunk,
            initialized: true,
            version: CURRENT_DATA_VERSION,
            codePoints: [],
        };
    }

    async updateData(chunk: CharacterChunk, events: Set<DataEvent>): Promise<CharacterChunk> {
        const updatedChunk = this.updateByVersion(chunk);
        const downloadRequested = events.has(DataEvent.DownloadCharacters);
        const emptyCharacterSet = updatedChunk.codePoints.length < 1;

        if (!(downloadRequested || emptyCharacterSet)) {
            return updatedChunk;
        }

        console.info("Downloading character database");
        const codePoints = await this.ucdService.download();

        /* Yeah, we modify the input parameter */
        events.delete(DataEvent.DownloadCharacters);

        return {
            ...updatedChunk,
            codePoints: codePoints,
        };
    }

    private updateByVersion(chunk: CharacterChunk): CharacterChunk {
        if (chunk.version === CURRENT_DATA_VERSION) {
            /* No-op */
            return chunk;
        }

        const updatedData = chunk;

        if (updatedData.version === "0.7.0") {
            /* Field names were updated */
            updatedData.codePoints = (updatedData as any).codepoints.map((codepoint: any) => ({
                id: codepoint.codepoint.codePointAt(0) ?? 0,
                glyph: codepoint.codepoint,
                name: codepoint.name,
                category: codepoint.category,
            }));
            updatedData.version = "0.7.0";
        }

        return updatedData;
    }
}

export function isCharacterChunk(chunk: DataChunk): chunk is CharacterChunk {
    return "codePoints" in chunk
        && chunk.codePoints != null
        && Array.isArray(chunk.codePoints)
        && chunk.codePoints.every(isCharacter)
        ;
}

function isCharacter(object: any): object is Character {
    return isCodePointKey(object)

        && "name" in object
        && object.name != null
        && typeof object.name === "string"

        && "category" in object
        && object.category != null
        && typeof object.category === "string"
        ;
}

