import {toHexadecimal} from "../../../src/libraries/helpers/toHexadecimal";

test(
    "character `b` is `0062`",
    () => {
        expect(toHexadecimal({
            codepoint: "b",
        })).toBe("0062")
    }
)
