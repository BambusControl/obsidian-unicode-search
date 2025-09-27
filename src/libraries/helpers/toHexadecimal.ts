import {asHexadecimal} from "./asHexadecimal";

import {CodepointKey} from "../types/codepoint/unicode";

export function toHexadecimal(character: CodepointKey): string {
    /* Characters are expected to always have at least a single character
     *
     * Unicode codepoints may be multiple string characters; however, codePointAt will handle most of the cases.
     * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#utf-16_characters_unicode_code_points_and_grapheme_clusters
     */
    return asHexadecimal(character.codepoint.codePointAt(0)!);
}
