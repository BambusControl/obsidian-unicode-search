import {DataFragment} from "./dataFragment";
import {RawCodepointUse} from "../codepoint/extension";

/**
 * User generated usage data
 */
export interface CharacterUseFragment extends DataFragment {
    /**
     * Statistics of the individual codepoint usage
     */
    codepoints: RawCodepointUse[]
}
