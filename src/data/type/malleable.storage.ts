import {AffectableStorage} from "./affectable.storage";

export interface MalleableStorage<T> extends AffectableStorage<T> {
	remove(character: T): void;
}
