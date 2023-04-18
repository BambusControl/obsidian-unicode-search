export interface ExternalData<T> {
	importData(data?: Partial<T>): void;
	exportData(): T;
}
