import {App, Plugin as ObsidianPlugin, PluginManifest} from "obsidian";
import {Plugin} from "./plugin";

export default class UnicodeSearch extends ObsidianPlugin {

	private readonly plugin: Plugin;

	public constructor(
		app: App,
		manifest: PluginManifest,
	) {
		super(app, manifest);
		this.plugin = new Plugin();
	}

	public override onload(): void {
		this.plugin.load();
		super.onload();
	}
}
