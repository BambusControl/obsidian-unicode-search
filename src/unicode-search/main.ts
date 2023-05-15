import {App, Plugin, PluginManifest} from "obsidian";

export default class UnicodeSearchPlugin extends Plugin {

	public constructor(
		app: App,
		manifest: PluginManifest,
	) {
		super(app, manifest);
	}

}

