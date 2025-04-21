import {UnicodeSearchError} from "../../unicode-search/errors/unicodeSearchError";

export function getRandomItem<T>(items: T[]): T {
    if (items.length < 1) {
        throw new UnicodeSearchError("Cannot get a random item from an empty array")
    }

    return items[Math.floor(Math.random() * items.length)];
}
