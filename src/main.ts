import {App, Plugin, PluginManifest} from "obsidian";
import {ConstantStorage} from "./service/constant.storage";
import {UsageTrackedStorage} from "./service/usage-tracked.storage";
import {UserPinnedStorage} from "./service/user-pinned.storage";
import {FuzzySearchModal} from "./components/fuzzy-search.modal";
import {PluginExportService} from "./service/plugin-export.service";
import {PinnedStorage} from "./service/storage/pinned.storage";
import {UNICODE_DATA} from "./configuration/unicode.data";

export default class UnicodeSearchPlugin extends Plugin {

	private exportService?: PluginExportService;

	private constantStorage?: ConstantStorage;
	private usageTrackedStorage?: UsageTrackedStorage;
	private userPinnedStorage?: PinnedStorage;

	public constructor(
		app: App,
		manifest: PluginManifest,
	) {
		super(app, manifest);
	}

	public override async onload(): Promise<void> {
		this.exportService = new PluginExportService(this);

		/// Initialize
		const initialized = await this.exportService.isInitialized();
		if (!initialized) {
			const newData = UNICODE_DATA.reduce(
				(accumulator, character) => {
					accumulator[character.char] = character;
					return accumulator;
				},
				{} as any,
			);

			await this.exportService.exportData(newData);
			await this.exportService.setAsInitialized();
		}
		/// Initialize

		this.constantStorage = new ConstantStorage(this.exportService);
		this.usageTrackedStorage = new UsageTrackedStorage(this.exportService);
		this.userPinnedStorage = new UserPinnedStorage(this.exportService);

		this.addCommand({
			id: "search-unicode-chars",
			name: "Search Unicode characters",

			editorCallback: editor => {
				const modal = new FuzzySearchModal(
					app,
					editor,
					this.exportService!,
					this.usageTrackedStorage!,
				);
				modal.open();
				return true;
			},
		});
	}

}
