import {SaveData} from "../types/savedata/saveData";
import {UNICODE_PLANES_ALL} from "./unicodePlanes";

export function initializationData(): SaveData {
    return {
        initialized: false,
        version: "0.5.0-NEXT",
        settings: {
            initialized: false,
            filter: {
                planes: UNICODE_PLANES_ALL.map(plane => ({
                    ...plane.interval,
                    blocks: plane.blocks.map(block => ({
                        ...block.interval,
                        included: plane.planeNumber === 0
                    }))
                })),
                classifiers: [
                    {
                        classifier: "L",
                        name: "Letter",
                        categories: [
                            {
                                category: "Ll",
                                name: "Lowercase",
                                included: true
                            },
                            {
                                category: "Lm",
                                name: "Modifier",
                                included: true
                            },
                            {
                                category: "Lt",
                                name: "Titlecase",
                                included: true
                            },
                            {
                                category: "Lu",
                                name: "Uppercase",
                                included: true
                            },
                            {
                                category: "Lo",
                                name: "Other",
                                included: true
                            },
                        ]
                    },
                    {
                        classifier: "M",
                        name: "Mark",
                        categories: [
                            {
                                category: "Mc",
                                name: "SpacingCombining",
                                included: false
                            },
                            {
                                category: "Me",
                                name: "Enclosing",
                                included: false
                            },
                            {
                                category: "Mn",
                                name: "NonSpacing",
                                included: false
                            },
                        ]
                    },
                    {
                        classifier: "N",
                        name: "Number",
                        categories: [
                            {
                                category: "Nd",
                                name: "DecimalDigit",
                                included: true
                            },
                            {
                                category: "Nl",
                                name: "Letter",
                                included: true
                            },
                            {
                                category: "No",
                                name: "Other",
                                included: true
                            },
                        ]
                    },
                    {
                        classifier: "P",
                        name: "Punctuation",
                        categories: [
                            {
                                category: "Pc",
                                name: "Connector",
                                included: true
                            },
                            {
                                category: "Pd",
                                name: "Dash",
                                included: true
                            },
                            {
                                category: "Pi",
                                name: "InitialQuote",
                                included: true
                            },
                            {
                                category: "Pf",
                                name: "FinalQuote",
                                included: true
                            },
                            {
                                category: "Ps",
                                name: "Open",
                                included: true
                            },
                            {
                                category: "Pe",
                                name: "Close",
                                included: true
                            },
                            {
                                category: "Po",
                                name: "Other",
                                included: true
                            },
                        ]
                    },
                    {
                        classifier: "S",
                        name: "Symbol",
                        categories: [
                            {
                                category: "Sc",
                                name: "Currency",
                                included: true
                            },
                            {
                                category: "Sk",
                                name: "Modifier",
                                included: true
                            },
                            {
                                category: "Sm",
                                name: "Math",
                                included: true
                            },
                            {
                                category: "So",
                                name: "Other",
                                included: true
                            },
                        ]
                    },
                    {
                        classifier: "Z",
                        name: "Separator",
                        categories: [
                            {
                                category: "Zl",
                                name: "Line",
                                included: true
                            },
                            {
                                category: "Zp",
                                name: "Paragraph",
                                included: true
                            },
                            {
                                category: "Zs",
                                name: "Space",
                                included: true
                            },
                        ]
                    },
                    {
                        classifier: "C",
                        name: "Other",
                        categories: [
                            {
                                category: "Cc",
                                name: "Control",
                                included: false
                            },
                            {
                                category: "Cf",
                                name: "Format",
                                included: false
                            },
                            {
                                category: "Cn",
                                name: "NotAssigned",
                                included: false
                            },
                            {
                                category: "Co",
                                name: "PrivateUse",
                                included: false
                            },
                            {
                                category: "Cs",
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
