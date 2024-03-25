import {CharacterStore} from "../characterStore";
import {RootDataStore} from "../rootDataStore";
import {Character, CharacterKey, CharacterTransform} from "../../../libraries/types/character";
import {ObsidianUnicodeSearchError} from "../../errors/obsidianUnicodeSearchError";

export class PluginCharacterStore implements CharacterStore {

    public constructor(
        private readonly store: RootDataStore
    ) {
    }

    public getCharacters(): Promise<Character[]> {
        return this.store.getCharacterData()
    }

    public initializeCharacters(data: Character[]): Promise<void> {
        return this.store.initializeCharacterData(data)
    }

    public async placeCharacter(char: Character): Promise<void> {
        const currentChars = await this.getCharacters();

        const foundIndex = currentChars.findIndex(ch => ch.char === char.char)
        const found = foundIndex >= 0;

        const newChars = currentChars;

        if (found) {
            newChars[foundIndex] = char;
        } else {
            newChars.push(char);
        }

        await this.store.initializeCharacterData(newChars);
    }

    public async placeCharacters(chars: Character[]): Promise<void> {
        const currentChars = new Map((await this.getCharacters()).map(v => [v.char, v]));
        const changedChars = new Map(chars.map(v => [v.char, v]));

        for (const [key, char] of changedChars.entries()) {
            currentChars.set(key, char);
        }

        const newChars = Array.from(currentChars.values());

        await this.store.initializeCharacterData(newChars);
    }

    public async updateCharacter<Out>(
        key: CharacterKey, apply: (char: Character) => Character & Out
    ): Promise<Character & Out> {

        const currentChars = await this.getCharacters();

        const foundIndex = currentChars.findIndex(ch => ch.char === key)
        const found = foundIndex >= 0;

        if (!found) {
            throw new ObsidianUnicodeSearchError(`Cannot update non-existent character '${key}' to storage`);
        }

        const newChars = currentChars;
        const modifiedChar = apply({...currentChars[foundIndex]});

        newChars[foundIndex] = modifiedChar;
        await this.store.initializeCharacterData(newChars);

        return modifiedChar;
    }

    public async updateCharacters<Out>(
        keyApplyMap: Map<CharacterKey, CharacterTransform<Out>>
    ): Promise<Map<CharacterKey, Character & Out>> {

        const currentChars = await this.getCharacters();
        const indexMappings = new Map<number, CharacterTransform<Out>>()

        for (const [key, mapping] of keyApplyMap) {
            const foundIndex = currentChars.findIndex(ch => ch.char === key)
            const found = foundIndex >= 0;

            if (!found) {
                throw new ObsidianUnicodeSearchError(`Cannot update non-existent character '${key}' to storage`);
            }

            indexMappings.set(foundIndex, mapping);
        }

        const newChars = currentChars;
        const modifiedChars = new Map<CharacterKey, Character & Out>()

        for (const [index, mapping] of indexMappings) {
            const modifiedChar = mapping({...currentChars[index]});
            newChars[index] = modifiedChar;
            modifiedChars.set(modifiedChar.char, modifiedChar)
        }

        await this.store.initializeCharacterData(newChars);

        return modifiedChars;
    }

}
