import {expect, test} from "@jest/globals";
import {compareNumbers} from "./compare.numbers";

test(
    "one equals one",
    () => {
       expect(compareNumbers(1, 1)).toBe(0);
    }
)

test(
    "zero is less than one",
    () => {
       expect(compareNumbers(0, 1)).toBe(-1);
    }
)

test(
    "two is more than one",
    () => {
       expect(compareNumbers(2, 1)).toBe(1);
    }
)
