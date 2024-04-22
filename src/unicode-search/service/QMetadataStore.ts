export interface QMetadataStore {
    /*flagToReinitialize(): Promise<void>;*/
    isInitialized(): Promise<boolean>;
}
