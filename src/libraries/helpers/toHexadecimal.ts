import {asHexadecimal} from "./asHexadecimal";
import {Character} from "../types/codepoint/character";

export function toHexadecimal(character: Character): string {
    /* Characters are expected to always have a single character */
    return asHexadecimal(character.codepoint.codePointAt(0)!);
}
