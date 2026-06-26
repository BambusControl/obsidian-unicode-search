import {asHexadecimal} from "src/libraries/helpers/asHexadecimal";

describe("asHexadecimal", () => {
    it("should convert single digit numbers to 4-character hex strings", () => {
        expect(asHexadecimal(0)).toBe("0000");
        expect(asHexadecimal(1)).toBe("0001");
        expect(asHexadecimal(9)).toBe("0009");
    });

    it("should convert two digit numbers to 4-character hex strings", () => {
        expect(asHexadecimal(10)).toBe("000a");
        expect(asHexadecimal(15)).toBe("000f");
        expect(asHexadecimal(16)).toBe("0010");
        expect(asHexadecimal(99)).toBe("0063");
    });

    it("should convert three digit numbers to 4-character hex strings", () => {
        expect(asHexadecimal(100)).toBe("0064");
        expect(asHexadecimal(255)).toBe("00ff");
        expect(asHexadecimal(256)).toBe("0100");
        expect(asHexadecimal(999)).toBe("03e7");
    });

    it("should convert four digit numbers to 4-character hex strings", () => {
        expect(asHexadecimal(1000)).toBe("03e8");
        expect(asHexadecimal(4095)).toBe("0fff");
        expect(asHexadecimal(4096)).toBe("1000");
        expect(asHexadecimal(9999)).toBe("270f");
    });

    it("should handle larger numbers (more than 4 hex digits)", () => {
        expect(asHexadecimal(65536)).toBe("10000");
        expect(asHexadecimal(1048576)).toBe("100000");
    });

    it("should handle common Unicode code points", () => {
        expect(asHexadecimal(65)).toBe("0041"); // 'A'
        expect(asHexadecimal(97)).toBe("0061"); // 'a'
        expect(asHexadecimal(32)).toBe("0020"); // space
        expect(asHexadecimal(8364)).toBe("20ac"); // '€'
    });
});
