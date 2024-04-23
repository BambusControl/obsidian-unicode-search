import {QSettings} from "../../libraries/types/data/QSettings";
import {QUser} from "../../libraries/types/data/QUser";
import {QUnicode} from "../../libraries/types/data/QUnicode";

export interface QRootDataStore {
    getUnicode(): Promise<QUnicode>
    overwriteUnicode(data: QUnicode): Promise<QUnicode>

    getSettings(): Promise<QSettings>
    saveSettings(settings: QSettings): Promise<QSettings>

    getUsage(): Promise<QUser>
    saveUsage(usage: QUser): Promise<QUser>

    saveToStorage(): Promise<void>
}
