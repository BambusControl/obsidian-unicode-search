import type {CharacterWithUseHistory, MaybeCharacterWithUseHistory,} from "../types/codePoint/character";

export function isCharacterWithUseHistory(
    character: MaybeCharacterWithUseHistory,
): character is CharacterWithUseHistory {
    return (
        character != null &&
        "timesUsed" in character &&
        "firstUse" in character &&
        "lastUse" in character
    );
}
