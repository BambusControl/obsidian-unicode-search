import {UnicodeSearchError} from "../errors/unicodeSearchError";

export class Cache<T> {
    private value?: T

    constructor(
        private readonly getCallback: () => Promise<T>,
        private readonly persistCallback: (value: T) => Promise<void>,
        initialValue?: T
    ) {
        this.getCallback = getCallback;
        this.value = initialValue;
    }

    async get(): Promise<T> {
        if (this.value == null) {
            this.value = await this.getCallback();
        }

        return this.value;
    }

    set(value: T) {
        this.value = value
    }

    async persist(): Promise<T> {
        if (this.value == null) {
            throw new UnicodeSearchError("Refuse to persist a null value");
        }

        console.debug("Persisting", {value: this.value})
        await this.persistCallback(this.value);
        return this.value;
    }
}
