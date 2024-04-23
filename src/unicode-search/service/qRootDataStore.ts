import {Settings} from "../../libraries/types/data/QSettings";
import {Usage} from "../../libraries/types/data/QUsage";
import {Unicode} from "../../libraries/types/data/QUnicode";
import {SaveDataVersion} from "../../libraries/types/data/saveDataVersion";

export interface RootDataStore {
    isInitialized(): Promise<boolean>;
    setInitialized(value: boolean): Promise<void>
    getVersion(): Promise<SaveDataVersion>;

    getUnicode(): Promise<Unicode>
    overwriteUnicode(data: Unicode): Promise<Unicode>

    getSettings(): Promise<Settings>
    saveSettings(settings: Settings): Promise<Settings>

    getUsage(): Promise<Usage>
    saveUsage(usage: Usage): Promise<Usage>
}
