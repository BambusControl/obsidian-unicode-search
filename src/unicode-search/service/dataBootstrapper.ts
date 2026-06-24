export interface DataBootstrapper {
	initializeData(): Promise<void>;
}
