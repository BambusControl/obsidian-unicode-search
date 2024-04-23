import {QSettings} from "./QSettings";
import {QUsage} from "./QUsage";
import {QUnicode} from "./QUnicode";
import {SaveDataVersion} from "./saveDataVersion";

export interface QSaveData {
    version: SaveDataVersion;
    initialized: boolean;

    settings: QSettings;
    unicode: QUnicode;
    usage: QUsage;
}
