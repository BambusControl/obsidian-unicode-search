import {ChunkHandler} from "./chunkHandler";
import {CharacterChunk} from "../../libraries/types/savedata/characterChunk";
import {CURRENT_DATA_VERSION} from "../../libraries/types/savedata/version";
import {isCodePointKey} from "../../libraries/helpers/isTypeSaveData";
import {CharacterDownloader} from "./characterDownloader";
import {DataEvent} from "../../libraries/types/savedata/metaChunk";
import {DataChunk} from "../../libraries/types/savedata/dataChunk";
import {Character} from "../../libraries/types/codePoint/unicode";

export class CharacterChunkHandler implements ChunkHandler<CharacterChunk> {
    constructor(
        private readonly ucdService: CharacterDownloader,
    ) {
    }

    initData(fragment: DataChunk): CharacterChunk {
        if (fragment.initialized && isCharacterChunk(fragment)) {
            return fragment;
        }

        console.info("Initializing characters");

        return {
            ...fragment,
            initialized: true,
            version: CURRENT_DATA_VERSION,
            codePoints: [],
        };
    }

    async updateData(fragment: CharacterChunk, events: Set<DataEvent>): Promise<CharacterChunk> {
        const updatedData = this.updateByVersion(fragment);
        const downloadRequested = events.has(DataEvent.DownloadCharacters);
        const emptyCharacterSet = fragment.codePoints.length < 1;

        if (!(downloadRequested || emptyCharacterSet)) {
            return updatedData;
        }

        console.info("Downloading character database");
        const codePoints = await this.ucdService.download();

        /* Yeah, we modify the input parameter */
        events.delete(DataEvent.DownloadCharacters);

        return {
            ...updatedData,
            codePoints: codePoints,
        };
    }

    private updateByVersion(fragment: CharacterChunk): CharacterChunk {
        /* No-op yet */
        return fragment;
    }
}

export function isCharacterChunk(fragment: DataChunk): fragment is CharacterChunk {
    return "codePoints" in fragment
        && fragment.codePoints != null
        && Array.isArray(fragment.codePoints)
        && fragment.codePoints.every(isCharacter)
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

