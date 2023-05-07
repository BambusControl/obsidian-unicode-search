import {App, Plugin, PluginManifest} from "obsidian";
import {UsageTrackedStorage} from "./service/storage/usage-tracked.storage";
import {FuzzySearchModal} from "./components/fuzzy-search.modal";
import {PluginDataService} from "./service/plugin-data.service";
import {StatTrackedStorage} from "./service/storage/stat-tracked.storage";
import {DataService} from "./service/data.service";
import {DataAccess} from "./service/data.access";
import {UcdService} from "./service/ucd.service";

export default class UnicodeSearchPlugin extends Plugin {

	private services?: {
		dataService: DataService & DataAccess,
		usageTrackedStorage: StatTrackedStorage,
	};

	public constructor(
		app: App,
		manifest: PluginManifest,
	) {
		super(app, manifest);
	}

	public override async onload(): Promise<void> {
		const dataService = new PluginDataService(this);
		const usageTrackedStorage = new UsageTrackedStorage(dataService);

		this.services = {
			dataService: dataService,
			usageTrackedStorage: usageTrackedStorage,
		};

		await UnicodeSearchPlugin.initializeData(dataService, new UcdService());

		this.addCommand({
			id: "search-unicode-chars",
			name: "Search Unicode characters",

			editorCallback: editor => {
				const modal = new FuzzySearchModal(
					app,
					editor,
					dataService,
					usageTrackedStorage,
				);
				modal.open();
				return true;
			},
		});
	}

	private static async initializeData(dataService: DataService, ucdService: UcdService): Promise<void> {
		const initialized = await dataService.isInitialized();

		if (initialized) {
			return;
		}

		const data = await ucdService.fetchCharacters();

		const newData = data.reduce(
			(accumulator, character) => {
				accumulator[character.char] = character;
				return accumulator;
			},
			{} as any,
		);

		await dataService.exportData(newData);
		await dataService.setAsInitialized();
	}

}
