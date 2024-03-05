export enum UnicodeGeneralCategory {
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

type UnicodeSubcategory = UnicodeSubcategoryLetter | UnicodeSubcategoryMark | UnicodeSubcategoryNumber |
    UnicodeSubcategoryPunctuation | UnicodeSubcategorySymbol | UnicodeSubcategorySeparator |
    UnicodeSubcategoryOther

export function unicodeSubcategory(generalCategory: UnicodeGeneralCategory):
     UnicodeSubcategory
{
    const subcategoryMapping = {
        [UnicodeGeneralCategory.Letter]: UnicodeSubcategoryLetter,
        [UnicodeGeneralCategory.Mark]: UnicodeSubcategoryMark,
        [UnicodeGeneralCategory.Number]: UnicodeSubcategoryNumber,
        [UnicodeGeneralCategory.Punctuation]: UnicodeSubcategoryPunctuation,
        [UnicodeGeneralCategory.Symbol]: UnicodeSubcategorySymbol,
        [UnicodeGeneralCategory.Separator]: UnicodeSubcategorySeparator,
        [UnicodeGeneralCategory.Other]: UnicodeSubcategoryOther,
    };

    return subcategoryMapping[generalCategory];
}
