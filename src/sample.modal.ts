import {App, Modal} from "obsidian";

export class SampleModal extends Modal {
	public constructor(app: App) {
		super(app);
	}

	public override onOpen(): void {
		const {contentEl}: this = this;
		contentEl.setText("Woah!");
	}

	public override onClose(): void {
		const {contentEl}: this = this;
		contentEl.empty();
	}
}
