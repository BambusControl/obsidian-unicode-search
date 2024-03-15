import {Character} from "../types/character";
import {asHexadecimal} from "./asHexadecimal";

export function toHexadecimal(character: Character): string {
    /* Characters are expected to always have a single character */
    return asHexadecimal(character.char.codePointAt(0)!);
}
