export enum UnicodeCategory {
    Letter = "L",
    Mark = "M",
    Number = "N",
    Punctuation = "P",
    Symbol = "S",
    Separator = "Z",
    Other = "C",
}

export enum UnicodeSubcategoryLetter {
    Lowercase = "Ll",
    Modifier = "Lm",
    Titlecase = "Lt",
    Uppercase = "Lu",
    Other = "Lo",
}


export enum UnicodeSubcategoryMark {
    SpacingCombining = "Mc",
    Enclosing = "Me",
    NonSpacing = "Mn",
}

export enum UnicodeSubcategoryNumber {
    DecimalDigit = "Nd",
    Letter = "Nl",
    Other = "No",
}

export enum UnicodeSubcategoryPunctuation {
    Connector = "Pc",
    Dash = "Pd",
    InitialQuote = "Pi",
    FinalQuote = "Pf",
    Open = "Ps",
    Close = "Pe",
    Other = "Po",
}

export enum UnicodeSubcategorySymbol {
    Currency = "Sc",
    Modifier = "Sk",
    Math = "Sm",
    Other = "So",
}

export enum UnicodeSubcategorySeparator {
    Line = "Zl",
    Paragraph = "Zp",
    Space = "Zs",
}

export enum UnicodeSubcategoryOther {
    Control = "Cc",
    Format = "Cf",
    NotAssigned = "Cn",
    PrivateUse = "Co",
    Surrogate = "Cs",
}

export type UnicodeSubcategory = UnicodeSubcategoryLetter | UnicodeSubcategoryMark | UnicodeSubcategoryNumber |
    UnicodeSubcategoryPunctuation | UnicodeSubcategorySymbol | UnicodeSubcategorySeparator |
    UnicodeSubcategoryOther

export const UNICODE_CATEGORIES_ALL: UnicodeSubcategory[] = [
    ...Object.values(UnicodeSubcategoryLetter),
    ...Object.values(UnicodeSubcategoryMark),
    ...Object.values(UnicodeSubcategoryNumber),
    ...Object.values(UnicodeSubcategoryPunctuation),
    ...Object.values(UnicodeSubcategorySymbol),
    ...Object.values(UnicodeSubcategorySeparator),
    ...Object.values(UnicodeSubcategoryOther),
];
