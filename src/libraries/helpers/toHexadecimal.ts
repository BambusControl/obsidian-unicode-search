import {asHexadecimal} from "./asHexadecimal";

import type {CodePointKey} from "../types/codePoint/unicode";

export function toHexadecimal(character: CodePointKey): string {
    return asHexadecimal(character.id);
}
