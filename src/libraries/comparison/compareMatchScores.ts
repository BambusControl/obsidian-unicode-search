import {CharacterSearchMatch} from "../../unicode-search/components/characterSearch";
import {Order} from "../order/order";

export function compareMatchScores(left: CharacterSearchMatch, right: CharacterSearchMatch): Order {
    /* Matches are scored with negative values up to 0, with 0 meaning full match for fuzzy search */
    const codepointScore = right.codepoint.score - left.codepoint.score;
    const nameScore = right.name.score - left.name.score;
    const value = codepointScore + nameScore;
    const nValue = value / Math.abs(value);

    return nValue as Order;
}
