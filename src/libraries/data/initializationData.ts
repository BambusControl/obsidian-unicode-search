import {SaveData} from "../types/savedata/saveData";
import {UNICODE_PLANES_ALL} from "./unicodePlanes";

export function initializationData(): SaveData {
    return {
        initialized: false,
        version: "0.5.0-NEXT",
        settings: {
            initialized: false,
            modified: false,
            filter: {
                planes: UNICODE_PLANES_ALL.map(plane => ({
                    ...plane.interval,
                    blocks: plane.blocks.map(block => ({
                        ...block.interval,
                        included: plane.planeNumber === 0
                    }))
                })),
                categoryGroups: [
                    {
                        abbreviation: "L",
                        name: "Letter",
                        categories: [
                            {
                                abbreviation: "Ll",
                                name: "Lowercase",
                                included: true
                            },
                            {
                                abbreviation: "Lm",
                                name: "Modifier",
                                included: true
                            },
                            {
                                abbreviation: "Lt",
                                name: "Titlecase",
                                included: true
                            },
                            {
                                abbreviation: "Lu",
                                name: "Uppercase",
                                included: true
                            },
                            {
                                abbreviation: "Lo",
                                name: "Other",
                                included: true
                            },
                        ]
                    },
                    {
                        abbreviation: "M",
                        name: "Mark",
                        categories: [
                            {
                                abbreviation: "Mc",
                                name: "SpacingCombining",
                                included: false
                            },
                            {
                                abbreviation: "Me",
                                name: "Enclosing",
                                included: false
                            },
                            {
                                abbreviation: "Mn",
                                name: "NonSpacing",
                                included: false
                            },
                        ]
                    },
                    {
                        abbreviation: "N",
                        name: "Number",
                        categories: [
                            {
                                abbreviation: "Nd",
                                name: "DecimalDigit",
                                included: true
                            },
                            {
                                abbreviation: "Nl",
                                name: "Letter",
                                included: true
                            },
                            {
                                abbreviation: "No",
                                name: "Other",
                                included: true
                            },
                        ]
                    },
                    {
                        abbreviation: "P",
                        name: "Punctuation",
                        categories: [
                            {
                                abbreviation: "Pc",
                                name: "Connector",
                                included: true
                            },
                            {
                                abbreviation: "Pd",
                                name: "Dash",
                                included: true
                            },
                            {
                                abbreviation: "Pi",
                                name: "InitialQuote",
                                included: true
                            },
                            {
                                abbreviation: "Pf",
                                name: "FinalQuote",
                                included: true
                            },
                            {
                                abbreviation: "Ps",
                                name: "Open",
                                included: true
                            },
                            {
                                abbreviation: "Pe",
                                name: "Close",
                                included: true
                            },
                            {
                                abbreviation: "Po",
                                name: "Other",
                                included: true
                            },
                        ]
                    },
                    {
                        abbreviation: "S",
                        name: "Symbol",
                        categories: [
                            {
                                abbreviation: "Sc",
                                name: "Currency",
                                included: true
                            },
                            {
                                abbreviation: "Sk",
                                name: "Modifier",
                                included: true
                            },
                            {
                                abbreviation: "Sm",
                                name: "Math",
                                included: true
                            },
                            {
                                abbreviation: "So",
                                name: "Other",
                                included: true
                            },
                        ]
                    },
                    {
                        abbreviation: "Z",
                        name: "Separator",
                        categories: [
                            {
                                abbreviation: "Zl",
                                name: "Line",
                                included: true
                            },
                            {
                                abbreviation: "Zp",
                                name: "Paragraph",
                                included: true
                            },
                            {
                                abbreviation: "Zs",
                                name: "Space",
                                included: true
                            },
                        ]
                    },
                    {
                        abbreviation: "C",
                        name: "Other",
                        categories: [
                            {
                                abbreviation: "Cc",
                                name: "Control",
                                included: false
                            },
                            {
                                abbreviation: "Cf",
                                name: "Format",
                                included: false
                            },
                            {
                                abbreviation: "Cn",
                                name: "NotAssigned",
                                included: false
                            },
                            {
                                abbreviation: "Co",
                                name: "PrivateUse",
                                included: false
                            },
                            {
                                abbreviation: "Cs",
                                name: "Surrogate",
                                included: false
                            },
                        ]
                    },
                ]
            }
        },
        usage: {
            initialized: false,
            codepoints: []
        },
        unicode: {
            initialized: false,
            codepoints: []
        }
    }
}
