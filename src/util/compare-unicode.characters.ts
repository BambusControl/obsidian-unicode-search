import {UnicodeCharacter} from "../data/unicode.character";
import {Order} from "../data/order";

export function compareUnicodeCharacters(a: UnicodeCharacter, b: UnicodeCharacter): Order {
	if (a.char < b.char) {
		return Order.Before;
	}

	if (a.char > b.char) {
		return Order.After;
	}

	return Order.Equal;
}
