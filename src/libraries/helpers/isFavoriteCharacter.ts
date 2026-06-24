import {FavoriteCharacter, MaybeFavoriteCharacter} from "../types/codePoint/character";

export function isFavoriteCharacter(character: MaybeFavoriteCharacter): character is FavoriteCharacter {
    return character != null
        && "added" in character
        && "quickInsertEnabled" in character
        ;
}
