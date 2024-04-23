import {UnicodeSearchError} from "../../unicode-search/errors/unicodeSearchError";

export function getRandomItem<T>(chars: T[]): T {
    if (chars.length < 1) {
        throw new UnicodeSearchError("Cannot get a random item from an empty array")
    }

    return chars[Math.floor(Math.random() * chars.length)];
}
