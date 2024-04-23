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
