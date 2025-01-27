export interface DataPartManager<T> {
    initSkeleton(loadedData: any): Promise<T>;
    initData(): Promise<T>;
    updateData(): Promise<T>;
    verifyData(): Promise<boolean>;
}
