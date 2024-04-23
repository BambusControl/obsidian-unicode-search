import {Settings} from "./QSettings";
import {Usage} from "./QUsage";
import {Unicode} from "./QUnicode";
import {SaveDataVersion} from "./saveDataVersion";

export interface SaveData {
    version: SaveDataVersion;
    initialized: boolean;

    settings: Settings;
    unicode: Unicode;
    usage: Usage;
}
