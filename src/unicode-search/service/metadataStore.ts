export interface MetadataStore {
    flagToReinitialize(): Promise<void>;
    isInitialized(): Promise<boolean>;
}
