import {QSettings} from "../../libraries/types/data/QSettings";
import {QUsage} from "../../libraries/types/data/QUsage";
import {QUnicode} from "../../libraries/types/data/QUnicode";
import {SaveDataVersion} from "../../libraries/types/data/saveDataVersion";

export interface QRootDataStore {
    isInitialized(): Promise<boolean>;
    setInitialized(value: boolean): Promise<void>
    getVersion(): Promise<SaveDataVersion>;

    getUnicode(): Promise<QUnicode>
    overwriteUnicode(data: QUnicode): Promise<QUnicode>

    getSettings(): Promise<QSettings>
    saveSettings(settings: QSettings): Promise<QSettings>

    getUsage(): Promise<QUsage>
    saveUsage(usage: QUsage): Promise<QUsage>
}
