import {PersistCache} from "../../../libraries/types/persistCache";
import {SaveDataNew} from "../../../libraries/types/savedata/nieuw/saveDataNew";
import {FilterDataNew} from "../../../libraries/types/savedata/nieuw/filterDataNew";
import {UnicodeDataNew} from "../../../libraries/types/savedata/nieuw/unicodeDataNew";
import {UsageDataNew} from "../../../libraries/types/savedata/nieuw/usageDataNew";
import {FavoritesDataNew} from "../../../libraries/types/savedata/nieuw/favoritesDataNew";
import {RootDataStoreNew} from "../rootDataStoreNew";

export class RootPluginDataStorageNew implements RootDataStoreNew {

    constructor(
        private readonly storedData: PersistCache<SaveDataNew>,
    ) {
    }

    async getUnicode(): Promise<UnicodeDataNew> {
        return (await this.storedData.get()).unicode;
    }

    async overwriteUnicode(data: UnicodeDataNew): Promise<UnicodeDataNew> {
        const mergedData = await this.mergeData({
            unicode: data,
        });

        return mergedData.unicode;
    }

    async getFilter(): Promise<FilterDataNew> {
        return (await this.storedData.get()).filter
    }

    async overwriteFilter(filter: FilterDataNew): Promise<FilterDataNew> {
        const mergedData = await this.mergeData({
            filter: filter,
        });

        return mergedData.filter;
    }

    async getUsage(): Promise<UsageDataNew> {
        return (await this.storedData.get()).usage;
    }

    async overwriteUsage(usage: UsageDataNew): Promise<UsageDataNew> {
        const mergedData = await this.mergeData({
            usage: usage,
        });

        return mergedData.usage;
    }

    async getFavorites(): Promise<FavoritesDataNew> {
        return (await this.storedData.get()).favorites;
    }

    async overwriteFavorites(favorites: FavoritesDataNew): Promise<FavoritesDataNew> {
        const mergedData = await this.mergeData({
            favorites: favorites,
        });

        return mergedData.favorites;
    }

    private async mergeData(data: Partial<SaveDataNew>): Promise<SaveDataNew> {
        const storedData = await this.storedData.get();

        const newData: SaveDataNew = {
            ...storedData,
            ...data,
        };

        this.storedData.set(newData);
        return await this.storedData.persist();
    }
}
