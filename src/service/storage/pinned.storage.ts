import {CharacterKeyType, CharacterMapOf, UnicodeCharacter} from "../../data/unicode.character";
import {Pinnable} from "../../data/pinnable";

export type PinnedCharacter = UnicodeCharacter & Partial<Pinnable>;

export interface PinnedStorage {
	getAll(): Promise<CharacterMapOf<PinnedCharacter>>;

	pin(id: CharacterKeyType, order: number): Promise<void>;

	unpin(id: CharacterKeyType): Promise<void>;
}
