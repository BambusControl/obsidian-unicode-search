import {PersistCache} from "../../../libraries/types/persistCache";
import {SaveData} from "../../../libraries/types/savedata/nieuw/saveData";
import {FilterFragment} from "../../../libraries/types/savedata/nieuw/filterFragment";
import {UnicodeFragment} from "../../../libraries/types/savedata/nieuw/unicodeFragment";
import {UsageFragment} from "../../../libraries/types/savedata/nieuw/usageFragment";
import {FavoritesFragment} from "../../../libraries/types/savedata/nieuw/favoritesFragment";
import {RootDataStore} from "../rootDataStore";
import {MetaFragment} from "../../../libraries/types/savedata/nieuw/metaFragment";

export class RootPluginDataStorage implements RootDataStore {

    constructor(
        private readonly storedData: PersistCache<SaveData>,
    ) {
    }

    async getMeta(): Promise<MetaFragment> {
        return (await this.storedData.get()).meta;
    }

    async overwriteMeta(data: MetaFragment): Promise<MetaFragment> {
        const mergedData = await this.mergeData({
            meta: data,
        });

        return mergedData.meta;
    }

    async getUnicode(): Promise<UnicodeFragment> {
        return (await this.storedData.get()).unicode;
    }

    async overwriteUnicode(data: UnicodeFragment): Promise<UnicodeFragment> {
        const mergedData = await this.mergeData({
            unicode: data,
        });

        return mergedData.unicode;
    }

    async getFilter(): Promise<FilterFragment> {
        return (await this.storedData.get()).filter
    }

    async overwriteFilter(filter: FilterFragment): Promise<FilterFragment> {
        const mergedData = await this.mergeData({
            filter: filter,
        });

        return mergedData.filter;
    }

    async getUsage(): Promise<UsageFragment> {
        return (await this.storedData.get()).usage;
    }

    async overwriteUsage(usage: UsageFragment): Promise<UsageFragment> {
        const mergedData = await this.mergeData({
            usage: usage,
        });

        return mergedData.usage;
    }

    async getFavorites(): Promise<FavoritesFragment> {
        return (await this.storedData.get()).favorites;
    }

    async overwriteFavorites(favorites: FavoritesFragment): Promise<FavoritesFragment> {
        const mergedData = await this.mergeData({
            favorites: favorites,
        });

        return mergedData.favorites;
    }

    private async mergeData(data: Partial<SaveData>): Promise<SaveData> {
        const storedData = await this.storedData.get();

        const newData: SaveData = {
            ...storedData,
            ...data,
        };

        this.storedData.set(newData);
        return await this.storedData.persist();
    }
}
