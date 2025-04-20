import {DataFragment} from "./dataFragment";
import {CodepointUsage} from "../oud/codepoint";

/**
 * Users usage data of the plugin.
 */
export interface UsageFragment extends DataFragment {
    codepoints: Array<CodepointUsage>
}
