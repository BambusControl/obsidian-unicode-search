import {Plugin} from "obsidian";

export type QPluginDataLoader = Pick<Plugin, "saveData" | "loadData">;
