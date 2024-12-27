import {Initializable} from "./initializable";
import {CodepointUsage} from "./codepoint";

/**
 * Users usage data of the plugin.
 */
export interface UsageData extends Initializable {
    codepoints: Array<CodepointUsage>
}

