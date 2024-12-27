import {Bambus} from "./bambus";
import {CodepointUsage} from "../oud/codepoint";

/**
 * Users usage data of the plugin.
 */
export interface UsageDataNew extends Bambus {
    codepoints: Array<CodepointUsage>
}
