import type { CodePointStore } from "./codePointStore";
import type { Character } from "../../libraries/types/codePoint/unicode";
import type { RootDataStore } from "./rootDataStore";

export class CodePointStorage implements CodePointStore {
	constructor(private readonly store: RootDataStore) {}

	async getCharacters(): Promise<Character[]> {
		return (await this.store.getCharacters()).codePoints;
	}
}
