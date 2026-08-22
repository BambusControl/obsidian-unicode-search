import type {CodePoint} from "../types/codePoint/unicode";

export function toGlyph(codePoint: CodePoint): string {
    return String.fromCodePoint(codePoint).normalize("NFC");
}
