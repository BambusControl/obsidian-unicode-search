import {RootDataStore} from "./rootDataStore";
import {DataEvent} from "../../libraries/types/savedata/metaFragment";

export class MetaStorage {

    constructor(private readonly store: RootDataStore) {
    }

    async request(event: DataEvent): Promise<void> {
        const meta = await this.store.getMeta();
        meta.events.push(event);
        await this.store.overwriteMeta(meta)
    }
}
