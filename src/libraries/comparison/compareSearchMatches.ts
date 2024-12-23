import {MaybeSearchMatchAttributes} from "../../unicode-search/components/characterSearch";
import {Order} from "../order/order";
import {compareSearchMatchScores} from "./compareSearchMatchScores";
import {compareNullable} from "./compareNullable";
import {fillNullSearchMatchScores} from "./fillNullSearchMatchScores";

export function compareSearchMatches(left: MaybeSearchMatchAttributes, right: MaybeSearchMatchAttributes): Order {
    const leftNull = left.codepoint == null && left.name == null;
    const rightNull = right.codepoint == null && right.name == null;

    return compareNullable(
        leftNull ? null : fillNullSearchMatchScores(left),
        rightNull ? null : fillNullSearchMatchScores(right),
        (l, r) => compareSearchMatchScores(l, r)
    )
}
