import {
    Character,
    CharacterKey,
    PinnedCharacter,
    UnpinnedCharacter,
    UsedCharacter
} from "../../libraries/types/character";

export interface CharacterService {
	getOne(key: CharacterKey): Promise<Character>;
	getAll(): Promise<Character[]>;
    getUsed(): Promise<UsedCharacter[]>
	recordUsage(key: CharacterKey): Promise<UsedCharacter>;
    getPinned(): Promise<PinnedCharacter[]>
	pin(key: CharacterKey): Promise<PinnedCharacter>;
	unpin(key: CharacterKey): Promise<UnpinnedCharacter>;
}
