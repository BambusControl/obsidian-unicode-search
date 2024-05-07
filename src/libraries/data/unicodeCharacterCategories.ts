import {UnicodeGeneralCategoryGroup} from "../types/unicode/unicodeGeneralCategoryGroup";

export const UNICODE_CHARACTER_CATEGORIES: UnicodeGeneralCategoryGroup[] = [
    {
        abbreviation: "L",
        name: "Letter",
        categories: [
            {
                abbreviation: "Lu",
                name: "Uppercase_Letter",
                description: "an uppercase letter",
            },

            {
                abbreviation: "Ll",
                name: "Lowercase_Letter",
                description: "a lowercase letter",
            },

            {
                abbreviation: "Lt",
                name: "Titlecase_Letter",
                description: "a digraph encoded as a single character, with first part uppercase",
            },

            {
                abbreviation: "Lm",
                name: "Modifier_Letter",
                description: "a modifier letter",
            },

            {
                abbreviation: "Lo",
                name: "Other_Letter",
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
                name: "Nonspacing_Mark",
                description: "a nonspacing combining mark (zero advance width)",
            },

            {
                abbreviation: "Mc",
                name: "Spacing_Mark",
                description: "a spacing combining mark (positive advance width)",
            },

            {
                abbreviation: "Me",
                name: "Enclosing_Mark",
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
                name: "Decimal_Number",
                description: "a decimal digit",
            },

            {
                abbreviation: "Nl",
                name: "Letter_Number",
                description: "a letterlike numeric character",
            },

            {
                abbreviation: "No",
                name: "Other_Number",
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
                name: "Connector_Punctuation",
                description: "a connecting punctuation mark, like a tie",
            },

            {
                abbreviation: "Pd",
                name: "Dash_Punctuation",
                description: "a dash or hyphen punctuation mark",
            },

            {
                abbreviation: "Ps",
                name: "Open_Punctuation",
                description: "an opening punctuation mark (of a pair)",
            },

            {
                abbreviation: "Pe",
                name: "Close_Punctuation",
                description: "a closing punctuation mark (of a pair)",
            },

            {
                abbreviation: "Pi",
                name: "Initial_Punctuation",
                description: "an initial quotation mark",
            },

            {
                abbreviation: "Pf",
                name: "Final_Punctuation",
                description: "a final quotation mark",
            },

            {
                abbreviation: "Po",
                name: "Other_Punctuation",
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
                name: "Math_Symbol",
                description: "a symbol of mathematical use",
            },

            {
                abbreviation: "Sc",
                name: "Currency_Symbol",
                description: "a currency sign",
            },

            {
                abbreviation: "Sk",
                name: "Modifier_Symbol",
                description: "a non-letterlike modifier symbol",
            },
            {
                abbreviation: "So",
                name: "Other_Symbol",
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
                name: "Space_Separator",
                description: "a space character (of various non-zero widths)",
            },

            {
                abbreviation: "Zl",
                name: "Line_Separator",
                description: "U+2028 LINE SEPARATOR only",
            },

            {
                abbreviation: "Zp",
                name: "Paragraph_Separator",
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
                name: "Private_Use",
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
