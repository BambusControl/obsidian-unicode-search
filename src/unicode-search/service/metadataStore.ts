export interface MetadataStore {
    isInitialized(): Promise<boolean>;
    setAsInitialized(): Promise<void>;
}
