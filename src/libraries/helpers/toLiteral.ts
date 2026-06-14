import {CodepointLiteral} from "../types/codepoint/unicode";

export function toLiteral(codepoint: CodepointLiteral) {
    return String.fromCodePoint(codepoint).normalize("NFC");
}
