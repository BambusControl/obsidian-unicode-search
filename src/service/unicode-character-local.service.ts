import {UnicodeCharacterService} from "./unicode-character.service";
import {UnicodeCharacterInfoModel} from "../data/model/unicode-character-info.model";
import * as fs from "fs/promises";

export class UnicodeCharacterLocalService implements UnicodeCharacterService {

	private data: UnicodeCharacterInfoModel[];

	public constructor() {
		this.data = [];
	}

	public async initialize(path: string | Buffer | URL, abortSignal: AbortSignal): Promise<void> {
		const readingPromise = fs.readFile(
			path,
			{
				encoding: "utf-8",
				signal: abortSignal,
			}
		);

		const readFile = await readingPromise;

		const chars = JSON.parse(readFile);

		this.data = chars as UnicodeCharacterInfoModel[];
	}

	public search(query: string): Promise<UnicodeCharacterInfoModel[]> {
		const lowerQuery = query.toLowerCase();

		return Promise.resolve(
			this.data.filter(ch => ch.name.contains(lowerQuery)),
		);
	}

}
