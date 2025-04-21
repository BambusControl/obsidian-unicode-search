import {UnicodeGeneralCategoryGroup} from "../types/unicode/unicodeGeneralCategoryGroup";

export const UNICODE_CHARACTER_CATEGORIES: UnicodeGeneralCategoryGroup[] = [
    {
        abbreviation: "L",
        name: "Letter",
        categories: [
            {
                abbreviation: "Lu",
                name: "Uppercase Letter",
                description: "an uppercase letter",
            },

            {
                abbreviation: "Ll",
                name: "Lowercase Letter",
                description: "a lowercase letter",
            },

            {
                abbreviation: "Lt",
                name: "Titlecase Letter",
                description: "a digraph encoded as a single character, with first part uppercase",
            },

            {
                abbreviation: "Lm",
                name: "Modifier Letter",
                description: "a modifier letter",
            },

            {
                abbreviation: "Lo",
                name: "Other Letter",
                description: "other letters, including syllables and ideographs",
            },
        ]
    },
    {
        abbreviation: "M",
        name: "Mark",
        categories: [
            {
                abbreviation: "Mn",
                name: "Nonspacing Mark",
                description: "a nonspacing combining mark (zero advance width)",
            },

            {
                abbreviation: "Mc",
                name: "Spacing Mark",
                description: "a spacing combining mark (positive advance width)",
            },

            {
                abbreviation: "Me",
                name: "Enclosing Mark",
                description: "an enclosing combining mark",
            },
        ],
    },

    {
        abbreviation: "N",
        name: "Number",
        categories: [
            {
                abbreviation: "Nd",
                name: "Decimal Number",
                description: "a decimal digit",
            },

            {
                abbreviation: "Nl",
                name: "Letter Number",
                description: "a letterlike numeric character",
            },

            {
                abbreviation: "No",
                name: "Other Number",
                description: "a numeric character of other type",
            },
        ]
    },
    {
        abbreviation: "P",
        name: "Punctuation",
        categories: [
            {
                abbreviation: "Pc",
                name: "Connector Punctuation",
                description: "a connecting punctuation mark, like a tie",
            },

            {
                abbreviation: "Pd",
                name: "Dash Punctuation",
                description: "a dash or hyphen punctuation mark",
            },

            {
                abbreviation: "Ps",
                name: "Open Punctuation",
                description: "an opening punctuation mark (of a pair)",
            },

            {
                abbreviation: "Pe",
                name: "Close Punctuation",
                description: "a closing punctuation mark (of a pair)",
            },

            {
                abbreviation: "Pi",
                name: "Initial Punctuation",
                description: "an initial quotation mark",
            },

            {
                abbreviation: "Pf",
                name: "Final Punctuation",
                description: "a final quotation mark",
            },

            {
                abbreviation: "Po",
                name: "Other Punctuation",
                description: "a punctuation mark of other type",
            },
        ]
    },
    {
        abbreviation: "S",
        name: "Symbol",
        categories: [
            {
                abbreviation: "Sm",
                name: "Math Symbol",
                description: "a symbol of mathematical use",
            },

            {
                abbreviation: "Sc",
                name: "Currency Symbol",
                description: "a currency sign",
            },

            {
                abbreviation: "Sk",
                name: "Modifier Symbol",
                description: "a non-letterlike modifier symbol",
            },
            {
                abbreviation: "So",
                name: "Other Symbol",
                description: "a symbol of other type",
            },
        ]
    },

    {
        abbreviation: "Z",
        name: "Separator",
        categories: [
            {
                abbreviation: "Zs",
                name: "Space Separator",
                description: "a space character (of various non-zero widths)",
            },

            {
                abbreviation: "Zl",
                name: "Line Separator",
                description: "U+2028 LINE SEPARATOR only",
            },

            {
                abbreviation: "Zp",
                name: "Paragraph Separator",
                description: "U+2029 PARAGRAPH SEPARATOR only",
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
                description: "a C0 or C1 control code",
            },

            {
                abbreviation: "Cf",
                name: "Format",
                description: "a format control character",
            },

            {
                abbreviation: "Cs",
                name: "Surrogate",
                description: "a surrogate code point",
            },

            {
                abbreviation: "Co",
                name: "Private Use",
                description: "a private-use character",
            },

            {
                abbreviation: "Cn",
                name: "Unassigned",
                description: "a reserved unassigned code point or a noncharacter",
            },
        ]
    },
];
