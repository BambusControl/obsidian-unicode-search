import {UserOptions} from "../../libraries/types/userOptions";
import {Characters} from "../../libraries/types/character";

export interface RootDataStore {
    getCharacterData(): Promise<Characters>
    initializeCharacterData(characters: Characters): Promise<Characters>

    getUserOptions(): Promise<UserOptions>
    saveUserOptions(userOptions: UserOptions): Promise<UserOptions>
}
