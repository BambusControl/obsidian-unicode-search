import {MaybeUsedCharacter, UsedCharacter} from "../../types/codepoint/character";

export function isUsedCharacter(character: MaybeUsedCharacter): character is UsedCharacter {
    return character != null
        && "useCount" in character
        && "firstUsed" in character
        && "lastUsed" in character
        ;
}
