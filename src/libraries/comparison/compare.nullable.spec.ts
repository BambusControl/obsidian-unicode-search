import {expect, test} from "@jest/globals";
import {compareNullable} from "./compare.nullable";
import {compareNumbers} from "./compare.numbers";

test(
    "null equals null",
    () => {
       expect(compareNullable(null, null, compareNumbers)).toBe(0);
    }
)

test(
    "non-null is less than null",
    () => {
       expect(compareNullable(0, null, compareNumbers)).toBe(-1);
    }
)

test(
    "null is more than non-null",
    () => {
       expect(compareNullable(null, 0, compareNumbers)).toBe(1);
    }
)
