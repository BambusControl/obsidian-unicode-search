import {asHexadecimal} from "./asHexadecimal";
import {CodepointKey} from "../../types/codepoint/codepointKey";

export function toHexadecimal(character: CodepointKey): string {
    /* Characters are expected to always have a single character */
    return asHexadecimal(character.codepoint.codePointAt(0)!);
}
