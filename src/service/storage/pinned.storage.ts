import {CharacterKeyType, CharacterMapOf, UnicodeCharacterInfoModel} from "../../data/unicode-character-info.model";
import {Pinnable} from "../../data/pinnable";

export type PinnedCharacter = UnicodeCharacterInfoModel & Partial<Pinnable>;

export interface PinnedStorage {
	getAll(): Promise<CharacterMapOf<PinnedCharacter>>;

	pin(id: CharacterKeyType, order: number): Promise<void>;

	unpin(id: CharacterKeyType): Promise<void>;
}
