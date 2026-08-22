import {LibraryError} from "../../libraries/errors/libraryError";

export function getRandomItem<T>(items: T[]): T {
    if (items.length < 1) {
        throw new LibraryError("Cannot get a random item from an empty array");
    }

    return items[Math.floor(Math.random() * items.length)];
}
