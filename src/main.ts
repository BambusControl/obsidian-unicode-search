import {App, Plugin, PluginManifest} from "obsidian";
import {DependencyManager} from "./configuration/dependency.manager";

export default class UnicodeSearchPlugin extends Plugin {

	private readonly dependency: DependencyManager;

	public constructor(
		app: App,
		manifest: PluginManifest,
	) {
		super(app, manifest);
		this.dependency = new DependencyManager();
	}

	public override async onload(): Promise<void> {
		this.addCommand({
			id: "search-unicode-chars",
			name: "Search Unicode characters",

			editorCallback: editor => {
				const modal = this.dependency.factory.FuzzySearchModal(app, editor);
				modal.open();
				return true;
			},
		});
	}

	public override onunload(): void {
		// Intentionally left blank
	}

}
