export enum CharacterCategoryLetter {
    Lowercase = "Ll",
    Modifier = "Lm",
    Titlecase = "Lt",
    Uppercase = "Lu",
    Other = "Lo",
}

export enum CharacterCategoryMark {
    SpacingCombining = "Mc",
    Enclosing = "Me",
    NonSpacing = "Mn",
}

export enum CharacterCategoryNumber {
    DecimalDigit = "Nd",
    Letter = "Nl",
    Other = "No",
}

export enum CharacterCategoryPunctuation {
    Connector = "Pc",
    Dash = "Pd",
    InitialQuote = "Pi",
    FinalQuote = "Pf",
    Open = "Ps",
    Close = "Pe",
    Other = "Po",
}

export enum CharacterCategorySymbol {
    Currency = "Sc",
    Modifier = "Sk",
    Math = "Sm",
    Other = "So",
}

export enum CharacterCategorySeparator {
    Line = "Zl",
    Paragraph = "Zp",
    Space = "Zs",
}

export enum CharacterCategoryOther {
    Control = "Cc",
    Format = "Cf",
    NotAssigned = "Cn",
    PrivateUse = "Co",
    Surrogate = "Cs",
}

// NEXT
export type CharacterCategory
    = CharacterCategoryLetter
    | CharacterCategoryMark
    | CharacterCategoryNumber
    | CharacterCategoryPunctuation
    | CharacterCategorySymbol
    | CharacterCategorySeparator
    | CharacterCategoryOther

export type CharacterCategoryType =
    "Ll" | "Lm" | "Lt" | "Lu" | "Lo"
    | "Mc" | "Me" | "Mn"
    | "Nd" | "Nl" | "No"
    | "Pc" | "Pd" | "Pi" | "Pf" | "Ps" | "Pe" | "Po"
    | "Sc" | "Sk" | "Sm" | "So"
    | "Zl" | "Zp" | "Zs"
    | "Cc" | "Cf" | "Cn" | "Co" | "Cs"
