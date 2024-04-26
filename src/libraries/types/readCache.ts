export class ReadCache<T> {
    private value?: T;

    constructor(
        private readonly getCallback: () => Promise<T>,
        initialValue?: T
    ) {
        this.value = initialValue;
    }

    async getValue(): Promise<T> {
        if (this.value == null) {
            this.value = await this.getCallback();
        }

        return this.value;
    }

    setValue(value: T) {
        this.value = value
    }
}
