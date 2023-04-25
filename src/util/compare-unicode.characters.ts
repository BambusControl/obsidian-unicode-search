import {UnicodeCharacterInfoModel} from "../data/unicode-character-info.model";
import {Order} from "../data/order";

export function compareUnicodeCharacters(a: UnicodeCharacterInfoModel, b: UnicodeCharacterInfoModel): Order {
	if (a.char < b.char) {
		return Order.Before;
	}

	if (a.char > b.char) {
		return Order.After;
	}

	return Order.Equal;
}
