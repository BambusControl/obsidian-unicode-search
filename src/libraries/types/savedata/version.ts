/**
 * Version of the plugin.
 *
 * Must comply with RegEx:
 * ```^[0-9]+\\.[0-9]+\\.[0-9]+(?:-[A-Z]+)?$```
 */
export type PluginVersion
    = "0.2.0"
    | "0.2.1"
    | "0.2.2"
    | "0.2.3"
    | "0.3.0"
    | "0.4.0"
    | "0.4.1"
    | "0.5.0"
    | "0.6.0"
    | "0.6.1"
    | "0.7.0"
    | "0.7.1"
    | "0.7.1-NEXT"
    // Update every release
    ;

export type CurrentPluginVersion = "0.7.1-NEXT" & PluginVersion;
export const CURRENT_PLUGIN_VERSION: CurrentPluginVersion = "0.7.1-NEXT";

/**
 * Version of the save data schema.
 *
 * Must comply with RegEx:
 * ```^[0-9]+\\.[0-9]+\\.[0-9]+(?:-[A-Z]+)?$```
 *
 * The version of the save data schema is independent of the plugin version
 * @see {@link PluginVersion}
 */
export type SaveDataVersion = PluginVersion &
    ( "0.4.0"
    | "0.5.0"
    | "0.6.0"
    | "0.7.0"
    // Update only if save data schema changed
    );

export type CurrentSaveDataVersion = "0.7.0" & SaveDataVersion;
export const CURRENT_DATA_VERSION: SaveDataVersion = "0.7.0";
