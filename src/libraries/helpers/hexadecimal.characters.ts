import {Character} from "../types/character";

export function toHexadecimal(character: Character): string {
    /* Characters are expected to always have a single character */
    return character.char.codePointAt(0)!.toString(16).padStart(4, "0");
}
