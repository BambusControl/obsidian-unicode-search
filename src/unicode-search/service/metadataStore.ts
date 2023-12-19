export interface MetadataStore {
    isSaveDataInitialized(): Promise<boolean>;
    setSaveDataAsInitialized(): Promise<void>;
}
