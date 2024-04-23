import {Plugin} from "obsidian";

export type PluginDataLoader = Pick<Plugin, "saveData" | "loadData">;
