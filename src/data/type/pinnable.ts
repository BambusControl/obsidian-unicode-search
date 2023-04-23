import {Optional} from "./optional";

export interface Pinnable {

	/**
	 * Sequence number of pinned item.
	 */
	pinned: Optional<number>;
}
