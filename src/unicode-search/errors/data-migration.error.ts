import {UnicodeSearchError} from "./unicode-search.error";

export class DataMigrationError extends UnicodeSearchError {

	constructor(message: string) {
		super(message);
	}
}
