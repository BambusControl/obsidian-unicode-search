import {App, Plugin as ObsidianPlugin, PluginManifest} from "obsidian";
import {SaveDataLoader} from "./save-data-loader";

export default class UnicodeSearch extends ObsidianPlugin {

	private readonly saveDataLoader: SaveDataLoader;

	public constructor(
		app: App,
		manifest: PluginManifest,
	) {
		super(app, manifest);

		this.saveDataLoader = new SaveDataLoader();
	}

	public override async onload(): Promise<void> {
		// TODO: Obsidian does not expect a promise here.
		const saveData = await super.loadData();
		await this.saveDataLoader.loadSaveData(saveData);
		super.onload();
	}
}
