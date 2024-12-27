import {UnicodeFilter} from "./unicodeFilter";
import {Initializable} from "./initializable";

/**
 * User saved settings.
 */
export interface SettingsData extends Initializable {
    /**
     * Whether the settings have been modified and reinitialization is needed.
     */
    modified: boolean;
    filter: UnicodeFilter;
}

