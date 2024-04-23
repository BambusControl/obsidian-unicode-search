import {QSettings} from "./QSettings";
import {QUser} from "./QUser";
import {QUnicode} from "./QUnicode";

export interface QSaveData {
    settings: QSettings;
    usage: QUser;
    unicode: QUnicode;
}
