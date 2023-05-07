import {CharacterKeyType, PinnedCharacters} from "../../../libraries/types/unicode.character";

export interface PinnedStorage {
	getAll(): Promise<PinnedCharacters>;

	pin(id: CharacterKeyType, order: number): Promise<void>;

	unpin(id: CharacterKeyType): Promise<void>;
}
