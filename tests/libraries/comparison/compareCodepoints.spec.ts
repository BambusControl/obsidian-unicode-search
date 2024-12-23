import {compareCodepoints} from "../../../src/libraries/comparison/compareCodepoints";

test(
    "character with codepoint `a` is before character with codepoint `b`",
    () => {
        expect(compareCodepoints(
            {
                codepoint: "a",
                name: "",
                category: "Ll",
            },
            {
                codepoint: "b",
                name: "",
                category: "Ll",
            },
        )).toBe(-1)
    }
)
