import { averageUseCount } from "../../../src/libraries/helpers/averageUseCount";

describe("averageUseCount", () => {
    it("should return 0 when the input array is empty", () => {
        const result = averageUseCount([]);
        expect(result).toBe(0);
    });

    it("should return the correct average when the input array has one item", () => {
        const result = averageUseCount([{ useCount: 5 }]);
        expect(result).toBe(5);
    });

    it("should return the correct average when the input array has multiple items", () => {
        const result = averageUseCount([{ useCount: 5 }, { useCount: 10 }, { useCount: 15 }]);
        expect(result).toBe(10);
    });

    it("should handle an array with all zero useCounts", () => {
        const result = averageUseCount([{ useCount: 0 }, { useCount: 0 }, { useCount: 0 }]);
        expect(result).toBe(0);
    });

    it("should handle an array with mixed positive and zero useCounts", () => {
        const result = averageUseCount([{ useCount: 0 }, { useCount: 10 }, { useCount: 20 }]);
        expect(result).toBe(10);
    });
});
