export interface DataPartManager<T> {
    initSkeleton(): Promise<T>;
    initData(): Promise<T>;
    updateData(): Promise<T>;
    verifyData(): Promise<boolean>;
}
