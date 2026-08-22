import {toHexadecimal} from "src/libraries/helpers/toHexadecimal";

test(
    "character `b` is `0062`",
    () => {
        expect(toHexadecimal({
            id: 0x62,
        })).toBe("0062")
    }
)
