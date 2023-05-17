import {UnicodeSearchError} from "./unicode-search.error";

export class InvalidSaveData extends UnicodeSearchError {

	constructor(message: string) {
		super(message);
	}
}
