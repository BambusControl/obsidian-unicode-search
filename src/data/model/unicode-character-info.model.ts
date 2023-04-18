export interface UnicodeCharacterInfoModel {
	name: string,
	char: string,
}

export function compare(a: UnicodeCharacterInfoModel, b: UnicodeCharacterInfoModel ): number {
	if (a.char > b.char) {
		return 1;
	}

	if (a.char < b.char) {
		return -1;
	}

	return 0;
}

export function equals(a: UnicodeCharacterInfoModel, b: UnicodeCharacterInfoModel ): boolean {
	return a.char === b.char;
}
