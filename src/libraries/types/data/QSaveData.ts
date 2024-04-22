import {QCodePointAttribute, QUnicodeMap} from "./QCodePointAttribute";

export interface QSaveData {
    settings: QSettings;
    user: QUser;
    unicode: QUnicode;
}

export interface QSettings {
    filter: QFilter;
}

export interface QUser {
    codepoints: QUnicodeMap<QUserCodepointData>
}

export interface QUnicode {
    codepoints: QUnicodeMap<QCodePointAttribute>
}

export interface QUserCodepointData {
    /* Turn these to Dates */
    firstUsed: number;
    lastUsed: number;
    useCount: number;
    /* Calculate Frequency of Usage */
}

export interface QFilter {
    /* Shape of Unicode Character Data */
    planes: QPlaneFilter;
    categories: QCategoryFilter;
}

export interface QPlaneFilter {
    blocks: QBlockFilter;
}

export interface QBlockFilter {

}

export interface QCategoryFilter {

}
