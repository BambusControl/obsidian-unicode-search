import {Character} from "../types/character";
import {asHexadecimal} from "./asHexadecimal";
import {QCharacter} from "../types/qCharacter";

export function toHexadecimal(character: Character): string {
    /* Characters are expected to always have a single character */
    return asHexadecimal(character.char.codePointAt(0)!);
}

export function qToHexadecimal(character: QCharacter): string {
    /* Characters are expected to always have a single character */
    return asHexadecimal(character.codePoint.codePointAt(0)!);
}
