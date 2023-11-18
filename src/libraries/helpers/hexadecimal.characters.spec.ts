import {toHexadecimal} from "./hexadecimal.characters";

test(
    "character `b` is `0062`",
    () => {
        expect(toHexadecimal({
            "char": "b",
            "name": "latin small letter b"
        })).toBe("0062")
    }
)
