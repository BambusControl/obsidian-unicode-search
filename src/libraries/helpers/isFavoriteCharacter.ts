import {FavoriteCharacter, MaybeFavoriteCharacter} from "../types/codepoint/character";

export function isFavoriteCharacter(character: MaybeFavoriteCharacter): character is FavoriteCharacter {
    return character != null
        && "added" in character
        && "hotkey" in character
        ;
}
