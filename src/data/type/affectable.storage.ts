import {ImmutableStorage} from "./immutable.storage";

export interface AffectableStorage<T> extends ImmutableStorage<T> {
	affect(character: T): void;
}
