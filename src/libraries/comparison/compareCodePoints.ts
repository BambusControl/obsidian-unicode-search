import type {Character} from "../types/codePoint/unicode";
import type {Order} from "../order/order";
import {compareNumbers} from "./compareNumbers";

export function compareCodePoints(
    left: Character,
    right: Character,
): Order {
    return compareNumbers(left.id, right.id)
}
