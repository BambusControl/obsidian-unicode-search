import {App, Plugin, PluginManifest} from "obsidian";
import {ConstantStorage} from "./service/constant.storage";
import {UsageTrackedStorage} from "./service/usage-tracked.storage";
import {UserPinnedStorage} from "./service/user-pinned.storage";
import {FuzzySearchModal} from "./components/fuzzy-search.modal";
import {ExternalData} from "./data/type/external.data";

export default class UnicodeSearchPlugin extends Plugin {

	private services?: {
		constantStorage: ConstantStorage,
		usageTrackedStorage: UsageTrackedStorage,
		userPinnedStorage: UserPinnedStorage,
	};

	private externalData?: ExternalData<any>[];

	public constructor(
		app: App,
		manifest: PluginManifest,
	) {
		super(app, manifest);
	}

	public override async onload(): Promise<void> {
		this.services = {
			constantStorage: new ConstantStorage(),
			usageTrackedStorage: new UsageTrackedStorage(),
			userPinnedStorage: new UserPinnedStorage(),
		};

		this.externalData = [
			this.services.usageTrackedStorage,
			this.services.userPinnedStorage,
		]

		await this.importData()

		this.addCommand({
			id: "search-unicode-chars",
			name: "Search Unicode characters",

			editorCallback: editor => {
				const modal = new FuzzySearchModal(
					app,
					editor,
					this.services!.constantStorage,
					this.services!.usageTrackedStorage,
					this.services!.userPinnedStorage,
				);
				modal.open();
				return true;
			},
		});
	}

	public override async onunload(): Promise<void> {
		await this.exportData();
	}

	private async importData(): Promise<any> {
		const data = await super.loadData();

		for (const service of this.externalData!) {
			service.importData(data)
		}
	}

	private async exportData(): Promise<void> {
		// TODO: this doesn't work like this, we need a callback.
		const data = this.externalData!.map(s => s.exportData())
			.reduce((prev, curr) => ({...prev, ...curr}), {})

		return await super.saveData(data);
	}

}
