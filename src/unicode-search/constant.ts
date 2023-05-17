import {SaveDataMeta} from "./types";

/*
* The easiest way to make sure this value doesn't get modified is to create a new object each time.
*/

export function INITIAL_SAVE_DATA(): SaveDataMeta {
	return {
		meta: {
			version: "0.4.0",
		},
	}
}
