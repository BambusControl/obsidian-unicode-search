import {beforeEach, expect, test} from "@jest/globals";

import {PluginSaveDataStore} from "../../../src/unicode-search/service/impl/pluginSaveDataStore";
import {Plugin} from "obsidian";
import {CharacterStore} from "../../../src/unicode-search/service/characterStore";
import {Character, CharacterKey, CharacterTransform} from "../../../src/libraries/types/character";

const datasetLarge = () => JSON.parse(`
[
    {
      "char": " ",
      "name": "space",
      "useCount": 1,
      "lastUsed": 1707924865279
    },
    {
      "char": "!",
      "name": "exclamation mark"
    },
    {
      "char": "\\"",
      "name": "quotation mark"
    },
    {
      "char": "#",
      "name": "number sign"
    },
    {
      "char": "$",
      "name": "dollar sign"
    },
    {
      "char": "%",
      "name": "percent sign"
    },
    {
      "char": "&",
      "name": "ampersand"
    },
    {
      "char": "'",
      "name": "apostrophe"
    },
    {
      "char": "(",
      "name": "left parenthesis"
    },
    {
      "char": ")",
      "name": "right parenthesis"
    },
    {
      "char": "*",
      "name": "asterisk"
    },
    {
      "char": "+",
      "name": "plus sign"
    },
    {
      "char": ",",
      "name": "comma"
    },
    {
      "char": "-",
      "name": "hyphen-minus"
    },
    {
      "char": ".",
      "name": "full stop"
    },
    {
      "char": "/",
      "name": "solidus"
    },
    {
      "char": "0",
      "name": "digit zero"
    },
    {
      "char": "1",
      "name": "digit one"
    },
    {
      "char": "2",
      "name": "digit two"
    },
    {
      "char": "3",
      "name": "digit three"
    },
    {
      "char": "4",
      "name": "digit four"
    },
    {
      "char": "5",
      "name": "digit five"
    },
    {
      "char": "6",
      "name": "digit six"
    },
    {
      "char": "7",
      "name": "digit seven"
    },
    {
      "char": "8",
      "name": "digit eight"
    },
    {
      "char": "9",
      "name": "digit nine"
    },
    {
      "char": ":",
      "name": "colon"
    },
    {
      "char": ";",
      "name": "semicolon"
    },
    {
      "char": "<",
      "name": "less-than sign"
    },
    {
      "char": "=",
      "name": "equals sign"
    },
    {
      "char": ">",
      "name": "greater-than sign"
    },
    {
      "char": "?",
      "name": "question mark"
    },
    {
      "char": "@",
      "name": "commercial at"
    },
    {
      "char": "A",
      "name": "latin capital letter a"
    },
    {
      "char": "B",
      "name": "latin capital letter b"
    },
    {
      "char": "C",
      "name": "latin capital letter c"
    },
    {
      "char": "D",
      "name": "latin capital letter d"
    },
    {
      "char": "E",
      "name": "latin capital letter e"
    },
    {
      "char": "F",
      "name": "latin capital letter f"
    },
    {
      "char": "G",
      "name": "latin capital letter g"
    },
    {
      "char": "H",
      "name": "latin capital letter h"
    },
    {
      "char": "I",
      "name": "latin capital letter i"
    },
    {
      "char": "J",
      "name": "latin capital letter j"
    },
    {
      "char": "K",
      "name": "latin capital letter k"
    },
    {
      "char": "L",
      "name": "latin capital letter l"
    },
    {
      "char": "M",
      "name": "latin capital letter m"
    },
    {
      "char": "N",
      "name": "latin capital letter n"
    },
    {
      "char": "O",
      "name": "latin capital letter o"
    },
    {
      "char": "P",
      "name": "latin capital letter p"
    },
    {
      "char": "Q",
      "name": "latin capital letter q"
    },
    {
      "char": "R",
      "name": "latin capital letter r"
    },
    {
      "char": "S",
      "name": "latin capital letter s"
    },
    {
      "char": "T",
      "name": "latin capital letter t"
    },
    {
      "char": "U",
      "name": "latin capital letter u"
    },
    {
      "char": "V",
      "name": "latin capital letter v"
    },
    {
      "char": "W",
      "name": "latin capital letter w"
    },
    {
      "char": "X",
      "name": "latin capital letter x"
    },
    {
      "char": "Y",
      "name": "latin capital letter y"
    },
    {
      "char": "Z",
      "name": "latin capital letter z"
    },
    {
      "char": "[",
      "name": "left square bracket"
    },
    {
      "char": "\\\\",
      "name": "reverse solidus"
    },
    {
      "char": "]",
      "name": "right square bracket"
    },
    {
      "char": "^",
      "name": "circumflex accent"
    },
    {
      "char": "_",
      "name": "low line"
    },
    {
      "char": "\`",
      "name": "grave accent"
    },
    {
      "char": "a",
      "name": "latin small letter a"
    },
    {
      "char": "b",
      "name": "latin small letter b"
    },
    {
      "char": "c",
      "name": "latin small letter c"
    },
    {
      "char": "d",
      "name": "latin small letter d"
    },
    {
      "char": "e",
      "name": "latin small letter e"
    },
    {
      "char": "f",
      "name": "latin small letter f"
    },
    {
      "char": "g",
      "name": "latin small letter g"
    },
    {
      "char": "h",
      "name": "latin small letter h"
    },
    {
      "char": "i",
      "name": "latin small letter i"
    },
    {
      "char": "j",
      "name": "latin small letter j"
    },
    {
      "char": "k",
      "name": "latin small letter k"
    },
    {
      "char": "l",
      "name": "latin small letter l"
    },
    {
      "char": "m",
      "name": "latin small letter m"
    },
    {
      "char": "n",
      "name": "latin small letter n"
    },
    {
      "char": "o",
      "name": "latin small letter o"
    },
    {
      "char": "p",
      "name": "latin small letter p"
    },
    {
      "char": "q",
      "name": "latin small letter q"
    },
    {
      "char": "r",
      "name": "latin small letter r"
    },
    {
      "char": "s",
      "name": "latin small letter s"
    },
    {
      "char": "t",
      "name": "latin small letter t"
    },
    {
      "char": "u",
      "name": "latin small letter u"
    },
    {
      "char": "v",
      "name": "latin small letter v"
    },
    {
      "char": "w",
      "name": "latin small letter w"
    },
    {
      "char": "x",
      "name": "latin small letter x"
    },
    {
      "char": "y",
      "name": "latin small letter y"
    },
    {
      "char": "z",
      "name": "latin small letter z"
    },
    {
      "char": "{",
      "name": "left curly bracket"
    },
    {
      "char": "|",
      "name": "vertical line"
    },
    {
      "char": "}",
      "name": "right curly bracket"
    },
    {
      "char": "~",
      "name": "tilde"
    },
    {
      "char": "—",
      "name": "em dash",
      "useCount": 4,
      "lastUsed": 1707924885687,
      "pin": 1
    },
    {
      "char": "℀",
      "name": "account of",
      "useCount": 3,
      "lastUsed": 1707924862726,
      "pin": 2
    },
    {
      "char": "⌒",
      "name": "arc",
      "useCount": 4,
      "lastUsed": 1707924870230,
      "pin": 3
    }
]
`)
const datasetSmall = () => datasetLarge().slice(0, 20)

let plugin_mock_data: any = null

const plugin_mock = {
    saveData: jest.fn((data) => plugin_mock_data = data),
    loadData: jest.fn(() => plugin_mock_data)
} as Pick<Plugin, "saveData" | "loadData">

const characterStore: CharacterStore = new PluginSaveDataStore(plugin_mock);

beforeEach(() => {
    plugin_mock_data = null
})

test(
    "initializeCharacters overwrites all characters",
    async () => {
        await characterStore.initializeCharacters(datasetSmall());
        const loadedDataSmall = await characterStore.getCharacters();
        expect(loadedDataSmall).toEqual(datasetSmall());

        await characterStore.initializeCharacters(datasetLarge());
        const loadedDataLarge = await characterStore.getCharacters();
        expect(loadedDataLarge).toEqual(datasetLarge());
    }
)

test(
    "placeCharacter adds a non-existing character",
    async () => {
        await characterStore.initializeCharacters(datasetSmall());
        await characterStore.placeCharacter({
            char: "A",
            name: "latin capital letter a"
        });

        const loadedData = await characterStore.getCharacters();
        expect(loadedData).toEqual([
            ...datasetSmall(),
            {
                char: "A",
                name: "latin capital letter a"
            }
        ]);
    }
)

test(
    "placeCharacter replaces an existing character",
    async () => {
        await characterStore.initializeCharacters(datasetSmall());
        await characterStore.placeCharacter({
            char: " ",
            name: "space - edited",
            /* Remove fields */
            // useCount: 1,
            // lastUsed: 1707924865279,
        });

        const loadedData = await characterStore.getCharacters();
        expect(loadedData).toEqual([
            {
                char: " ",
                name: "space - edited",
            },
            ...datasetSmall().slice(1)
        ]);
    }
)

test(
    "placeCharacters adds non-existing characters",
    async () => {
        await characterStore.initializeCharacters(datasetSmall());
        await characterStore.placeCharacters([
            {
                char: "A",
                name: "latin capital letter a"
            },
            {
                char: "B",
                name: "latin capital letter b"
            },
        ]);

        const loadedData = await characterStore.getCharacters();
        expect(loadedData).toEqual([
            ...datasetSmall(),
            {
                char: "A",
                name: "latin capital letter a"
            },
            {
                char: "B",
                name: "latin capital letter b"
            }
        ]);
    }
)


test(
    "placeCharacters replaces existing characters",
    async () => {
        await characterStore.initializeCharacters(datasetSmall());
        await characterStore.placeCharacters([
            {
                char: " ",
                name: "space - edited",
            },
            {
                char: "!",
                name: "exclamation mark - edited",
            },
        ]);

        const loadedData = await characterStore.getCharacters();
        expect(loadedData).toEqual([
            {
                char: " ",
                name: "space - edited",
            },
            {
                char: "!",
                name: "exclamation mark - edited",
            },
            ...datasetSmall().slice(2)
        ]);
    }
)

test(
    "placeCharacters adds non-existing characters and replaces existing characters",
    async () => {
        await characterStore.initializeCharacters(datasetSmall());
        await characterStore.placeCharacters([
            {
                char: "A",
                name: "latin capital letter a"
            },{
                char: " ",
                name: "space - edited",
                /* Remove fields */
                // useCount: 1,
                // lastUsed: 1707924865279,
            },
        ]);

        const loadedData = await characterStore.getCharacters();
        expect(loadedData).toEqual([
            {
                char: " ",
                name: "space - edited",
            },
            // small dataset except the first character
            ...datasetSmall().slice(1),
            {
                char: "A",
                name: "latin capital letter a"
            },
        ]);
    }
)

test(
    "updateCharacter modifies an existing character",
    async () => {
        await characterStore.initializeCharacters(datasetSmall());
        await characterStore.updateCharacter(" ", char => ({
            ...char,
            name: "space - edited",
        }));

        const loadedData = await characterStore.getCharacters();
        expect(loadedData.find(ch => ch.char = " ")?.name).toEqual("space - edited");
    }
)

test(
    "updateCharacter throws an error for a non-existing character",
    async () => {
        await characterStore.initializeCharacters(datasetSmall());
        await expect(
            characterStore.updateCharacter("A", char => ({
                ...char,
                name: "latin capital letter a - edited",
            }))
        ).rejects.toThrow();
    }
)

test(
    "updateCharacters modifies existing characters",
    async () => {
        await characterStore.initializeCharacters(datasetSmall());
        await characterStore.updateCharacters(new Map<CharacterKey, CharacterTransform<Character>>([
            [" ", char => ({
                ...char,
                name: "space - edited",
            })],
            ["!", char => ({
                ...char,
                name: "exclamation mark - edited",
            })],
        ]));

        const loadedData = await characterStore.getCharacters();
        expect(loadedData.find(ch => ch.char == " ")?.name).toEqual("space - edited");
        expect(loadedData.find(ch => ch.char == "!")?.name).toEqual("exclamation mark - edited");
    }
)

test(
    "updateCharacters throws an error for a non-existing character",
    async () => {
        await characterStore.initializeCharacters(datasetSmall());
        await expect(
            characterStore.updateCharacters(new Map<CharacterKey, CharacterTransform<Character>>([
                ["A", char => ({
                    ...char,
                    name: "latin capital letter a - edited",
                })],
            ]))
        ).rejects.toThrow();
    }
)
