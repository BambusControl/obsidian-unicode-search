export interface SaveDataStore {
    isSaveDataInitialized(): Promise<boolean>;

    setSaveDataAsInitialized(): Promise<void>;
}
