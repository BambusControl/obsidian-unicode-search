import {asHexadecimal} from "./asHexadecimal";

import {CodepointKey} from "../types/codepoint/unicode";

export function toHexadecimal(character: CodepointKey): string {
    return asHexadecimal(character.id);
}
