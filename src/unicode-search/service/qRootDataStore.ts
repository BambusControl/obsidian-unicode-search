import {QSettings, QUnicode, QUser} from "../../libraries/types/data/QSaveData";

export interface QRootDataStore {
    getUnicode(): Promise<QUnicode>
    overwriteUnicode(data: QUnicode): Promise<QUnicode>

    getSettings(): Promise<QSettings>
    saveSettings(settings: QSettings): Promise<QSettings>

    getUsage(): Promise<QUser>
    saveUsage(usage: QUser): Promise<QUser>

    saveToStorage(): Promise<void>
}
