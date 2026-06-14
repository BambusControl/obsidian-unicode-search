import {UnicodeCodepoint} from "../types/codepoint/unicode";
import {Order} from "../order/order";
import {compareNumbers} from "./compareNumbers";

export function compareCodepoints(
    left: UnicodeCodepoint,
    right: UnicodeCodepoint,
): Order {
    return compareNumbers(left.id, right.id)
}
